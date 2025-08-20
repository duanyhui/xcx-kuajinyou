# 后端接口对接 TODO 清单

## 📋 概述
本文档列出了小程序需要对接的所有后端API接口，包括接口描述、请求参数、响应格式等详细信息。

## 🔐 认证相关接口

### 1. 微信登录接口
**接口位置**: `src/pages/profile/profile.vue` - `handleWechatLogin()`
```javascript
// TODO: 替换微信登录逻辑
POST /api/auth/wechat-login
```

**请求参数**:
```json
{
  "code": "string", // 微信登录code
  "userInfo": {
    "nickName": "string",
    "avatarUrl": "string",
    "gender": "number",
    "city": "string",
    "province": "string",
    "country": "string"
  }
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "string",
    "userInfo": {
      "userId": "string",
      "nickname": "string", 
      "avatar": "string",
      "randomSuffix": "string"
    }
  }
}
```

## 📦 包裹管理接口

### 2. 获取用户包裹列表
**接口位置**: `src/pages/packages/packages.vue` - `fetchPackages()`
```javascript
// TODO: 替换为实际API调用
GET /api/packages/user/{userId}
```

**请求参数**:
```json
{
  "userId": "string", // 用户ID
  "status": "string", // 可选：pending/warehouse/abnormal/confirm/all
  "page": "number",   // 页码，默认1
  "limit": "number"   // 每页数量，默认20
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "id": "string",
        "title": "string",
        "trackingNumber": "string", 
        "sender": "string",
        "weight": "number",
        "status": "string", // pending/warehouse/abnormal/confirm
        "createTime": "string",
        "description": "string"
      }
    ]
  }
}
```

### 3. 获取包裹详情
**接口位置**: `src/pages/package-detail/package-detail.vue` - `loadPackageDetail()`
```javascript
// TODO: 替换为真实API调用
GET /api/packages/detail/{packageId}
```

**请求参数**:
```json
// URL路径参数
{
  "packageId": "string" // 包裹ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "string",
    "trackingNumber": "string",
    "status": "string", // pending/warehousing/abnormal/confirming/completed
    "reportTime": "string",
    "arrivalTime": "string",
    "weight": "number",
    "productName": "string",
    "value": "number",
    "address": {
      "name": "string",
      "phone": "string",
      "detail": "string"
    },
    "logistics": [
      {
        "status": "string",
        "time": "string",
        "location": "string"
      }
    ]
  }
}
```

### 4. 认领包裹接口
**接口位置**: `src/pages/packages/packages.vue` - `claimPackage()`
```javascript
// TODO: 调用认领API
POST /api/packages/claim
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "认领成功",
  "data": {
    "packageId": "string",
    "newStatus": "warehouse"
  }
}
```

### 5. 确认入仓接口
**接口位置**: `src/pages/packages/packages.vue` - `confirmWarehouse()`
```javascript
// TODO: 确认入仓功能开发中
POST /api/packages/confirm-warehouse
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string",
  "warehouseInfo": {
    "location": "string",
    "operator": "string", 
    "confirmTime": "string"
  }
}
```

### 6. 处理异常包裹接口
**接口位置**: `src/pages/packages/packages.vue` - `handleAbnormal()`
```javascript
// TODO: 处理异常功能开发中
POST /api/packages/handle-abnormal
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string",
  "action": "string", // contact-service/reapply/return
  "remarks": "string"
}
```

### 7. 确认包裹信息接口
**接口位置**: `src/pages/packages/packages.vue` - `confirmPackage()`
```javascript
// TODO: 确认包裹功能开发中
POST /api/packages/confirm
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string",
  "confirmInfo": {
    "weight": "number",
    "description": "string",
    "isCorrect": "boolean"
  }
}
```

### 8. 包裹详情页面操作接口

#### 8.1 认领包裹（详情页）
**接口位置**: `src/pages/package-detail/package-detail.vue` - `claimPackage()`
```javascript
// TODO: 替换为真实API调用
POST /api/packages/claim
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string"
}
```

#### 8.2 确认收货
**接口位置**: `src/pages/package-detail/package-detail.vue` - `confirmPackage()`
```javascript
// TODO: 替换为真实API调用
POST /api/packages/confirm
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string",
  "action": "confirm" // confirm/reject
}
```

#### 8.3 拒绝收货
**接口位置**: `src/pages/package-detail/package-detail.vue` - `rejectPackage()`
```javascript
// TODO: 替换为真实API调用
POST /api/packages/confirm
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string",
  "action": "reject",
  "reason": "string"
}
```

