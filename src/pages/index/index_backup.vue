<template>
  <view class="page">
    <!        <view class="g        <view         <view class="grid-item" @click="navigateTo('warehouse')">
          <view class="icon-cont      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">订单</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">发货</text>
      </view>use">
            <text class="icon">🏢</text>
          </view>
          <text class="item-title">仓库服务</text>
          <text class="item-desc">安全仓储管理</text>
        </view>grid-item" @click="navigateTo('calculator')">
          <view class="icon-container calculator">
            <text class="icon">💰</text>
          </view>
          <text class="item-title">运费计算</text>
          <text class="item-desc">智能费用估算</text>
        </view>m" @click="navigateTo('guide')">
          <view class="icon-container guide">
            <text class="icon">📖</text>
          </view>
          <text class="item-title">操作指南</text>
          <text class="item-desc">详细使用说明</text>
        </view>化头部 -->
    <view class="header-section">
      <view class="header-bg">
        <!-- 装饰圆形 -->
        <view class="deco-circle circle-1"></view>
        <view class="deco-circle circle-2"></view>
        <view class="deco-circle circle-3"></view>
        
        <!-- 头部内容 -->
        <view class="header-content">
          <view class="header-top">
            <text class="greeting">Hi, 欢迎使用</text>
            <view class="header-menu">
              <view class="menu-btn">
                <text class="menu-icon">⋯</text>
              </view>
            </view>
          </view>
          
          <view class="header-main">
            <text class="main-title">中韩跨境邮</text>
            <text class="sub-title">快速·安全·便捷的跨境物流服务</text>
          </view>
          
          <view class="promo-badge">
            <text class="promo-text">🎉 新用户首单免运费</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能卡片网格 -->
    <view class="function-section">
      <view class="section-title">
        <text class="title-text">服务功能</text>
        <text class="title-desc">一站式跨境物流解决方案</text>
      </view>
      
      <view class="function-grid">
        <view class="grid-item" @click="navigateTo('guide')">
          <view class="icon-container guide">
            <text class="icon">�</text>
          </view>
          <text class="item-title">操作指南</text>
          <text class="item-desc">详细使用说明</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('tracking')">
          <view class="icon-container tracking">
            <text class="icon">📦</text>
          </view>
          <text class="item-title">包裹追踪</text>
          <text class="item-desc">实时物流信息</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('calculator')">
          <view class="icon-container calculator">
            <text class="icon">�</text>
          </view>
          <text class="item-title">运费计算</text>
          <text class="item-desc">智能费用估算</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('warehouse')">
          <view class="icon-container warehouse">
            <text class="icon">�</text>
          </view>
          <text class="item-title">仓库服务</text>
          <text class="item-desc">安全仓储管理</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('faq')">
          <view class="icon-container faq">
            <text class="icon">🤔</text>
          </view>
          <text class="item-title">常见问题</text>
          <text class="item-desc">快速问题解答</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('prohibited')">
          <view class="icon-container prohibited">
            <text class="icon">⚠️</text>
          </view>
          <text class="item-title">禁运清单</text>
          <text class="item-desc">违禁物品说明</text>
        </view>
      </view>
    </view>

    <!-- 联系客服卡片 -->
    <view class="contact-section">
      <view class="contact-card">
        <view class="contact-header">
          <view class="contact-icon">
            <text class="icon">💬</text>
          </view>
          <view class="contact-info">
            <text class="contact-title">需要帮助？</text>
            <text class="contact-desc">专业客服团队为您服务</text>
          </view>
        </view>
        
        <view class="contact-actions">
          <view class="contact-btn primary" @click="contactService">
            <text class="btn-text">在线客服</text>
          </view>
          <view class="contact-btn secondary" @click="callService">
            <text class="btn-text">电话咨询</text>
          </view>
        </view>
        
        <view class="service-time">
          <text class="time-text">服务时间：工作日 8:30-17:30</text>
          <text class="phone-text">客服电话：0631-5230850</text>
        </view>
      </view>
    </view>

    <!-- 运费信息卡片 -->
    <view class="pricing-section">
      <view class="pricing-card">
        <view class="pricing-header">
          <text class="pricing-title">运费标准</text>
          <text class="pricing-subtitle">透明计费，安心选择</text>
        </view>
        
        <view class="pricing-grid">
          <view class="price-item">
            <view class="price-icon">🚢</view>
            <text class="price-type">海运</text>
            <text class="price-detail">首重25元+续重6元/kg</text>
          </view>
          
          <view class="price-item">
            <view class="price-icon">✈️</view>
            <text class="price-type">空运</text>
            <text class="price-detail">首重33.8元+续重9元/0.5kg</text>
          </view>
          
          <view class="price-item">
            <view class="price-icon">📮</view>
            <text class="price-type">邮政</text>
            <text class="price-detail">首重70元/50g+续重1元/50g</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item active" @click="switchTab('home')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">🏠</text>
        </view>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">�</text>
        </view>
        <text class="nav-text">订单</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">�</text>
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
import { ref } from 'vue'

const navigateTo = (page: string) => {
  console.log('导航到:', page)
  
  if (page === 'guide') {
    uni.navigateTo({
      url: '/pages/guide/guide'
    })
  } else {
    uni.showToast({
      title: `导航到${page}页面`,
      icon: 'none',
      duration: 1500
    })
  }
}

const contactService = () => {
  uni.showToast({
    title: '正在连接客服...',
    icon: 'loading',
    duration: 1500
  })
}

