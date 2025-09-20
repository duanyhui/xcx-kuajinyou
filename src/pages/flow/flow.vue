<template>
  <view class="flow-page">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">{{ t('flow.title') }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 欢迎卡片 -->
      <view class="welcome-card">
        <view class="welcome-icon">📋</view>
        <text class="welcome-title">{{ t('flow.welcomeTitle') }}</text>
        <text class="welcome-desc">{{ t('flow.welcomeDesc') }}</text>
      </view>

      <!-- 流程图 -->
      <view class="flow-chart">
        <view class="chart-header">
          <text class="chart-title">{{ t('flow.chartTitle') }}</text>
        </view>
        
        <view class="flow-container">
          <!-- 用户操作区域 -->
          <view class="flow-section user-section">
            <view class="section-header">
              <text class="section-title">{{ t('flow.userOperations') }}</text>
            </view>
            
            <view class="flow-steps">
              <view class="flow-step">
                <view class="step-box user-box">
                  <text class="step-text">{{ t('flow.packagePreview') }}</text>
                </view>
                <view class="step-arrow down"></view>
              </view>
              
              <view class="flow-step">
                <view class="step-box user-box">
                  <text class="step-text">{{ t('flow.submitShipping') }}</text>
                </view>
                <view class="step-arrow down"></view>
              </view>
              
              <view class="flow-step">
                <view class="step-box user-box">
                  <text class="step-text">{{ t('flow.payShippingFee') }}</text>
                </view>
                <view class="step-arrow down"></view>
              </view>
              
              <view class="flow-step last">
                <view class="step-box user-box">
                  <text class="step-text">{{ t('flow.receivePackage') }}</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 仓库操作区域 -->
          <view class="flow-section warehouse-section">
            <view class="section-header">
              <text class="section-title">{{ t('flow.warehouseOperations') }}</text>
            </view>
            
            <view class="flow-steps">
              <view class="flow-step">
                <view class="step-box warehouse-box">
                  <text class="step-text">{{ t('flow.warehouseReceive') }}</text>
                </view>
                <view class="step-arrow down"></view>
              </view>
              
              <view class="flow-step">
                <view class="step-box warehouse-box">
                  <text class="step-text">{{ t('flow.packagePacking') }}</text>
                </view>
                <view class="step-arrow down"></view>
              </view>
              
              <view class="flow-step last">
                <view class="step-box warehouse-box">
                  <text class="step-text">{{ t('flow.warehouseShipping') }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 流程详解 -->
      <view class="flow-details">
        <view class="details-header">
          <text class="details-title">{{ t('flow.detailsTitle') }}</text>
        </view>
        
        <view class="detail-cards">
          <view class="detail-card user-card">
            <view class="card-header">
              <text class="card-emoji">👤</text>
              <text class="card-title">{{ t('flow.userCard') }}</text>
            </view>
            <view class="card-content">
              <view class="detail-item">
                <text class="detail-number">1️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.userDetail1') }}</text> - {{ t('flow.userDetail1Desc') }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-number">2️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.userDetail2') }}</text> - {{ t('flow.userDetail2Desc') }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-number">3️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.userDetail3') }}</text> - {{ t('flow.userDetail3Desc') }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-number">4️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.userDetail4') }}</text> - {{ t('flow.userDetail4Desc') }}</text>
              </view>
            </view>
          </view>

          <view class="detail-card warehouse-card">
            <view class="card-header">
              <text class="card-emoji">🏢</text>
              <text class="card-title">{{ t('flow.warehouseCard') }}</text>
            </view>
            <view class="card-content">
              <view class="detail-item">
                <text class="detail-number">1️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.warehouseDetail1') }}</text> - {{ t('flow.warehouseDetail1Desc') }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-number">2️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.warehouseDetail2') }}</text> - {{ t('flow.warehouseDetail2Desc') }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-number">3️⃣</text>
                <text class="detail-text"><text class="highlight">{{ t('flow.warehouseDetail3') }}</text> - {{ t('flow.warehouseDetail3Desc') }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 温馨提示 -->
      <view class="tips-section">
        <view class="tips-header">
          <text class="tips-title">{{ t('flow.tipsTitle') }}</text>
        </view>
        <view class="tips-content">
          <view class="tip-item">
            <text class="tip-icon">🔔</text>
            <text class="tip-text">{{ t('flow.tip1') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-icon">⏰</text>
            <text class="tip-text">{{ t('flow.tip2') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-icon">📦</text>
            <text class="tip-text">{{ t('flow.tip3') }}</text>
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
</script>

<style scoped>
/* 页面容器 */
.flow-page {
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

/* 流程图 */
.flow-chart {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.chart-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.chart-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
}

.flow-container {
  display: flex;
  position: relative;
}

.flow-section {
  flex: 1;
  padding: 20rpx;
}

.user-section {
  background: rgba(76, 217, 100, 0.1);
  border-radius: 20rpx;
  margin-right: 10rpx;
}

.warehouse-section {
  background: rgba(0, 122, 255, 0.1);
  border-radius: 20rpx;
  margin-left: 10rpx;
}

.section-header {
  text-align: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 24rpx;
  font-weight: 600;
  color: #2c3e50;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flow-step {
  margin-bottom: 30rpx;
}

.flow-step.last {
  margin-bottom: 0;
}

.step-box {
  padding: 20rpx 30rpx;
  border-radius: 16rpx;
  min-width: 120rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.user-box {
  background: white;
  border: 2rpx solid #4cd964;
}

.warehouse-box {
  background: white;
  border: 2rpx solid #007aff;
}

.step-text {
  font-size: 22rpx;
  font-weight: 500;
  color: #2c3e50;
}

.step-arrow {
  width: 0;
  height: 0;
  margin: 10rpx auto;
}

.step-arrow.down {
  border-left: 12rpx solid transparent;
  border-right: 12rpx solid transparent;
  border-top: 20rpx solid #95a5a6;
}

/* 流程详解 */
.flow-details {
  margin-bottom: 40rpx;
}

.details-header {
  text-align: center;
  margin-bottom: 30rpx;
}

.details-title {
  font-size: 28rpx;
  font-weight: 600;
  color: white;
}

.detail-cards {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.detail-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.user-card {
  border-left: 6rpx solid #4cd964;
}

.warehouse-card {
  border-left: 6rpx solid #007aff;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.card-emoji {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.card-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.detail-number {
  font-size: 20rpx;
  margin-right: 12rpx;
  margin-top: 2rpx;
}

.detail-text {
  font-size: 24rpx;
  color: #34495e;
  line-height: 1.5;
  flex: 1;
}

.highlight {
  font-weight: 600;
  color: #667eea;
}

/* 温馨提示 */
.tips-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.tips-header {
  text-align: center;
  margin-bottom: 24rpx;
}

.tips-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
  padding: 16rpx;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 12rpx;
  border-left: 4rpx solid #ffc107;
}

.tip-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
  margin-top: 2rpx;
}

.tip-text {
  font-size: 22rpx;
  color: #795548;
  line-height: 1.4;
  flex: 1;
}

.bottom-safe {
  height: 60rpx;
}

/* 响应式 */
@media (max-width: 400px) {
  .flow-container {
    flex-direction: column;
  }
  
  .flow-section {
    margin: 0 0 20rpx 0;
  }
  
  .connection-area {
    display: none;
  }
}
</style>
