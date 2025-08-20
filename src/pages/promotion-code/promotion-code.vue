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
            <text class="page-title">推广码</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-section">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-section">
        <view class="loading-card">
          <view class="loading-qr"></view>
          <view class="loading-content">
            <view class="loading-line long"></view>
            <view class="loading-line short"></view>
          </view>
        </view>
      </view>

      <!-- 推广码内容 -->
      <view v-else class="promotion-content">
        <!-- 用户信息卡片 -->
        <view class="user-card">
          <view class="user-avatar">
            <image v-if="userInfo.avatar" class="avatar-image" :src="userInfo.avatar" mode="aspectFill"></image>
            <text v-else class="avatar-icon">👤</text>
          </view>
          <view class="user-info">
            <text class="user-name">{{ userInfo.nickname || '跨境寄件吉祥物' + userInfo.randomSuffix }}</text>
            <text class="user-id">推广员ID: {{ userInfo.userId || '100017' }}</text>
          </view>
        </view>

        <!-- 二维码卡片 -->
        <view class="qr-card">
          <view class="qr-header">
            <text class="qr-title">我的推广码</text>
            <text class="qr-subtitle">扫码注册，享受优惠价格</text>
          </view>
          
          <view class="qr-container">
            <image v-if="qrCodeUrl" class="qr-image" :src="qrCodeUrl" mode="aspectFit"></image>
            <view v-else class="qr-placeholder">
              <text class="qr-icon">📱</text>
              <text class="qr-text">二维码加载中...</text>
            </view>
          </view>

          <view class="qr-code-text">
            <text class="code-label">推广码:</text>
            <text class="code-value">{{ promotionCode }}</text>
            <view class="copy-btn" @click="copyCode">
              <text class="copy-text">复制</text>
            </view>
          </view>
        </view>

        <!-- 推广统计 -->
        <view class="stats-card">
          <view class="stats-header">
            <text class="stats-title">推广统计</text>
          </view>
          
          <view class="stats-grid">
            <view class="stats-item">
              <text class="stats-number">{{ stats.totalUsers }}</text>
              <text class="stats-label">累计推广</text>
            </view>
            <view class="stats-item">
              <text class="stats-number">{{ stats.monthUsers }}</text>
              <text class="stats-label">本月推广</text>
            </view>
            <view class="stats-item">
              <text class="stats-number">¥{{ stats.totalCommission }}</text>
              <text class="stats-label">累计佣金</text>
            </view>
            <view class="stats-item">
              <text class="stats-number">¥{{ stats.monthCommission }}</text>
              <text class="stats-label">本月佣金</text>
            </view>
          </view>
        </view>

        <!-- 推广说明 -->
        <view class="info-card">
          <view class="info-header">
            <text class="info-title">推广说明</text>
          </view>
          
          <view class="info-content">
            <view class="info-item">
              <text class="info-number">1</text>
              <text class="info-text">分享推广码给好友，好友扫码注册即可成为您的团成员</text>
            </view>
            <view class="info-item">
              <text class="info-number">2</text>
              <text class="info-text">团成员下单产生的订单，您将获得相应的推广佣金</text>
            </view>
            <view class="info-item">
              <text class="info-number">3</text>
              <text class="info-text">佣金将在订单完成后自动结算到您的账户</text>
            </view>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="action-section">
          <view class="action-btn primary" @click="shareQRCode">
            <text class="btn-text">分享推广码</text>
          </view>
          <view class="action-btn secondary" @click="refreshQRCode">
            <text class="btn-text">刷新二维码</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="navigateTo('index')">
        <text class="nav-icon">🏠</text>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="navigateTo('calculator')">
        <text class="nav-icon">📋</text>
        <text class="nav-text">预报</text>
      </view>
      <view class="nav-item" @click="navigateTo('shipping')">
        <text class="nav-icon">📦</text>
        <text class="nav-text">发货</text>
      </view>
      <view class="nav-item" @click="navigateTo('profile')">
        <text class="nav-icon">👤</text>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
// TODO: 引入API配置
// import { getPromotionQRCode, getPromotionStats } from '@/utils/api.js'

