<template>
  <view class="guide-page">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">操作指南</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 欢迎卡片 -->
      <view class="welcome-card">
        <view class="welcome-icon">✨</view>
        <text class="welcome-title">超详细攻略来啦！</text>
        <text class="welcome-desc">姐妹们，跨境寄包裹再也不踩坑～</text>
      </view>

      <!-- 步骤列表 -->
      <view class="steps-section">
        <view class="section-title">
          <text class="title-emoji">📝</text>
          <text class="title-text">寄件流程</text>
        </view>

        <!-- 步骤1 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">1</view>
            <text class="step-title">获取专属地址</text>
            <view class="step-tag hot">超重要</view>
          </view>
          <view class="step-content">
            <text class="step-desc">👉 进入【我的】→【仓库地址】</text>
            <text class="step-desc">👉 复制你的专属地址和收件人信息</text>
            <text class="step-desc">👉 用这个地址向仓库邮寄包裹</text>
            <view class="step-tip">
              <text class="tip-icon">💡</text>
              <text class="tip-text">记得告诉仓库小哥哥你的地址哦～</text>
            </view>
          </view>
        </view>

        <!-- 步骤2 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">2</view>
            <text class="step-title">包裹预报</text>
            <view class="step-tag">必做</view>
          </view>
          <view class="step-content">
            <text class="step-desc">📦 包裹寄出后立即预报</text>
            <text class="step-desc">📱 微信关注【中韩跨境邮】</text>
            <text class="step-desc">🔍 点击【集运服务】→【包裹预报】</text>
            <view class="step-warning">
              <text class="warning-icon">⚠️</text>
              <text class="warning-text">不支持一个快递拆分多个订单给不同收件人</text>
            </view>
          </view>
        </view>

        <!-- 步骤3 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">3</view>
            <text class="step-title">填写信息</text>
            <view class="step-tag">仔细</view>
          </view>
          <view class="step-content">
            <text class="step-subtitle">📋 预报时需要填写：</text>
            <view class="info-list">
              <view class="info-item">
                <text class="info-dot">•</text>
                <text class="info-text">快递单号（要准确哦）</text>
              </view>
              <view class="info-item">
                <text class="info-dot">•</text>
                <text class="info-text">商品详细信息</text>
              </view>
              <view class="info-item">
                <text class="info-dot">•</text>
                <text class="info-text">价格用人民币（如实填写）</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 步骤4 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">4</view>
            <text class="step-title">入库确认</text>
            <view class="step-tag success">自动</view>
          </view>
          <view class="step-content">
            <text class="step-desc">📸 仓库会拍照验货</text>
            <text class="step-desc">📨 微信公众号推送入库消息</text>
            <text class="step-desc">👀 点击查看入库详情</text>
            <view class="step-note">
              <text class="note-text">如果选择了拆包检查服务，会有详细拆包照片</text>
            </view>
          </view>
        </view>

        <!-- 步骤5 -->
        <view class="step-card">
          <view class="step-header">
            <view class="step-number">5</view>
            <text class="step-title">发货出库</text>
            <view class="step-tag final">最后</view>
          </view>
          <view class="step-content">
            <text class="step-desc">🚚 仓库按要求收货打包</text>
            <text class="step-desc">📤 点击【集运发货】→【下单发运】</text>
            <text class="step-desc">🎯 指定包裹和收货地址</text>
            <text class="step-desc">🛫 次日即可到达韩国清关</text>
          </view>
        </view>
      </view>

      <!-- 注意事项 -->
      <view class="tips-section">
        <view class="section-title">
          <text class="title-emoji">⚠️</text>
          <text class="title-text">注意事项</text>
        </view>

        <view class="tips-grid">
          <view class="tip-card">
            <text class="tip-title">💰 价格填写</text>
            <text class="tip-content">必须如实填写，虚报会导致扣货或罚款</text>
          </view>

          <view class="tip-card">
            <text class="tip-title">📦 拆包服务</text>
            <text class="tip-content">收费增值服务，可选择是否开通</text>
          </view>

          <view class="tip-card">
            <text class="tip-title">📋 商品分类</text>
            <text class="tip-content">多种商品要分别录入，不能混合申报</text>
          </view>

          <view class="tip-card">
            <text class="tip-title">🚫 禁运物品</text>
            <text class="tip-content">查看禁运清单，避免违禁物品</text>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="section-title">
          <text class="title-emoji">🚀</text>
          <text class="title-text">快捷操作</text>
        </view>

        <view class="action-grid">
          <view class="action-item" @click="openWechat">
            <view class="action-icon wechat">📱</view>
            <text class="action-text">关注公众号</text>
          </view>

          <view class="action-item" @click="checkProhibited">
            <view class="action-icon prohibited">🚫</view>
            <text class="action-text">禁运清单</text>
          </view>

          <view class="action-item" @click="calculatePrice">
            <view class="action-icon calculator">💰</view>
            <text class="action-text">运费计算</text>
          </view>

          <view class="action-item" @click="contactService">
            <view class="action-icon service">💬</view>
            <text class="action-text">联系客服</text>
          </view>
        </view>
      </view>

      <!-- 底部安全距离 -->
      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const contactService = () => {
  uni.makePhoneCall({
    phoneNumber: '0631-5230850'
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
