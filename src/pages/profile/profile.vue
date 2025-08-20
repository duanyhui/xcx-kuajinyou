<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header-section">
      <view class="header-bg">
        <view class="header-content">
          <view class="header-top">
            <text class="page-title">{{ isLoggedIn ? '会员中心' : '登录' }}</text>
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
            <image v-if="userInfo.avatar" class="avatar-image" :src="userInfo.avatar" mode="aspectFill"></image>
            <text v-else class="avatar-icon">👤</text>
          </view>
          <view class="user-details">
            <text class="user-name">{{ userInfo.nickname || '跨境寄件吉祥物' + userInfo.randomSuffix }}</text>
            <text class="user-id">NO.{{ userInfo.userId || '100017' }}</text>
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
            <view class="package-item" @click="navigateToPackage('warehouse')">
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
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const isLoggedIn = ref(false)
    const warehouseBadge = ref(true)
    const userInfo = ref({
      userId: '',
      nickname: '',
      avatar: '',
      randomSuffix: ''
    })

    // 生成随机数字后缀
    const generateRandomSuffix = () => {
      return Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    }

    // 微信登录
    const handleWechatLogin = () => {
      uni.showLoading({
        title: '登录中...'
      })
      
      // 获取微信用户信息
      uni.getUserInfo({
        provider: 'weixin',
        success: (userResult) => {
          setTimeout(() => {
            uni.hideLoading()
            isLoggedIn.value = true
            const randomSuffix = generateRandomSuffix()
            userInfo.value = {
              userId: '100017',
              nickname: `跨境寄件吉祥物`,
              avatar: userResult.userInfo.avatarUrl || '',
              randomSuffix: randomSuffix
            }
            
            // 保存到本地存储
            uni.setStorageSync('userInfo', userInfo.value)
            
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            })
          }, 1500)
        },
        fail: () => {
          // 如果获取用户信息失败，使用默认信息
          setTimeout(() => {
            uni.hideLoading()
            isLoggedIn.value = true
            const randomSuffix = generateRandomSuffix()
            userInfo.value = {
              userId: '100017',
              nickname: `跨境寄件吉祥物`,
              avatar: '',
              randomSuffix: randomSuffix
            }
            
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            })
          }, 1500)
        }
      })
    }

    // 推广功能导航
    const navigateToPromotion = (type) => {
      uni.showToast({
        title: `${type}功能开发中`,
        icon: 'none'
      })
    }

    // 包裹功能导航
    const navigateToPackage = (type) => {
      uni.navigateTo({
        url: `/pages/packages/packages?status=${type}`
      })
    }

    // 订单功能导航
    const navigateToOrder = (type) => {
      uni.showToast({
        title: `${type}功能开发中`,
        icon: 'none'
      })
    }

    // 查看全部包裹
    const viewAllPackages = () => {
      uni.navigateTo({
        url: '/pages/packages/packages?status=all'
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
            // 清除本地存储
            uni.removeStorageSync('userInfo')
            
            isLoggedIn.value = false
            userInfo.value = {
              userId: '',
              nickname: '',
              avatar: '',
              randomSuffix: ''
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
    const switchTab = (tab) => {
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

    // 页面加载时检查登录状态
    onMounted(() => {
      const savedUserInfo = uni.getStorageSync('userInfo')
      if (savedUserInfo && savedUserInfo.nickname) {
        isLoggedIn.value = true
        userInfo.value = savedUserInfo
      }
    })

    return {
      isLoggedIn,
      warehouseBadge,
      userInfo,
      handleWechatLogin,
      navigateToPromotion,
      navigateToPackage,
      navigateToOrder,
      viewAllPackages,
      viewAllOrders,
      navigateToWarehouse,
      navigateToMyAddress,
      handleLogout,
      switchTab
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 140rpx;
}

/* 头部区域 */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: var(--status-bar-height, 44px);
}

.header-bg {
  padding: 20rpx;
}

.header-content {
  text-align: center;
}

.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88rpx;
}

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
}

/* 登录页面 */
.login-section {
  padding: 120rpx 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.login-container {
  width: 100%;
  text-align: center;
}

.logo-section {
  margin-bottom: 120rpx;
}

.logo-container {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto 40rpx;
}

.logo-shape {
  position: absolute;
  border-radius: 20rpx;
}

.logo-shape-1 {
  width: 120rpx;
  height: 60rpx;
  background: #dc2626;
  top: 0;
  left: 40rpx;
}

.logo-shape-2 {
  width: 160rpx;
  height: 80rpx;
  background: #ef4444;
  top: 50rpx;
  left: 20rpx;
}

.logo-shape-3 {
  width: 140rpx;
  height: 60rpx;
  background: #f87171;
  top: 120rpx;
  left: 30rpx;
}

.logo-shape-4 {
  width: 200rpx;
  height: 80rpx;
  background: #fca5a5;
  top: 160rpx;
  left: 0;
}

.company-info {
  text-align: center;
}

.company-name {
  font-size: 36rpx;
  font-weight: 700;
  color: #dc2626;
  display: block;
  margin-bottom: 16rpx;
}

.company-subtitle {
  font-size: 24rpx;
  color: #6b7280;
  font-weight: 400;
}

.login-btn-container {
  width: 100%;
}

.wechat-login-btn {
  background: #07c160;
  color: white;
  border-radius: 50rpx;
  padding: 24rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(7, 193, 96, 0.3);
}

.wechat-icon {
  font-size: 36rpx;
  margin-right: 16rpx;
}

.login-btn-text {
  font-size: 32rpx;
  font-weight: 600;
}

/* 会员中心页面 */
.profile-section {
  padding: 40rpx 30rpx;
}

.profile-container {
  width: 100%;
}

/* 用户信息卡片 */
.user-info-card {
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  background: #f3f4f6;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32rpx;
  overflow: hidden;
  border: 4rpx solid #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 56rpx;
}

.avatar-icon {
  font-size: 48rpx;
  color: #9ca3af;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #1f2937;
  display: block;
  margin-bottom: 8rpx;
  max-width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-id {
  font-size: 28rpx;
  color: #6b7280;
  font-weight: 500;
  letter-spacing: 1rpx;
}

/* 区域标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2937;
}

.section-action {
  font-size: 28rpx;
  color: #667eea;
}

/* 推广赚钱区域 */
.promotion-section {
  margin-bottom: 40rpx;
}

.promotion-grid {
  display: flex;
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.promotion-item {
  flex: 1;
  text-align: center;
}

.promotion-icon {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16rpx;
}

.icon {
  font-size: 32rpx;
}

.promotion-text {
  font-size: 24rpx;
  color: #374151;
}

/* 包裹区域 */
.package-section {
  margin-bottom: 40rpx;
}

.package-grid {
  display: flex;
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.package-item {
  flex: 1;
  text-align: center;
  position: relative;
}

.package-icon {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16rpx;
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 16rpx;
  height: 16rpx;
  background: #ef4444;
  border-radius: 8rpx;
}

.package-text {
  font-size: 24rpx;
  color: #374151;
}

/* 订单区域 */
.order-section {
  margin-bottom: 40rpx;
}

.order-grid {
  display: flex;
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.order-item {
  flex: 1;
  text-align: center;
}

.order-icon {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16rpx;
}

.order-text {
  font-size: 24rpx;
  color: #374151;
}

/* 功能菜单 */
.menu-section {
  background: white;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 40rpx;
  border-bottom: 2rpx solid #f9fafb;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-content {
  flex: 1;
}

.menu-title {
  font-size: 32rpx;
  color: #1f2937;
}

.menu-arrow {
  font-size: 32rpx;
  color: #d1d5db;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140rpx;
  background: white;
  border-top: 2rpx solid #f3f4f6;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
}

.nav-icon-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}

.nav-item.active .nav-icon-wrapper {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.nav-icon {
  font-size: 32rpx;
  color: #9ca3af;
}

.nav-item.active .nav-icon {
  color: white;
}

.nav-text {
  font-size: 20rpx;
  color: #9ca3af;
}

.nav-item.active .nav-text {
  color: #667eea;
  font-weight: 600;
}
</style>