export default {
  name: 'PromotionCode',
  data() {
    return {
      loading: true,
      userInfo: {},
      qrCodeUrl: '',
      promotionCode: '',
      stats: {
        totalUsers: 0,
        monthUsers: 0,
        totalCommission: 0,
        monthCommission: 0
      }
    }
  },
  
  onLoad() {
    this.loadUserInfo()
    this.loadPromotionData()
  },
  
  methods: {
    // 加载用户信息
    loadUserInfo() {
      const savedUserInfo = uni.getStorageSync('userInfo')
      if (savedUserInfo) {
        this.userInfo = savedUserInfo
      }
    },
    
    // 加载推广数据
    async loadPromotionData() {
      try {
        this.loading = true
        
        // TODO: 替换为真实API调用
        // const response = await getPromotionQRCode(this.userInfo.userId)
        // this.qrCodeUrl = response.data.qrCodeUrl
        // this.promotionCode = response.data.code
        
        // const statsResponse = await getPromotionStats(this.userInfo.userId)
        // this.stats = statsResponse.data
        
        // 模拟数据
        await this.simulateApiCall()
        this.qrCodeUrl = this.getMockQRCode()
        this.promotionCode = `TC${this.userInfo.userId || '100017'}`
        this.stats = this.getMockStats()
        
      } catch (error) {
        console.error('加载推广数据失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 模拟API调用延迟
    simulateApiCall() {
      return new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
    },
    
    // 获取模拟二维码
    getMockQRCode() {
      // 这里应该是从后端获取的真实二维码URL
      // 临时使用占位图片
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+'
    },
    
    // 获取模拟统计数据
    getMockStats() {
      return {
        totalUsers: 28,
        monthUsers: 5,
        totalCommission: 1580.50,
        monthCommission: 280.00
      }
    },
    
    // 复制推广码
    copyCode() {
      uni.setClipboardData({
        data: this.promotionCode,
        success: () => {
          uni.showToast({
            title: '推广码已复制',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '复制失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 分享推广码
    shareQRCode() {
      // TODO: 实现分享功能
      uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        href: `https://your-domain.com/register?code=${this.promotionCode}`,
        title: '跨境寄件优惠注册',
        summary: `使用推广码 ${this.promotionCode} 注册，享受更优惠的寄件价格！`,
        imageUrl: this.qrCodeUrl,
        success: () => {
          uni.showToast({
            title: '分享成功',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '分享失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 刷新二维码
    async refreshQRCode() {
      try {
        uni.showLoading({ title: '刷新中...' })
        
        // TODO: 调用刷新接口
        await this.simulateApiCall()
        
        uni.hideLoading()
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        })
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '刷新失败',
          icon: 'none'
        })
      }
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 底部导航跳转
    navigateTo(page) {
      const routes = {
        index: '/pages/index/index',
        calculator: '/pages/calculator/calculator',
        shipping: '/pages/shipping/shipping',
        profile: '/pages/profile/profile'
      }
      
      const route = routes[page]
      if (route) {
        uni.navigateTo({
          url: route
        })
      }
    }
  }
}
</script>

<style scoped>
/* 页面容器 */
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 120rpx;
}

/* 头部样式 */
.header-section {
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: var(--status-bar-height, 44px);
}

.header-content {
  padding: 0 30rpx 30rpx;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.back-icon {
  color: white;
  font-size: 32rpx;
  font-weight: bold;
}

.page-title {
  color: white;
  font-size: 36rpx;
  font-weight: 600;
}

.header-placeholder {
  width: 60rpx;
}

/* 内容区域 */
.content-section {
  padding: 30rpx;
}

/* 加载状态 */
.loading-section {
  padding: 20rpx 0;
}

.loading-card {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  text-align: center;
}

.loading-qr {
  width: 200rpx;
  height: 200rpx;
  background: #f0f0f0;
  border-radius: 12rpx;
  margin: 0 auto 30rpx;
  animation: loading 1.5s ease-in-out infinite;
}

.loading-content {
  text-align: center;
}

.loading-line {
  height: 24rpx;
  background: #f0f0f0;
  border-radius: 12rpx;
  margin: 0 auto 16rpx;
  animation: loading 1.5s ease-in-out infinite;
}

.loading-line.long {
  width: 60%;
}

.loading-line.short {
  width: 40%;
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 推广内容 */
.promotion-content {
  padding-bottom: 40rpx;
}

/* 用户卡片 */
.user-card {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 100rpx;
  height: 100rpx;
  background: #f3f4f6;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  overflow: hidden;
  border: 3rpx solid #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 47rpx;
}

.avatar-icon {
  font-size: 40rpx;
  color: #9ca3af;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.user-id {
  font-size: 26rpx;
  color: #666;
}

/* 二维码卡片 */
.qr-card {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 20rpx;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.qr-header {
  margin-bottom: 30rpx;
}

.qr-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.qr-subtitle {
  font-size: 26rpx;
  color: #666;
}

.qr-container {
  width: 300rpx;
  height: 300rpx;
  margin: 0 auto 30rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #e9ecef;
}

.qr-image {
  width: 280rpx;
  height: 280rpx;
}

.qr-placeholder {
  text-align: center;
}

.qr-icon {
  font-size: 60rpx;
  display: block;
  margin-bottom: 16rpx;
}

.qr-text {
  font-size: 24rpx;
  color: #999;
}

.qr-code-text {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
}

.code-label {
  font-size: 26rpx;
  color: #666;
  margin-right: 8rpx;
}

.code-value {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-right: 16rpx;
  letter-spacing: 2rpx;
}

.copy-btn {
  background: #667eea;
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
}

.copy-text {
  font-size: 24rpx;
}

/* 统计卡片 */
.stats-card {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.stats-header {
  margin-bottom: 30rpx;
}

.stats-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
}

.stats-item {
  width: 50%;
  text-align: center;
  margin-bottom: 30rpx;
}

.stats-number {
  font-size: 36rpx;
  font-weight: 700;
  color: #667eea;
  display: block;
  margin-bottom: 8rpx;
}

.stats-label {
  font-size: 24rpx;
  color: #666;
}

/* 说明卡片 */
.info-card {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.info-header {
  margin-bottom: 30rpx;
}

.info-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.info-content {
  padding-left: 20rpx;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24rpx;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-number {
  width: 40rpx;
  height: 40rpx;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.info-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
  flex: 1;
}

/* 操作按钮 */
.action-section {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
}

.action-btn {
  flex: 1;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  font-weight: 500;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.secondary {
  background: white;
  color: #667eea;
  border: 2rpx solid #667eea;
}

.btn-text {
  font-size: 30rpx;
}

/* 底部导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  padding: 16rpx 0 calc(32rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #E0E0E0;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
  color: #9ca3af;
}

.nav-text {
  font-size: 20rpx;
  color: #666;
}
</style>
