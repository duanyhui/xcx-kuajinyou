<template>
  <view class="page">
    <!-- 简洁现代化头部 -->
    <view class="header-section">
      <view class="header-bg">
        <!-- 装饰圆形 -->
        <view class="deco-circle circle-1"></view>
        <view class="deco-circle circle-2"></view>
        <view class="deco-circle circle-3"></view>
        
        <!-- 头部内容 -->
        <view class="header-content">
          <view class="header-top">
            <text class="greeting">{{ t('home.greeting') }}</text>
            <view class="header-menu">
              <!-- 语言切换已移至页面中央 -->
            </view>
          </view>
          
          <view class="header-main">
            <text class="main-title">{{ t('home.mainTitle') }}</text>
            <text class="sub-title">{{ t('home.subTitle') }}</text>
          </view>
          
          <view class="promo-badge">
            <text class="promo-text">{{ t('home.promoText') }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能卡片网格 -->
    <view class="function-section">
      <view class="section-title">
        <text class="title-text">{{ t('home.sectionTitle') }}</text>
        <text class="title-desc">{{ t('home.sectionDesc') }}</text>
      </view>
      
      <!-- 语言切换区域 - 居中显示 -->
      <view class="language-switch-section">
        <view class="language-switch-container">
          <text class="switch-label">{{ t('home.chooseLanguage') || '选择语言' }}</text>
          <view class="language-options">
            <view 
              class="language-option" 
              :class="{ active: locale === 'zh' }"
              @click="switchToLanguage('zh')"
            >
              <text class="lang-text">中文</text>
            </view>
            <view 
              class="language-option" 
              :class="{ active: locale === 'ko' }"
              @click="switchToLanguage('ko')"
            >
              <text class="lang-text">한국어</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="function-grid">
        <view class="grid-item" @click="navigateTo('guide')">
          <view class="icon-container guide">
            <text class="icon">📖</text>
          </view>
          <text class="item-title">{{ t('home.guide') }}</text>
          <text class="item-desc">{{ t('home.guideDesc') }}</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('calculator')">
          <view class="icon-container calculator">
            <text class="icon">💰</text>
          </view>
          <text class="item-title">{{ t('home.calculator') }}</text>
          <text class="item-desc">{{ t('home.calculatorDesc') }}</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('flow')">
          <view class="icon-container flow">
            <text class="icon">🔄</text>
          </view>
          <text class="item-title">{{ t('home.flow') }}</text>
          <text class="item-desc">{{ t('home.flowDesc') }}</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('customs')">
          <view class="icon-container customs">
            <text class="icon">📋</text>
          </view>
          <text class="item-title">{{ t('home.customs') }}</text>
          <text class="item-desc">{{ t('home.customsDesc') }}</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('shipping')">
          <view class="icon-container shipping">
            <text class="icon">📦</text>
          </view>
          <text class="item-title">{{ t('home.shipping') }}</text>
          <text class="item-desc">{{ t('home.shippingDesc') }}</text>
        </view>
        
        <view class="grid-item" @click="navigateTo('faq')">
          <view class="icon-container faq">
            <text class="icon">❓</text>
          </view>
          <text class="item-title">{{ t('home.faq') }}</text>
          <text class="item-desc">{{ t('home.faqDesc') }}</text>
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
            <text class="contact-title">{{ t('home.needHelp') }}</text>
            <text class="contact-desc">{{ t('home.needHelpDesc') }}</text>
          </view>
        </view>
        
        <view class="contact-actions">
          <view class="qr-item">
            <view class="image">
              <image 
                src="/static/wechat-qr.jpg" 
                class="qr-image" 
                mode="aspectFit"
                @error="onImageError"
              />
            </view>
            <text class="qr-title">{{ t('home.followWechat') }}</text>
            <text class="qr-desc">{{ t('home.getLatestOffers') }}</text>
          </view>
          <view class="qr-item">
            <view class="image">
              <image 
                src="/static/service-qr.jpg" 
                class="qr-image" 
                mode="aspectFit"
                @error="onImageError"
              />
            </view>
            <text class="qr-title">{{ t('home.contactService') }}</text>
            <text class="qr-desc">{{ t('home.professionalSupport') }}</text>
          </view>
        </view>
        
        <view class="service-time">
          <text class="time-text">{{ t('home.serviceTime') }}</text>
        </view>
      </view>
    </view>

    <!-- 运费信息卡片 -->
    <view class="pricing-section">
      <view class="pricing-card">
        <view class="pricing-header">
          <text class="pricing-title">{{ t('home.pricingTitle') }}</text>
          <text class="pricing-subtitle">{{ t('home.pricingSubtitle') }}</text>
        </view>
        
        <view class="pricing-grid">
          <view class="price-item">
            <view class="price-icon">🚢</view>
            <text class="price-type">{{ t('home.seaShipping') }}</text>
            <text class="price-detail">{{ t('home.seaShippingPrice') }}</text>
          </view>
          
          <view class="price-item">
            <view class="price-icon">✈️</view>
            <text class="price-type">{{ t('home.airShipping') }}</text>
            <text class="price-detail">{{ t('home.airShippingPrice') }}</text>
          </view>

          <!-- <view class="price-item">
            <view class="price-icon">📮</view>
            <text class="price-type">{{ t('home.postShipping') }}</text>
            <text class="price-detail">{{ t('home.postShippingPrice') }}</text>
          </view> -->

        </view>

        
        <!-- 包裹尺寸限制说明 -->
        <view class="package-notice">
          <view class="notice-icon">⚠️</view>
          <text class="notice-text">{{ t('home.packageSizeNotice') }}</text>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item active" @click="switchTab('home')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">🏠</text>
        </view>
        <text class="nav-text">{{ t('home.navHome') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">{{ t('home.navOrder') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">{{ t('home.navShipping') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('profile')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">👤</text>
        </view>
        <text class="nav-text">{{ t('home.navProfile') }}</text>
      </view>
    </view>

    <!-- 安全距离 -->
    <view class="safe-area"></view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { locale, t, toggleLocale, initLocale, getLocaleName, setLanguagePacks } from '../../utils/i18n'
import { zhLanguagePack, koLanguagePack } from '../../locales/index'

const onImageError = (e: any) => {
  console.log('二维码图片加载失败:', e)
  uni.showToast({
    title: '图片加载失败',
    icon: 'none',
    duration: 1000
  })
}

// 初始化多语言系统
onMounted(() => {
  // 设置语言包
  setLanguagePacks({
    zh: zhLanguagePack,
    ko: koLanguagePack
  })
  
  // 初始化语言设置
  initLocale()
})

// 语言切换函数
const switchLanguage = () => {
  toggleLocale()
  uni.showToast({
    title: `已切换为${getLocaleName(locale.value)}`,
    icon: 'none',
    duration: 1000
  })
}

// 设置特定语言
const setLanguage = (lang: 'zh' | 'ko') => {
  if (locale.value !== lang) {
    toggleLocale()
    uni.showToast({
      title: `已切换为${getLocaleName(locale.value)}`,
      icon: 'none',
      duration: 1000
    })
  }
}

// 切换到指定语言
const switchToLanguage = (lang: 'zh' | 'ko') => {
  if (locale.value !== lang) {
    toggleLocale()
    uni.showToast({
      title: `已切换为${getLocaleName(locale.value)}`,
      icon: 'none',
      duration: 1000
    })
  }
}

const navigateTo = (page: string) => {
  console.log('导航到:', page)
  
  if (page === 'guide') {
    uni.navigateTo({
      url: '/pages/guide/guide'
    })
  } else if (page === 'calculator') {
    uni.navigateTo({
      url: '/pages/calculator/calculator'
    })
  } else if (page === 'flow') {
    uni.navigateTo({
      url: '/pages/flow/flow'
    })
  } else if (page === 'customs') {
    uni.navigateTo({
      url: '/pages/customs/customs'
    })
  } else if (page === 'shipping') {
    uni.navigateTo({
      url: '/pages/shipping/shipping'
    })
  } else if (page === 'faq') {
    uni.navigateTo({
      url: '/pages/faq/faq'
    })
  } else {
    uni.showToast({
      title: `导航到${page}页面`,
      icon: 'none',
      duration: 1500
    })
  }
}

const switchTab = (tab: string) => {
  console.log('切换标签:', tab)
  
  if (tab === 'order') {
    uni.navigateTo({
      url: '/pages/order/order'
    })
  } else if (tab === 'home') {
    // 当前页面，无需跳转
    return
  } else if (tab === 'shipping') {
    uni.navigateTo({
      url: '/pages/shipping-orders/shipping-orders'
    })
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
</script>

<style scoped>
/* 页面样式 */
.page {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom) + 40rpx);
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 头部区域 */
.header-section {
  position: relative;
  padding: 80rpx 0 60rpx;
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
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 20rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50rpx;
  backdrop-filter: blur(10rpx);
  transition: all 0.3s ease;
}

.language-switch:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.3);
}

.lang-text {
  font-size: 24rpx;
  color: white;
  font-weight: 500;
}

.switch-icon {
  font-size: 28rpx;
  line-height: 1;
}

.menu-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
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
  font-size: 48rpx;
  font-weight: 700;
  color: white;
  text-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);
  display: block;
  margin-bottom: 16rpx;
  letter-spacing: 1rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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

/* 语言切换区域 */
.language-switch-section {
  margin: 30rpx 0 40rpx;
  display: flex;
  justify-content: center;
}

.language-switch-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 24rpx 32rpx;
  backdrop-filter: blur(10rpx);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

.switch-label {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 16rpx;
}

.language-options {
  display: flex;
  gap: 16rpx;
  justify-content: center;
}

.language-option {
  padding: 12rpx 24rpx;
  border-radius: 12rpx;
  background: #f5f5f5;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
  min-width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-option.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
  box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
}

.language-option:not(.active):active {
  transform: scale(0.95);
  background: #e5e5e5;
}

.language-option .lang-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #333;
}

.language-option.active .lang-text {
  color: white;
}

.function-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-bottom: 40rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.grid-item {
  background: white;
  border-radius: 32rpx;
  padding: 32rpx 20rpx;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10rpx);
  box-sizing: border-box;
  width: 100%;
  min-height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.grid-item:active {
  transform: scale(0.96);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
}

.icon-container {
  width: 80rpx;
  height: 80rpx;
  border-radius: 24rpx;
  margin: 0 auto 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.icon-container.guide {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
}

.icon-container.calculator {
  background: linear-gradient(135deg, #ffe66d, #ffbe0b);
}

.icon-container.flow {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.icon-container.customs {
  background: linear-gradient(135deg, #a8e6cf, #88d8a3);
}

.icon-container.shipping {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
}

.icon-container.faq {
  background: linear-gradient(135deg, #ffb3d6, #ff9a9e);
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
  line-height: 1.3;
  flex-shrink: 0;
}

.item-desc {
  font-size: 22rpx;
  color: #7f8c8d;
  display: block;
  line-height: 1.4;
  flex-shrink: 0;
}

/* 联系客服卡片 */
.contact-section {
  padding: 0 30rpx;
  margin-bottom: 40rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.contact-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 100%;
}

.qr-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 20rpx;
  border: 2rpx solid rgba(102, 126, 234, 0.1);
  box-sizing: border-box;
  min-width: 0;
}

.qr-item .image {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  background: #f8f9fa;
  border: 1rpx solid #e9ecef;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-image {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.qr-code {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  background: #f8f9fa;
  border: 1rpx solid #e9ecef;
}

.qr-placeholder {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.3);
}

.qr-icon {
  font-size: 60rpx;
  filter: grayscale(100%) brightness(0) invert(1);
}

.qr-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8rpx;
  text-align: center;
}

.qr-desc {
  font-size: 22rpx;
  color: #7f8c8d;
  text-align: center;
  line-height: 1.4;
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
  margin-bottom: 60rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.pricing-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 100%;
}

.price-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 20rpx;
  border-left: 6rpx solid #667eea;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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
  min-width: 0;
  word-wrap: break-word;
}

/* 包裹尺寸限制说明 */
.package-notice {
  display: flex;
  align-items: flex-start;
  padding: 24rpx;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 16rpx;
  border-left: 6rpx solid #ffc107;
  margin-top: 24rpx;
}

.notice-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.notice-text {
  font-size: 24rpx;
  color: #856404;
  line-height: 1.5;
  flex: 1;
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
  /* 移除不必要的高度，因为已经在.page的padding-bottom中处理 */
}

/* 响应式优化和小程序兼容性修复 */
@media (max-width: 400px) {
  .function-grid {
    flex-direction: column;
  }
  
  .grid-item {
    width: 100%;
  }
  
  .contact-actions {
    flex-direction: column;
  }
  
  .main-title {
    font-size: 48rpx;
  }
  
  .header-bg {
    padding: 0 20rpx;
  }
  
  .function-section,
  .contact-section,
  .pricing-section {
    padding: 0 20rpx;
  }
}

/* 文本不换行处理 */
.contact-btn .btn-text,
.item-title,
.item-desc,
.price-detail {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