const callService = () => {
  uni.makePhoneCall({
    phoneNumber: '0631-5230850'
  })
}

const switchTab = (tab: string) => {
  console.log('切换标签:', tab)
  uni.showToast({
    title: `切换到${tab}`,
    icon: 'none',
    duration: 1000
  })
}
</script>

<style scoped>
/* 全局样式 */
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 160rpx;
}

/* 头部区域 */
.header-section {
  position: relative;
  padding: 80rpx 0 60rpx;
  overflow: hidden;
}

.header-bg {
  position: relative;
  padding: 0 40rpx;
}

/* 装饰圆形 */
.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10rpx);
}

.circle-1 {
  width: 200rpx;
  height: 200rpx;
  top: -100rpx;
  right: -100rpx;
  animation: float 8s ease-in-out infinite;
}

.circle-2 {
  width: 120rpx;
  height: 120rpx;
  top: 50rpx;
  left: -60rpx;
  animation: float 6s ease-in-out infinite reverse;
}

.circle-3 {
  width: 80rpx;
  height: 80rpx;
  bottom: 20rpx;
  right: 60rpx;
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20rpx) rotate(180deg); }
}

/* 头部内容 */
.header-content {
  position: relative;
  z-index: 2;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.greeting {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.header-menu {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 32rpx;
  color: white;
  font-weight: bold;
}

.header-main {
  text-align: center;
  margin-bottom: 40rpx;
}

.main-title {
  font-size: 64rpx;
  font-weight: 700;
  color: white;
  text-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);
  display: block;
  margin-bottom: 16rpx;
  letter-spacing: 2rpx;
}

.sub-title {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  display: block;
  line-height: 1.6;
}

.promo-badge {
  display: flex;
  justify-content: center;
}

.promo-text {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-size: 24rpx;
  font-weight: 600;
  padding: 16rpx 32rpx;
  border-radius: 50rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

/* 功能区域 */
.function-section {
  padding: 0 30rpx;
  margin-top: -40rpx;
  position: relative;
  z-index: 3;
}

.section-title {
  text-align: center;
  margin-bottom: 40rpx;
}

.title-text {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
  display: block;
  margin-bottom: 8rpx;
}

.title-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  display: block;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.grid-item {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx 24rpx;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10rpx);
}

.grid-item:active {
  transform: scale(0.96);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
}

.icon-container {
  width: 80rpx;
  height: 80rpx;
  border-radius: 24rpx;
  margin: 0 auto 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.icon-container.guide {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
}

.icon-container.tracking {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.icon-container.calculator {
  background: linear-gradient(135deg, #ffe66d, #ffbe0b);
}

.icon-container.warehouse {
  background: linear-gradient(135deg, #a8e6cf, #88d8a3);
}

.icon-container.faq {
  background: linear-gradient(135deg, #ffb3d6, #ff9a9e);
}

.icon-container.prohibited {
  background: linear-gradient(135deg, #ffa726, #fb8c00);
}

.icon-container .icon {
  font-size: 40rpx;
  filter: grayscale(100%) brightness(0) invert(1);
}

.item-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8rpx;
  display: block;
}

.item-desc {
  font-size: 22rpx;
  color: #7f8c8d;
  display: block;
  line-height: 1.4;
}

/* 联系客服卡片 */
.contact-section {
  padding: 0 30rpx;
  margin-bottom: 40rpx;
}

.contact-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.contact-header {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.contact-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.contact-icon .icon {
  font-size: 40rpx;
  filter: grayscale(100%) brightness(0) invert(1);
}

.contact-info {
  flex: 1;
}

.contact-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8rpx;
  display: block;
}

.contact-desc {
  font-size: 24rpx;
  color: #7f8c8d;
  display: block;
}

.contact-actions {
  display: flex;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.contact-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.contact-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.contact-btn.secondary {
  background: rgba(102, 126, 234, 0.1);
  border: 2rpx solid rgba(102, 126, 234, 0.3);
}

.contact-btn:active {
  transform: scale(0.96);
}

.contact-btn.primary .btn-text {
  color: white;
  font-size: 28rpx;
  font-weight: 500;
}

.contact-btn.secondary .btn-text {
  color: #667eea;
  font-size: 28rpx;
  font-weight: 500;
}

.service-time {
  text-align: center;
  padding-top: 24rpx;
  border-top: 1rpx solid #f0f0f0;
}

.time-text, .phone-text {
  font-size: 22rpx;
  color: #95a5a6;
  display: block;
  margin-bottom: 4rpx;
}

/* 运费信息卡片 */
.pricing-section {
  padding: 0 30rpx;
  margin-bottom: 40rpx;
}

.pricing-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.pricing-header {
  text-align: center;
  margin-bottom: 32rpx;
}

.pricing-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8rpx;
  display: block;
}

.pricing-subtitle {
  font-size: 24rpx;
  color: #7f8c8d;
  display: block;
}

.pricing-grid {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.price-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 20rpx;
  border-left: 6rpx solid #667eea;
}

.price-icon {
  font-size: 32rpx;
  margin-right: 20rpx;
}

.price-type {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-right: 20rpx;
  min-width: 80rpx;
}

.price-detail {
  font-size: 24rpx;
  color: #7f8c8d;
  flex: 1;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140rpx;
  background: white;
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
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
  height: env(safe-area-inset-bottom);
}

/* 响应式优化 */
@media (max-width: 400px) {
  .function-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-actions {
    flex-direction: column;
  }
  
  .main-title {
    font-size: 48rpx;
  }
}
</style>
