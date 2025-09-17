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
        <text class="no-results-text">{{ t('faq.noResults') }}</text>
        <text class="no-results-desc">{{ t('faq.noResultsDesc') }}</text>
      </view>

      <!-- 热门问题 -->
      <view v-if="!searchText" class="section-card hot-card">
        <view class="section-header">
          <text class="section-icon">🔥</text>
          <text class="section-title">{{ t('faq.hotQuestions') }}</text>
        </view>
        <view class="hot-questions">
          <view class="hot-item" @tap="scrollToQuestion('shipping-time')">
            <text class="hot-text">{{ t('faq.hotQ1') }}</text>
            <text class="hot-arrow">→</text>
          </view>
          <view class="hot-item" @tap="scrollToQuestion('fee-calculation')">
            <text class="hot-text">{{ t('faq.hotQ2') }}</text>
            <text class="hot-arrow">→</text>
          </view>
          <view class="hot-item" @tap="scrollToQuestion('prohibited-items')">
            <text class="hot-text">{{ t('faq.hotQ3') }}</text>
            <text class="hot-arrow">→</text>
          </view>
          <view class="hot-item" @tap="scrollToQuestion('customs-code')">
            <text class="hot-text">{{ t('faq.hotQ4') }}</text>
            <text class="hot-arrow">→</text>
          </view>
        </view>
      </view>

      <!-- 发货相关 -->
      <view v-if="categorizedQuestions.shipping.length > 0" class="section-card">
        <view class="section-header">
          <text class="section-icon">📦</text>
          <text class="section-title">{{ t('faq.shippingSection') }}</text>
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
          <text class="section-title">{{ t('faq.feeSection') }}</text>
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
          <text class="section-title">{{ t('faq.prohibitedSection') }}</text>
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
          <text class="section-title">{{ t('faq.customsSection') }}</text>
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
          <text class="section-title">{{ t('faq.contactSection') }}</text>
        </view>
        <view class="contact-content">
          <text class="contact-text">{{ t('faq.contactDesc') }}</text>
          <view class="contact-actions">
            <view class="contact-btn" @tap="contactService">
              <text class="contact-icon">💬</text>
              <text class="contact-label">{{ t('faq.onlineService') }}</text>
            </view>
            <view class="contact-btn" @tap="callService">
              <text class="contact-icon">📞</text>
              <text class="contact-label">{{ t('faq.phoneConsult') }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="action-btn primary-btn" @tap="goToShipping">
          <text class="btn-icon">📦</text>
          <text class="btn-text">{{ t('faq.shippingGuide') }}</text>
        </view>
        <view class="action-btn secondary-btn" @tap="goToGuide">
          <text class="btn-icon">📖</text>
          <text class="btn-text">{{ t('faq.operationGuide') }}</text>
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
      expandedQuestions: {} // 记录展开状态的问题
    }
  },
  computed: {
    allQuestions() {
      // 使用多语言系统动态生成问题列表
      return [
        // 发货相关
        {
          id: 'shipping-time',
          category: 'shipping',
          question: this.t('faq.questions.shippingTimeQ'),
          answer: this.t('faq.questions.shippingTimeA'),
          keywords: '时间 多久 到达 韩国 해운 항공 工作日 운송 배송'
        },
        {
          id: 'shipping-pickup',
          category: 'shipping',
          question: this.t('faq.questions.shippingPickupQ'),
          answer: this.t('faq.questions.shippingPickupA'),
          keywords: '상문 取件 예약 偏远地区 픽업 집으로'
        },
        {
          id: 'shipping-package',
          category: 'shipping',
          question: this.t('faq.questions.shippingPackageQ'),
          answer: this.t('faq.questions.shippingPackageA'),
          keywords: '包装 要求 纸箱 포장 박스 완충재 易碎 填充 密封 胶带 面单'
        },
        {
          id: 'shipping-weight-limit',
          category: 'shipping',
          question: this.t('faq.questions.shippingWeightLimitQ'),
          answer: this.t('faq.questions.shippingWeightLimitA'),
          keywords: '重量 尺寸 限制 20kg 60cm 120cm 무게 크기 额外费用 추가요금'
        },
        // 费用相关
        {
          id: 'fee-calculation',
          category: 'fee',
          question: this.t('faq.questions.feeCalculationQ'),
          answer: this.t('faq.questions.feeCalculationA'),
          keywords: '运费 计算 重量 海运 25元 6元 공运 33.8元 9元 계산기 운임'
        },
        {
          id: 'fee-extra',
          category: 'fee',
          question: this.t('faq.questions.feeExtraQ'),
          answer: this.t('faq.questions.feeExtraA'),
          keywords: '额外费用 보험 通关费 개人물품 초과중량 超尺寸 추가요금'
        },
        {
          id: 'fee-payment',
          category: 'fee',
          question: this.t('faq.questions.feePaymentQ'),
          answer: this.t('faq.questions.feePaymentA'),
          keywords: '支付方式 微信支付 支付宝 은행카드 위챗페이 알리페이'
        },
        // 禁寄物品
        {
          id: 'prohibited-items',
          category: 'prohibited',
          question: this.t('faq.questions.prohibitedItemsQ'),
          answer: this.t('faq.questions.prohibitedItemsA'),
          keywords: '禁寄 물품 电池 리튬배터리 충전보 电子烟 액체 화장품 향수 의약품 날카로운 칼 가위 귀중품 현금 보석'
        },
        {
          id: 'prohibited-cosmetics',
          category: 'prohibited',
          question: this.t('faq.questions.prohibitedCosmeticsQ'),
          answer: this.t('faq.questions.prohibitedCosmeticsA'),
          keywords: '화장품 액체 파우더 고체 고객센터'
        },
        {
          id: 'prohibited-food',
          category: 'prohibited',
          question: this.t('faq.questions.prohibitedFoodQ'),
          answer: this.t('faq.questions.prohibitedFoodA'),
          keywords: '식품 밀봉 건식품 한국세관 신선식품 액체식품'
        },
        // 通关相关
        {
          id: 'customs-code',
          category: 'customs',
          question: this.t('faq.questions.customsCodeQ'),
          answer: this.t('faq.questions.customsCodeA'),
          keywords: '개인통관고유부호 P开头 숫자 한국세관 신분식별코드 통관 수령인'
        },
        {
          id: 'customs-detained',
          category: 'customs',
          question: this.t('faq.questions.customsDetainedQ'),
          answer: this.t('faq.questions.customsDetainedA'),
          keywords: '해관 압류 도움 증명서류 연락처 처리과정'
        },
        {
          id: 'customs-tax',
          category: 'customs',
          question: this.t('faq.questions.customsTaxQ'),
          answer: this.t('faq.questions.customsTaxA'),
          keywords: '관세 개인물품 한도초과 상업용도 수령인'
        }
      ]
    },
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
        title: this.t('faq.contactConnecting'),
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
