<template>
  <view class="customs-page">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">{{ t('customs.title') }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 欢迎卡片 -->
      <view class="welcome-card">
        <view class="welcome-icon">🆔</view>
        <text class="welcome-title">{{ t('customs.welcomeTitle') }}</text>
        <text class="welcome-desc">{{ t('customs.welcomeDesc') }}</text>
      </view>

      <!-- 重要说明 -->
      <view class="important-info">
        <view class="info-header">
          <text class="info-icon">⚠️</text>
          <text class="info-title">{{ t('customs.importantTitle') }}</text>
        </view>
        <view class="info-content">
          <view class="info-item">
            <text class="info-bullet">•</text>
            <text class="info-text">{{ t('customs.importantInfo1') }}</text>
          </view>
          <view class="info-item">
            <text class="info-bullet">•</text>
            <text class="info-text">{{ t('customs.importantInfo2') }}</text>
          </view>
          <view class="info-item">
            <text class="info-bullet">•</text>
            <text class="info-text">{{ t('customs.importantInfo3') }}</text>
          </view>
        </view>
      </view>

      <!-- 申请步骤 -->
      <view class="steps-section">
        <view class="section-header">
          <text class="section-title">{{ t('customs.stepsTitle') }}</text>
        </view>
        
        <view class="step-card">
          <view class="step-number">1</view>
          <view class="step-content">
            <text class="step-title">{{ t('customs.step1Title') }}</text>
            <text class="step-desc">{{ t('customs.step1Desc') }}</text>
            <view class="link-container" @click="openWebsite">
              <text class="link-text">unipass.customs.go.kr/csp/persIndex.do</text>
              <text class="link-icon">🔗</text>
            </view>
          </view>
        </view>

        <view class="step-card">
          <view class="step-number">2</view>
          <view class="step-content">
            <text class="step-title">{{ t('customs.step2Title') }}</text>
            <text class="step-desc">{{ t('customs.step2Desc') }}</text>
            <view class="feature-tags">
              <view class="feature-tag">
                <text class="tag-text">{{ t('customs.step2Tag1') }}</text>
              </view>
              <view class="feature-tag">
                <text class="tag-text">{{ t('customs.step2Tag2') }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="step-card">
          <view class="step-number">3</view>
          <view class="step-content">
            <text class="step-title">{{ t('customs.step3Title') }}</text>
            <text class="step-desc">{{ t('customs.step3Desc') }}</text>
            <view class="info-tips">
              <view class="tip-item">
                <text class="tip-icon">📝</text>
                <text class="tip-text">{{ t('customs.step3Tip1') }}</text>
              </view>
              <view class="tip-item">
                <text class="tip-icon">📅</text>
                <text class="tip-text">{{ t('customs.step3Tip2') }}</text>
              </view>
              <view class="tip-item">
                <text class="tip-icon">📧</text>
                <text class="tip-text">{{ t('customs.step3Tip3') }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="step-card">
          <view class="step-number">4</view>
          <view class="step-content">
            <text class="step-title">{{ t('customs.step4Title') }}</text>
            <text class="step-desc">{{ t('customs.step4Desc') }}</text>
            <view class="success-note">
              <text class="success-icon">✅</text>
              <text class="success-text">{{ t('customs.step4Success') }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 备用方案 -->
      <view class="alternative-section">
        <view class="alt-header">
          <text class="alt-title">{{ t('customs.alternativeTitle') }}</text>
        </view>
        <view class="alt-card">
          <view class="alt-content">
            <text class="alt-main">{{ t('customs.alternativeText') }}</text>
            <text class="alt-warning">{{ t('customs.alternativeWarning') }}</text>
          </view>
          <view class="alt-note">
            <text class="note-icon">💡</text>
            <text class="note-text">{{ t('customs.alternativeNote') }}</text>
          </view>
        </view>
      </view>

      <!-- 网站截图展示 -->


      <!-- 常见问题 -->
      <view class="faq-section">
        <view class="faq-header">
          <text class="faq-title">{{ t('customs.faqTitle') }}</text>
        </view>
        
        <view class="faq-item">
          <view class="question">
            <text class="q-icon">Q:</text>
            <text class="q-text">{{ t('customs.faqQ1') }}</text>
          </view>
          <view class="answer">
            <text class="a-icon">A:</text>
            <text class="a-text">{{ t('customs.faqA1') }}</text>
          </view>
        </view>

        <view class="faq-item">
          <view class="question">
            <text class="q-icon">Q:</text>
            <text class="q-text">{{ t('customs.faqQ2') }}</text>
          </view>
          <view class="answer">
            <text class="a-icon">A:</text>
            <text class="a-text">{{ t('customs.faqA2') }}</text>
          </view>
        </view>

        <view class="faq-item">
          <view class="question">
            <text class="q-icon">Q:</text>
            <text class="q-text">{{ t('customs.faqQ3') }}</text>
          </view>
          <view class="answer">
            <text class="a-icon">A:</text>
            <text class="a-text">{{ t('customs.faqA3') }}</text>
          </view>
        </view>
      </view>

      <!-- 联系帮助 -->
      <view class="help-section">
        <view class="help-header">
          <text class="help-title">{{ t('customs.helpTitle') }}</text>
        </view>
        <view class="help-content">
          <text class="help-text">{{ t('customs.helpText') }}</text>
          <view class="help-actions">
            <view class="help-btn" @click="contactService">
              <text class="help-btn-text">{{ t('customs.helpButton') }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部安全距离 -->
      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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

const openWebsite = () => {
  uni.setClipboardData({
    data: 'unipass.customs.go.kr/csp/persIndex.do',
    success: () => {
      uni.showToast({
        title: t('customs.urlCopied'),
        icon: 'success'
      })
    }
  })
}

const contactService = () => {
  uni.makePhoneCall({
    phoneNumber: '0631-5230850'
  })
}
</script>

<style scoped>
/* 页面容器 */
.customs-page {
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

/* 重要信息 */
.important-info {
  background: rgba(255, 107, 107, 0.1);
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  border-left: 6rpx solid #ff6b6b;
}

.info-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.info-icon {
  font-size: 32rpx;
  margin-right: 12rpx;
}

.info-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #d63031;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.info-bullet {
  color: #ff6b6b;
  font-size: 24rpx;
  margin-right: 12rpx;
  font-weight: bold;
  margin-top: 2rpx;
}

.info-text {
  font-size: 24rpx;
  color: #2d3436;
  line-height: 1.5;
  flex: 1;
}

.highlight {
  font-weight: 600;
  color: #d63031;
}

/* 申请步骤 */
.steps-section {
  margin-bottom: 40rpx;
}

.section-header {
  text-align: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: white;
}

.step-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  display: flex;
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
  margin-right: 24rpx;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8rpx;
  display: block;
}

.step-desc {
  font-size: 22rpx;
  color: #7f8c8d;
  margin-bottom: 16rpx;
  display: block;
}

/* 链接容器 */
.link-container {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12rpx;
  padding: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1rpx solid rgba(102, 126, 234, 0.3);
}

.link-text {
  font-size: 22rpx;
  color: #667eea;
  font-weight: 500;
  flex: 1;
}

.link-icon {
  font-size: 24rpx;
}

/* 功能标签 */
.feature-tags {
  display: flex;
  gap: 12rpx;
  margin-top: 12rpx;
}

.feature-tag {
  background: rgba(76, 217, 100, 0.1);
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  border: 1rpx solid rgba(76, 217, 100, 0.3);
}

.tag-text {
  font-size: 20rpx;
  color: #4cd964;
  font-weight: 500;
}

/* 信息提示 */
.info-tips {
  margin-top: 16rpx;
}

.tip-item {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.tip-icon {
  font-size: 20rpx;
  margin-right: 8rpx;
}

.tip-text {
  font-size: 20rpx;
  color: #6c757d;
}

/* 成功提示 */
.success-note {
  background: rgba(76, 217, 100, 0.1);
  border-radius: 12rpx;
  padding: 16rpx;
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  border-left: 4rpx solid #4cd964;
}

.success-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
}

.success-text {
  font-size: 22rpx;
  color: #27ae60;
  flex: 1;
}

/* 备用方案 */
.alternative-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.alt-header {
  text-align: center;
  margin-bottom: 24rpx;
}

.alt-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.alt-card {
  background: rgba(255, 193, 7, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  border-left: 4rpx solid #ffc107;
}

.alt-content {
  margin-bottom: 16rpx;
}

.alt-main {
  font-size: 24rpx;
  color: #2c3e50;
  font-weight: 500;
  display: block;
  margin-bottom: 8rpx;
}

.alt-warning {
  font-size: 22rpx;
  color: #e17055;
  display: block;
}

.alt-note {
  display: flex;
  align-items: center;
}

.note-icon {
  font-size: 20rpx;
  margin-right: 8rpx;
}

.note-text {
  font-size: 20rpx;
  color: #795548;
  flex: 1;
}

/* 截图展示 */
.screenshot-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.screenshot-header {
  text-align: center;
  margin-bottom: 24rpx;
}

.screenshot-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.screenshot-placeholder {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 40rpx;
  text-align: center;
  margin-bottom: 20rpx;
  border: 2rpx dashed #dee2e6;
}

.placeholder-icon {
  font-size: 60rpx;
  margin-bottom: 12rpx;
  display: block;
}

.placeholder-text {
  font-size: 24rpx;
  color: #495057;
  font-weight: 500;
  display: block;
  margin-bottom: 8rpx;
}

.placeholder-desc {
  font-size: 20rpx;
  color: #6c757d;
  display: block;
}

.screenshot-features {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 12rpx 16rpx;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12rpx;
}

.feature-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
}

.feature-text {
  font-size: 22rpx;
  color: #495057;
  flex: 1;
}

/* 常见问题 */
.faq-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.faq-header {
  text-align: center;
  margin-bottom: 24rpx;
}

.faq-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.faq-item {
  margin-bottom: 24rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f1f2f6;
}

.question {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.q-icon {
  font-size: 22rpx;
  font-weight: 600;
  color: #667eea;
  margin-right: 8rpx;
}

.q-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #2c3e50;
  flex: 1;
}

.answer {
  display: flex;
  align-items: flex-start;
  margin-left: 30rpx;
}

.a-icon {
  font-size: 22rpx;
  font-weight: 600;
  color: #4cd964;
  margin-right: 8rpx;
}

.a-text {
  font-size: 22rpx;
  color: #636e72;
  line-height: 1.5;
  flex: 1;
}

/* 联系帮助 */
.help-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

.help-header {
  margin-bottom: 20rpx;
}

.help-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.help-text {
  font-size: 22rpx;
  color: #636e72;
  line-height: 1.5;
  margin-bottom: 24rpx;
  display: block;
}

.help-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 24rpx;
  padding: 16rpx 32rpx;
  display: inline-block;
}

.help-btn-text {
  color: white;
  font-size: 24rpx;
  font-weight: 500;
}

.bottom-safe {
  height: 60rpx;
}

/* 响应式 */
@media (max-width: 400px) {
  .feature-tags {
    flex-direction: column;
  }
}
</style>
