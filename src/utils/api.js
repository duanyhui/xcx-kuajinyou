// API配置文件
// 用于统一管理所有后端接口

// 基础配置
const config = {
  // TODO: 替换为实际的API域名
  baseURL: 'https://your-api-domain.com/api',
  timeout: 10000, // 请求超时时间
  
  // 请求头配置
  headers: {
    'Content-Type': 'application/json'
  }
}

// 获取token
const getToken = () => {
  return uni.getStorageSync('token') || ''
}

// 统一请求方法
const request = async (options) => {
  const { url, method = 'GET', data = {}, header = {} } = options
  
  try {
    const response = await uni.request({
      url: config.baseURL + url,
      method,
      data,
      timeout: config.timeout,
      header: {
        ...config.headers,
        'Authorization': getToken() ? `Bearer ${getToken()}` : '',
        ...header
      }
    })
    
    // 统一响应处理
    if (response.statusCode === 200) {
      if (response.data.code === 200) {
        return response.data
      } else {
        // 业务错误
        uni.showToast({
          title: response.data.message || '操作失败',
          icon: 'none'
        })
        throw new Error(response.data.message)
      }
    } else {
      // HTTP错误
      uni.showToast({
        title: '网络请求失败',
        icon: 'none'
      })
      throw new Error(`HTTP ${response.statusCode}`)
    }
    
  } catch (error) {
    console.error('API请求失败:', error)
    
    // 处理token过期
    if (error.statusCode === 401) {
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
      uni.navigateTo({
        url: '/pages/profile/profile'
      })
    }
    
    throw error
  }
}

// API接口定义
export const API = {
  // 认证相关
  auth: {
    // 微信登录
    wechatLogin: (data) => request({
      url: '/auth/wechat-login',
      method: 'POST',
      data
    }),
    
    // 刷新token
    refreshToken: () => request({
      url: '/auth/refresh',
      method: 'POST'
    })
  },
  
  // 包裹管理
  packages: {
    // 获取用户包裹列表
    getUserPackages: (userId, params = {}) => request({
      url: `/packages/user/${userId}`,
      method: 'GET',
      data: params
    }),
    
    // 认领包裹
    claimPackage: (data) => request({
      url: '/packages/claim',
      method: 'POST',
      data
    }),
    
    // 确认入仓
    confirmWarehouse: (data) => request({
      url: '/packages/confirm-warehouse', 
      method: 'POST',
      data
    }),
    
    // 处理异常
    handleAbnormal: (data) => request({
      url: '/packages/handle-abnormal',
      method: 'POST', 
      data
    }),
    
    // 确认包裹
    confirmPackage: (data) => request({
      url: '/packages/confirm',
      method: 'POST',
      data
    }),
    
    // 获取包裹详情
    getPackageDetail: (packageId) => request({
      url: `/packages/detail/${packageId}`,
      method: 'GET'
    })
  },
  
  // 订单管理
  orders: {
    // 提交包裹预报
    reportPackage: (data) => request({
      url: '/orders/report',
      method: 'POST',
      data
    }),
    
    // 获取用户订单列表
    getUserOrders: (userId, params = {}) => request({
      url: `/orders/user/${userId}`,
      method: 'GET',
      data: params
    }),
    
    // 确认货齐
    confirmShipping: (data) => request({
      url: '/orders/confirm-shipping',
      method: 'POST',
      data
    }),
    
    // 确认打包
    confirmPacking: (data) => request({
      url: '/orders/confirm-packing',
      method: 'POST',
      data
    }),
    
    // 立即支付
    makePayment: (data) => request({
      url: '/orders/payment',
      method: 'POST',
      data
    }),
    
    // 确认发货
    confirmDelivery: (data) => request({
      url: '/orders/confirm-delivery',
      method: 'POST',
      data
    }),
    
    // 获取订单详情
    getOrderDetail: (orderId) => request({
      url: `/orders/detail/${orderId}`,
      method: 'GET'
    })
  },
  
  // 发货订单
  shippingOrders: {
    // 获取发货订单列表
    getUserShippingOrders: (userId, params = {}) => request({
      url: `/shipping-orders/user/${userId}`,
      method: 'GET',
      data: params
    }),
    
    // 确认发货
    confirmShipping: (data) => request({
      url: '/shipping-orders/confirm',
      method: 'POST',
      data
    }),
    
    // 获取订单详情
    getOrderDetail: (orderId) => request({
      url: `/shipping-orders/detail/${orderId}`,
      method: 'GET'
    })
  },
  
  // 系统配置
  config: {
    // 获取应用配置
    getAppConfig: () => request({
      url: '/config/app',
      method: 'GET'
    })
  }
}

// 模拟数据（开发阶段使用）
export const MOCK_DATA = {
  // 包裹模拟数据
  packages: [
    {
      id: '1',
      title: '韩国商品包裹',
      trackingNumber: 'KR2024010101',
      sender: '金先生',
      weight: 2.5,
      status: 'pending',
      createTime: '2024-01-15 10:30:00',
      description: '护肤品、零食等'
    },
    {
      id: '2',
      title: '首尔直邮包裹',
      trackingNumber: 'KR2024010102',
      sender: '李女士',
      weight: 1.8,
      status: 'warehouse',
      createTime: '2024-01-14 15:45:00',
      description: '化妆品、衣物'
    },
    {
      id: '3',
      title: '釜山发货包裹',
      trackingNumber: 'KR2024010103',
      sender: '朴先生',
      weight: 3.2,
      status: 'confirm',
      createTime: '2024-01-13 09:20:00',
      description: '电子产品配件'
    },
    {
      id: '4',
      title: '济州岛特产',
      trackingNumber: 'KR2024010104',
      sender: '崔女士',
      weight: 4.1,
      status: 'abnormal',
      createTime: '2024-01-12 16:10:00',
      description: '地方特产、食品'
    }
  ],
  
  // 发货订单模拟数据
  shippingOrders: [
    {
      id: '1',
      orderNumber: 'SO20240115001',
      packageCount: 3,
      totalWeight: 5.2,
      customsStatus: 'passed',
      warehouseStatus: 'in',
      createTime: '2024-01-15 14:30:00',
      items: ['护肤品', '零食', '衣物']
    },
    {
      id: '2', 
      orderNumber: 'SO20240114001',
      packageCount: 2,
      totalWeight: 3.8,
      customsStatus: 'pending',
      warehouseStatus: 'pending',
      createTime: '2024-01-14 09:15:00',
      items: ['电子产品', '书籍']
    }
  ]
}

export default API
