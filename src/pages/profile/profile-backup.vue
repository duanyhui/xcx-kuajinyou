<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header-section">
      <view class="header-bg">
        <view class="header-content">
          <view class="header-top">
            <view class="back-btn" @click="goBack" v-if="!isFromNavigation">
              <text class="back-icon">←</text>
            </view>
            <text class="page-title">{{ isLoggedIn ? '会员中心' : '登录' }}</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 登录页面 -->
    <view class="login-section" v-if="!isLoggedIn">
      <view class="login-container">
        <!-- Logo区域 -->
        <view class="logo-section">
          <view class="logo-container">
            <view class="logo-shape logo-shape-1"></view>
            <view class="logo-shape logo-shape-2"></view>
            <view class="logo-shape logo-shape-3"></view>
            <view class="logo-shape logo-shape-4"></view>
          </view>
          <view class="company-info">
            <text class="company-name">中海川公共海外仓</text>
            <text class="company-subtitle">LOGISTICS INFORMATION SYSTEM</text>
          </view>
        </view>

        <!-- 登录按钮 -->
        <view class="login-btn-container">
          <view class="wechat-login-btn" @click="handleWechatLogin">
            <text class="wechat-icon">💬</text>
            <text class="login-btn-text">微信一键登录</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 会员中心页面 -->
    <view class="profile-section" v-else>
      <view class="profile-container">
        <!-- 用户信息卡片 -->
        <view class="user-info-card">
          <view class="user-avatar">
            <text class="avatar-icon">👤</text>
          </view>
          <view class="user-details">
            <text class="user-name">{{ userInfo.nickname || '微信用户' }}</text>
            <text class="user-id">序号:{{ userInfo.userId || '100017' }}</text>
          </view>
        </view>

        <!-- 推广赚钱区域 -->
        <view class="promotion-section">
          <view class="section-header">
            <text class="section-title">推广赚钱</text>
          </view>
          <view class="promotion-grid">
            <view class="promotion-item" @click="navigateToPromotion('qrcode')">
              <view class="promotion-icon">
                <text class="icon">📱</text>
              </view>
              <text class="promotion-text">推广码</text>
            </view>
            <view class="promotion-item" @click="navigateToPromotion('team')">
              <view class="promotion-icon">
                <text class="icon">👥</text>
              </view>
              <text class="promotion-text">团成员</text>
            </view>
            <view class="promotion-item" @click="navigateToPromotion('orders')">
              <view class="promotion-icon">
                <text class="icon">📋</text>
              </view>
              <text class="promotion-text">团订单</text>
            </view>
            <view class="promotion-item" @click="navigateToPromotion('wallet')">
              <view class="promotion-icon">
                <text class="icon">💰</text>
              </view>
              <text class="promotion-text">佣金</text>
            </view>
          </view>
        </view>

        <!-- 包裹区域 -->
        <view class="package-section">
          <view class="section-header">
            <text class="section-title">包裹</text>
            <text class="section-action" @click="viewAllPackages">全部</text>
          </view>
          <view class="package-grid">
            <view class="package-item" @click="navigateToPackage('pending')">
              <view class="package-icon">
                <text class="icon">👁</text>
              </view>
              <text class="package-text">认领</text>
            </view>
            <view class="package-item" @click="navigateToPackage('warehouse')" :class="{ 'has-badge': warehouseBadge }">
              <view class="package-icon">
                <text class="icon">⏰</text>
                <view class="notification-badge" v-if="warehouseBadge"></view>
              </view>
              <text class="package-text">待入仓</text>
            </view>
            <view class="package-item" @click="navigateToPackage('abnormal')">
              <view class="package-icon">
                <text class="icon">⚠️</text>
              </view>
              <text class="package-text">异常</text>
            </view>
            <view class="package-item" @click="navigateToPackage('confirm')">
              <view class="package-icon">
                <text class="icon">❓</text>
              </view>
              <text class="package-text">待确认</text>
            </view>
          </view>
        </view>

        <!-- 订单区域 -->
        <view class="order-section">
          <view class="section-header">
            <text class="section-title">订单</text>
            <text class="section-action" @click="viewAllOrders">全部</text>
          </view>
          <view class="order-grid">
            <view class="order-item" @click="navigateToOrder('shipping')">
              <view class="order-icon">
                <text class="icon">🚚</text>
              </view>
              <text class="order-text">待货齐</text>
            </view>
            <view class="order-item" @click="navigateToOrder('packing')">
              <view class="order-icon">
                <text class="icon">📦</text>
              </view>
              <text class="order-text">待打包</text>
            </view>
            <view class="order-item" @click="navigateToOrder('payment')">
              <view class="order-icon">
                <text class="icon">💎</text>
              </view>
              <text class="order-text">待支付</text>
            </view>
            <view class="order-item" @click="navigateToOrder('delivery')">
              <view class="order-icon">
                <text class="icon">🔔</text>
              </view>
              <text class="order-text">待发货</text>
            </view>
          </view>
        </view>

        <!-- 功能菜单 -->
        <view class="menu-section">
          <view class="menu-item" @click="navigateToWarehouse">
            <view class="menu-content">
              <text class="menu-title">仓库地址</text>
            </view>
            <text class="menu-arrow">></text>
          </view>
          <view class="menu-item" @click="navigateToMyAddress">
            <view class="menu-content">
              <text class="menu-title">我的地址</text>
            </view>
            <text class="menu-arrow">></text>
          </view>
          <view class="menu-item" @click="handleLogout">
            <view class="menu-content">
              <text class="menu-title">退出登录</text>
            </view>
            <text class="menu-arrow">></text>
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
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">发货</text>
      </view>
      <view class="nav-item active" @click="switchTab('profile')">
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

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    // 用户信息接口
    const isLoggedIn = ref(false)
    const isFromNavigation = ref(true) // 标识是否从导航栏进入
    const warehouseBadge = ref(true) // 待入仓红点提示
    const userInfo = ref({
      userId: '',
      nickname: '',
      avatar: ''
    })

