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
            <text class="page-title">团订单</text>
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
          <text class="overview-title">团队订单概览</text>
          <text class="overview-period">{{ currentMonth }}月</text>
        </view>
        
        <view class="overview-stats">
          <view class="stat-item">
            <text class="stat-number">{{ orderStats.totalOrders }}</text>
            <text class="stat-label">总订单数</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">¥{{ orderStats.totalAmount }}</text>
            <text class="stat-label">总订单金额</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">¥{{ orderStats.commission }}</text>
            <text class="stat-label">预计佣金</text>
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
            <text class="tab-count" v-if="orderStats.all > 0">({{ orderStats.all }})</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'pending' }" 
            @click="switchFilter('pending')"
          >
            <text class="tab-text">进行中</text>
            <text class="tab-count" v-if="orderStats.pending > 0">({{ orderStats.pending }})</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'completed' }" 
            @click="switchFilter('completed')"
          >
            <text class="tab-text">已完成</text>
            <text class="tab-count" v-if="orderStats.completed > 0">({{ orderStats.completed }})</text>
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
          <view class="loading-actions">
            <view class="loading-btn"></view>
          </view>
        </view>
      </view>

      <!-- 订单列表 -->
      <view v-else-if="filteredOrders.length > 0" class="order-list">
        <view class="order-item" v-for="order in filteredOrders" :key="order.id" @click="viewOrderDetail(order)">
          <view class="order-header">
            <view class="order-info">
              <text class="order-number">订单号: {{ order.orderNumber }}</text>
              <text class="order-date">{{ formatDate(order.createTime) }}</text>
            </view>
            <view class="order-status" :class="order.status">
              <text class="status-text">{{ getStatusText(order.status) }}</text>
            </view>
          </view>
          
          <view class="order-content">
            <view class="member-info">
              <view class="member-avatar">
                <image v-if="order.member.avatar" class="avatar-image" :src="order.member.avatar" mode="aspectFill"></image>
                <text v-else class="avatar-icon">👤</text>
              </view>
              <view class="member-details">
                <text class="member-name">{{ order.member.nickname }}</text>
                <text class="member-level">{{ order.member.level || 'L1' }}</text>
              </view>
            </view>
            
            <view class="order-details">
              <view class="detail-row">
                <text class="detail-label">商品信息:</text>
                <text class="detail-value">{{ order.itemsDesc }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">订单金额:</text>
                <text class="detail-value amount">¥{{ order.amount }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">预计佣金:</text>
                <text class="detail-value commission">¥{{ order.expectedCommission }}</text>
              </view>
            </view>
          </view>

          <view class="order-actions">
            <view class="action-btn secondary" @click.stop="contactMember(order.member)">
              <text class="btn-text">联系</text>
            </view>
            <view class="action-btn primary" @click.stop="viewDetail(order)">
              <text class="btn-text">详情</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="empty-state">
        <view class="empty-icon">📋</view>
        <text class="empty-title">暂无团订单</text>
        <text class="empty-desc">您的团队成员还没有下单哦</text>
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
import { getTeamOrders } from '@/utils/api.js'

export default {
  name: 'TeamOrders',
  setup() {
    const loading = ref(true)
    const activeFilter = ref('all')
    const orders = ref([])
    const orderStats = ref({
      totalOrders: 0,
      totalAmount: '0.00',
      commission: '0.00',
      all: 0,
      pending: 0,
      completed: 0
    })

    // 当前月份
    const currentMonth = computed(() => {
      return new Date().getMonth() + 1
    })

    // 筛选后的订单
    const filteredOrders = computed(() => {
      if (activeFilter.value === 'all') {
        return orders.value
      }
      return orders.value.filter(order => {
        if (activeFilter.value === 'pending') {
          return ['pending', 'processing', 'shipping'].includes(order.status)
        }
        if (activeFilter.value === 'completed') {
          return order.status === 'completed'
        }
        return true
      })
    })

    // 加载团队订单数据
    const loadTeamOrders = async () => {
      try {
        loading.value = true
        const result = await getTeamOrders()
        if (result.success) {
          orders.value = result.data.orders || []
          orderStats.value = result.data.stats || orderStats.value
        } else {
          // 模拟数据
          orders.value = [
            {
              id: '1',
              orderNumber: 'TK202412010001',
              createTime: '2024-12-01 10:30:00',
              status: 'completed',
              amount: '299.00',
              expectedCommission: '29.90',
              itemsDesc: '化妆品 × 2，保健品 × 1',
              member: {
                id: 'M001',
                nickname: '小王',
                avatar: '',
                level: 'L2'
              }
            },
            {
              id: '2',
              orderNumber: 'TK202412010002',
              createTime: '2024-12-01 14:20:00',
              status: 'processing',
              amount: '189.50',
              expectedCommission: '18.95',
              itemsDesc: '零食 × 3',
              member: {
                id: 'M002',
                nickname: '李小姐',
                avatar: '',
                level: 'L1'
              }
            }
          ]
          orderStats.value = {
            totalOrders: 12,
            totalAmount: '2,580.00',
            commission: '258.00',
            all: 12,
            pending: 3,
            completed: 9
          }
        }
      } catch (error) {
        console.error('加载团队订单失败:', error)
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
        'pending': '待处理',
        'processing': '处理中',
        'shipping': '配送中',
        'completed': '已完成',
        'cancelled': '已取消'
      }
      return statusMap[status] || '未知状态'
    }

    // 查看订单详情
    const viewOrderDetail = (order) => {
      // TODO: 跳转到订单详情页
      uni.showToast({
        title: '订单详情功能开发中',
        icon: 'none'
      })
    }

    // 联系成员
    const contactMember = (member) => {
      uni.showActionSheet({
        itemList: ['复制成员ID', '发送消息'],
        success: (res) => {
          if (res.tapIndex === 0) {
            uni.setClipboardData({
              data: member.id,
              success: () => {
                uni.showToast({
                  title: '成员ID已复制',
                  icon: 'success'
                })
              }
            })
          } else if (res.tapIndex === 1) {
            uni.showToast({
              title: '消息功能开发中',
              icon: 'none'
            })
          }
        }
      })
    }

    // 查看详情
    const viewDetail = (order) => {
      viewOrderDetail(order)
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
      loadTeamOrders()
    })

    return {
      loading,
      activeFilter,
      orders,
      orderStats,
      currentMonth,
      filteredOrders,
      switchFilter,
      formatDate,
      getStatusText,
      viewOrderDetail,
      contactMember,
      viewDetail,
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

/* 概览卡片 */
.overview-card {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.overview-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
}

.overview-period {
  font-size: 24rpx;
  color: #87ceeb;
  background: rgba(135, 206, 235, 0.1);
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
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
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #87ceeb;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #999999;
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

.tab-count {
  font-size: 20rpx;
  color: #999999;
}

.filter-tab.active .tab-count {
  color: #87ceeb;
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

.loading-actions {
  margin-left: 32rpx;
}

.loading-btn {
  width: 120rpx;
  height: 60rpx;
  background: #f0f0f0;
  border-radius: 30rpx;
}

/* 订单列表 */
.order-list {
  padding-bottom: 40rpx;
}

.order-item {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24rpx;
}

.order-info {
  flex: 1;
}

.order-number {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.order-date {
  font-size: 24rpx;
  color: #999999;
}

.order-status {
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  margin-left: 16rpx;
}

.order-status.pending,
.order-status.processing {
  background: rgba(255, 152, 0, 0.1);
}

.order-status.shipping {
  background: rgba(135, 206, 235, 0.1);
}

.order-status.completed {
  background: rgba(76, 175, 80, 0.1);
}

.status-text {
  font-size: 24rpx;
  font-weight: 500;
}

.order-status.pending .status-text,
.order-status.processing .status-text {
  color: #ff9800;
}

.order-status.shipping .status-text {
  color: #87ceeb;
}

.order-status.completed .status-text {
  color: #4caf50;
}

.order-content {
  margin-bottom: 24rpx;
}

.member-info {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

.member-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
}

.avatar-icon {
  font-size: 40rpx;
  color: #999999;
}

.member-details {
  flex: 1;
}

.member-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.member-level {
  font-size: 24rpx;
  color: #87ceeb;
  background: rgba(135, 206, 235, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  display: inline-block;
}

.order-details {
  margin-bottom: 16rpx;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 26rpx;
  color: #666666;
}

.detail-value {
  font-size: 26rpx;
  color: #333333;
  flex: 1;
  text-align: right;
}

.detail-value.amount {
  color: #87ceeb;
  font-weight: 600;
}

.detail-value.commission {
  color: #ff6b35;
  font-weight: 600;
}

.order-actions {
  display: flex;
  gap: 16rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid #f0f0f0;
}

.action-btn {
  flex: 1;
  height: 64rpx;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.action-btn.primary {
  background: #87ceeb;
}

.action-btn.secondary {
  background: #ffffff;
  border: 2rpx solid #87ceeb;
}

.action-btn.primary .btn-text {
  color: #ffffff;
  font-size: 26rpx;
}

.action-btn.secondary .btn-text {
  color: #87ceeb;
  font-size: 26rpx;
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
  margin: 0 auto;
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
