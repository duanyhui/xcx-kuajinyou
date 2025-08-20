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

## 📋 订单管理接口

### 9. 获取用户订单列表
**接口位置**: `src/pages/orders/orders.vue` - `loadOrders()`
```javascript
// TODO: 替换为真实API调用
GET /api/orders/user/{userId}
```

**请求参数**:
```json
// URL路径参数
{
  "userId": "string" // 用户ID
}

// 查询参数
{
  "status": "string", // 可选：订单状态过滤
  "page": "number",   // 可选：页码
  "pageSize": "number" // 可选：每页数量
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": [
    {
      "id": "string",
      "orderNumber": "string",
      "status": "string", // shipping/packing/payment/delivery
      "packageCount": "number",
      "totalWeight": "number",
      "shippingFee": "number",
      "createTime": "string",
      "items": ["string"],
      "address": {
        "name": "string",
        "phone": "string",
        "detail": "string"
      }
    }
  ]
}
```

### 10. 确认货齐接口
**接口位置**: `src/pages/orders/orders.vue` - `confirmShipping()`
```javascript
// TODO: 替换为真实API调用
POST /api/orders/confirm-shipping
```

**请求参数**:
```json
{
  "orderId": "string",
  "userId": "string",
  "confirmTime": "string"
}
```

### 11. 确认打包接口
**接口位置**: `src/pages/orders/orders.vue` - `confirmPacking()`
```javascript
// TODO: 替换为真实API调用
POST /api/orders/confirm-packing
```

**请求参数**:
```json
{
  "orderId": "string",
  "userId": "string",
  "packingInfo": {
    "weight": "number",
    "dimensions": "string",
    "packingTime": "string"
  }
}
```

### 12. 立即支付接口
**接口位置**: `src/pages/orders/orders.vue` - `makePayment()`
```javascript
// TODO: 替换为真实支付逻辑
POST /api/orders/payment
```

**请求参数**:
```json
{
  "orderId": "string",
  "userId": "string",
  "paymentMethod": "string", // wechat/alipay
  "amount": "number"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "支付成功",
  "data": {
    "orderId": "string",
    "paymentId": "string",
    "newStatus": "delivery"
  }
}
```

### 13. 确认发货接口
**接口位置**: `src/pages/orders/orders.vue` - `confirmDelivery()`
```javascript
// TODO: 替换为真实API调用
POST /api/orders/confirm-delivery
```

**请求参数**:
```json
{
  "orderId": "string",
  "userId": "string",
  "deliveryInfo": {
    "trackingNumber": "string",
    "carrier": "string",
    "deliveryTime": "string"
  }
}
```

### 14. 获取订单详情
**接口位置**: `src/pages/order-detail/order-detail.vue` - `loadOrderDetail()`
```javascript
// TODO: 替换为真实API调用
GET /api/orders/detail/{orderId}
```

