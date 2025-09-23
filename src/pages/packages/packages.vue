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
            <text class="page-title">{{ currentStatusName }}</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 状态切换标签栏 -->
    <view class="tabs-section">
      <scroll-view class="tabs-scroll" scroll-x="true">
        <view class="tabs-container">
          <view 
            v-for="tab in statusTabs" 
            :key="tab.key"
            class="tab-item"
            :class="{ active: currentStatus === tab.key }"
            @click="switchStatus(tab.key)"
          >
            <text class="tab-text">{{ tab.name }}</text>
            <view v-if="tab.badge > 0" class="tab-badge">
              <text class="badge-text">{{ tab.badge > 99 ? '99+' : tab.badge }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 包裹列表 -->
    <view class="content-section">
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
      <view v-else-if="!loading && filteredPackages.length === 0" class="empty-section">
        <view class="empty-icon">📦</view>
        <text class="empty-title">暂无{{ currentStatusName }}包裹</text>
        <text class="empty-desc">{{ getEmptyDesc() }}</text>
        <view class="empty-action" @click="refreshData">
          <text class="action-text">刷新试试</text>
        </view>
      </view>

      <!-- 包裹列表 -->
      <view v-else class="packages-list">
        <view 
          v-for="pkg in filteredPackages" 
          :key="pkg.id"
          class="package-item"
          @click="viewPackageDetail(pkg)"
        >
          <view class="package-header">
            <view class="package-info">
              <text class="package-title">{{ pkg.title }}</text>
              <text class="package-tracking">{{ pkg.trackingNumber }}</text>
            </view>
            <view class="package-status" :class="pkg.status">
              <text class="status-text">{{ getStatusText(pkg.status) }}</text>
            </view>
          </view>
          
          <view class="package-content">
            <view class="package-details">
              <view class="detail-row">
                <text class="detail-label">发件人：</text>
                <text class="detail-value">{{ pkg.sender }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">重量：</text>
                <text class="detail-value">{{ pkg.weight }}kg</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">时间：</text>
                <text class="detail-value">{{ formatDate(pkg.createTime) }}</text>
              </view>
            </view>
            
            <view class="package-actions">
              <view 
                v-if="pkg.status === 'pending'" 
                class="action-btn primary"
                @click.stop="claimPackage(pkg)"
              >
                <text class="btn-text">认领</text>
              </view>
              <view 
                v-else-if="pkg.status === 'warehouse'" 
                class="action-btn secondary"
                @click.stop="confirmWarehouse(pkg)"
              >
                <text class="btn-text">确认入仓</text>
              </view>
              <view 
                v-else-if="pkg.status === 'abnormal'" 
                class="action-btn warning"
                @click.stop="handleAbnormal(pkg)"
              >
                <text class="btn-text">处理异常</text>
              </view>
              <view 
                v-else-if="pkg.status === 'confirm'" 
                class="action-btn success"
                @click.stop="confirmPackage(pkg)"
              >
                <text class="btn-text">确认</text>
              </view>
              <view class="action-btn outline" @click.stop="viewPackageDetail(pkg)">
                <text class="btn-text">详情</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="switchTab('home')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">🏠</text>
        </view>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">预报</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">发货</text>
      </view>
      <view class="nav-item" @click="switchTab('profile')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">👤</text>
        </view>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
// TODO: 引入API配置
// import { API, MOCK_DATA } from '@/utils/api'

export default {
  setup() {

    const loading = ref(false)
    const currentStatus = ref('all')
    const packages = ref([])

    // 状态标签配置
    const statusTabs = ref([
      { key: 'all', name: '全部', badge: 0 },
      { key: 'pending', name: '认领', badge: 0 },
      { key: 'warehouse', name: '待入仓', badge: 1 },
      { key: 'abnormal', name: '异常', badge: 0 },
      { key: 'confirm', name: '待确认', badge: 0 }
    ])

    // 当前状态名称
    const currentStatusName = computed(() => {
      const tab = statusTabs.value.find(t => t.key === currentStatus.value)
      return tab ? tab.name : '包裹'
    })

    // 过滤后的包裹列表
    const filteredPackages = computed(() => {
      if (currentStatus.value === 'all') {
        return packages.value
      }
      return packages.value.filter(pkg => pkg.status === currentStatus.value)
    })

    // 获取用户ID
    const getUserId = () => {
      const userInfo = uni.getStorageSync('userInfo')
      return userInfo?.userId || '100017'
    }

    // 获取包裹数据 - 统一接口
    const fetchPackages = async () => {
      loading.value = true
      try {
        const userId = getUserId()
        
        // TODO: 替换为实际API调用
        // const response = await API.packages.getUserPackages(userId, {
        //   status: currentStatus.value === 'all' ? undefined : currentStatus.value
        // })
        // packages.value = response.data.list
        // updateBadges()
        
        // 临时使用模拟数据
        setTimeout(() => {
          // const mockData = MOCK_DATA.packages
          const mockData = [
            {
              id: '1',
              title: '韩国商品包裹',
              trackingNumber: 'KR2024010101',
              sender: '金先生',
              weight: 2.5,
              status: 'pending',
              createTime: '2024-01-15 10:30:00',
              description: '护肤品、零食等'
            },
            {
              id: '2',
              title: '首尔直邮包裹',
              trackingNumber: 'KR2024010102',
              sender: '李女士',
              weight: 1.8,
              status: 'warehouse',
              createTime: '2024-01-14 15:45:00',
              description: '化妆品、衣物'
            },
            {
              id: '3',
              title: '釜山发货包裹',
              trackingNumber: 'KR2024010103',
              sender: '朴先生',
              weight: 3.2,
              status: 'confirm',
              createTime: '2024-01-13 09:20:00',
              description: '电子产品配件'
            },
            {
              id: '4',
              title: '济州岛特产',
              trackingNumber: 'KR2024010104',
              sender: '崔女士',
              weight: 4.1,
              status: 'abnormal',
              createTime: '2024-01-12 16:10:00',
              description: '地方特产、食品'
            }
          ]
          
          packages.value = mockData
          updateBadges()
          loading.value = false
        }, 1000)
        
      } catch (error) {
        loading.value = false
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
        console.error('获取包裹数据失败:', error)
      }
    }

    // 更新状态标签的徽章数量
    const updateBadges = () => {
      statusTabs.value.forEach(tab => {
        if (tab.key === 'all') {
          tab.badge = packages.value.length
        } else {
          tab.badge = packages.value.filter(pkg => pkg.status === tab.key).length
        }
      })
    }

    // 切换状态
    const switchStatus = (status) => {
      currentStatus.value = status
    }

    // 获取状态文本
    const getStatusText = (status) => {
      const statusMap = {
        pending: '待认领',
        warehouse: '待入仓',
        abnormal: '异常',
        confirm: '待确认',
        completed: '已完成'
      }
      return statusMap[status] || '未知'
    }

    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const now = new Date()
      const diff = now - date
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (days === 0) {
        return '今天'
      } else if (days === 1) {
        return '昨天'
      } else if (days < 7) {
        return `${days}天前`
      } else {
        return date.toLocaleDateString()
      }
    }

    // 获取空状态描述
    const getEmptyDesc = () => {
      const descMap = {
        all: '暂时没有任何包裹',
        pending: '暂无需要认领的包裹',
        warehouse: '暂无待入仓的包裹',
        abnormal: '暂无异常包裹',
        confirm: '暂无待确认的包裹'
      }
      return descMap[currentStatus.value] || '暂无相关包裹'
    }

    // 刷新数据
    const refreshData = () => {
      fetchPackages()
    }

    // 认领包裹
    const claimPackage = (pkg) => {
      uni.showModal({
        title: '确认认领',
        content: `确定要认领包裹 ${pkg.trackingNumber} 吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              // TODO: 调用认领API
              // await API.packages.claimPackage({
              //   packageId: pkg.id,
              //   userId: getUserId()
              // })
              
              // 临时模拟成功
              uni.showToast({
                title: '认领成功',
                icon: 'success'
              })
              // 更新包裹状态
              pkg.status = 'warehouse'
              updateBadges()
            } catch (error) {
              uni.showToast({
                title: '认领失败',
                icon: 'none'
              })
            }
          }
        }
      })
    }

    // 确认入仓
    const confirmWarehouse = (pkg) => {
      uni.showToast({
        title: '确认入仓功能开发中',
        icon: 'none'
      })
    }

    // 处理异常
    const handleAbnormal = (pkg) => {
      uni.showToast({
        title: '处理异常功能开发中',
        icon: 'none'
      })
    }

    // 确认包裹
    const confirmPackage = (pkg) => {
      uni.showToast({
        title: '确认包裹功能开发中',
        icon: 'none'
      })
    }

    // 查看包裹详情
    const viewPackageDetail = (pkg) => {
      uni.navigateTo({
        url: `/pages/package-detail/package-detail?id=${pkg.id}`
      })
    }

    // 返回上页
    const goBack = () => {
      uni.navigateBack()
    }

    // 底部导航切换
    const switchTab = (tab) => {
      if (tab === 'home') {
        uni.redirectTo({
          url: '/pages/index/index'
        })
      } else if (tab === 'order') {
        uni.navigateTo({
          url: '/pages/order/order'
        })
      } else if (tab === 'shipping') {
        uni.navigateTo({
          url: '/pages/shipping-orders/shipping-orders'
        })
      } else if (tab === 'profile') {
        uni.navigateTo({
          url: '/pages/profile/profile'
        })
      }
    }

    // 页面加载
    onMounted(() => {
      // 获取页面参数，支持直接跳转到特定状态
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const options = currentPage.options
      
      if (options.status) {
        currentStatus.value = options.status
      }
      
      fetchPackages()
    })

    return {
      loading,
      currentStatus,
      currentStatusName,
      statusTabs,
      filteredPackages,
      switchStatus,
      getStatusText,
      formatDate,
      getEmptyDesc,
      refreshData,
      claimPackage,
      confirmWarehouse,
      handleAbnormal,
      confirmPackage,
      viewPackageDetail,
      goBack,
      switchTab
    }
  },
  
  // 页面显示时刷新数据
  onShow() {
    if (this.packages && this.packages.length > 0) {
      this.refreshData()
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 140rpx;
}

/* 头部区域 */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: var(--status-bar-height, 44px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-bg {
  padding: 20rpx;
}

.header-content {
  position: relative;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
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

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header-placeholder {
  width: 60rpx;
}

/* 标签栏 */
.tabs-section {
  background: white;
  border-bottom: 2rpx solid #f0f0f0;
  position: sticky;
  top: calc(var(--status-bar-height, 44px) + 128rpx);
  z-index: 99;
}

.tabs-scroll {
  white-space: nowrap;
}

.tabs-container {
  display: flex;
  padding: 0 30rpx;
}

.tab-item {
  position: relative;
  padding: 32rpx 40rpx;
  margin-right: 20rpx;
  white-space: nowrap;
}

.tab-item.active .tab-text {
  color: #667eea;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 6rpx;
  background: #667eea;
  border-radius: 3rpx;
}

.tab-text {
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease;
}

.tab-badge {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  min-width: 32rpx;
  height: 32rpx;
  background: #ff4444;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

.badge-text {
  font-size: 20rpx;
  color: white;
  font-weight: 500;
  line-height: 1;
}

/* 内容区域 */
.content-section {
  padding: 0 30rpx;
  margin-top: 20rpx;
}

/* 加载状态 */
.loading-section {
  padding: 20rpx 0;
}

.loading-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 20rpx;
}

.loading-avatar {
  width: 80rpx;
  height: 80rpx;
  background: #f0f0f0;
  border-radius: 40rpx;
  margin-right: 32rpx;
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
  width: 60%;
}

.loading-line.short {
  width: 40%;
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* 空状态 */
.empty-section {
  text-align: center;
  padding: 120rpx 40rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
  opacity: 0.6;
}

.empty-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 28rpx;
  color: #999;
  display: block;
  margin-bottom: 60rpx;
}

.empty-action {
  background: #667eea;
  color: white;
  border-radius: 50rpx;
  padding: 24rpx 48rpx;
  display: inline-block;
}

.action-text {
  font-size: 28rpx;
  font-weight: 500;
}

/* 包裹列表 */
.packages-list {
  padding-bottom: 20rpx;
}

.package-item {
  background: white;
  border-radius: 24rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.package-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 32rpx 20rpx;
  border-bottom: 2rpx solid #f8f9fa;
}

.package-info {
  flex: 1;
}

.package-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2937;
  display: block;
  margin-bottom: 8rpx;
}

.package-tracking {
  font-size: 24rpx;
  color: #6b7280;
}

.package-status {
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  font-size: 22rpx;
  font-weight: 500;
}

.package-status.pending {
  background: #fef3c7;
  color: #d97706;
}

.package-status.warehouse {
  background: #dbeafe;
  color: #2563eb;
}

.package-status.abnormal {
  background: #fee2e2;
  color: #dc2626;
}

.package-status.confirm {
  background: #d1fae5;
  color: #059669;
}

.package-content {
  padding: 20rpx 32rpx 32rpx;
}

.package-details {
  margin-bottom: 32rpx;
}

.detail-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 26rpx;
  color: #6b7280;
  min-width: 120rpx;
}

.detail-value {
  font-size: 26rpx;
  color: #374151;
  flex: 1;
}

.package-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  height: 72rpx;
  border-radius: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #667eea;
  color: white;
}

.action-btn.secondary {
  background: #3b82f6;
  color: white;
}

.action-btn.warning {
  background: #f59e0b;
  color: white;
}

.action-btn.success {
  background: #10b981;
  color: white;
}

.action-btn.outline {
  background: transparent;
  color: #667eea;
  border: 2rpx solid #667eea;
}

.btn-text {
  font-size: 26rpx;
  font-weight: 500;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140rpx;
  background: white;
  border-top: 2rpx solid #f3f4f6;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
}

.nav-icon-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}

.nav-item.active .nav-icon-wrapper {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.nav-icon {
  font-size: 32rpx;
  color: #9ca3af;
}

.nav-item.active .nav-icon {
  color: white;
}

.nav-text {
  font-size: 20rpx;
  color: #9ca3af;
}

.nav-item.active .nav-text {
  color: #667eea;
  font-weight: 600;
}
</style>
