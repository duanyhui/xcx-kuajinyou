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

## 🎯 推广功能接口对接示例

### 1. 推广码页面接口替换
```javascript
// 当前模拟实现（需要替换）
const loadPromotionData = async () => {
  // 模拟数据
  qrCodeUrl.value = 'https://via.placeholder.com/400x400/87ceeb/ffffff?text=QR+Code'
  promotionCode.value = 'TG100017'
  // ...
}

// 替换为真实接口
import { getPromotionCode, getPromotionStats } from '@/utils/api'

const loadPromotionData = async () => {
  try {
    // 获取推广码信息（包含后端生成的二维码）
    const codeResult = await getPromotionCode(getUserId())
    if (codeResult.success) {
      qrCodeUrl.value = codeResult.data.qrCodeUrl // 后端生成的二维码URL
      promotionCode.value = codeResult.data.code
      promotionLink.value = codeResult.data.link
    }

    // 获取推广统计
    const statsResult = await getPromotionStats(getUserId())
    if (statsResult.success) {
      stats.value = statsResult.data
    }
  } catch (error) {
    handleApiError(error)
  }
}
```

### 2. 团成员列表接口替换
```javascript
// 当前模拟实现（需要替换）
const loadTeamMembers = async () => {
  // 模拟数据
  members.value = [...]
}

// 替换为真实接口
import { getTeamMembers } from '@/utils/api'

const loadTeamMembers = async () => {
  try {
    const result = await getTeamMembers(getUserId(), {
      page: currentPage.value,
      pageSize: 20,
      filter: activeFilter.value
    })
    
    if (result.success) {
      if (currentPage.value === 1) {
        members.value = result.data.members
      } else {
        members.value.push(...result.data.members)
      }
      teamStats.value = result.data.stats
      hasMore.value = result.data.pagination.page < result.data.pagination.totalPages
    }
  } catch (error) {
    handleApiError(error)
  }
}
```

### 3. 团队订单接口替换
```javascript
// 当前模拟实现（需要替换）
const loadTeamOrders = async () => {
  // 模拟数据
  orders.value = [...]
}

// 替换为真实接口
import { getTeamOrders } from '@/utils/api'

const loadTeamOrders = async () => {
  try {
    const result = await getTeamOrders(getUserId(), {
      page: currentPage.value,
      pageSize: 20,
      status: activeFilter.value
    })
    
    if (result.success) {
      if (currentPage.value === 1) {
        orders.value = result.data.orders
      } else {
        orders.value.push(...result.data.orders)
      }
      orderStats.value = result.data.stats
      hasMore.value = result.data.pagination.page < result.data.pagination.totalPages
    }
  } catch (error) {
    handleApiError(error)
  }
}
```

### 4. 佣金页面接口替换
```javascript
// 当前模拟实现（需要替换）
const loadCommissionData = async () => {
  // 模拟数据
  records.value = [...]
  totalBalance.value = '258.85'
}

// 替换为真实接口
import { getCommissionRecords, getCommissionStats } from '@/utils/api'

const loadCommissionData = async () => {
  try {
    // 获取佣金记录
    const recordsResult = await getCommissionRecords(getUserId(), {
      page: currentPage.value,
      pageSize: 20,
      status: activeFilter.value
    })
    
    if (recordsResult.success) {
      if (currentPage.value === 1) {
        records.value = recordsResult.data.records
      } else {
        records.value.push(...recordsResult.data.records)
      }
      totalBalance.value = recordsResult.data.balance
      hasMore.value = recordsResult.data.pagination.page < recordsResult.data.pagination.totalPages
    }

    // 获取佣金统计
    const statsResult = await getCommissionStats(getUserId())
    if (statsResult.success) {
      monthlyStats.value = statsResult.data.monthly
      yearlyStats.value = statsResult.data.yearly
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 佣金提现接口
const withdraw = async () => {
  try {
    const result = await API.commission.withdraw({
      userId: getUserId(),
      amount: totalBalance.value,
      withdrawType: 'wechat',
      account: {
        // 微信提现账户信息
      }
    })
    
    if (result.success) {
      uni.showToast({ title: '提现申请成功', icon: 'success' })
      // 刷新余额
      await loadCommissionData()
    }
  } catch (error) {
    handleApiError(error)
  }
}
```

### 5. 推广功能数据缓存策略
```javascript
// 推广数据缓存（减少频繁请求）
const cacheKey = `promotion_data_${getUserId()}`
const cacheTime = 5 * 60 * 1000 // 5分钟缓存

const getPromotionDataWithCache = async () => {
  try {
    // 检查缓存
    const cached = uni.getStorageSync(cacheKey)
    if (cached && (Date.now() - cached.timestamp) < cacheTime) {
      return cached.data
    }

    // 获取新数据
    const result = await getPromotionCode(getUserId())
    if (result.success) {
      // 缓存数据
      uni.setStorageSync(cacheKey, {
        data: result.data,
        timestamp: Date.now()
      })
      return result.data
    }
  } catch (error) {
    // 缓存失效时，尝试使用缓存数据
    const cached = uni.getStorageSync(cacheKey)
    if (cached) {
      console.warn('使用缓存数据，网络请求失败:', error)
      return cached.data
    }
    throw error
  }
}
```

## 📱 推广功能特殊处理

### 1. 二维码图片加载失败处理
```javascript
const handleQrCodeError = () => {
  // 显示默认二维码或重新生成
  qrCodeUrl.value = '/static/default-qrcode.png'
  uni.showToast({
    title: '二维码加载失败，请刷新重试',
    icon: 'none'
  })
}

// 在image组件中使用
<image 
  :src="qrCodeUrl" 
  @error="handleQrCodeError"
  mode="aspectFit"
></image>
```

### 2. 推广分享功能
```javascript
const sharePromotion = () => {
  // 检查分享能力
  uni.getSystemInfo({
    success: (info) => {
      if (info.platform === 'devtools') {
        // 开发工具中使用复制功能
        copyPromotionLink()
        return
      }
      
      // 实际设备中使用分享功能
      uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        href: promotionLink.value,
        title: '中韩跨境邮推广',
        summary: `我的推广码: ${promotionCode.value}`,
        imageUrl: qrCodeUrl.value,
        success: () => {
          uni.showToast({ title: '分享成功', icon: 'success' })
        },
        fail: () => {
          // 分享失败，降级为复制功能
          copyPromotionLink()
        }
      })
    }
  })
}
```

### 3. 推广数据实时更新
```javascript
// 推广数据变化监听
const setupPromotionDataListener = () => {
  // 定期更新推广统计（可选）
  setInterval(() => {
    if (!loading.value) {
      refreshPromotionStats()
    }
  }, 30000) // 每30秒更新一次
}

const refreshPromotionStats = async () => {
  try {
    const result = await getPromotionStats(getUserId())
    if (result.success) {
      stats.value = result.data
    }
  } catch (error) {
    // 静默失败，不影响用户体验
    console.warn('推广统计更新失败:', error)
  }
}
```