**请求参数**:
```json
// URL路径参数
{
  "orderId": "string" // 订单ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "string",
    "orderNumber": "string",
    "status": "string",
    "packageCount": "number",
    "totalWeight": "number",
    "shippingFee": "number",
    "createTime": "string",
    "items": ["string"],
    "address": {
      "name": "string",
      "phone": "string",
      "detail": "string"
    },
    "timeline": [
      {
        "status": "string",
        "time": "string",
        "description": "string"
      }
    ]
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
- [ ] 实现订单管理相关接口
- [ ] 实现推广相关接口
- [ ] 实现订单预报接口
- [ ] 实现发货订单接口
- [ ] 配置请求拦截器（添加token等）
- [ ] 配置响应拦截器（统一错误处理）
- [ ] 测试所有接口功能
- [ ] 处理网络异常情况
- [ ] 实现数据缓存策略

## 📞 联系方式
如有接口相关问题，请联系后端开发团队进行对接。

## 🎯 推广赚钱相关接口

### 17. 获取推广码信息
**接口位置**: `src/pages/promotion-code/promotion-code.vue` - `loadPromotionData()`
```javascript
GET /api/promotion/code
```

**请求参数**:
```json
{
  "userId": "string" // 用户ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "qrCodeUrl": "string", // 二维码图片URL（重要：需要后端生成）
    "code": "string", // 推广码，如：TG100017
    "link": "string" // 推广链接
  }
}
```

### 18. 获取推广统计
**接口位置**: `src/pages/promotion-code/promotion-code.vue` - `loadPromotionData()`
```javascript
GET /api/promotion/stats
```

**请求参数**:
```json
{
  "userId": "string" // 用户ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "totalInvites": "number", // 累计邀请人数
    "activeMembers": "number", // 活跃成员数
    "totalEarnings": "string", // 累计收益，如："1,250.00"
    "monthEarnings": "string" // 本月收益，如："148.85"
  }
}
```

### 19. 获取团成员列表
**接口位置**: `src/pages/team-members/team-members.vue` - `loadTeamMembers()`
```javascript
GET /api/team/members
```

**请求参数**:
```json
{
  "userId": "string", // 用户ID
  "page": "number", // 页码，默认1
  "pageSize": "number", // 每页数量，默认20
  "filter": "string" // 筛选条件："all"/"active"/"inactive"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "stats": {
      "totalMembers": "number", // 团队总成员数
      "activeMembers": "number", // 活跃成员数
      "newMembers": "number" // 本月新增成员数
    },
    "members": [
      {
        "id": "string", // 成员ID
        "nickname": "string", // 昵称
        "avatar": "string", // 头像URL
        "level": "string", // 等级，如："L1"/"L2"/"L3"
        "joinTime": "string", // 加入时间，格式："YYYY-MM-DD"
        "lastActiveTime": "string", // 最后活跃时间
        "totalOrders": "number", // 总订单数
        "totalAmount": "string", // 总金额
        "status": "string" // 状态："active"/"inactive"
      }
    ],
    "pagination": {
      "page": "number",
      "pageSize": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 20. 获取团队订单
**接口位置**: `src/pages/team-orders/team-orders.vue` - `loadTeamOrders()`
```javascript
GET /api/team/orders
```

**请求参数**:
```json
{
  "userId": "string", // 用户ID
  "page": "number", // 页码，默认1
  "pageSize": "number", // 每页数量，默认20
  "status": "string" // 状态筛选："all"/"pending"/"completed"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "stats": {
      "totalOrders": "number", // 总订单数
      "totalAmount": "string", // 总订单金额
      "commission": "string", // 预计佣金
      "all": "number", // 全部订单数
      "pending": "number", // 进行中订单数
      "completed": "number" // 已完成订单数
    },
    "orders": [
      {
        "id": "string", // 订单ID
        "orderNumber": "string", // 订单号
        "createTime": "string", // 创建时间
        "status": "string", // 状态："pending"/"processing"/"shipping"/"completed"/"cancelled"
        "amount": "string", // 订单金额
        "expectedCommission": "string", // 预计佣金
        "itemsDesc": "string", // 商品描述
        "member": {
          "id": "string", // 成员ID
          "nickname": "string", // 成员昵称
          "avatar": "string", // 成员头像
          "level": "string" // 成员等级
        }
      }
    ],
    "pagination": {
      "page": "number",
      "pageSize": "number", 
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 21. 获取佣金记录
**接口位置**: `src/pages/commission/commission.vue` - `loadCommissionData()`
```javascript
GET /api/commission/records
```

**请求参数**:
```json
{
  "userId": "string", // 用户ID
  "page": "number", // 页码，默认1
  "pageSize": "number", // 每页数量，默认20
  "status": "string" // 状态筛选："all"/"pending"/"settled"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "balance": "string", // 当前余额
    "records": [
      {
        "id": "string", // 记录ID
        "title": "string", // 记录标题，如："推广佣金"/"佣金提现"
        "orderNumber": "string", // 关联订单号
        "memberName": "string", // 成员姓名（提现时为空）
        "amount": "string", // 金额
        "type": "string", // 类型："income"/"withdraw"
        "status": "string", // 状态："pending"/"settled"/"failed"
        "createTime": "string", // 创建时间
        "description": "string" // 描述信息
      }
    ],
    "pagination": {
      "page": "number",
      "pageSize": "number",
      "total": "number", 
      "totalPages": "number"
    }
  }
}
```

### 22. 获取佣金统计
**接口位置**: `src/pages/commission/commission.vue` - `loadCommissionData()`
```javascript
GET /api/commission/stats
```

**请求参数**:
```json
{
  "userId": "string" // 用户ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "monthly": {
      "earnings": "string", // 本月收益
      "orders": "number" // 本月订单数
    },
    "yearly": {
      "earnings": "string", // 年度收益
      "orders": "number" // 年度订单数
    }
  }
}
```

### 23. 佣金提现
**接口位置**: `src/pages/commission/commission.vue` - `withdraw()`
```javascript
POST /api/commission/withdraw
```

**请求参数**:
```json
{
  "userId": "string", // 用户ID
  "amount": "string", // 提现金额
  "withdrawType": "string", // 提现方式："wechat"/"alipay"/"bank"
  "account": "object" // 提现账户信息
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "提现申请成功",
  "data": {
    "withdrawId": "string", // 提现记录ID
    "status": "string", // 状态："pending"/"processing"/"success"/"failed"
    "estimatedTime": "string" // 预计到账时间
  }
}
```

## 📮 地址管理接口

### 24. 获取用户地址列表
**接口位置**: `src/pages/my-address/my-address.vue` - `getAddressList()`
```javascript
GET /api/user/address/list
```

**请求参数**:
```json
// 请求头中包含Authorization: Bearer <token>
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": [
    {
      "id": "string", // 地址ID
      "customsCode": "string", // 通关号码
      "recipientName": "string", // 收件人姓名
      "phone": "string", // 联系电话
      "koreanAddress": "string", // 韩国地址
      "koreanPostalCode": "string", // 韩国邮编
      "fullAddress": "string", // 完整地址（显示用）
      "isDefault": "boolean", // 是否默认地址
      "createTime": "string", // 创建时间
      "updateTime": "string" // 更新时间
    }
  ]
}
```

### 25. 获取地址详情
**接口位置**: `src/pages/address-form/address-form.vue` - `getAddressDetail()`
```javascript
GET /api/user/address/{addressId}
```

**请求参数**:
```json
// URL路径参数
{
  "addressId": "string" // 地址ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "string",
    "customsCode": "string",
    "recipientName": "string", 
    "phone": "string",
    "koreanAddress": "string",
    "koreanPostalCode": "string",
    "isDefault": "boolean",
    "createTime": "string",
    "updateTime": "string"
  }
}
```

### 26. 新增收货地址
**接口位置**: `src/pages/address-form/address-form.vue` - `submitForm()`
```javascript
POST /api/user/address
```

**请求参数**:
```json
{
  "customsCode": "string", // 通关号码，必填
  "recipientName": "string", // 收件人姓名，必填
  "phone": "string", // 联系电话，必填，12-13位数字
  "koreanAddress": "string", // 韩国地址，必填
  "koreanPostalCode": "string", // 韩国邮编，必填
  "isDefault": "boolean" // 是否设为默认地址
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "地址添加成功",
  "data": {
    "id": "string", // 新创建的地址ID
    "customsCode": "string",
    "recipientName": "string",
    "phone": "string", 
    "koreanAddress": "string",
    "koreanPostalCode": "string",
    "fullAddress": "string", // 服务端生成的完整地址
    "isDefault": "boolean",
    "createTime": "string",
    "updateTime": "string"
  }
}
```

### 27. 更新收货地址
**接口位置**: `src/pages/address-form/address-form.vue` - `submitForm()`
```javascript
PUT /api/user/address/{addressId}
```

**请求参数**:
```json
// URL路径参数
{
  "addressId": "string" // 地址ID
}

