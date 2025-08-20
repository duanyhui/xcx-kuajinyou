<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header-section">
      <view class="header-bg">
        <view class="header-content">
          <view class="header-top">
            <view class="back-btn" @click="goBack">
              <text class="back-icon">←</text>
            </view>
            <text class="page-title">订单发货</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-section">
      <!-- 加载状态 -->
      <view class="loading-container" v-if="isLoading">
        <view class="loading-spinner"></view>
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 空状态 -->
      <view class="empty-container" v-else-if="!isLoading && orders.length === 0">
        <view class="empty-icon">📦</view>
        <text class="empty-title">暂无待发货订单</text>
        <text class="empty-desc">当前没有需要发货的订单</text>
      </view>

      <!-- 订单列表 -->
      <view class="orders-list" v-else>
        <view 
          class="order-card" 
          v-for="order in orders" 
          :key="order.id"
        >
          <!-- 订单头部 -->
          <view class="order-header">
            <view class="order-info">
              <text class="order-number">{{ order.orderNumber }}</text>
              <view class="order-details">
                <text class="detail-item">{{ order.itemName }}</text>
                <text class="detail-price">¥{{ order.price }}</text>
                <text class="detail-quantity">x{{ order.quantity }}</text>
              </view>
            </view>
            <view class="order-count">
              <text class="count-text">{{ order.packageCount }}件</text>
            </view>
          </view>

          <!-- 订单状态 -->
          <view class="order-status">
            <view 
              class="status-btn passed" 
              v-if="order.customsStatus === 'passed'"
              @click="showStatusDetail(order, 'customs')"
            >
              <text class="status-text">核验未通过</text>
            </view>
            <view 
              class="status-btn warehouse" 
              v-if="order.warehouseStatus === 'in'"
              @click="showStatusDetail(order, 'warehouse')"
            >
              <text class="status-text">待入仓</text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="order-actions">
            <view class="action-btn secondary" @click="viewOrderDetail(order)">
              <text class="action-text">查看详情</text>
            </view>
            <view class="action-btn primary" @click="confirmShipping(order)">
              <text class="action-text">确认发货</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="switchTab('home')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">🏠</text>
        </view>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">预报</text>
      </view>
      <view class="nav-item active" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">发货</text>
      </view>
      <view class="nav-item" @click="switchTab('profile')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">👤</text>
        </view>
        <text class="nav-text">我的</text>
      </view>
    </view>

    <!-- 安全距离 -->
    <view class="safe-area"></view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 订单信息接口
interface ShippingOrder {
  id: string
  orderNumber: string
  itemName: string
  price: number
  quantity: number
  packageCount: number
  customsStatus: 'passed' | 'pending' | 'failed'
  warehouseStatus: 'in' | 'out' | 'pending'
  createTime: string
  updateTime: string
}

// API响应接口
interface ApiResponse {
  success: boolean
  data?: ShippingOrder[]
  message?: string
}

const isLoading = ref(true)
const orders = ref<ShippingOrder[]>([])

// 获取待发货订单列表
const fetchShippingOrders = async (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    // 模拟API请求
    setTimeout(() => {
      // TODO: 替换为实际的API调用
      /*
      uni.request({
        url: 'https://your-api-domain.com/api/orders/shipping', // 替换为实际API地址
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          // 如需要认证，添加token
          // 'Authorization': 'Bearer ' + uni.getStorageSync('token')
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data.code === 0) {
            resolve({ 
              success: true, 
              data: res.data.data 
            })
          } else {
            resolve({ 
              success: false, 
              message: res.data.message || '获取订单失败' 
            })
          }
        },
        fail: (error) => {
          resolve({ 
            success: false, 
            message: '网络异常' 
          })
        }
      })
      */
      
      // 模拟数据
      const mockData: ShippingOrder[] = [
        {
          id: '1',
          orderNumber: '666',
          itemName: '程序',
          price: 12,
          quantity: 1,
          packageCount: 1,
          customsStatus: 'passed',
          warehouseStatus: 'in',
          createTime: '2024-01-15 10:30:00',
          updateTime: '2024-01-15 14:20:00'
        }
      ]
      
      resolve({ 
        success: true, 
        data: mockData 
      })
    }, 1500)
  })
}

