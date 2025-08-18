<template>
  <view class="page-container">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">发货需知</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 头部标题 -->
    <view class="header">
      <view class="header-content">
        <text class="header-title">📦 发货需知</text>
        <text class="header-subtitle">新手必看，发货不踩坑！</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 重要提醒 -->
      <view class="section-card important-card">
        <view class="section-header">
          <text class="section-icon">⚠️</text>
          <text class="section-title">重要提醒</text>
        </view>
        <view class="important-content">
          <view class="important-item">
            <text class="important-text">🚫 禁寄物品请勿邮寄，违者后果自负</text>
          </view>
          <view class="important-item">
            <text class="important-text">📋 发货前请详细阅读以下须知</text>
          </view>
          <view class="important-item">
            <text class="important-text">💰 超重、超尺寸将产生额外费用</text>
          </view>
        </view>
      </view>

      <!-- 包装要求 -->
      <view class="section-card">
        <view class="section-header">
          <text class="section-icon">📦</text>
          <text class="section-title">包装要求</text>
        </view>
        <view class="content-list">
          <view class="content-item">
            <text class="item-title">• 包装材料</text>
            <text class="item-desc">使用质量好的纸箱或塑料袋，避免破损</text>
          </view>
          <view class="content-item">
            <text class="item-title">• 内部填充</text>
            <text class="item-desc">易碎物品需用泡沫、气泡膜等填充材料</text>
          </view>
          <view class="content-item">
            <text class="item-title">• 密封处理</text>
            <text class="item-desc">用透明胶带密封，确保包裹不会散落</text>
          </view>
          <view class="content-item">
            <text class="item-title">• 标签粘贴</text>
            <text class="item-desc">面单粘贴在平整面，避免折角处</text>
          </view>
        </view>
      </view>

      <!-- 禁寄物品 -->
      <view class="section-card danger-card">
        <view class="section-header">
          <text class="section-icon">🚫</text>
          <text class="section-title">禁寄物品</text>
        </view>
        <view class="danger-content">
          <view class="danger-category">
            <text class="category-title">🔋 电池类</text>
            <text class="category-desc">锂电池、充电宝、电子烟等</text>
          </view>
          <view class="danger-category">
            <text class="category-title">💊 液体类</text>
            <text class="category-desc">化妆品、香水、药品、食品等</text>
          </view>
          <view class="danger-category">
            <text class="category-title">🔪 尖锐物</text>
            <text class="category-desc">刀具、剪刀、指甲刀等</text>
          </view>
          <view class="danger-category">
            <text class="category-title">💎 贵重物品</text>
            <text class="category-desc">现金、首饰、古董等</text>
          </view>
        </view>
      </view>

      <!-- 重量尺寸 -->
      <view class="section-card">
        <view class="section-header">
          <text class="section-icon">⚖️</text>
          <text class="section-title">重量尺寸限制</text>
        </view>
        <view class="limit-content">
          <view class="limit-item">
            <view class="limit-label">
              <text class="limit-icon">📏</text>
              <text class="limit-title">单边长度</text>
            </view>
            <text class="limit-value">≤ 60cm</text>
          </view>
          <view class="limit-item">
            <view class="limit-label">
              <text class="limit-icon">📐</text>
              <text class="limit-title">长+宽+高</text>
            </view>
            <text class="limit-value">≤ 120cm</text>
          </view>
          <view class="limit-item">
            <view class="limit-label">
              <text class="limit-icon">⚖️</text>
              <text class="limit-title">单件重量</text>
            </view>
            <text class="limit-value">≤ 20kg</text>
          </view>
        </view>
      </view>

      <!-- 费用说明 -->
      <view class="section-card">
        <view class="section-header">
          <text class="section-icon">💰</text>
          <text class="section-title">费用说明</text>
        </view>
        <view class="fee-content">
          <view class="fee-item">
            <text class="fee-title">💵 基础运费</text>
            <text class="fee-desc">按重量和体积计费，取较大值</text>
          </view>
          <view class="fee-item">
            <text class="fee-title">📋 通关费</text>
            <text class="fee-desc">个人物品无需额外通关费</text>
          </view>
          <view class="fee-item">
            <text class="fee-title">🎁 保险费</text>
            <text class="fee-desc">建议购买，保障物品安全</text>
          </view>
        </view>
      </view>

      <!-- 小贴士 -->
      <view class="section-card tips-card">
        <view class="section-header">
          <text class="section-icon">💡</text>
          <text class="section-title">发货小贴士</text>
        </view>
        <view class="tips-content">
          <view class="tip-item">
            <text class="tip-emoji">✨</text>
            <text class="tip-text">提前1-2天预约取件，避免节假日延误</text>
          </view>
          <view class="tip-item">
            <text class="tip-emoji">📱</text>
            <text class="tip-text">保存好快递单号，方便查询物流状态</text>
          </view>
          <view class="tip-item">
            <text class="tip-emoji">💬</text>
            <text class="tip-text">有问题及时联系客服，我们随时为您服务</text>
          </view>
          <view class="tip-item">
            <text class="tip-emoji">🎯</text>
            <text class="tip-text">首次发货建议选择标准服务，熟悉流程后再选快速服务</text>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="action-btn primary-btn" @tap="goToCalculator">
          <text class="btn-icon">🧮</text>
          <text class="btn-text">运费计算</text>
        </view>
        <view class="action-btn secondary-btn" @tap="goToFlow">
          <text class="btn-icon">📋</text>
          <text class="btn-text">发货流程</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Shipping',
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
