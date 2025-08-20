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
            <text class="page-title">佣金</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-section">
      <!-- 佣金概览 -->
      <view class="balance-card">
        <view class="balance-header">
          <text class="balance-title">我的佣金</text>
          <text class="balance-date">截至{{ currentDate }}</text>
        </view>
        
        <view class="balance-amount">
          <text class="currency">¥</text>
          <text class="amount">{{ totalBalance }}</text>
        </view>
        
        <view class="balance-actions">
          <view class="action-btn primary" @click="withdraw">
            <text class="btn-text">提现</text>
          </view>
          <view class="action-btn secondary" @click="viewWithdrawHistory">
            <text class="btn-text">提现记录</text>
          </view>
        </view>
      </view>

      <!-- 佣金统计 -->
      <view class="stats-section">
        <view class="section-title">佣金统计</view>
        <view class="stats-grid">
          <view class="stat-item">
            <text class="stat-number">¥{{ monthlyStats.earnings }}</text>
            <text class="stat-label">本月收益</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ monthlyStats.orders }}</text>
            <text class="stat-label">本月订单</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">¥{{ yearlyStats.earnings }}</text>
            <text class="stat-label">年度收益</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ yearlyStats.orders }}</text>
            <text class="stat-label">年度订单</text>
          </view>
        </view>
      </view>

      <!-- 筛选和搜索 -->
      <view class="filter-section">
        <view class="filter-tabs">
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'all' }" 
            @click="switchFilter('all')"
          >
            <text class="tab-text">全部</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'pending' }" 
            @click="switchFilter('pending')"
          >
            <text class="tab-text">待结算</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'settled' }" 
            @click="switchFilter('settled')"
          >
            <text class="tab-text">已结算</text>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view v-if="loading" class="loading-section">
        <view class="loading-item" v-for="i in 3" :key="i">
          <view class="loading-content">
            <view class="loading-line long"></view>
            <view class="loading-line medium"></view>
            <view class="loading-line short"></view>
          </view>
          <view class="loading-amount">
            <view class="loading-price"></view>
          </view>
        </view>
      </view>

      <!-- 佣金记录列表 -->
      <view v-else-if="filteredRecords.length > 0" class="records-list">
        <view class="record-item" v-for="record in filteredRecords" :key="record.id">
          <view class="record-header">
            <view class="record-info">
              <text class="record-title">{{ record.title }}</text>
              <text class="record-date">{{ formatDate(record.createTime) }}</text>
            </view>
            <view class="record-amount" :class="record.type">
              <text class="amount-text">{{ record.type === 'income' ? '+' : '-' }}¥{{ record.amount }}</text>
            </view>
          </view>
          
          <view class="record-content">
            <view class="record-detail">
              <text class="detail-text">订单号: {{ record.orderNumber }}</text>
              <text class="detail-text">成员: {{ record.memberName }}</text>
            </view>
            
            <view class="record-status" :class="record.status">
              <text class="status-text">{{ getStatusText(record.status) }}</text>
            </view>
          </view>

          <view class="record-desc" v-if="record.description">
            <text class="desc-text">{{ record.description }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="empty-state">
        <view class="empty-icon">💰</view>
        <text class="empty-title">暂无佣金记录</text>
        <text class="empty-desc">推广成功后，佣金记录会在这里显示</text>
        <view class="empty-action">
          <view class="action-btn primary" @click="sharePromotion">
            <text class="btn-text">去推广</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="navigateToHome">
        <text class="nav-icon">🏠</text>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="navigateToOrder">
        <text class="nav-icon">📦</text>
        <text class="nav-text">下单</text>
      </view>
      <view class="nav-item" @click="navigateToShipping">
        <text class="nav-icon">🚚</text>
        <text class="nav-text">发货</text>
      </view>
      <view class="nav-item active" @click="navigateToProfile">
        <text class="nav-icon">👤</text>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { getCommissionRecords, getCommissionStats } from '@/utils/api.js'

export default {
  name: 'Commission',
  setup() {
    const loading = ref(true)
    const activeFilter = ref('all')
    const records = ref([])
    const totalBalance = ref('0.00')
    const monthlyStats = ref({
      earnings: '0.00',
      orders: 0
    })
    const yearlyStats = ref({
      earnings: '0.00',
      orders: 0
    })

    // 当前日期
    const currentDate = computed(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    })

    // 筛选后的记录
    const filteredRecords = computed(() => {
      if (activeFilter.value === 'all') {
        return records.value
      }
      return records.value.filter(record => {
        if (activeFilter.value === 'pending') {
          return record.status === 'pending'
        }
        if (activeFilter.value === 'settled') {
          return record.status === 'settled'
        }
        return true
      })
    })

    // 加载佣金数据
    const loadCommissionData = async () => {
      try {
        loading.value = true
        
        // 获取佣金记录
        const recordsResult = await getCommissionRecords()
        if (recordsResult.success) {
          records.value = recordsResult.data.records || []
          totalBalance.value = recordsResult.data.balance || '0.00'
        } else {
          // 模拟数据
          records.value = [
            {
              id: '1',
              title: '推广佣金',
              orderNumber: 'TK202412010001',
              memberName: '小王',
              amount: '29.90',
              type: 'income',
              status: 'settled',
              createTime: '2024-12-01 15:30:00',
              description: '成员小王订单完成，获得佣金'
            },
            {
              id: '2',
              title: '推广佣金',
              orderNumber: 'TK202412010002',
              memberName: '李小姐',
              amount: '18.95',
              type: 'income',
              status: 'pending',
              createTime: '2024-12-01 18:20:00',
              description: '成员李小姐订单已完成，佣金结算中'
            },
            {
              id: '3',
              title: '佣金提现',
              orderNumber: 'WD202411301001',
              memberName: '',
              amount: '200.00',
              type: 'withdraw',
              status: 'settled',
              createTime: '2024-11-30 10:15:00',
              description: '提现到微信钱包'
            }
          ]
          totalBalance.value = '258.85'
        }

        // 获取佣金统计
        const statsResult = await getCommissionStats()
        if (statsResult.success) {
          monthlyStats.value = statsResult.data.monthly || monthlyStats.value
          yearlyStats.value = statsResult.data.yearly || yearlyStats.value
        } else {
          // 模拟数据
          monthlyStats.value = {
            earnings: '148.85',
            orders: 5
          }
          yearlyStats.value = {
            earnings: '1,250.00',
            orders: 42
          }
        }
      } catch (error) {
        console.error('加载佣金数据失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        loading.value = false
      }
    }

    // 切换筛选
    const switchFilter = (filter) => {
      activeFilter.value = filter
    }

    // 格式化日期
    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${month}-${day} ${hours}:${minutes}`
    }

    // 获取状态文本
    const getStatusText = (status) => {
      const statusMap = {
        'pending': '待结算',
        'settled': '已结算',
        'failed': '结算失败'
      }
      return statusMap[status] || '未知状态'
    }

    // 提现
    const withdraw = () => {
      if (parseFloat(totalBalance.value) < 100) {
        uni.showModal({
          title: '提现提醒',
          content: '最低提现金额为100元，请继续推广增加佣金收入',
          showCancel: false
        })
        return
      }

      uni.showModal({
        title: '佣金提现',
        content: `确认提现¥${totalBalance.value}到微信钱包吗？`,
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '提现功能开发中',
              icon: 'none'
            })
          }
        }
      })
    }

    // 查看提现记录
    const viewWithdrawHistory = () => {
      uni.showToast({
        title: '提现记录功能开发中',
        icon: 'none'
      })
    }

    // 分享推广
    const sharePromotion = () => {
      uni.navigateTo({
        url: '/pages/promotion-code/promotion-code'
      })
    }

    // 返回
    const goBack = () => {
      uni.navigateBack()
    }

    // 底部导航
    const navigateToHome = () => {
      uni.redirectTo({
        url: '/pages/index/index'
      })
    }

    const navigateToOrder = () => {
      uni.redirectTo({
        url: '/pages/order/order'
      })
    }

    const navigateToShipping = () => {
      uni.redirectTo({
        url: '/pages/shipping-orders/shipping-orders'
      })
    }

    const navigateToProfile = () => {
      uni.redirectTo({
        url: '/pages/profile/profile'
      })
    }

    onMounted(() => {
      loadCommissionData()
    })

    return {
      loading,
      activeFilter,
      records,
      totalBalance,
      monthlyStats,
      yearlyStats,
      currentDate,
      filteredRecords,
      switchFilter,
      formatDate,
      getStatusText,
      withdraw,
      viewWithdrawHistory,
      sharePromotion,
      goBack,
      navigateToHome,
      navigateToOrder,
      navigateToShipping,
      navigateToProfile
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 120rpx;
}

/* 头部样式 */
.header-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-bg {
  background: linear-gradient(135deg, #87ceeb 0%, #4fb3d9 100%);
  padding-top: var(--status-bar-height, 44rpx);
}

.header-content {
  position: relative;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 32rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
}

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #ffffff;
}

.header-placeholder {
  width: 60rpx;
}

/* 内容区域 */
.content-section {
  margin-top: calc(var(--status-bar-height, 44rpx) + 88rpx);
  padding: 32rpx;
}

/* 余额卡片 */
.balance-card {
  background: linear-gradient(135deg, #87ceeb 0%, #4fb3d9 100%);
  border-radius: 24rpx;
  padding: 48rpx 40rpx;
  margin-bottom: 32rpx;
  color: #ffffff;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.balance-title {
  font-size: 32rpx;
  font-weight: 600;
}

.balance-date {
  font-size: 24rpx;
  opacity: 0.8;
}

.balance-amount {
  text-align: center;
  margin-bottom: 48rpx;
}

.currency {
  font-size: 36rpx;
  opacity: 0.8;
  margin-right: 8rpx;
}

.amount {
  font-size: 72rpx;
  font-weight: 600;
}

.balance-actions {
  display: flex;
  gap: 24rpx;
}

.balance-actions .action-btn {
  flex: 1;
  height: 72rpx;
  border-radius: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.balance-actions .action-btn.primary {
  background: rgba(255, 255, 255, 0.9);
}

.balance-actions .action-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  border: 2rpx solid rgba(255, 255, 255, 0.5);
}

.balance-actions .action-btn.primary .btn-text {
  color: #87ceeb;
  font-size: 28rpx;
  font-weight: 600;
}

.balance-actions .action-btn.secondary .btn-text {
  color: #ffffff;
  font-size: 28rpx;
}

/* 统计区域 */
.stats-section {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 32rpx;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}

.stat-item {
  text-align: center;
  padding: 24rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

.stat-number {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #87ceeb;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666666;
}

/* 筛选区域 */
.filter-section {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 0;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.filter-tabs {
  display: flex;
}

.filter-tab {
  flex: 1;
  padding: 32rpx 0;
  text-align: center;
  position: relative;
  background: #ffffff;
}

.filter-tab.active {
  background: rgba(135, 206, 235, 0.1);
}

.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background: #87ceeb;
}

.tab-text {
  font-size: 28rpx;
  color: #666666;
}

.filter-tab.active .tab-text {
  color: #87ceeb;
  font-weight: 600;
}

/* 加载状态 */
.loading-section {
  padding: 32rpx 0;
}

.loading-item {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-content {
  flex: 1;
}

.loading-line {
  height: 24rpx;
  background: #f0f0f0;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
}

.loading-line.long {
  width: 60%;
}

.loading-line.medium {
  width: 40%;
}

.loading-line.short {
  width: 30%;
  margin-bottom: 0;
}

.loading-amount {
  margin-left: 32rpx;
}

.loading-price {
  width: 120rpx;
  height: 32rpx;
  background: #f0f0f0;
  border-radius: 16rpx;
}

/* 记录列表 */
.records-list {
  padding-bottom: 40rpx;
}

.record-item {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.record-info {
  flex: 1;
}

.record-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.record-date {
  font-size: 24rpx;
  color: #999999;
}

.record-amount {
  margin-left: 16rpx;
}

.record-amount.income .amount-text {
  color: #4caf50;
  font-size: 32rpx;
  font-weight: 600;
}

.record-amount.withdraw .amount-text {
  color: #ff6b35;
  font-size: 32rpx;
  font-weight: 600;
}

.record-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.record-detail {
  flex: 1;
}

.detail-text {
  font-size: 24rpx;
  color: #666666;
  display: block;
  margin-bottom: 4rpx;
}

.detail-text:last-child {
  margin-bottom: 0;
}

.record-status {
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  margin-left: 16rpx;
}

.record-status.pending {
  background: rgba(255, 152, 0, 0.1);
}

.record-status.settled {
  background: rgba(76, 175, 80, 0.1);
}

.record-status.failed {
  background: rgba(244, 67, 54, 0.1);
}

.status-text {
  font-size: 24rpx;
  font-weight: 500;
}

.record-status.pending .status-text {
  color: #ff9800;
}

.record-status.settled .status-text {
  color: #4caf50;
}

.record-status.failed .status-text {
  color: #f44336;
}

.record-desc {
  padding-top: 16rpx;
  border-top: 1rpx solid #f0f0f0;
}

.desc-text {
  font-size: 24rpx;
  color: #999999;
  line-height: 1.5;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 120rpx 40rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.3;
}

.empty-title {
  font-size: 32rpx;
  color: #333333;
  margin-bottom: 16rpx;
  display: block;
}

.empty-desc {
  font-size: 26rpx;
  color: #999999;
  margin-bottom: 48rpx;
  display: block;
}

.empty-action .action-btn {
  width: 200rpx;
  height: 72rpx;
  border-radius: 36rpx;
  margin: 0 auto;
  background: #87ceeb;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.empty-action .action-btn .btn-text {
  color: #ffffff;
  font-size: 28rpx;
}

/* 底部导航栏样式 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  background: #ffffff;
  border-top: 1rpx solid #e0e0e0;
  display: flex;
  z-index: 1000;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
}

.nav-item.active .nav-icon,
.nav-item.active .nav-text {
  color: #87ceeb;
}

.nav-item .nav-icon {
  font-size: 40rpx;
  margin-bottom: 4rpx;
  color: #999999;
}

.nav-item .nav-text {
  font-size: 20rpx;
  color: #999999;
}
</style>