// 请求体
{
  "customsCode": "string",
  "recipientName": "string",
  "phone": "string",
  "koreanAddress": "string", 
  "koreanPostalCode": "string",
  "isDefault": "boolean"
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "地址更新成功",
  "data": {
    "id": "string",
    "customsCode": "string",
    "recipientName": "string",
    "phone": "string",
    "koreanAddress": "string",
    "koreanPostalCode": "string",
    "fullAddress": "string",
    "isDefault": "boolean",
    "createTime": "string",
    "updateTime": "string"
  }
}
```

### 28. 删除收货地址
**接口位置**: `src/pages/my-address/my-address.vue` - `deleteAddress()`
```javascript
DELETE /api/user/address/{addressId}
```

**请求参数**:
```json
// URL路径参数
{
  "addressId": "string" // 地址ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "地址删除成功",
  "data": null
}
```

### 29. 设置默认地址
**接口位置**: `src/utils/api.js` - `setDefaultAddress()`
```javascript
PUT /api/user/address/{addressId}/default
```

**请求参数**:
```json
// URL路径参数
{
  "addressId": "string" // 地址ID
}
```

**响应格式**:
```json
{
  "code": 200,
  "message": "设置默认地址成功",
  "data": null
}
```

## 🎯 重要说明

### 推广功能关键点：
1. **推广码二维码**：需要后端生成包含推广码的二维码图片，返回图片URL
2. **推广链接**：需要包含推广码参数的注册链接
3. **佣金计算**：需要根据订单金额和推广层级计算佣金
4. **数据统计**：需要实时统计推广数据和佣金信息
5. **提现功能**：需要对接微信支付或其他支付平台的提现接口

### 地址管理关键点：
1. **地址验证**：建议对韩国地址格式进行验证
2. **默认地址唯一性**：设置新默认地址时，需要取消其他地址的默认状态
3. **地址完整性**：服务端需要生成用于显示的完整地址字符串
4. **权限控制**：确保用户只能操作自己的地址
5. **数据清理**：删除用户时需要级联删除相关地址数据

### 数据关联：
- 推广关系：用户 → 推广码 → 团成员
- 订单关联：团成员订单 → 推广佣金
- 佣金流水：订单佣金 → 佣金记录 → 提现记录
- 地址关联：用户 → 多个收货地址 → 订单使用地址