// 加载订单数据
const loadOrders = async () => {
  try {
    isLoading.value = true
    
    const result = await fetchShippingOrders()
    
    if (result.success && result.data) {
      orders.value = result.data
    } else {
      uni.showToast({
        title: result.message || '获取订单失败',
        icon: 'none'
      })
      orders.value = []
    }
  } catch (error) {
    console.error('加载订单失败:', error)
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none'
    })
    orders.value = []
  } finally {
    isLoading.value = false
  }
}

// 查看订单详情
const viewOrderDetail = (order: ShippingOrder) => {
  console.log('查看订单详情:', order)
  uni.showToast({
    title: '查看订单详情',
    icon: 'none'
  })
  // TODO: 跳转到订单详情页面
  // uni.navigateTo({
  //   url: `/pages/order-detail/order-detail?id=${order.id}`
  // })
}

// 确认发货
const confirmShipping = async (order: ShippingOrder) => {
  try {
    const result = await uni.showModal({
      title: '确认发货',
      content: `确定要发货订单 ${order.orderNumber} 吗？`,
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认'
    })

    if (!result.confirm) {
      return
    }

    uni.showLoading({
      title: '发货中...'
    })

    // TODO: 替换为实际的发货API调用
    const shipResult = await confirmOrderShipping(order.id)
    
    uni.hideLoading()

    if (shipResult.success) {
      uni.showToast({
        title: '发货成功',
        icon: 'success'
      })
      
      // 重新加载订单列表
      await loadOrders()
    } else {
      uni.showToast({
        title: shipResult.message || '发货失败',
        icon: 'none'
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('发货失败:', error)
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none'
    })
  }
}

// 确认发货API
const confirmOrderShipping = async (orderId: string): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve) => {
    // 模拟API请求
    setTimeout(() => {
      // TODO: 替换为实际的API调用
      /*
      uni.request({
        url: 'https://your-api-domain.com/api/orders/ship', // 替换为实际API地址
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + uni.getStorageSync('token')
        },
        data: { orderId },
        success: (res) => {
          if (res.statusCode === 200 && res.data.code === 0) {
            resolve({ success: true })
          } else {
            resolve({ 
              success: false, 
              message: res.data.message || '发货失败' 
            })
          }
        },
        fail: () => {
          resolve({ 
            success: false, 
            message: '网络异常' 
          })
        }
      })
      */
      
      // 模拟成功响应
      resolve({ success: true })
    }, 1000)
  })
}

// 显示状态详情
const showStatusDetail = (order: ShippingOrder, type: 'customs' | 'warehouse') => {
  const title = type === 'customs' ? '核验状态' : '入仓状态'
  const content = type === 'customs' ? 
    '订单正在进行海关核验，请耐心等待' : 
    '包裹正在等待入仓，请确认发货信息'
  
  uni.showModal({
    title,
    content,
    showCancel: false,
    confirmText: '知道了'
  })
}

// 下拉刷新
const onPullDownRefresh = async () => {
  await loadOrders()
  uni.stopPullDownRefresh()
}

