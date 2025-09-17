<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header-section">
      <view class="header-bg">
        <view class="header-content">
          <view class="header-top">
            <view class="back-btn" @click="goBack">
              <text class="back-icon">←</text>
            </view>
            <text class="page-title">{{ t('teamMembers.title') }}</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-section">
      <!-- 统计概览 -->
      <view class="overview-card">
        <view class="overview-header">
          <text class="overview-title">{{ t('teamMembers.teamOverview') }}</text>
        </view>
        
        <view class="overview-stats">
          <view class="stat-item">
            <text class="stat-number">{{ teamStats.totalMembers }}</text>
            <text class="stat-label">{{ t('teamMembers.totalMembers') }}</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ teamStats.activeMembers }}</text>
            <text class="stat-label">{{ t('teamMembers.activeMembers') }}</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ teamStats.newMembers }}</text>
            <text class="stat-label">{{ t('teamMembers.newMembers') }}</text>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view v-if="loading" class="loading-section">
        <view class="loading-item" v-for="i in 3" :key="i">
          <view class="loading-avatar"></view>
          <view class="loading-content">
            <view class="loading-line long"></view>
            <view class="loading-line short"></view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else-if="members.length === 0" class="empty-section">
        <view class="empty-icon">👥</view>
        <text class="empty-text">{{ t('teamMembers.emptyTitle') }}</text>
        <text class="empty-desc">{{ t('teamMembers.emptyDesc') }}</text>
        <view class="empty-btn" @click="goToPromotionCode">
          <text class="btn-text">分享推广码</text>
        </view>
      </view>

      <!-- 成员列表 -->
      <view v-else class="members-list">
        <view class="list-header">
          <text class="list-title">团队成员 ({{ members.length }})</text>
          <view class="filter-btn" @click="showFilterOptions">
            <text class="filter-text">筛选</text>
            <text class="filter-icon">⋮</text>
          </view>
        </view>

        <view 
          v-for="member in members" 
          :key="member.id"
          class="member-card"
          @click="viewMemberDetail(member)"
        >
          <view class="member-avatar">
            <image v-if="member.avatar" class="avatar-image" :src="member.avatar" mode="aspectFill"></image>
            <text v-else class="avatar-icon">👤</text>
          </view>
          
          <view class="member-info">
            <view class="member-main">
              <text class="member-name">{{ member.nickname }}</text>
              <view class="member-level" :class="getLevelClass(member.level)">
                <text class="level-text">{{ getLevelText(member.level) }}</text>
              </view>
            </view>
            
            <text class="member-join-time">{{ member.joinTime }} 加入</text>
            
            <view class="member-stats">
              <text class="stats-text">累计消费: ¥{{ member.totalAmount }}</text>
              <text class="stats-text">订单数: {{ member.orderCount }}</text>
            </view>
          </view>
          
          <view class="member-actions">
            <view class="action-icon" @click.stop="contactMember(member)">
              <text class="icon">💬</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="navigateTo('index')">
        <text class="nav-icon">🏠</text>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="navigateTo('calculator')">
        <text class="nav-icon">📋</text>
        <text class="nav-text">预报</text>
      </view>
      <view class="nav-item" @click="navigateTo('shipping')">
        <text class="nav-icon">📦</text>
        <text class="nav-text">发货</text>
      </view>
      <view class="nav-item" @click="navigateTo('profile')">
        <text class="nav-icon">👤</text>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { zhLanguagePack, koLanguagePack } from '../../locales/index'
// TODO: 引入API配置
// import { getTeamMembers, getTeamStats } from '@/utils/api.js'