#### 8.4 处理异常（详情页）
**接口位置**: `src/pages/package-detail/package-detail.vue` - `handleAbnormal()`
```javascript
// TODO: 替换为真实API调用
POST /api/packages/handle-abnormal
```

**请求参数**:
```json
{
  "packageId": "string",
  "userId": "string",
  "action": "handle",
  "solution": "string"
}
```

## 📋 订单预报接口

### 9. 提交包裹预报接口
**接口位置**: `src/pages/order/order.vue` - `submitPackage()`
```javascript
// TODO: 替换为实际API调用
POST /api/orders/report
```

**请求参数**:
```json
{
  "userId": "string",
  "trackingNumber": "string",
  "packageCount": "number",
  "remarks": "string",
  "details": [
    {
      "productName": "string",
      "unitPrice": "number",
      "quantity": "number"
    }
  ]
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "预报成功",
  "data": {
    "orderId": "string",
    "status": "pending"
  }
}
```

## 🚚 发货订单接口

### 10. 获取发货订单列表
**接口位置**: `src/pages/shipping-orders/shipping-orders.vue` - `loadOrders()`
```javascript
// TODO: 替换为实际API调用
GET /api/shipping-orders/user/{userId}
```

**请求参数**:
```json
{
  "userId": "string",
  "page": "number",
  "limit": "number"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功", 
  "data": {
    "total": 50,
    "list": [
      {
        "id": "string",
        "orderNumber": "string",
        "packageCount": "number",
        "totalWeight": "number",
        "customsStatus": "string",
        "warehouseStatus": "string",
        "createTime": "string",
        "items": ["string"]
      }
    ]
  }
}
```

### 11. 确认发货接口
**接口位置**: `src/pages/shipping-orders/shipping-orders.vue` - `confirmShipping()`
```javascript
// TODO: 确认发货功能开发中
POST /api/shipping-orders/confirm
```

**请求参数**:
```json
{
  "orderId": "string",
  "userId": "string",
  "shippingInfo": {
    "address": "string",
    "phone": "string",
    "receiverName": "string"
  }
}
```

## 🔧 通用配置接口

### 12. 获取应用配置接口
```javascript
// TODO: 新增配置接口
GET /api/config/app
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "warehouseAddress": "string",
    "servicePhone": "string",
    "workingHours": "string",
    "shippingRates": {
      "air": "number",
      "sea": "number",
      "express": "number"
    }
  }
}
```

## 🔄 错误处理规范

### 统一错误响应格式
```json
{
  "code": 400,
  "message": "错误描述",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 常见错误码
- `200`: 成功
- `400`: 请求参数错误
- `401`: 未授权/登录过期
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器内部错误

## 🔒 请求头配置

### 认证头部
```javascript
headers: {
  'Authorization': 'Bearer ' + uni.getStorageSync('token'),
  'Content-Type': 'application/json'
}
```

## 📱 实现说明

### 1. 替换模拟数据
所有标记了 `TODO` 的地方都需要替换为真实的API调用：

```javascript
// 当前模拟实现
setTimeout(() => {
  const mockData = [...]
  packages.value = mockData
}, 1000)

// 需要替换为
const response = await uni.request({
  url: 'https://your-api-domain.com/api/packages',
  method: 'GET',
  header: {
    'Authorization': 'Bearer ' + uni.getStorageSync('token')
  },
  data: { userId }
})
```

### 2. 错误处理
```javascript
try {
  const response = await uni.request({...})
  if (response.data.code === 200) {
    // 处理成功响应
  } else {
    // 处理业务错误
    uni.showToast({
      title: response.data.message || '操作失败',
      icon: 'none'
    })
  }
} catch (error) {
  // 处理网络错误
  uni.showToast({
    title: '网络请求失败',
    icon: 'none'
  })
}
```

### 3. 加载状态管理
```javascript
loading.value = true
try {
  // API调用
} finally {
  loading.value = false
}
```

## ✅ 开发检查清单

- [ ] 配置API基础URL
- [ ] 实现用户认证接口
- [ ] 实现包裹管理相关接口
- [ ] 实现订单预报接口
- [ ] 实现发货订单接口
- [ ] 配置请求拦截器（添加token等）
- [ ] 配置响应拦截器（统一错误处理）
- [ ] 测试所有接口功能
- [ ] 处理网络异常情况
- [ ] 实现数据缓存策略

## 📞 联系方式
如有接口相关问题，请联系后端开发团队进行对接。