// 底部导航切换
const switchTab = (tab: string) => {
  console.log('切换标签:', tab)
  
  if (tab === 'home') {
    uni.redirectTo({
      url: '/pages/index/index'
    })
  } else if (tab === 'order') {
    uni.navigateTo({
      url: '/pages/order/order'
    })
  } else if (tab === 'shipping') {
    // 当前页面，无需跳转
    return
  } else if (tab === 'profile') {
    uni.navigateTo({
      url: '/pages/profile/profile'
    })
  } else {
    uni.showToast({
      title: `${tab}功能开发中`,
      icon: 'none',
      duration: 1000
    })
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 页面加载时获取数据
onMounted(() => {
  loadOrders()
})

// 导出函数供外部调用
defineExpose({
  loadOrders,
  onPullDownRefresh
})
</script>

<style scoped>
/* 页面样式 */
.page {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: calc(180rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 头部区域 */
.header-section {
  position: relative;
  padding: 80rpx 0 40rpx;
  overflow: hidden;
  width: 100%;
}

.header-bg {
  position: relative;
  padding: 0 30rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.back-btn:active {
  transform: scale(0.9);
}

.back-icon {
  font-size: 32rpx;
  color: white;
  font-weight: bold;
}

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
  text-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.3);
}

.header-placeholder {
  width: 60rpx;
  height: 60rpx;
}

/* 内容区域 */
.content-section {
  padding: 0 30rpx;
  margin-top: -20rpx;
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  background: white;
  border-radius: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid #e9ecef;
  border-top: 4rpx solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24rpx;
}

.loading-text {
  font-size: 28rpx;
  color: #95a5a6;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 空状态 */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  background: white;
  border-radius: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.5;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 24rpx;
  color: #95a5a6;
}

/* 订单列表 */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.order-card {
  background: white;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.order-card:active {
  transform: scale(0.98);
}

/* 订单头部 */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.order-info {
  flex: 1;
}

.order-number {
  font-size: 36rpx;
  font-weight: 700;
  color: #2c3e50;
  display: block;
  margin-bottom: 16rpx;
}

.order-details {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex-wrap: wrap;
}

.detail-item {
  font-size: 28rpx;
  color: #2c3e50;
  font-weight: 500;
}

.detail-price {
  font-size: 28rpx;
  color: #667eea;
  font-weight: 600;
}

.detail-quantity {
  font-size: 24rpx;
  color: #95a5a6;
}

.order-count {
  text-align: right;
}

.count-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #667eea;
}

/* 订单状态 */
.order-status {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
  flex-wrap: wrap;
}

.status-btn {
  padding: 12rpx 24rpx;
  border-radius: 50rpx;
  transition: all 0.3s ease;
}

.status-btn:active {
  transform: scale(0.95);
}

.status-btn.passed {
  background: rgba(255, 71, 87, 0.1);
  border: 1rpx solid rgba(255, 71, 87, 0.3);
}

.status-btn.warehouse {
  background: rgba(255, 165, 0, 0.1);
  border: 1rpx solid rgba(255, 165, 0, 0.3);
}

.status-text {
  font-size: 22rpx;
  font-weight: 500;
}

.status-btn.passed .status-text {
  color: #ff4757;
}

.status-btn.warehouse .status-text {
  color: #ffa500;
}

/* 操作按钮 */
.order-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  flex: 1;
  height: 72rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.96);
}

.action-btn.secondary {
  background: rgba(102, 126, 234, 0.1);
  border: 1rpx solid rgba(102, 126, 234, 0.3);
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.3);
}

.action-text {
  font-size: 28rpx;
  font-weight: 500;
}

.action-btn.secondary .action-text {
  color: #667eea;
}

.action-btn.primary .action-text {
  color: white;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: 100vw;
  height: 140rpx;
  background: white;
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
  box-sizing: border-box;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  transition: all 0.3s ease;
}

.nav-item:active {
  transform: scale(0.9);
}

.nav-icon-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
  transition: all 0.3s ease;
}

.nav-item.active .nav-icon-wrapper {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.3);
}

.nav-item .nav-icon-wrapper {
  background: transparent;
}

.nav-icon {
  font-size: 32rpx;
  transition: all 0.3s ease;
}

.nav-item.active .nav-icon {
  filter: grayscale(100%) brightness(0) invert(1);
  transform: scale(1.1);
}

.nav-item .nav-icon {
  color: #95a5a6;
}

.nav-text {
  font-size: 20rpx;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item.active .nav-text {
  color: #667eea;
  font-weight: 600;
}

.nav-item .nav-text {
  color: #95a5a6;
}

/* 安全距离 */
.safe-area {
  height: 0;
}

/* 响应式优化 */
@media (max-width: 400px) {
  .header-bg,
  .content-section {
    padding-left: 20rpx;
    padding-right: 20rpx;
  }
  
  .order-card {
    padding: 24rpx;
  }
  
  .page-title {
    font-size: 32rpx;
  }
  
  .order-actions {
    flex-direction: column;
  }
  
  .action-btn {
    height: 64rpx;
  }
}

/* 下拉刷新优化 */
.content-section {
  min-height: 600rpx;
}

/* 状态优化 */
.status-btn {
  cursor: pointer;
}

.action-btn {
  cursor: pointer;
}
</style>
