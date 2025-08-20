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

// ================================
// 推广相关接口
// ================================

// 获取推广码信息
export const getPromotionCode = async (userId) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/promotion/code',
    //   method: 'GET',
    //   data: { userId }
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        qrCodeUrl: 'https://via.placeholder.com/400x400/87ceeb/ffffff?text=QR+Code',
        code: 'TG100017',
        link: 'https://app.kuajinyou.com/register?code=TG100017'
      }
    }
  } catch (error) {
    console.error('获取推广码失败:', error)
    return {
      success: false,
      message: error.message || '获取推广码失败'
    }
  }
}

// 获取推广统计
export const getPromotionStats = async (userId) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/promotion/stats',
    //   method: 'GET',
    //   data: { userId }
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        totalInvites: 15,
        activeMembers: 12,
        totalEarnings: '1,250.00',
        monthEarnings: '148.85'
      }
    }
  } catch (error) {
    console.error('获取推广统计失败:', error)
    return {
      success: false,
      message: error.message || '获取推广统计失败'
    }
  }
}

// 获取团成员列表
export const getTeamMembers = async (userId, params = {}) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/team/members',
    //   method: 'GET',
    //   data: { userId, ...params }
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        stats: {
          totalMembers: 15,
          activeMembers: 12,
          newMembers: 3
        },
        members: [
          {
            id: 'M001',
            nickname: '小王',
            avatar: '',
            level: 'L2',
            joinTime: '2024-11-15',
            lastActiveTime: '2024-12-01',
            totalOrders: 8,
            totalAmount: '1,580.00',
            status: 'active'
          },
          {
            id: 'M002',
            nickname: '李小姐',
            avatar: '',
            level: 'L1',
            joinTime: '2024-11-20',
            lastActiveTime: '2024-12-01',
            totalOrders: 3,
            totalAmount: '450.00',
            status: 'active'
          },
          {
            id: 'M003',
            nickname: '张先生',
            avatar: '',
            level: 'L1',
            joinTime: '2024-11-10',
            lastActiveTime: '2024-11-25',
            totalOrders: 12,
            totalAmount: '2,100.00',
            status: 'inactive'
          }
        ]
      }
    }
  } catch (error) {
    console.error('获取团成员失败:', error)
    return {
      success: false,
      message: error.message || '获取团成员失败'
    }
  }
}

// 获取团队订单
export const getTeamOrders = async (userId, params = {}) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/team/orders',
    //   method: 'GET',
    //   data: { userId, ...params }
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        stats: {
          totalOrders: 12,
          totalAmount: '2,580.00',
          commission: '258.00',
          all: 12,
          pending: 3,
          completed: 9
        },
        orders: [
          {
            id: '1',
            orderNumber: 'TK202412010001',
            createTime: '2024-12-01 10:30:00',
            status: 'completed',
            amount: '299.00',
            expectedCommission: '29.90',
            itemsDesc: '化妆品 × 2，保健品 × 1',
            member: {
              id: 'M001',
              nickname: '小王',
              avatar: '',
              level: 'L2'
            }
          },
          {
            id: '2',
            orderNumber: 'TK202412010002',
            createTime: '2024-12-01 14:20:00',
            status: 'processing',
            amount: '189.50',
            expectedCommission: '18.95',
            itemsDesc: '零食 × 3',
            member: {
              id: 'M002',
              nickname: '李小姐',
              avatar: '',
              level: 'L1'
            }
          }
        ]
      }
    }
  } catch (error) {
    console.error('获取团队订单失败:', error)
    return {
      success: false,
      message: error.message || '获取团队订单失败'
    }
  }
}