// 微信登录
const handleWechatLogin = async () => {
  try {
    uni.showLoading({
      title: '登录中...'
    })

    // 获取微信登录凭证
    const loginResult = await uni.login({
      provider: 'weixin'
    })

    if (loginResult.errMsg === 'login:ok') {
      // TODO: 发送code到后端换取token
      const apiResult = await loginWithWechat(loginResult.code)
      
      uni.hideLoading()

      if (apiResult.success && apiResult.data) {
        // 保存登录信息
        uni.setStorageSync('token', apiResult.data.token)
        uni.setStorageSync('userInfo', apiResult.data.userInfo)
        
        // 更新状态
        isLoggedIn.value = true
        userInfo.value = apiResult.data.userInfo

        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
      } else {
        uni.showToast({
          title: apiResult.message || '登录失败',
          icon: 'none'
        })
      }
    } else {
      uni.hideLoading()
      uni.showToast({
        title: '微信登录失败',
        icon: 'none'
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('登录失败:', error)
    uni.showToast({
      title: '登录异常，请重试',
      icon: 'none'
    })
  }
}

// 微信登录API
const loginWithWechat = async (code: string): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    // 模拟API请求
    setTimeout(() => {
      // TODO: 替换为实际的API调用
      /*
      uni.request({
        url: 'https://your-api-domain.com/api/auth/wechat-login',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: { code },
        success: (res) => {
          if (res.statusCode === 200 && res.data.code === 0) {
            resolve({ 
              success: true, 
              data: {
                token: res.data.data.token,
                userInfo: res.data.data.userInfo
              }
            })
          } else {
            resolve({ 
              success: false, 
              message: res.data.message || '登录失败' 
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
      
      // 模拟成功登录
      resolve({
        success: true,
        data: {
          token: 'mock_token_' + Date.now(),
          userInfo: {
            userId: '100017',
            nickname: '微信用户',
            avatar: ''
          }
        }
      })
    }, 1500)
  })
}

// 推广功能导航
const navigateToPromotion = (type: string) => {
  console.log('推广功能:', type)
  uni.showToast({
    title: `${type}功能开发中`,
    icon: 'none'
  })
}

// 包裹功能导航
const navigateToPackage = (type: string) => {
  console.log('包裹功能:', type)
  uni.showToast({
    title: `${type}功能开发中`,
    icon: 'none'
  })
}

// 订单功能导航
const navigateToOrder = (type: string) => {
  console.log('订单功能:', type)
  uni.showToast({
    title: `${type}功能开发中`,
    icon: 'none'
  })
}

// 查看全部包裹
const viewAllPackages = () => {
  uni.showToast({
    title: '查看全部包裹',
    icon: 'none'
  })
}

// 查看全部订单
const viewAllOrders = () => {
  uni.showToast({
    title: '查看全部订单',
    icon: 'none'
  })
}

// 仓库地址
const navigateToWarehouse = () => {
  uni.showToast({
    title: '仓库地址功能开发中',
    icon: 'none'
  })
}

// 我的地址
const navigateToMyAddress = () => {
  uni.showToast({
    title: '我的地址功能开发中',
    icon: 'none'
  })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录信息
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        
        // 重置状态
        isLoggedIn.value = false
        userInfo.value = {
          userId: '',
          nickname: '',
          avatar: ''
        }

        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
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
    uni.navigateTo({
      url: '/pages/shipping-orders/shipping-orders'
    })
  } else if (tab === 'profile') {
    // 当前页面，无需跳转
    return
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 检查登录状态
const checkLoginStatus = () => {
  const token = uni.getStorageSync('token')
  const savedUserInfo = uni.getStorageSync('userInfo')
  
  if (token && savedUserInfo) {
    isLoggedIn.value = true
    userInfo.value = savedUserInfo
  }
}

// 页面加载时检查登录状态
onMounted(() => {
  checkLoginStatus()
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

/* 登录页面 */
.login-section {
  padding: 0 30rpx;
  margin-top: -20rpx;
  position: relative;
  z-index: 3;
}

.login-container {
  background: white;
  border-radius: 32rpx;
  padding: 80rpx 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Logo区域 */
.logo-section {
  margin-bottom: 120rpx;
}

.logo-container {
  position: relative;
  width: 240rpx;
  height: 240rpx;
  margin: 0 auto 40rpx;
}

.logo-shape {
  position: absolute;
  border-radius: 16rpx;
}

.logo-shape-1 {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #dc3545, #c82333);
  top: 0;
  left: 0;
  border-radius: 16rpx 16rpx 16rpx 50rpx;
}

.logo-shape-2 {
  width: 80rpx;
  height: 120rpx;
  background: linear-gradient(135deg, #e85a5a, #ff7b7b);
  top: 0;
  right: 0;
}

.logo-shape-3 {
  width: 120rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #ff9999, #ffb3b3);
  bottom: 40rpx;
  right: 0;
}

.logo-shape-4 {
  width: 160rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #dc3545, #e85a5a);
  bottom: 0;
  left: 0;
  border-radius: 16rpx 16rpx 50rpx 16rpx;
}

.company-info {
  text-align: center;
}

.company-name {
  font-size: 36rpx;
  font-weight: 700;
  color: #dc3545;
  display: block;
  margin-bottom: 12rpx;
  letter-spacing: 2rpx;
}

.company-subtitle {
  font-size: 22rpx;
  color: #999;
  font-weight: 400;
  letter-spacing: 1rpx;
  display: block;
}

/* 登录按钮 */
.login-btn-container {
  width: 100%;
}

.wechat-login-btn {
  width: 100%;
  height: 96rpx;
  background: #07c160;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(7, 193, 96, 0.3);
}

.wechat-login-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.4);
}

.wechat-icon {
  font-size: 36rpx;
}

.login-btn-text {
  font-size: 32rpx;
  font-weight: 600;
  color: white;
}

/* 会员中心页面 */
.profile-section {
  padding: 0 30rpx;
  margin-top: -20rpx;
  position: relative;
  z-index: 3;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

/* 用户信息卡片 */
.user-info-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 60rpx;
  color: white;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #2c3e50;
  display: block;
  margin-bottom: 12rpx;
}

.user-id {
  font-size: 24rpx;
  color: #95a5a6;
  display: block;
}

/* 通用区域样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
}

.section-action {
  font-size: 24rpx;
  color: #667eea;
  font-weight: 500;
}

/* 推广赚钱区域 */
.promotion-section {
  background: white;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.promotion-grid {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
}

.promotion-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 16rpx;
  border-radius: 20rpx;
  transition: all 0.3s ease;
}

.promotion-item:active {
  transform: scale(0.95);
  background: rgba(102, 126, 234, 0.05);
}

.promotion-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(102, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.promotion-icon .icon {
  font-size: 32rpx;
}

.promotion-text {
  font-size: 24rpx;
  color: #2c3e50;
  font-weight: 500;
}

/* 包裹区域 */
.package-section {
  background: white;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.package-grid {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
}

.package-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 16rpx;
  border-radius: 20rpx;
  transition: all 0.3s ease;
  position: relative;
}

.package-item:active {
  transform: scale(0.95);
  background: rgba(102, 126, 234, 0.05);
}

.package-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(102, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  position: relative;
}

.package-icon .icon {
  font-size: 32rpx;
}

.notification-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 16rpx;
  height: 16rpx;
  background: #ff4757;
  border-radius: 50%;
  border: 2rpx solid white;
}

.package-text {
  font-size: 24rpx;
  color: #2c3e50;
  font-weight: 500;
}

/* 订单区域 */
.order-section {
  background: white;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.order-grid {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
}

.order-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 16rpx;
  border-radius: 20rpx;
  transition: all 0.3s ease;
}

.order-item:active {
  transform: scale(0.95);
  background: rgba(102, 126, 234, 0.05);
}

.order-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(102, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.order-icon .icon {
  font-size: 32rpx;
}

.order-text {
  font-size: 24rpx;
  color: #2c3e50;
  font-weight: 500;
}

/* 功能菜单 */
.menu-section {
  background: white;
  border-radius: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: all 0.3s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: rgba(102, 126, 234, 0.05);
}

.menu-content {
  flex: 1;
}

.menu-title {
  font-size: 28rpx;
  color: #2c3e50;
  font-weight: 500;
}

.menu-arrow {
  font-size: 24rpx;
  color: #95a5a6;
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
  .login-section,
  .profile-section {
    padding-left: 20rpx;
    padding-right: 20rpx;
  }
  
  .login-container,
  .user-info-card,
  .promotion-section,
  .package-section,
  .order-section {
    padding: 24rpx;
  }
  
  .page-title {
    font-size: 32rpx;
  }
  
  .company-name {
    font-size: 32rpx;
  }
  
  .promotion-grid,
  .package-grid,
  .order-grid {
    flex-wrap: wrap;
  }
  
  .promotion-item,
  .package-item,
  .order-item {
    min-width: calc(25% - 12rpx);
  }
}

/* 动画效果 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-container > * {
  animation: slideInUp 0.6s ease-out;
}

.profile-container > *:nth-child(1) { animation-delay: 0.1s; }
.profile-container > *:nth-child(2) { animation-delay: 0.2s; }
.profile-container > *:nth-child(3) { animation-delay: 0.3s; }
.profile-container > *:nth-child(4) { animation-delay: 0.4s; }
.profile-container > *:nth-child(5) { animation-delay: 0.5s; }
</style>
