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
            <text class="page-title">包裹详情</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading-section">
      <view class="loading-content">
        <view class="loading-line long"></view>
        <view class="loading-line short"></view>
        <view class="loading-line medium"></view>
      </view>
    </view>

    <!-- 包裹详情内容 -->
    <view v-else class="content-section">
      <!-- 包裹基础信息 -->
      <view class="info-card">
        <view class="card-header">
          <text class="card-title">包裹信息</text>
          <view class="status-badge" :class="getStatusClass(packageInfo.status)">
            <text class="status-text">{{ getStatusText(packageInfo.status) }}</text>
          </view>
        </view>
        
        <view class="info-row">
          <text class="info-label">包裹编号</text>
          <text class="info-value">{{ packageInfo.trackingNumber }}</text>
        </view>
        
        <view class="info-row">
          <text class="info-label">预报时间</text>
          <text class="info-value">{{ packageInfo.reportTime }}</text>
        </view>
        
        <view class="info-row" v-if="packageInfo.arrivalTime">
          <text class="info-label">到货时间</text>
          <text class="info-value">{{ packageInfo.arrivalTime }}</text>
        </view>
        
        <view class="info-row">
          <text class="info-label">重量</text>
          <text class="info-value">{{ packageInfo.weight }}kg</text>
        </view>
        
        <view class="info-row">
          <text class="info-label">商品名称</text>
          <text class="info-value">{{ packageInfo.productName }}</text>
        </view>
        
        <view class="info-row">
          <text class="info-label">商品价值</text>
          <text class="info-value">${{ packageInfo.value }}</text>
        </view>
      </view>

      <!-- 物流状态 -->
      <view class="logistics-card">
        <view class="card-header">
          <text class="card-title">物流状态</text>
        </view>
        
        <view class="logistics-timeline">
          <view 
            v-for="(item, index) in packageInfo.logistics" 
            :key="index"
            class="timeline-item"
            :class="{ active: index === 0 }"
          >
            <view class="timeline-dot"></view>
            <view class="timeline-content">
              <text class="timeline-title">{{ item.status }}</text>
              <text class="timeline-time">{{ item.time }}</text>
              <text v-if="item.location" class="timeline-location">{{ item.location }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 收货地址 -->
      <view class="address-card" v-if="packageInfo.address">
        <view class="card-header">
          <text class="card-title">收货地址</text>
        </view>
        
        <view class="address-content">
          <view class="address-row">
            <text class="address-name">{{ packageInfo.address.name }}</text>
            <text class="address-phone">{{ packageInfo.address.phone }}</text>
          </view>
          <text class="address-detail">{{ packageInfo.address.detail }}</text>
        </view>
      </view>

      <!-- 操作按钮区域 -->
      <view class="action-section">
        <!-- 认领状态 -->
        <view v-if="packageInfo.status === 'pending'" class="action-buttons">
          <view class="action-btn primary" @click="claimPackage">
            <text class="btn-text">立即认领</text>
          </view>
        </view>
        
        <!-- 待入仓状态 -->
        <view v-else-if="packageInfo.status === 'warehousing'" class="action-buttons">
          <view class="action-btn secondary" @click="contactService">
            <text class="btn-text">联系客服</text>
          </view>
        </view>
        
        <!-- 异常状态 -->
        <view v-else-if="packageInfo.status === 'abnormal'" class="action-buttons">
          <view class="action-btn primary" @click="handleAbnormal">
            <text class="btn-text">处理异常</text>
          </view>
          <view class="action-btn secondary" @click="contactService">
            <text class="btn-text">联系客服</text>
          </view>
        </view>
        
        <!-- 待确认状态 -->
        <view v-else-if="packageInfo.status === 'confirming'" class="action-buttons">
          <view class="action-btn primary" @click="confirmPackage">
            <text class="btn-text">确认收货</text>
          </view>
          <view class="action-btn secondary" @click="rejectPackage">
            <text class="btn-text">拒绝收货</text>
          </view>
        </view>
        
        <!-- 已完成状态 -->
        <view v-else-if="packageInfo.status === 'completed'" class="action-buttons">
          <view class="action-btn secondary" @click="reorder">
            <text class="btn-text">再次预报</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
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
// TODO: 引入API配置
// import { getPackageDetail, claimPackage, confirmPackage } from '@/utils/api.js'

export default {
  name: 'PackageDetail',
  data() {
    return {
      loading: true,
      packageId: '',
      packageInfo: {
        id: '',
        trackingNumber: '',
        status: '',
        reportTime: '',
        arrivalTime: '',
        weight: 0,
        productName: '',
        value: 0,
        address: null,
        logistics: []
      }
    }
  },
  
  onLoad(options) {
    if (options.id) {
      this.packageId = options.id
      this.loadPackageDetail()
    }
  },
  
  methods: {
    // 加载包裹详情
    async loadPackageDetail() {
      try {
        this.loading = true
        
        // TODO: 替换为真实API调用
        // const response = await getPackageDetail(this.packageId)
        // this.packageInfo = response.data
        
        // 模拟数据
        await this.simulateApiCall()
        this.packageInfo = this.getMockPackageDetail(this.packageId)
        
      } catch (error) {
        console.error('加载包裹详情失败:', error)
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
    
    // 获取模拟包裹详情数据
    getMockPackageDetail(packageId) {
      const mockData = {
        'pkg001': {
          id: 'pkg001',
          trackingNumber: 'JY2024010001',
          status: 'pending',
          reportTime: '2024-01-15 14:30:00',
          arrivalTime: '',
          weight: 1.2,
          productName: '苹果手机保护壳',
          value: 25.99,
          address: {
            name: '张三',
            phone: '138****8888',
            detail: '广东省深圳市南山区科技园南区A座1008室'
          },
          logistics: [
            {
              status: '包裹已预报',
              time: '2024-01-15 14:30:00',
              location: '深圳转运中心'
            }
          ]
        },
        'pkg002': {
          id: 'pkg002',
          trackingNumber: 'JY2024010002',
          status: 'warehousing',
          reportTime: '2024-01-14 09:15:00',
          arrivalTime: '2024-01-16 11:20:00',
          weight: 0.8,
          productName: '化妆品套装',
          value: 89.50,
          address: {
            name: '李四',
            phone: '139****9999',
            detail: '上海市浦东新区陆家嘴环路1000号'
          },
          logistics: [
            {
              status: '包裹到达转运仓',
              time: '2024-01-16 11:20:00',
              location: '深圳转运中心'
            },
            {
              status: '包裹已预报',
              time: '2024-01-14 09:15:00',
              location: '深圳转运中心'
            }
          ]
        },
        'pkg003': {
          id: 'pkg003',
          trackingNumber: 'JY2024010003',
          status: 'abnormal',
          reportTime: '2024-01-13 16:45:00',
          arrivalTime: '2024-01-15 13:10:00',
          weight: 2.5,
          productName: '运动鞋',
          value: 120.00,
          address: {
            name: '王五',
            phone: '137****7777',
            detail: '北京市朝阳区建国门外大街1号'
          },
          logistics: [
            {
              status: '包裹异常 - 商品破损',
              time: '2024-01-15 15:30:00',
              location: '深圳转运中心'
            },
            {
              status: '包裹到达转运仓',
              time: '2024-01-15 13:10:00',
              location: '深圳转运中心'
            },
            {
              status: '包裹已预报',
              time: '2024-01-13 16:45:00',
              location: '深圳转运中心'
            }
          ]
        }
      }
      
      return mockData[packageId] || mockData['pkg001']
    },
    
    // 获取状态样式类
    getStatusClass(status) {
      const statusMap = {
        pending: 'status-pending',
        warehousing: 'status-warehousing', 
        abnormal: 'status-abnormal',
        confirming: 'status-confirming',
        completed: 'status-completed'
      }
      return statusMap[status] || 'status-pending'
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        pending: '待认领',
        warehousing: '待入仓',
        abnormal: '异常',
        confirming: '待确认', 
        completed: '已完成'
      }
      return statusMap[status] || '未知状态'
    },
    
    // 认领包裹
    async claimPackage() {
      try {
        uni.showLoading({ title: '处理中...' })
        
        // TODO: 替换为真实API调用
        // await claimPackage(this.packageId)
        
        // 模拟API调用
        await this.simulateApiCall()
        
        uni.hideLoading()
        uni.showToast({
          title: '认领成功',
          icon: 'success'
        })
        
        // 重新加载数据
        this.loadPackageDetail()
        
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '认领失败',
          icon: 'none'
        })
      }
    },
    
    // 确认收货
    async confirmPackage() {
      try {
        const result = await uni.showModal({
          title: '确认收货',
          content: '确认收到包裹并核实无误？'
        })
        
        if (result.confirm) {
          uni.showLoading({ title: '处理中...' })
          
          // TODO: 替换为真实API调用
          // await confirmPackage(this.packageId)
          
          // 模拟API调用
          await this.simulateApiCall()
          
          uni.hideLoading()
          uni.showToast({
            title: '确认成功',
            icon: 'success'
          })
          
          // 重新加载数据
          this.loadPackageDetail()
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    },
    
    // 拒绝收货
    async rejectPackage() {
      try {
        const result = await uni.showModal({
          title: '拒绝收货',
          content: '确定要拒绝收货吗？请说明原因。'
        })
        
        if (result.confirm) {
          uni.showLoading({ title: '处理中...' })
          
          // TODO: 替换为真实API调用
          await this.simulateApiCall()
          
          uni.hideLoading()
          uni.showToast({
            title: '已提交',
            icon: 'success'
          })
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    },
    
    // 处理异常
    async handleAbnormal() {
      try {
        const result = await uni.showModal({
          title: '处理异常',
          content: '是否确认处理包裹异常？'
        })
        
        if (result.confirm) {
          uni.showLoading({ title: '处理中...' })
          
          // TODO: 替换为真实API调用
          await this.simulateApiCall()
          
          uni.hideLoading()
          uni.showToast({
            title: '已提交处理',
            icon: 'success'
          })
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    },
    
    // 联系客服
    contactService() {
      uni.showModal({
        title: '联系客服',
        content: '客服电话：400-888-8888\n微信客服：service_zhc',
        showCancel: false
      })
    },
    
    // 再次预报
    reorder() {
      uni.navigateTo({
        url: '/pages/calculator/calculator'
      })
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 底部导航栏跳转
    navigateTo(page) {
      const routes = {
        index: '/pages/index/index',
        calculator: '/pages/calculator/calculator', 
        shipping: '/pages/shipping/shipping',
        profile: '/pages/profile/profile'
      }
      
      const route = routes[page]
      if (route) {
        uni.switchTab({
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

/* 加载状态 */
.loading-section {
  padding: 40rpx 30rpx;
}

.loading-content {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
}

.loading-line {
  height: 30rpx;
  background: #f0f0f0;
  border-radius: 15rpx;
  margin-bottom: 20rpx;
  animation: loading 1.5s ease-in-out infinite;
}

.loading-line.long {
  width: 80%;
}

.loading-line.medium {
  width: 60%;
}

.loading-line.short {
  width: 40%;
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 内容区域 */
.content-section {
  padding: 0 30rpx;
}

/* 信息卡片 */
.info-card, .logistics-card, .address-card {
  background: white;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

/* 状态徽章 */
.status-badge {
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-badge.status-pending {
  background: #FFF3E0;
  color: #F57C00;
}

.status-badge.status-warehousing {
  background: #E3F2FD;
  color: #1976D2;
}

.status-badge.status-abnormal {
  background: #FFEBEE;
  color: #D32F2F;
}

.status-badge.status-confirming {
  background: #F3E5F5;
  color: #7B1FA2;
}

.status-badge.status-completed {
  background: #E8F5E8;
  color: #388E3C;
}

.status-text {
  font-weight: 500;
}

/* 信息行 */
.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
  padding: 15rpx 0;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  width: 160rpx;
  flex-shrink: 0;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  text-align: right;
  flex: 1;
}

/* 物流时间轴 */
.logistics-timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: 30rpx;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 14rpx;
  top: 40rpx;
  bottom: -30rpx;
  width: 2rpx;
  background: #E0E0E0;
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-dot {
  width: 28rpx;
  height: 28rpx;
  background: #E0E0E0;
  border-radius: 50%;
  margin-right: 30rpx;
  flex-shrink: 0;
  margin-top: 6rpx;
}

.timeline-item.active .timeline-dot {
  background: #667eea;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.timeline-time {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin-bottom: 5rpx;
}

.timeline-location {
  display: block;
  font-size: 24rpx;
  color: #999;
}

/* 地址信息 */
.address-content {
  background: #F8F9FA;
  border-radius: 12rpx;
  padding: 30rpx;
}

.address-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15rpx;
}

.address-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.address-phone {
  font-size: 28rpx;
  color: #666;
}

.address-detail {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

/* 操作按钮区域 */
.action-section {
  padding: 40rpx 0;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  font-weight: 500;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.secondary {
  background: white;
  color: #667eea;
  border: 2rpx solid #667eea;
}

.btn-text {
  font-size: 30rpx;
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
}

.nav-text {
  font-size: 20rpx;
  color: #666;
}
</style>