// 获取佣金记录
export const getCommissionRecords = async (userId, params = {}) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/commission/records',
    //   method: 'GET',
    //   data: { userId, ...params }
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        balance: '258.85',
        records: [
          {
            id: '1',
            title: '推广佣金',
            orderNumber: 'TK202412010001',
            memberName: '小王',
            amount: '29.90',
            type: 'income',
            status: 'settled',
            createTime: '2024-12-01 15:30:00',
            description: '成员小王订单完成，获得佣金'
          },
          {
            id: '2',
            title: '推广佣金',
            orderNumber: 'TK202412010002',
            memberName: '李小姐',
            amount: '18.95',
            type: 'income',
            status: 'pending',
            createTime: '2024-12-01 18:20:00',
            description: '成员李小姐订单已完成，佣金结算中'
          },
          {
            id: '3',
            title: '佣金提现',
            orderNumber: 'WD202411301001',
            memberName: '',
            amount: '200.00',
            type: 'withdraw',
            status: 'settled',
            createTime: '2024-11-30 10:15:00',
            description: '提现到微信钱包'
          }
        ]
      }
    }
  } catch (error) {
    console.error('获取佣金记录失败:', error)
    return {
      success: false,
      message: error.message || '获取佣金记录失败'
    }
  }
}

// 获取佣金统计
export const getCommissionStats = async (userId) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/commission/stats',
    //   method: 'GET',
    //   data: { userId }
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        monthly: {
          earnings: '148.85',
          orders: 5
        },
        yearly: {
          earnings: '1,250.00',
          orders: 42
        }
      }
    }
  } catch (error) {
    console.error('获取佣金统计失败:', error)
    return {
      success: false,
      message: error.message || '获取佣金统计失败'
    }
  }
}

// ============= 地址管理相关接口 =============

// 获取用户地址列表
export const getUserAddressList = async () => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/user/address/list',
    //   method: 'GET'
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: [
        {
          id: '1',
          customsCode: 'P12345678',
          recipientName: '颜',
          phone: '18679982792',
          koreanAddress: '서울특별시 강남구 테헤란로 123',
          koreanPostalCode: '06142',
          fullAddress: '서울특별시 강남구 테헤란로 123',
          isDefault: false,
          createTime: '2023-12-01 10:00:00',
          updateTime: '2023-12-01 10:00:00'
        }
      ]
    }
  } catch (error) {
    console.error('获取地址列表失败:', error)
    return {
      success: false,
      message: error.message || '获取地址列表失败'
    }
  }
}

// 获取地址详情
export const getAddressDetail = async (addressId) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: `/user/address/${addressId}`,
    //   method: 'GET'
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        id: addressId,
        customsCode: 'P12345678',
        recipientName: '颜',
        phone: '18679982792',
        koreanAddress: '서울특별시 강남구 테헤란로 123',
        koreanPostalCode: '06142',
        isDefault: false,
        createTime: '2023-12-01 10:00:00',
        updateTime: '2023-12-01 10:00:00'
      }
    }
  } catch (error) {
    console.error('获取地址详情失败:', error)
    return {
      success: false,
      message: error.message || '获取地址详情失败'
    }
  }
}

// 新增收货地址
export const addUserAddress = async (addressData) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: '/user/address',
    //   method: 'POST',
    //   data: addressData
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        ...addressData,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      },
      message: '地址添加成功'
    }
  } catch (error) {
    console.error('新增地址失败:', error)
    return {
      success: false,
      message: error.message || '新增地址失败'
    }
  }
}

// 更新收货地址
export const updateUserAddress = async (addressId, addressData) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: `/user/address/${addressId}`,
    //   method: 'PUT',
    //   data: addressData
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      data: {
        id: addressId,
        ...addressData,
        updateTime: new Date().toISOString()
      },
      message: '地址更新成功'
    }
  } catch (error) {
    console.error('更新地址失败:', error)
    return {
      success: false,
      message: error.message || '更新地址失败'
    }
  }
}

// 删除收货地址
export const deleteUserAddress = async (addressId) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: `/user/address/${addressId}`,
    //   method: 'DELETE'
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      message: '地址删除成功'
    }
  } catch (error) {
    console.error('删除地址失败:', error)
    return {
      success: false,
      message: error.message || '删除地址失败'
    }
  }
}

// 设置默认地址
export const setDefaultAddress = async (addressId) => {
  try {
    // TODO: 替换为实际API调用
    // const result = await request({
    //   url: `/user/address/${addressId}/default`,
    //   method: 'PUT'
    // })
    // return result

    // 模拟数据
    return {
      success: true,
      message: '设置默认地址成功'
    }
  } catch (error) {
    console.error('设置默认地址失败:', error)
    return {
      success: false,
      message: error.message || '设置默认地址失败'
    }
  }
}
