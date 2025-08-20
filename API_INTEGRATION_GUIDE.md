# 接口对接示例

## 🔧 如何替换模拟数据为真实接口

### 1. 引入API配置
```javascript
// 在需要调用接口的页面顶部引入
import { API } from '@/utils/api'
```

### 2. 替换获取包裹列表
```javascript
// 当前模拟实现（需要替换）
setTimeout(() => {
  const mockData = [...]
  packages.value = mockData
}, 1000)

// 替换为真实接口
const response = await API.packages.getUserPackages(userId, {
  status: currentStatus.value === 'all' ? undefined : currentStatus.value
})
packages.value = response.data.list
```

### 3. 替换包裹操作接口
```javascript
// 认领包裹
await API.packages.claimPackage({
  packageId: pkg.id,
  userId: getUserId()
})

// 确认入仓
await API.packages.confirmWarehouse({
  packageId: pkg.id,
  userId: getUserId(),
  warehouseInfo: {...}
})

// 处理异常
await API.packages.handleAbnormal({
  packageId: pkg.id,
  userId: getUserId(),
  action: 'contact-service',
  remarks: '包裹损坏'
})
```

### 4. 配置API基础URL
```javascript
// 在 src/utils/api.js 中修改
const config = {
  baseURL: 'https://your-actual-domain.com/api', // 替换为真实域名
  timeout: 10000
}
```

### 5. 启用API调用
删除或注释掉所有 `TODO` 标记的模拟代码，取消注释真实的API调用代码。

## 📝 注意事项
1. 确保后端接口已部署并可访问
2. 检查请求参数格式是否与后端一致
3. 处理好错误情况和加载状态
4. 测试所有功能是否正常工作

完成以上步骤后，小程序就可以使用真实的后端接口了。

## 订单管理接口使用示例

### 在订单管理页面中使用
```javascript
// 1. 导入API配置
import { API } from '@/utils/api.js'

// 2. 获取用户订单列表
const loadOrders = async () => {
  try {
    const userInfo = uni.getStorageSync('userInfo')
    const response = await API.orders.getUserOrders(userInfo.userId, {
      status: this.currentStatus === 'all' ? undefined : this.currentStatus
    })
    this.orders = response.data
  } catch (error) {
    console.error('加载订单失败:', error)
  }
}

// 3. 确认货齐
const confirmShipping = async (order) => {
  try {
    await API.orders.confirmShipping({
      orderId: order.id,
      userId: userInfo.userId,
      confirmTime: new Date().toISOString()
    })
    
    // 更新本地状态
    order.status = 'packing'
    uni.showToast({ title: '确认成功', icon: 'success' })
  } catch (error) {
    uni.showToast({ title: '操作失败', icon: 'none' })
  }
}

// 4. 确认打包
const confirmPacking = async (order) => {
  try {
    await API.orders.confirmPacking({
      orderId: order.id,
      userId: userInfo.userId,
      packingInfo: {
        weight: order.totalWeight,
        dimensions: '标准包装',
        packingTime: new Date().toISOString()
      }
    })
    
    order.status = 'payment'
    uni.showToast({ title: '打包完成', icon: 'success' })
  } catch (error) {
    uni.showToast({ title: '操作失败', icon: 'none' })
  }
}

// 5. 立即支付
const makePayment = async (order) => {
  try {
    const response = await API.orders.makePayment({
      orderId: order.id,
      userId: userInfo.userId,
      paymentMethod: 'wechat',
      amount: order.shippingFee
    })
    
    order.status = 'delivery'
    uni.showToast({ title: '支付成功', icon: 'success' })
  } catch (error) {
    uni.showToast({ title: '支付失败', icon: 'none' })
  }
}

// 6. 确认发货
const confirmDelivery = async (order) => {
  try {
    await API.orders.confirmDelivery({
      orderId: order.id,
      userId: userInfo.userId,
      deliveryInfo: {
        trackingNumber: 'SF' + Date.now(),
        carrier: '顺丰快递',
        deliveryTime: new Date().toISOString()
      }
    })
    
    // 从列表中移除已发货的订单
    const index = this.orders.findIndex(o => o.id === order.id)
    if (index !== -1) {
      this.orders.splice(index, 1)
    }
    
    uni.showToast({ title: '发货成功', icon: 'success' })
  } catch (error) {
    uni.showToast({ title: '操作失败', icon: 'none' })
  }
}
```

### 错误处理最佳实践
```javascript
// 统一错误处理
const handleApiError = (error, defaultMessage = '操作失败') => {
  console.error('API调用失败:', error)
  
  let errorMessage = defaultMessage
  if (error.message) {
    errorMessage = error.message
  }
  
  uni.showToast({
    title: errorMessage,
    icon: 'none',
    duration: 2000
  })
}

// 使用示例
try {
  await API.orders.confirmShipping(data)
  uni.showToast({ title: '操作成功', icon: 'success' })
} catch (error) {
  handleApiError(error, '确认货齐失败')
}
```

### 数据更新策略
```javascript
// 1. 本地状态更新（快速响应）
const updateLocalOrderStatus = (orderId, newStatus) => {
  const index = this.orders.findIndex(o => o.id === orderId)
  if (index !== -1) {
    this.orders[index].status = newStatus
    this.updateBadgeCounts()
  }
}

// 2. 服务器数据同步（确保一致性）
const syncWithServer = async () => {
  try {
    await this.loadOrders()
  } catch (error) {
    console.error('数据同步失败:', error)
  }
}

// 3. 操作成功后的完整更新流程
const handleOrderOperation = async (operation, order, newStatus) => {
  try {
    // 显示加载状态
    uni.showLoading({ title: '处理中...' })
    
    // 调用API
    await operation()
    
    // 更新本地状态
    updateLocalOrderStatus(order.id, newStatus)
    
    // 显示成功消息
    uni.showToast({ title: '操作成功', icon: 'success' })
    
    // 可选：同步服务器数据
    setTimeout(() => {
      syncWithServer()
    }, 1000)
    
  } catch (error) {
    handleApiError(error)
  } finally {
    uni.hideLoading()
  }
}
```
