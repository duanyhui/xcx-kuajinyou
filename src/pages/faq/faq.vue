<template>
  <view class="page-container">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">{{ t('faq.title') }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 头部标题 -->
    <view class="header">
      <view class="header-content">
        <text class="header-title">{{ t('faq.headerTitle') }}</text>
        <text class="header-subtitle">{{ t('faq.headerSubtitle') }}</text>
      </view>
    </view>

    <!-- 搜索框 -->
    <view class="search-section">
      <view class="search-box">
        <text class="search-icon">🔍</text>
        <input class="search-input" :placeholder="t('faq.searchPlaceholder')" v-model="searchText" />
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 搜索结果为空时的提示 -->
      <view v-if="searchText && searchResults.length === 0" class="no-results">
        <text class="no-results-icon">😅</text>
        <text class="no-results-text">没有找到相关问题</text>
        <text class="no-results-desc">试试其他关键词吧～</text>
      </view>

      <!-- 热门问题 -->
      <view v-if="!searchText" class="section-card hot-card">
        <view class="section-header">
          <text class="section-icon">🔥</text>
          <text class="section-title">热门问题</text>
        </view>
        <view class="hot-questions">
          <view class="hot-item" @tap="scrollToQuestion('shipping-time')">
            <text class="hot-text">多长时间能到韩国？</text>
            <text class="hot-arrow">→</text>
          </view>
          <view class="hot-item" @tap="scrollToQuestion('fee-calculation')">
            <text class="hot-text">运费怎么计算？</text>
            <text class="hot-arrow">→</text>
          </view>
          <view class="hot-item" @tap="scrollToQuestion('prohibited-items')">
            <text class="hot-text">什么东西不能邮寄？</text>
            <text class="hot-arrow">→</text>
          </view>
          <view class="hot-item" @tap="scrollToQuestion('customs-code')">
            <text class="hot-text">什么是个人通关号？</text>
            <text class="hot-arrow">→</text>
          </view>
        </view>
      </view>

      <!-- 发货相关 -->
      <view v-if="categorizedQuestions.shipping.length > 0" class="section-card">
        <view class="section-header">
          <text class="section-icon">📦</text>
          <text class="section-title">发货相关</text>
        </view>
        <view class="qa-list">
          <view 
            v-for="item in categorizedQuestions.shipping" 
            :key="item.id"
            class="qa-item" 
            :id="item.id"
          >
            <view class="question" @tap="toggleAnswer(item.id)">
              <text class="q-text">{{ item.question }}</text>
              <text class="q-icon">{{ expandedQuestions[item.id] ? '-' : '+' }}</text>
            </view>
            <view class="answer" :class="{ 'show': expandedQuestions[item.id] }">
              <text class="a-text">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 费用相关 -->
      <view v-if="categorizedQuestions.fee.length > 0" class="section-card">
        <view class="section-header">
          <text class="section-icon">💰</text>
          <text class="section-title">费用相关</text>
        </view>
        <view class="qa-list">
          <view 
            v-for="item in categorizedQuestions.fee" 
            :key="item.id"
            class="qa-item" 
            :id="item.id"
          >
            <view class="question" @tap="toggleAnswer(item.id)">
              <text class="q-text">{{ item.question }}</text>
              <text class="q-icon">{{ expandedQuestions[item.id] ? '-' : '+' }}</text>
            </view>
            <view class="answer" :class="{ 'show': expandedQuestions[item.id] }">
              <text class="a-text">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 禁寄物品 -->
      <view v-if="categorizedQuestions.prohibited.length > 0" class="section-card">
        <view class="section-header">
          <text class="section-icon">🚫</text>
          <text class="section-title">禁寄物品</text>
        </view>
        <view class="qa-list">
          <view 
            v-for="item in categorizedQuestions.prohibited" 
            :key="item.id"
            class="qa-item" 
            :id="item.id"
          >
            <view class="question" @tap="toggleAnswer(item.id)">
              <text class="q-text">{{ item.question }}</text>
              <text class="q-icon">{{ expandedQuestions[item.id] ? '-' : '+' }}</text>
            </view>
            <view class="answer" :class="{ 'show': expandedQuestions[item.id] }">
              <text class="a-text">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 通关相关 -->
      <view v-if="categorizedQuestions.customs.length > 0" class="section-card">
        <view class="section-header">
          <text class="section-icon">📋</text>
          <text class="section-title">通关相关</text>
        </view>
        <view class="qa-list">
          <view 
            v-for="item in categorizedQuestions.customs" 
            :key="item.id"
            class="qa-item" 
            :id="item.id"
          >
            <view class="question" @tap="toggleAnswer(item.id)">
              <text class="q-text">{{ item.question }}</text>
              <text class="q-icon">{{ expandedQuestions[item.id] ? '-' : '+' }}</text>
            </view>
            <view class="answer" :class="{ 'show': expandedQuestions[item.id] }">
              <text class="a-text">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 联系我们 -->
      <view class="section-card contact-card">
        <view class="section-header">
          <text class="section-icon">💬</text>
          <text class="section-title">还有疑问？</text>
        </view>
        <view class="contact-content">
          <text class="contact-text">找不到答案？我们的客服小姐姐随时为您解答～</text>
          <view class="contact-actions">
            <view class="contact-btn" @tap="contactService">
              <text class="contact-icon">💬</text>
              <text class="contact-label">在线客服</text>
            </view>
            <view class="contact-btn" @tap="callService">
              <text class="contact-icon">📞</text>
              <text class="contact-label">电话咨询</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="action-btn primary-btn" @tap="goToShipping">
          <text class="btn-icon">📦</text>
          <text class="btn-text">发货需知</text>
        </view>
        <view class="action-btn secondary-btn" @tap="goToGuide">
          <text class="btn-icon">📖</text>
          <text class="btn-text">操作指南</text>
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
  name: 'FAQ',
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
  data() {
    return {
      searchText: '',
      expandedQuestions: {}, // 记录展开状态的问题
      allQuestions: [
        // 发货相关
        {
          id: 'shipping-time',
          category: 'shipping',
          question: 'Q: 包裹多长时间能到韩国？',
          answer: 'A: 海运7-10个工作日，空运3-5个工作日。具体时效受海关检查、天气等因素影响。',
          keywords: '时间 多久 到达 韩国 海运 空运 工作日'
        },
        {
          id: 'shipping-pickup',
          category: 'shipping',
          question: 'Q: 可以上门取件吗？',
          answer: 'A: 可以！我们提供上门取件服务，需提前1-2天预约。部分偏远地区可能无法覆盖。',
          keywords: '上门 取件 预约 偏远地区'
        },
        {
          id: 'shipping-package',
          category: 'shipping',
          question: 'Q: 包装有什么要求？',
          answer: 'A: 使用结实的纸箱或塑料袋，易碎品需填充保护材料，用透明胶带密封，面单粘贴在平整面。详情查看"发货需知"页面。',
          keywords: '包装 要求 纸箱 塑料袋 易碎 填充 密封 胶带 面单'
        },
        {
          id: 'shipping-weight-limit',
          category: 'shipping',
          question: 'Q: 重量和尺寸有什么限制？',
          answer: 'A: 单件重量≤20kg，单边长度≤60cm，长+宽+高≤120cm。超出限制将产生额外费用。',
          keywords: '重量 尺寸 限制 20kg 60cm 120cm 额外费用'
        },
        // 费用相关
        {
          id: 'fee-calculation',
          category: 'fee',
          question: 'Q: 运费是怎么计算的？',
          answer: 'A: 按重量计费。海运首重25元+续重6元/kg，空运首重33.8元+续重9元/0.5kg。使用运费计算器可精确计算。',
          keywords: '运费 计算 重量 海运 25元 6元 空运 33.8元 9元 计算器'
        },
        {
          id: 'fee-extra',
          category: 'fee',
          question: 'Q: 有额外费用吗？',
          answer: 'A: 基础运费外，可选购保险服务。个人物品无需额外通关费。超重超尺寸会产生额外费用，发货前请仔细核对。',
          keywords: '额外费用 保险 通关费 个人物品 超重 超尺寸'
        },
        {
          id: 'fee-payment',
          category: 'fee',
          question: 'Q: 支持哪些支付方式？',
          answer: 'A: 支持微信支付、支付宝、银行卡等多种支付方式，安全便捷。',
          keywords: '支付方式 微信支付 支付宝 银行卡'
        },
        // 禁寄物品
        {
          id: 'prohibited-items',
          category: 'prohibited',
          question: 'Q: 哪些物品不能邮寄？',
          answer: 'A: 禁寄电池类（锂电池、充电宝、电子烟）、液体类（化妆品、香水、药品）、尖锐物（刀具、剪刀）、贵重物品（现金、首饰）等。详细清单请查看"发货需知"页面。',
          keywords: '禁寄 物品 电池 锂电池 充电宝 电子烟 液体 化妆品 香水 药品 尖锐物 刀具 剪刀 贵重物品 现金 首饰'
        },
        {
          id: 'prohibited-cosmetics',
          category: 'prohibited',
          question: 'Q: 化妆品可以邮寄吗？',
          answer: 'A: 液体类化妆品不可邮寄，粉状、固体类可以。建议发货前咨询客服确认。',
          keywords: '化妆品 液体 粉状 固体 客服'
        },
        {
          id: 'prohibited-food',
          category: 'prohibited',
          question: 'Q: 食品可以邮寄吗？',
          answer: 'A: 密封包装的干货类食品可以，但需符合韩国海关要求。新鲜食品、液体食品不可邮寄。',
          keywords: '食品 密封 干货 韩国海关 新鲜 液体'
        },
        // 通关相关
        {
          id: 'customs-code',
          category: 'customs',
          question: 'Q: 什么是个人通关号？',
          answer: 'A: 个人通关号是以P开头的一串数字，是韩国海关的身份识别码，用于清关。每个收件人都需要提供，详情查看相关页面。',
          keywords: '个人通关号 P开头 数字 韩国海关 身份识别码 清关 收件人'
        },
        {
          id: 'customs-detained',
          category: 'customs',
          question: 'Q: 包裹被海关扣留怎么办？',
          answer: 'A: 我们会协助处理，通常需要提供相关证明文件。请保持联系方式畅通，配合处理流程。',
          keywords: '海关 扣留 协助 证明文件 联系方式 流程'
        },
        {
          id: 'customs-tax',
          category: 'customs',
          question: 'Q: 需要缴纳关税吗？',
          answer: 'A: 个人物品一般无需缴纳关税，但超过限额或商业用途可能产生关税，由收件人承担。',
          keywords: '关税 个人物品 限额 商业用途 收件人'
        }
      ],
      filteredQuestions: []
    }
  },
  computed: {
    searchResults() {
      if (!this.searchText.trim()) {
        return this.allQuestions
      }
      
      const searchTerm = this.searchText.toLowerCase()
      return this.allQuestions.filter(item => {
        return item.question.toLowerCase().includes(searchTerm) ||
               item.answer.toLowerCase().includes(searchTerm) ||
               item.keywords.toLowerCase().includes(searchTerm)
      })
    },
    
    categorizedQuestions() {
      const categories = {
        shipping: this.searchResults.filter(q => q.category === 'shipping'),
        fee: this.searchResults.filter(q => q.category === 'fee'),
        prohibited: this.searchResults.filter(q => q.category === 'prohibited'),
        customs: this.searchResults.filter(q => q.category === 'customs')
      }
      return categories
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    toggleAnswer(questionId) {
      // 直接使用传入的问题ID切换展开状态
      this.$set(this.expandedQuestions, questionId, !this.expandedQuestions[questionId]);
    },
    scrollToQuestion(id) {
      // 滚动到指定问题并展开
      this.$set(this.expandedQuestions, id, true);
      uni.pageScrollTo({
        selector: `#${id}`,
        duration: 300
      });
    },
    contactService() {
      // 联系在线客服
      uni.showToast({
        title: '正在连接客服...',
        icon: 'loading'
      });
    },
    callService() {
      // 拨打客服电话
      uni.makePhoneCall({
        phoneNumber: '0631-5230850'
      });
    },
    goToShipping() {
      uni.navigateTo({
        url: '/pages/shipping/shipping'
      });
    },
    goToGuide() {
      uni.navigateTo({
        url: '/pages/guide/guide'
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
  padding: 20rpx 32rpx 24rpx;
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

.search-section {
  padding: 0 32rpx 24rpx;
}

.search-box {
  background: white;
  border-radius: 50rpx;
  padding: 24rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.1);
}

.search-icon {
  font-size: 32rpx;
  color: #999;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.content {
  padding: 0 32rpx 40rpx;
}

.no-results {
  text-align: center;
  padding: 80rpx 32rpx;
  background: white;
  border-radius: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.1);
}

.no-results-icon {
  font-size: 80rpx;
  display: block;
  margin-bottom: 24rpx;
}

.no-results-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #2d3436;
  display: block;
  margin-bottom: 12rpx;
}

.no-results-desc {
  font-size: 28rpx;
  color: #636e72;
  display: block;
}

.section-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.1);
}

