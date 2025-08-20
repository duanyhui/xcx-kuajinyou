<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header-section">
      <view class="header-bg">
        <view class="header-content">
          <view class="header-top">
            <view class="back-btn" @click="goBack">
              <text class="back-icon">‹</text>
            </view>
            <text class="page-title">仓库地址</text>
            <view class="placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 仓库地址内容 -->
    <view class="content-section">
      <view class="address-container">
        <!-- 仓库名称 -->
        <view class="address-item">
          <view class="item-content">
            <text class="item-label">威海仓</text>
            <view class="copy-btn" @click="copyToClipboard('威海仓')">
              <text class="copy-text">复制全部</text>
            </view>
          </view>
        </view>

        <!-- 用户编号 -->
        <view class="address-item">
          <view class="item-content">
            <text class="item-text">{{ userName }}{{ userCode }}</text>
            <view class="copy-btn" @click="copyToClipboard(userName + userCode)">
              <text class="copy-text">复制</text>
            </view>
          </view>
        </view>

        <!-- 联系电话 -->
        <view class="address-item">
          <view class="item-content">
            <text class="item-text">13061124980</text>
            <view class="copy-btn" @click="copyToClipboard('13061124980')">
              <text class="copy-text">复制</text>
            </view>
          </view>
        </view>

        <!-- 详细地址 -->
        <view class="address-item address-detail">
          <view class="item-content">
            <text class="item-text">山东省威海市环翠区皇冠街道经区海埠路56号泛杰产业园B2-3中海川转运仓</text>
            <view class="copy-btn" @click="copyToClipboard('山东省威海市环翠区皇冠街道经区海埠路56号泛杰产业园B2-3中海川转运仓')">
              <text class="copy-text">复制</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 使用说明 -->
      <view class="tips-section">
        <view class="tips-card">
          <view class="tips-header">
            <text class="tips-icon">💡</text>
            <text class="tips-title">使用说明</text>
          </view>
          <view class="tips-content">
            <text class="tips-text">1. 请将此地址填写为您的收货地址</text>
            <text class="tips-text">2. 收货人姓名请填写：{{ userName }}{{ userCode }}</text>
            <text class="tips-text">3. 联系电话请填写：13061124980</text>
            <text class="tips-text">4. 包裹到达仓库后，我们会及时为您处理</text>
            <text class="tips-text">5. 如有疑问，请联系在线客服</text>
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-section">
        <view class="action-btn primary" @click="copyAllInfo">
          <text class="btn-text">一键复制全部信息</text>
        </view>
        <view class="action-btn secondary" @click="contactService">
          <text class="btn-text">联系客服</text>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userCode = ref('100017')
const userName = ref('跨境寄件吉祥物')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 复制到剪贴板
const copyToClipboard = (text: string) => {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1500
      })
    },
    fail: () => {
      uni.showToast({
        title: '复制失败',
        icon: 'none',
        duration: 1500
      })
    }
  })
}

// 一键复制全部信息
const copyAllInfo = () => {
  const allInfo = `收货人：${userName.value}${userCode.value}
联系电话：13061124980
收货地址：山东省威海市环翠区皇冠街道经区海埠路56号泛杰产业园B2-3中海川转运仓`

  uni.setClipboardData({
    data: allInfo,
    success: () => {
      uni.showToast({
        title: '全部信息已复制',
        icon: 'success',
        duration: 2000
      })
    },
    fail: () => {
      uni.showToast({
        title: '复制失败',
        icon: 'none',
        duration: 1500
      })
    }
  })
}

// 联系客服
const contactService = () => {
  uni.showToast({
    title: '联系客服功能开发中',
    icon: 'none',
    duration: 1500
  })
}

// 底部导航切换
const switchTab = (tab: string) => {
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
    uni.redirectTo({
      url: '/pages/profile/profile'
    })
  }
}

// 页面加载时获取用户信息
onMounted(() => {
  const savedUserInfo = uni.getStorageSync('userInfo')
  if (savedUserInfo) {
    if (savedUserInfo.userId) {
      userCode.value = savedUserInfo.userId
    }
    if (savedUserInfo.nickname) {
      userName.value = savedUserInfo.nickname
    }
  }
})
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
  width: 100%;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20rpx;
  backdrop-filter: blur(10rpx);
}

.back-icon {
  font-size: 36rpx;
  color: white;
  font-weight: bold;
}

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
  text-align: center;
}

.placeholder {
  width: 60rpx;
}

/* 内容区域 */
.content-section {
  padding: 40rpx 30rpx;
}

.address-container {
  background: white;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 40rpx;
}

.address-item {
  border-bottom: 1rpx solid #f3f4f6;
  padding: 32rpx 40rpx;
}

.address-item:last-child {
  border-bottom: none;
}

.address-detail {
  padding: 40rpx;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20rpx;
}

.item-label {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.item-text {
  font-size: 30rpx;
  color: #374151;
  line-height: 1.6;
  flex: 1;
  word-wrap: break-word;
  word-break: break-all;
}

.copy-btn {
  background: #667eea;
  color: white;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  flex-shrink: 0;
}

.copy-text {
  font-size: 24rpx;
  color: white;
  font-weight: 500;
}

/* 使用说明 */
.tips-section {
  margin-bottom: 40rpx;
}

.tips-card {
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.tips-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.tips-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.tips-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2937;
}

.tips-content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.tips-text {
  font-size: 28rpx;
  color: #6b7280;
  line-height: 1.6;
}

/* 操作按钮 */
.action-section {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.action-btn {
  padding: 32rpx;
  border-radius: 24rpx;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.action-btn.secondary {
  background: white;
  color: #667eea;
  border: 2rpx solid #667eea;
}

.btn-text {
  font-size: 32rpx;
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

/* 响应式优化 */
@media (max-width: 400px) {
  .content-section {
    padding: 30rpx 20rpx;
  }
  
  .address-item {
    padding: 24rpx 30rpx;
  }
  
  .tips-card {
    padding: 30rpx;
  }
  
  .action-btn {
    padding: 28rpx;
  }
}
</style>