export default {
  name: 'TeamMembers',
  data() {
    return {
      loading: true,
      members: [],
      teamStats: {
        totalMembers: 0,
        activeMembers: 0,
        newMembers: 0
      }
    }
  },
  
  onLoad() {
    // 初始化多语言系统
    setLanguagePacks({ zh: zhLanguagePack, ko: koLanguagePack })
    initLocale()
    
    this.loadTeamData()
  },
  
  methods: {
    // 多语言翻译函数
    t,
    
    // 加载团队数据
    async loadTeamData() {
      try {
        this.loading = true
        
        // TODO: 替换为真实API调用
        // const userInfo = uni.getStorageSync('userInfo')
        // const response = await getTeamMembers(userInfo.userId)
        // this.members = response.data
        
        // const statsResponse = await getTeamStats(userInfo.userId)
        // this.teamStats = statsResponse.data
        
        // 模拟数据
        await this.simulateApiCall()
        this.members = this.getMockMembers()
        this.teamStats = this.getMockStats()
        
      } catch (error) {
        console.error('加载团队数据失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 模拟API调用延迟
    simulateApiCall() {
      return new Promise(resolve => {
        setTimeout(resolve, 800)
      })
    },
    
    // 获取模拟成员数据
    getMockMembers() {
      return [
        {
          id: '1',
          nickname: '跨境寄件小能手',
          avatar: '',
          level: 'vip',
          joinTime: '2024-01-15',
          totalAmount: 2580.50,
          orderCount: 12,
          status: 'active'
        },
        {
          id: '2',
          nickname: '海淘达人',
          avatar: '',
          level: 'gold',
          joinTime: '2024-01-20',
          totalAmount: 1890.00,
          orderCount: 8,
          status: 'active'
        },
        {
          id: '3',
          nickname: '购物小达人',
          avatar: '',
          level: 'silver',
          joinTime: '2024-02-01',
          totalAmount: 780.00,
          orderCount: 4,
          status: 'normal'
        },
        {
          id: '4',
          nickname: '韩流爱好者',
          avatar: '',
          level: 'bronze',
          joinTime: '2024-02-10',
          totalAmount: 320.00,
          orderCount: 2,
          status: 'normal'
        }
      ]
    },
    
    // 获取模拟统计数据
    getMockStats() {
      return {
        totalMembers: 28,
        activeMembers: 15,
        newMembers: 5
      }
    },
    
    // 获取等级样式类
    getLevelClass(level) {
      const levelMap = {
        'vip': 'level-vip',
        'gold': 'level-gold',
        'silver': 'level-silver',
        'bronze': 'level-bronze'
      }
      return levelMap[level] || 'level-bronze'
    },
    
    // 获取等级文本
    getLevelText(level) {
      const levelMap = {
        'vip': 'VIP',
        'gold': '金牌',
        'silver': '银牌',
        'bronze': '铜牌'
      }
      return levelMap[level] || '普通'
    },
    
    // 查看成员详情
    viewMemberDetail(member) {
      // TODO: 跳转到成员详情页面
      uni.showToast({
        title: '成员详情功能开发中',
        icon: 'none'
      })
    },
    
    // 联系成员
    contactMember(member) {
      uni.showActionSheet({
        itemList: ['发送消息', '查看详情'],
        success: (res) => {
          if (res.tapIndex === 0) {
            uni.showToast({
              title: '消息功能开发中',
              icon: 'none'
            })
          } else if (res.tapIndex === 1) {
            this.viewMemberDetail(member)
          }
        }
      })
    },
    
    // 显示筛选选项
    showFilterOptions() {
      uni.showActionSheet({
        itemList: ['全部成员', '活跃成员', 'VIP成员', '本月新增'],
        success: (res) => {
          // TODO: 实现筛选逻辑
          uni.showToast({
            title: '筛选功能开发中',
            icon: 'none'
          })
        }
      })
    },
    
    // 跳转到推广码页面
    goToPromotionCode() {
      uni.navigateTo({
        url: '/pages/promotion-code/promotion-code'
      })
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 底部导航跳转
    navigateTo(page) {
      const routes = {
        index: '/pages/index/index',
        calculator: '/pages/calculator/calculator',
        shipping: '/pages/shipping/shipping',
        profile: '/pages/profile/profile'
      }
      
      const route = routes[page]
      if (route) {
        uni.navigateTo({
          url: route
        })
      }
    }
  }
}
</script>

<style scoped>
/* 页面容器 */
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 120rpx;
}

/* 头部样式 */
.header-section {
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: var(--status-bar-height, 44px);
}

.header-content {
  padding: 0 30rpx 30rpx;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.back-icon {
  color: white;
  font-size: 32rpx;
  font-weight: bold;
}

.page-title {
  color: white;
  font-size: 36rpx;
  font-weight: 600;
}

.header-placeholder {
  width: 60rpx;
}

/* 内容区域 */
.content-section {
  padding: 30rpx;
}

/* 概览卡片 */
.overview-card {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.overview-header {
  margin-bottom: 30rpx;
}

.overview-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.overview-stats {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 36rpx;
  font-weight: 700;
  color: #667eea;
  display: block;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

/* 加载状态 */
.loading-section {
  padding: 20rpx 0;
}

.loading-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.loading-avatar {
  width: 80rpx;
  height: 80rpx;
  background: #f0f0f0;
  border-radius: 40rpx;
  margin-right: 20rpx;
  animation: loading 1.5s ease-in-out infinite;
}

.loading-content {
  flex: 1;
}

.loading-line {
  height: 24rpx;
  background: #f0f0f0;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  animation: loading 1.5s ease-in-out infinite;
}

.loading-line.long {
  width: 70%;
}

.loading-line.short {
  width: 40%;
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 空状态 */
.empty-section {
  text-align: center;
  padding: 120rpx 60rpx;
  background: white;
  border-radius: 20rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  display: block;
  font-size: 32rpx;
  color: #333;
  margin-bottom: 16rpx;
  font-weight: 500;
}

.empty-desc {
  display: block;
  font-size: 28rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.empty-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20rpx 40rpx;
  border-radius: 12rpx;
  display: inline-block;
}

.btn-text {
  font-size: 28rpx;
}

/* 成员列表 */
.members-list {
  padding-bottom: 40rpx;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  background: white;
  border-radius: 12rpx;
  padding: 20rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.list-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.filter-btn {
  display: flex;
  align-items: center;
  color: #667eea;
}

.filter-text {
  font-size: 26rpx;
  margin-right: 8rpx;
}

.filter-icon {
  font-size: 28rpx;
  transform: rotate(90deg);
}

.member-card {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  overflow: hidden;
  border: 2rpx solid #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 38rpx;
}

.avatar-icon {
  font-size: 32rpx;
  color: #9ca3af;
}

.member-info {
  flex: 1;
}

.member-main {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.member-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-right: 12rpx;
}

.member-level {
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  font-weight: 500;
}

.member-level.level-vip {
  background: #FFE5E5;
  color: #E53E3E;
}

.member-level.level-gold {
  background: #FFF5E5;
  color: #DD6B20;
}

.member-level.level-silver {
  background: #E5F4FF;
  color: #3182CE;
}

.member-level.level-bronze {
  background: #F0FFF4;
  color: #38A169;
}

.level-text {
  font-size: 20rpx;
}

.member-join-time {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 12rpx;
  display: block;
}

.member-stats {
  display: flex;
  gap: 20rpx;
}

.stats-text {
  font-size: 24rpx;
  color: #666;
}

.member-actions {
  display: flex;
  align-items: center;
}

.action-icon {
  width: 60rpx;
  height: 60rpx;
  background: #f8f9fa;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #e9ecef;
}

.icon {
  font-size: 24rpx;
}

/* 底部导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  padding: 16rpx 0 calc(32rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #E0E0E0;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
  color: #9ca3af;
}

.nav-text {
  font-size: 20rpx;
  color: #666;
}
</style>
