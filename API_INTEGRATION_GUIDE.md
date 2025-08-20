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