.hot-card {
  background: linear-gradient(135deg, #ff7675, #fd79a8);
  color: white;
}

.contact-card {
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

.hot-questions {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.hot-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 24rpx;
  background: rgba(255,255,255,0.2);
  border-radius: 16rpx;
  transition: all 0.3s ease;
}

.hot-item:active {
  transform: scale(0.98);
  background: rgba(255,255,255,0.3);
}

.hot-text {
  font-size: 28rpx;
  font-weight: 500;
}

.hot-arrow {
  font-size: 28rpx;
  font-weight: 600;
}

.qa-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.qa-item {
  border-radius: 16rpx;
  overflow: hidden;
  border: 1rpx solid #f0f0f0;
}

.question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx;
  background: #fafafa;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.question:active {
  background: #f0f0f0;
}

.q-text {
  font-size: 30rpx;
  font-weight: 600;
  color: #2d3436;
  flex: 1;
}

.q-icon {
  font-size: 32rpx;
  font-weight: 600;
  color: #667eea;
  width: 40rpx;
  text-align: center;
}

.answer {
  padding: 24rpx;
  background: white;
  border-top: 1rpx solid #f0f0f0;
  display: none;
  transition: all 0.3s ease;
}

.answer.show {
  display: block;
}

.a-text {
  font-size: 28rpx;
  color: #636e72;
  line-height: 1.6;
}

.contact-content {
  text-align: center;
}

.contact-text {
  font-size: 28rpx;
  line-height: 1.6;
  margin-bottom: 32rpx;
  display: block;
}

.contact-actions {
  display: flex;
  gap: 24rpx;
}

.contact-btn {
  flex: 1;
  padding: 24rpx;
  background: rgba(255,255,255,0.2);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  transition: all 0.3s ease;
}

.contact-btn:active {
  transform: scale(0.95);
  background: rgba(255,255,255,0.3);
}

.contact-icon {
  font-size: 40rpx;
}

.contact-label {
  font-size: 28rpx;
  font-weight: 500;
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
