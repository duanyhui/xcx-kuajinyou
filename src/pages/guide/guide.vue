<template>
  <view class="guide-page">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">{{ t('guide.title') }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 欢迎卡片 -->
      <view class="welcome-card">
        <view class="welcome-icon">✨</view>
        <text class="welcome-title">{{ t('guide.welcomeTitle') }}</text>
        <text class="welcome-desc">{{ t('guide.welcomeDesc') }}</text>
      </view>

      <!-- 步骤列表 -->
      <view class="steps-section">
        <view class="section-title">
          <text class="title-emoji">📝</text>
          <text class="title-text">{{ t('guide.stepsTitle') }}</text>
        </view>

        <!-- 步骤1 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">1</view>
            <text class="step-title">{{ t('guide.step1Title') }}</text>
            <view class="step-tag hot">{{ t('guide.step1Tag') }}</view>
          </view>
          <view class="step-content">
            <text class="step-desc">{{ t('guide.step1Desc1') }}</text>
            <text class="step-desc">{{ t('guide.step1Desc2') }}</text>
            <text class="step-desc">{{ t('guide.step1Desc3') }}</text>
            <view class="step-tip">
              <text class="tip-icon">💡</text>
              <text class="tip-text">{{ t('guide.step1Tip') }}</text>
            </view>
          </view>
        </view>

        <!-- 步骤2 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">2</view>
            <text class="step-title">{{ t('guide.step2Title') }}</text>
            <view class="step-tag">{{ t('guide.step2Tag') }}</view>
          </view>
          <view class="step-content">
            <text class="step-desc">{{ t('guide.step2Desc1') }}</text>
            <text class="step-desc">{{ t('guide.step2Desc2') }}</text>
            <view class="step-warning">
              <text class="warning-icon">⚠️</text>
              <text class="warning-text">{{ t('guide.step2Warning') }}</text>
            </view>
          </view>
        </view>

        <!-- 步骤3 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">3</view>
            <text class="step-title">{{ t('guide.step3Title') }}</text>
            <view class="step-tag">{{ t('guide.step3Tag') }}</view>
          </view>
          <view class="step-content">
            <text class="step-subtitle">{{ t('guide.step3Subtitle') }}</text>
            <view class="info-list">
              <view class="info-item">
                <text class="info-dot">•</text>
                <text class="info-text">{{ t('guide.step3Item1') }}</text>
              </view>
              <view class="info-item">
                <text class="info-dot">•</text>
                <text class="info-text">{{ t('guide.step3Item2') }}</text>
              </view>
              <view class="info-item">
                <text class="info-dot">•</text>
                <text class="info-text">{{ t('guide.step3Item3') }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 步骤4 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">4</view>
            <text class="step-title">{{ t('guide.step4Title') }}</text>
            <view class="step-tag success">{{ t('guide.step4Tag') }}</view>
          </view>
          <view class="step-content">
            <text class="step-desc">{{ t('guide.step4Desc1') }}</text>
            <text class="step-desc">{{ t('guide.step4Desc2') }}</text>
            <text class="step-desc">{{ t('guide.step4Desc3') }}</text>
            <view class="step-note">
              <text class="note-text">{{ t('guide.step4Note') }}</text>
            </view>
          </view>
        </view>

        <!-- 步骤5 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">5</view>
            <text class="step-title">{{ t('guide.step5Title') }}</text>
            <view class="step-tag final">{{ t('guide.step5Tag') }}</view>
          </view>
          <view class="step-content">
            <text class="step-desc">{{ t('guide.step5Desc1') }}</text>
            <text class="step-desc">{{ t('guide.step5Desc2') }}</text>
            <text class="step-desc">{{ t('guide.step5Desc3') }}</text>
            <text class="step-desc">{{ t('guide.step5Desc4') }}</text>
          </view>
        </view>
      </view>

      <!-- 注意事项 -->
      <view class="tips-section">
        <view class="section-title">
          <text class="title-emoji">⚠️</text>
          <text class="title-text">{{ t('guide.notesTitle') }}</text>
        </view>

        <view class="tips-grid">
          <view class="tip-card">
            <text class="tip-title">{{ t('guide.note1Title') }}</text>
            <text class="tip-content">{{ t('guide.note1Content') }}</text>
          </view>

          <view class="tip-card">
            <text class="tip-title">{{ t('guide.note2Title') }}</text>
            <text class="tip-content">{{ t('guide.note2Content') }}</text>
          </view>

          <view class="tip-card">
            <text class="tip-title">{{ t('guide.note3Title') }}</text>
            <text class="tip-content">{{ t('guide.note3Content') }}</text>
          </view>

          <view class="tip-card">
            <text class="tip-title">{{ t('guide.note4Title') }}</text>
            <text class="tip-content">{{ t('guide.note4Content') }}</text>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="section-title">
          <text class="title-emoji">🚀</text>
          <text class="title-text">{{ t('guide.quickActionsTitle') }}</text>
        </view>

        <view class="action-grid">
          <view class="action-item" @click="calculatePrice">
            <view class="action-icon calculator">💰</view>
            <text class="action-text">{{ t('guide.actionCalculator') }}</text>
          </view>

          <view class="action-item" @click="viewFlow">
            <view class="action-icon flow">🔄</view>
            <text class="action-text">{{ t('guide.actionFlow') }}</text>
          </view>

          <view class="action-item" @click="viewCustoms">
            <view class="action-icon customs">🆔</view>
            <text class="action-text">{{ t('guide.actionCustoms') }}</text>
          </view>

          <view class="action-item" @click="viewShipping">
            <view class="action-icon shipping">📦</view>
            <text class="action-text">{{ t('guide.actionShipping') }}</text>
          </view>

          <view class="action-item" @click="viewFAQ">
            <view class="action-icon faq">❓</view>
            <text class="action-text">{{ t('guide.actionFAQ') }}</text>
          </view>
        </view>
      </view>

      <!-- 底部安全距离 -->
      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { zhLanguagePack, koLanguagePack } from '../../locales/index'

// 初始化多语言系统
onMounted(() => {
  setLanguagePacks({
    zh: zhLanguagePack,
    ko: koLanguagePack
  })
  initLocale()
})

const goBack = () => {
  uni.navigateBack()
}

const openWechat = () => {
  uni.showToast({
    title: '请在微信中搜索"中韩跨境邮"',
    icon: 'none',
    duration: 2000
  })
}

const checkProhibited = () => {
  uni.showToast({
    title: '跳转到禁运清单',
    icon: 'none'
  })
}

const calculatePrice = () => {
  uni.navigateTo({
    url: '/pages/calculator/calculator'
  })
}

const viewFlow = () => {
  uni.navigateTo({
    url: '/pages/flow/flow'
  })
}

const viewCustoms = () => {
  uni.navigateTo({
    url: '/pages/customs/customs'
  })
}

const viewShipping = () => {
  uni.navigateTo({
    url: '/pages/shipping/shipping'
  })
}

const viewFAQ = () => {
  uni.navigateTo({
    url: '/pages/faq/faq'
  })
}
</script>

<style scoped>
/* 页面容器 */
.guide-page {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow-x: hidden;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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

/* 内容滚动区 */
.content-scroll {
  height: calc(100vh - 150rpx);
  padding: 0 30rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* 欢迎卡片 */
.welcome-card {
  background: white;
  border-radius: 32rpx;
  padding: 50rpx;
  text-align: center;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.welcome-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.welcome-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #2c3e50;
  display: block;
  margin-bottom: 12rpx;
}

.welcome-desc {
  font-size: 26rpx;
  color: #7f8c8d;
  display: block;
}

/* 步骤区域 */
.steps-section {
  margin-bottom: 40rpx;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.title-emoji {
  font-size: 40rpx;
  margin-right: 16rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: 600;
  color: white;
}

/* 步骤卡片 */
.step-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.step-number {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 24rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.step-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
}

.step-tag {
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  font-weight: 500;
}

.step-tag.hot {
  background: #ff6b6b;
  color: white;
}

.step-tag:not(.hot):not(.success):not(.final) {
  background: #ffa726;
  color: white;
}

.step-tag.success {
  background: #4ecdc4;
  color: white;
}

.step-tag.final {
  background: #a8e6cf;
  color: #2c3e50;
}

.step-content {
  padding-left: 80rpx;
}

.step-desc {
  font-size: 26rpx;
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 12rpx;
  display: block;
}

.step-subtitle {
  font-size: 24rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16rpx;
  display: block;
}

/* 信息列表 */
.info-list {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16rpx;
  padding: 20rpx;
  margin: 16rpx 0;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8rpx;
}

.info-dot {
  color: #667eea;
  font-size: 24rpx;
  font-weight: bold;
  margin-right: 12rpx;
  margin-top: 4rpx;
}

.info-text {
  font-size: 24rpx;
  color: #34495e;
  line-height: 1.5;
  flex: 1;
}

/* 提示框 */
.step-tip {
  display: flex;
  align-items: center;
  background: rgba(255, 193, 7, 0.1);
  border-left: 4rpx solid #ffc107;
  padding: 16rpx;
  border-radius: 0 12rpx 12rpx 0;
  margin-top: 16rpx;
}

.tip-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
}

.tip-text {
  font-size: 22rpx;
  color: #795548;
  flex: 1;
}

/* 警告框 */
.step-warning {
  display: flex;
  align-items: center;
  background: rgba(244, 67, 54, 0.1);
  border-left: 4rpx solid #f44336;
  padding: 16rpx;
  border-radius: 0 12rpx 12rpx 0;
  margin-top: 16rpx;
}

.warning-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
}

.warning-text {
  font-size: 22rpx;
  color: #d32f2f;
  flex: 1;
  font-weight: 500;
}

/* 注释 */
.step-note {
  background: rgba(158, 158, 158, 0.1);
  border-radius: 12rpx;
  padding: 16rpx;
  margin-top: 16rpx;
}

.note-text {
  font-size: 22rpx;
  color: #7f8c8d;
  line-height: 1.4;
}

/* 注意事项网格 */
.tips-section {
  margin-bottom: 40rpx;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.tip-card {
  background: white;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.tip-title {
  font-size: 24rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12rpx;
  display: block;
}

.tip-content {
  font-size: 22rpx;
  color: #7f8c8d;
  line-height: 1.4;
  display: block;
}

/* 快捷操作 */
.quick-actions {
  margin-bottom: 40rpx;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.action-item {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx 24rpx;
  text-align: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.action-item:active {
  transform: scale(0.96);
}

.action-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 24rpx;
  margin: 0 auto 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}

.action-icon.wechat {
  background: linear-gradient(135deg, #07c160, #00d976);
}

.action-icon.prohibited {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
}

.action-icon.calculator {
  background: linear-gradient(135deg, #ffe66d, #ffbe0b);
}

.action-icon.flow {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.action-icon.customs {
  background: linear-gradient(135deg, #a8e6cf, #88d8a3);
}

.action-icon.shipping {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
}

.action-icon.faq {
  background: linear-gradient(135deg, #ffb3d6, #ff9a9e);
}

.action-icon.service {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.action-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #2c3e50;
}

.bottom-safe {
  height: 60rpx;
}

/* 响应式 */
@media (max-width: 400px) {
  .tips-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .step-content {
    padding-left: 0;
    margin-top: 20rpx;
  }
}
</style>
