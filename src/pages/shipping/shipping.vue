<template>
  <view class="page-container">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">{{ t('shipping.title') }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 头部标题 -->
    <view class="header">
      <view class="header-content">
        <text class="header-title">{{ t('shipping.headerTitle') }}</text>
        <text class="header-subtitle">{{ t('shipping.headerSubtitle') }}</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 重要提醒 -->
      <view class="section-card important-card">
        <view class="section-header">
          <text class="section-icon">⚠️</text>
          <text class="section-title">{{ t('shipping.importantTitle') }}</text>
        </view>
        <view class="important-content">
          <view class="important-item">
            <text class="important-text">{{ t('shipping.important1') }}</text>
          </view>
          <view class="important-item">
            <text class="important-text">{{ t('shipping.important2') }}</text>
          </view>
          <view class="important-item">
            <text class="important-text">{{ t('shipping.important3') }}</text>
          </view>
        </view>
      </view>

      <!-- 包装要求 -->
      <view class="section-card">
        <view class="section-header">
          <text class="section-icon">📦</text>
          <text class="section-title">{{ t('shipping.packagingTitle') }}</text>
        </view>
        <view class="content-list">
          <view class="content-item">
            <text class="item-title">{{ t('shipping.packageMaterial') }}</text>
            <text class="item-desc">{{ t('shipping.packageMaterialDesc') }}</text>
          </view>
          <view class="content-item">
            <text class="item-title">{{ t('shipping.innerFilling') }}</text>
            <text class="item-desc">{{ t('shipping.innerFillingDesc') }}</text>
          </view>
          <view class="content-item">
            <text class="item-title">{{ t('shipping.sealing') }}</text>
            <text class="item-desc">{{ t('shipping.sealingDesc') }}</text>
          </view>
          <view class="content-item">
            <text class="item-title">{{ t('shipping.labelPasting') }}</text>
            <text class="item-desc">{{ t('shipping.labelPastingDesc') }}</text>
          </view>
        </view>
      </view>

      <!-- 禁寄物品 -->
      <view class="section-card danger-card">
        <view class="section-header">
          <text class="section-icon">🚫</text>
          <text class="section-title">{{ t('shipping.prohibitedTitle') }}</text>
        </view>
        <view class="danger-content">
          <view class="danger-category">
            <text class="category-title">{{ t('shipping.batteryCategory') }}</text>
            <text class="category-desc">{{ t('shipping.batteryDesc') }}</text>
          </view>
          <view class="danger-category">
            <text class="category-title">{{ t('shipping.liquidCategory') }}</text>
            <text class="category-desc">{{ t('shipping.liquidDesc') }}</text>
          </view>
          <view class="danger-category">
            <text class="category-title">{{ t('shipping.sharpCategory') }}</text>
            <text class="category-desc">{{ t('shipping.sharpDesc') }}</text>
          </view>
          <view class="danger-category">
            <text class="category-title">{{ t('shipping.valuableCategory') }}</text>
            <text class="category-desc">{{ t('shipping.valuableDesc') }}</text>
          </view>
        </view>
      </view>

      <!-- 重量尺寸 -->
      <view class="section-card">
        <view class="section-header">
          <text class="section-icon">⚖️</text>
          <text class="section-title">{{ t('shipping.limitTitle') }}</text>
        </view>
        <view class="limit-content">
          <view class="limit-item">
            <view class="limit-label">
              <text class="limit-icon">📏</text>
              <text class="limit-title">{{ t('shipping.singleLengthLabel') }}</text>
            </view>
            <text class="limit-value">{{ t('shipping.singleLength') }}</text>
          </view>
          <view class="limit-item">
            <view class="limit-label">
              <text class="limit-icon">📐</text>
              <text class="limit-title">{{ t('shipping.totalSizeLabel') }}</text>
            </view>
            <text class="limit-value">{{ t('shipping.totalSize') }}</text>
          </view>
          <view class="limit-item">
            <view class="limit-label">
              <text class="limit-icon">⚖️</text>
              <text class="limit-title">{{ t('shipping.singleWeightLabel') }}</text>
            </view>
            <text class="limit-value">{{ t('shipping.singleWeight') }}</text>
          </view>
        </view>
      </view>

      <!-- 费用说明 -->
      <view class="section-card">
        <view class="section-header">
          <text class="section-icon">💰</text>
          <text class="section-title">{{ t('shipping.feeTitle') }}</text>
        </view>
        <view class="fee-content">
          <view class="fee-item">
            <text class="fee-title">{{ t('shipping.basicFee') }}</text>
            <text class="fee-desc">{{ t('shipping.basicFeeDesc') }}</text>
          </view>
          <view class="fee-item">
            <text class="fee-title">{{ t('shipping.customsFee') }}</text>
            <text class="fee-desc">{{ t('shipping.customsFeeDesc') }}</text>
          </view>
          <view class="fee-item">
            <text class="fee-title">{{ t('shipping.insuranceFee') }}</text>
            <text class="fee-desc">{{ t('shipping.insuranceFeeDesc') }}</text>
          </view>
        </view>
      </view>

      <!-- 小贴士 -->
      <view class="section-card tips-card">
        <view class="section-header">
          <text class="section-icon">💡</text>
          <text class="section-title">{{ t('shipping.tipsTitle') }}</text>
        </view>
        <view class="tips-content">
          <view class="tip-item">
            <text class="tip-emoji">✨</text>
            <text class="tip-text">{{ t('shipping.tip1') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-emoji">📱</text>
            <text class="tip-text">{{ t('shipping.tip2') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-emoji">💬</text>
            <text class="tip-text">{{ t('shipping.tip3') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-emoji">🎯</text>
            <text class="tip-text">{{ t('shipping.tip4') }}</text>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="action-btn primary-btn" @tap="goToCalculator">
          <text class="btn-icon">🧮</text>
          <text class="btn-text">{{ t('shipping.feeCalculator') }}</text>
        </view>
        <view class="action-btn secondary-btn" @tap="goToFlow">
          <text class="btn-icon">📋</text>
          <text class="btn-text">{{ t('shipping.shippingFlow') }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { onMounted } from 'vue'
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { zhLanguagePack, koLanguagePack } from '../../locales/index'

export default {
  name: 'Shipping',
  setup() {
    // 初始化多语言系统
    onMounted(() => {
      setLanguagePacks({
        zh: zhLanguagePack,
        ko: koLanguagePack
      })
      initLocale()
    })

    return {
      t
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToCalculator() {
      uni.navigateTo({
        url: '/pages/calculator/calculator'
      });
    },
    goToFlow() {
      uni.navigateTo({
        url: '/pages/flow/flow'
      });
    }
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: env(safe-area-inset-bottom);
}

/* 头部导航 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60rpx 30rpx 30rpx;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20rpx);
}

.nav-back {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 32rpx;
  color: white;
  font-weight: bold;
}

.nav-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
}

.nav-placeholder {
  width: 60rpx;
}

.header {
  padding: 20rpx 32rpx 32rpx;
  text-align: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.header-title {
  font-size: 48rpx;
  font-weight: 700;
  color: white;
  text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.2);
}

.header-subtitle {
  font-size: 28rpx;
  color: rgba(255,255,255,0.9);
}

.content {
  padding: 0 32rpx 40rpx;
}

.section-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.1);
}

.important-card {
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
}

.danger-card {
  border-left: 8rpx solid #ff4757;
}

.tips-card {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.section-icon {
  font-size: 40rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 700;
}

.important-content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.important-item {
  padding: 16rpx 20rpx;
  background: rgba(255,255,255,0.2);
  border-radius: 16rpx;
}

.important-text {
  font-size: 28rpx;
  font-weight: 500;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.content-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.item-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2d3436;
}

.item-desc {
  font-size: 28rpx;
  color: #636e72;
  line-height: 1.6;
}

.danger-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.danger-category {
  padding: 20rpx;
  background: #fff5f5;
  border-radius: 16rpx;
  border-left: 6rpx solid #ff4757;
}

.category-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2d3436;
  display: block;
  margin-bottom: 8rpx;
}

.category-desc {
  font-size: 28rpx;
  color: #636e72;
}

.limit-content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.limit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
}

.limit-label {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.limit-icon {
  font-size: 32rpx;
}

.limit-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2d3436;
}

.limit-value {
  font-size: 32rpx;
  font-weight: 700;
  color: #667eea;
}

.fee-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.fee-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
}

.fee-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2d3436;
}

.fee-desc {
  font-size: 28rpx;
  color: #636e72;
}

.tips-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 20rpx;
  background: rgba(255,255,255,0.2);
  border-radius: 16rpx;
}

.tip-emoji {
  font-size: 32rpx;
}

.tip-text {
  font-size: 28rpx;
  line-height: 1.6;
  flex: 1;
}

.quick-actions {
  display: flex;
  gap: 24rpx;
  margin-top: 24rpx;
}

.action-btn {
  flex: 1;
  padding: 24rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.95);
}

.primary-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.secondary-btn {
  background: white;
  color: #667eea;
  border: 2rpx solid #667eea;
}

.btn-icon {
  font-size: 40rpx;
}

.btn-text {
  font-size: 28rpx;
  font-weight: 600;
}
</style>
