<template>
  <view class="customs-page">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">如何获取个人通关号</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 欢迎卡片 -->
      <view class="welcome-card">
        <view class="welcome-icon">🆔</view>
        <text class="welcome-title">个人通关号申请攻略！</text>
        <text class="welcome-desc">轻松搞定韩国个人通关号～</text>
      </view>

      <!-- 重要说明 -->
      <view class="important-info">
        <view class="info-header">
          <text class="info-icon">⚠️</text>
          <text class="info-title">重要提醒</text>
        </view>
        <view class="info-content">
          <view class="info-item">
            <text class="info-bullet">•</text>
            <text class="info-text">个人通关号码是以<text class="highlight">P开头的一串数字</text></text>
          </view>
          <view class="info-item">
            <text class="info-bullet">•</text>
            <text class="info-text">这是发运必须提交的<text class="highlight">关键数据</text></text>
          </view>
          <view class="info-item">
            <text class="info-bullet">•</text>
            <text class="info-text">需要登录<text class="highlight">韩国海关网站</text>申请</text>
          </view>
        </view>
      </view>

      <!-- 申请步骤 -->
      <view class="steps-section">
        <view class="section-header">
          <text class="section-title">📝 申请步骤</text>
        </view>
        
        <view class="step-card">
          <view class="step-number">1</view>
          <view class="step-content">
            <text class="step-title">访问韩国海关网站</text>
            <text class="step-desc">点击下方链接即可直接访问</text>
            <view class="link-container" @click="openWebsite">
              <text class="link-text">unipass.customs.go.kr/csp/persIndex.do</text>
              <text class="link-icon">🔗</text>
            </view>
          </view>
        </view>

        <view class="step-card">
          <view class="step-number">2</view>
          <view class="step-content">
            <text class="step-title">选择申请类型</text>
            <text class="step-desc">在网站首页找到个人通关号码申请入口</text>
            <view class="feature-tags">
              <view class="feature-tag">
                <text class="tag-text">조회 (查询)</text>
              </view>
              <view class="feature-tag">
                <text class="tag-text">신규발급 (新发放)</text>
              </view>
            </view>
          </view>
        </view>

        <view class="step-card">
          <view class="step-number">3</view>
          <view class="step-content">
            <text class="step-title">填写个人信息</text>
            <text class="step-desc">按照页面提示填写真实个人信息</text>
            <view class="info-tips">
              <view class="tip-item">
                <text class="tip-icon">📝</text>
                <text class="tip-text">姓名要与护照完全一致</text>
              </view>
              <view class="tip-item">
                <text class="tip-icon">📅</text>
                <text class="tip-text">生日格式要正确</text>
              </view>
              <view class="tip-item">
                <text class="tip-icon">📧</text>
                <text class="tip-text">邮箱地址要能正常接收</text>
              </view>
            </view>
          </view>
        </view>

        <view class="step-card">
          <view class="step-number">4</view>
          <view class="step-content">
            <text class="step-title">提交申请</text>
            <text class="step-desc">完成申请后会收到通关号码</text>
            <view class="success-note">
              <text class="success-icon">✅</text>
              <text class="success-text">申请成功后，通关号会发送到你的邮箱</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 备用方案 -->
      <view class="alternative-section">
        <view class="alt-header">
          <text class="alt-title">🆘 无法申请怎么办？</text>
        </view>
        <view class="alt-card">
          <view class="alt-content">
            <text class="alt-main">如果无法申请个人通关号，可以使用护照号</text>
            <text class="alt-warning">将通过简易申报进行清关</text>
          </view>
          <view class="alt-note">
            <text class="note-icon">💡</text>
            <text class="note-text">护照号也是有效的清关方式，不用担心哦～</text>
          </view>
        </view>
      </view>

      <!-- 网站截图展示 -->


      <!-- 常见问题 -->
      <view class="faq-section">
        <view class="faq-header">
          <text class="faq-title">❓ 常见问题</text>
        </view>
        
        <view class="faq-item">
          <view class="question">
            <text class="q-icon">Q:</text>
            <text class="q-text">申请需要多长时间？</text>
          </view>
          <view class="answer">
            <text class="a-icon">A:</text>
            <text class="a-text">通常几分钟就能完成，立即获得通关号</text>
          </view>
        </view>

        <view class="faq-item">
          <view class="question">
            <text class="q-icon">Q:</text>
            <text class="q-text">通关号有有效期吗？</text>
          </view>
          <view class="answer">
            <text class="a-icon">A:</text>
            <text class="a-text">个人通关号长期有效，申请一次可重复使用</text>
          </view>
        </view>

        <view class="faq-item">
          <view class="question">
            <text class="q-icon">Q:</text>
            <text class="q-text">忘记通关号怎么办？</text>
          </view>
          <view class="answer">
            <text class="a-icon">A:</text>
            <text class="a-text">可以在网站上用个人信息查询，或联系客服</text>
          </view>
        </view>
      </view>

      <!-- 联系帮助 -->
      <view class="help-section">
        <view class="help-header">
          <text class="help-title">🤝 需要帮助？</text>
        </view>
        <view class="help-content">
          <text class="help-text">如果申请过程中遇到困难，随时联系我们的客服小姐姐</text>
          <view class="help-actions">
            <view class="help-btn" @click="contactService">
              <text class="help-btn-text">联系客服</text>
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
const goBack = () => {
  uni.navigateBack()
}

const openWebsite = () => {
  uni.setClipboardData({
    data: 'unipass.customs.go.kr/csp/persIndex.do',
    success: () => {
      uni.showToast({
        title: '网址已复制到剪贴板',
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
