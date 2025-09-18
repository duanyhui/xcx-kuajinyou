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

    <!-- 订单列表 -->
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
      <view v-else-if="filteredOrders.length === 0" class="empty-section">
        <view class="empty-icon">📦</view>
        <text class="empty-text">{{ t('orders.noOrders') }}</text>
        <text class="empty-desc">{{ t('orders.noOrdersDesc') }}</text>
      </view>

      <!-- 订单列表 -->
      <view v-else class="orders-list">
        <view 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="order-card"
          @click="viewOrderDetail(order)"
        >
          <view class="order-header">
            <view class="order-info">
              <text class="order-number">{{ t('orders.orderNumber') }}: {{ order.orderNumber }}</text>
              <view class="status-badge" :class="getStatusClass(order.status)">
                <text class="status-text">{{ getStatusText(order.status) }}</text>
              </view>
            </view>
            <text class="order-time">{{ order.createTime }}</text>
          </view>

          <view class="order-content">
            <view class="order-summary">
              <view class="summary-item">
                <text class="summary-label">{{ t('orders.packageCount') }}</text>
                <text class="summary-value">{{ order.packageCount }}{{ t('orders.packageUnit') }}</text>
              </view>
              <view class="summary-item">
                <text class="summary-label">{{ t('orders.totalWeight') }}</text>
                <text class="summary-value">{{ order.totalWeight }}kg</text>
              </view>
              <view class="summary-item">
                <text class="summary-label">{{ t('orders.shippingFee') }}</text>
                <text class="summary-value price">¥{{ order.shippingFee }}</text>
              </view>
            </view>

            <!-- 商品列表预览 -->
            <view class="items-preview">
              <text class="items-label">{{ t('orders.goods') }}:</text>
              <text class="items-text">{{ order.items.slice(0, 3).join(', ') }}{{ order.items.length > 3 ? t('orders.etc') : '' }}</text>
            </view>

            <!-- 收货地址信息 -->
            <view class="address-info" v-if="order.address">
              <text class="address-label">{{ t('orders.recipient') }}:</text>
              <text class="address-text">{{ order.address.name }} {{ order.address.phone }}</text>
            </view>
          </view>

          <view class="order-actions">
            <view class="action-buttons">
              <view 
                v-if="order.status === 'shipping'" 
                class="action-btn primary"
                @click.stop="confirmShipping(order)"
              >
                <text class="btn-text">{{ t('orders.confirmShipping') }}</text>
              </view>
              <view 
                v-else-if="order.status === 'packing'" 
                class="action-btn secondary"
                @click.stop="confirmPacking(order)"
              >
                <text class="btn-text">{{ t('orders.confirmPacking') }}</text>
              </view>
              <view 
                v-else-if="order.status === 'payment'" 
                class="action-btn success"
                @click.stop="makePayment(order)"
              >
                <text class="btn-text">{{ t('orders.payNow') }}</text>
              </view>
              <view 
                v-else-if="order.status === 'delivery'" 
                class="action-btn warning"
                @click.stop="confirmDelivery(order)"
              >
                <text class="btn-text">{{ t('orders.confirmDelivery') }}</text>
              </view>
              <view class="action-btn outline" @click.stop="viewOrderDetail(order)">
                <text class="btn-text">{{ t('orders.details') }}</text>
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
        <text class="nav-text">{{ t('orders.navHome') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">{{ t('orders.navOrder') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">{{ t('orders.navShipping') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('profile')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">👤</text>
        </view>
        <text class="nav-text">{{ t('orders.navProfile') }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { zhLanguagePack, koLanguagePack } from '../../locales/index'
// TODO: 引入API配置
// import { getUserOrders, confirmShipping, confirmPacking, makePayment, confirmDelivery } from '@/utils/api.js'

export default {
  name: 'Orders',
  data() {
    return {
      loading: true,
      currentStatus: 'all',
      orders: [],
      statusTabs: []
    }
  },
  
  // 添加 t 方法到组件实例
  created() {
    // 初始化多语言系统
    setLanguagePacks({
      zh: zhLanguagePack,
      ko: koLanguagePack
    })
    initLocale()
    
    // 将 t 函数绑定到组件实例
    this.t = t
    
    // 初始化状态标签（使用 i18n）
    this.statusTabs = [
      { key: 'all', name: this.t('orders.statusAll'), badge: 0 },
      { key: 'shipping', name: this.t('orders.statusShipping'), badge: 0 },
      { key: 'packing', name: this.t('orders.statusPacking'), badge: 0 },
      { key: 'payment', name: this.t('orders.statusPayment'), badge: 0 },
      { key: 'delivery', name: this.t('orders.statusDelivery'), badge: 0 }
    ]
  },
  
  computed: {
    // 当前状态名称
    currentStatusName() {
      const currentTab = this.statusTabs.find(tab => tab.key === this.currentStatus)
      return currentTab ? currentTab.name : this.t('orders.orderManagement')
    },
    
    // 过滤后的订单列表
    filteredOrders() {
      if (this.currentStatus === 'all') {
        return this.orders
      }
      return this.orders.filter(order => order.status === this.currentStatus)
    }
  },
  
  onLoad(options) {
    // 获取传入的状态参数
    if (options.status) {
      this.currentStatus = options.status
    }
    this.loadOrders()
  },
  
  onPullDownRefresh() {
    this.loadOrders().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  
  methods: {
    // 加载订单数据
    async loadOrders() {
      try {
        this.loading = true
        
        // TODO: 替换为真实API调用
        // const userInfo = uni.getStorageSync('userInfo')
        // const response = await getUserOrders(userInfo.userId)
        // this.orders = response.data
        
        // 模拟数据
        await this.simulateApiCall()
        this.orders = this.getMockOrders()
        this.updateBadgeCounts()
        
      } catch (error) {
        console.error('加载订单失败:', error)
        uni.showToast({
          title: this.t('orders.loadFailed'),
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
    
    // 获取模拟订单数据
    getMockOrders() {
      return [
        {
          id: '1',
          orderNumber: 'SO2024012001',
          status: 'shipping',
          packageCount: 3,
          totalWeight: 5.2,
          shippingFee: 89.50,
          createTime: '2024-01-20 14:30:00',
          items: ['护肤品套装', '韩式零食', '化妆品', '衣物'],
          address: {
            name: '张三',
            phone: '138****8888',
            detail: '广东省深圳市南山区科技园南区A座1008室'
          }
        },
        {
          id: '2',
          orderNumber: 'SO2024012002', 
          status: 'packing',
          packageCount: 2,
          totalWeight: 3.8,
          shippingFee: 65.00,
          createTime: '2024-01-19 09:15:00',
          items: ['电子产品配件', '书籍'],
          address: {
            name: '李四',
            phone: '139****9999',
            detail: '上海市浦东新区陆家嘴环路1000号'
          }
        },
        {
          id: '3',
          orderNumber: 'SO2024012003',
          status: 'payment',
          packageCount: 1,
          totalWeight: 2.1,
          shippingFee: 45.00,
          createTime: '2024-01-18 16:45:00',
          items: ['运动用品'],
          address: {
            name: '王五',
            phone: '137****7777',
            detail: '北京市朝阳区建国门外大街1号'
          }
        },
        {
          id: '4',
          orderNumber: 'SO2024012004',
          status: 'delivery',
          packageCount: 4,
          totalWeight: 6.7,
          shippingFee: 125.00,
          createTime: '2024-01-17 11:20:00',
          items: ['食品特产', '日用品', '玩具', '文具'],
          address: {
            name: '赵六',
            phone: '135****6666',
            detail: '江苏省南京市鼓楼区中山路200号'
          }
        },
        {
          id: '5',
          orderNumber: 'SO2024012005',
          status: 'shipping',
          packageCount: 2,
          totalWeight: 4.3,
          shippingFee: 78.00,
          createTime: '2024-01-16 08:30:00',
          items: ['母婴用品', '保健品'],
          address: {
            name: '孙七',
            phone: '136****5555',
            detail: '浙江省杭州市西湖区文三路100号'
          }
        }
      ]
    },
    
    // 更新徽章数量
    updateBadgeCounts() {
      const statusCounts = {}
      this.orders.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1
      })
      
      this.statusTabs.forEach(tab => {
        if (tab.key === 'all') {
          tab.badge = this.orders.length
        } else {
          tab.badge = statusCounts[tab.key] || 0
        }
      })
    },
    
    // 切换状态
    switchStatus(status) {
      this.currentStatus = status
    },
    
    // 获取状态样式类
    getStatusClass(status) {
      const statusMap = {
        shipping: 'status-shipping',
        packing: 'status-packing',
        payment: 'status-payment',
        delivery: 'status-delivery'
      }
      return statusMap[status] || 'status-shipping'
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        shipping: this.t('orders.statusShipping'),
        packing: this.t('orders.statusPacking'),
        payment: this.t('orders.statusPayment'),
        delivery: this.t('orders.statusDelivery')
      }
      return statusMap[status] || this.t('orders.unknownStatus')
    },
    
    // 确认货齐
    async confirmShipping(order) {
      try {
        const result = await uni.showModal({
          title: this.t('orders.confirmShipping'),
          content: this.t('orders.confirmShippingMessage')
        })
        
        if (result.confirm) {
          uni.showLoading({ title: this.t('orders.processing') })
          
          // TODO: 替换为真实API调用
          // await confirmShipping({ orderId: order.id })
          
          // 模拟API调用
          await this.simulateApiCall()
          
          uni.hideLoading()
          uni.showToast({
            title: this.t('orders.confirmSuccess'),
            icon: 'success'
          })
          
          // 更新订单状态
          const index = this.orders.findIndex(o => o.id === order.id)
          if (index !== -1) {
            this.orders[index].status = 'packing'
            this.updateBadgeCounts()
          }
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: this.t('orders.operationFailed'),
          icon: 'none'
        })
      }
    },
    
    // 确认打包
    async confirmPacking(order) {
      try {
        const result = await uni.showModal({
          title: this.t('orders.confirmPacking'),
          content: this.t('orders.confirmPackingMessage')
        })
        
        if (result.confirm) {
          uni.showLoading({ title: this.t('orders.processing') })
          
          // TODO: 替换为真实API调用
          await this.simulateApiCall()
          
          uni.hideLoading()
          uni.showToast({
            title: this.t('orders.packingComplete'),
            icon: 'success'
          })
          
          // 更新订单状态
          const index = this.orders.findIndex(o => o.id === order.id)
          if (index !== -1) {
            this.orders[index].status = 'payment'
            this.updateBadgeCounts()
          }
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: this.t('orders.operationFailed'),
          icon: 'none'
        })
      }
    },
    
    // 立即支付
    async makePayment(order) {
      try {
        uni.showLoading({ title: this.t('orders.redirectingPayment') })
        
        // TODO: 替换为真实支付逻辑
        await this.simulateApiCall()
        
        uni.hideLoading()
        uni.showToast({
          title: this.t('orders.paymentSuccess'),
          icon: 'success'
        })
        
        // 更新订单状态
        const index = this.orders.findIndex(o => o.id === order.id)
        if (index !== -1) {
          this.orders[index].status = 'delivery'
          this.updateBadgeCounts()
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: this.t('orders.paymentFailed'),
          icon: 'none'
        })
      }
    },
    
    // 确认发货
    async confirmDelivery(order) {
      try {
        const result = await uni.showModal({
          title: this.t('orders.confirmDelivery'),
          content: this.t('orders.confirmDeliveryMessage')
        })
        
        if (result.confirm) {
          uni.showLoading({ title: this.t('orders.processing') })
          
          // TODO: 替换为真实API调用
          await this.simulateApiCall()
          
          uni.hideLoading()
          uni.showToast({
            title: this.t('orders.deliverySuccess'),
            icon: 'success'
          })
          
          // 移除已发货的订单
          const index = this.orders.findIndex(o => o.id === order.id)
          if (index !== -1) {
            this.orders.splice(index, 1)
            this.updateBadgeCounts()
          }
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: this.t('orders.operationFailed'),
          icon: 'none'
        })
      }
    },
    
    // 查看订单详情
    viewOrderDetail(order) {
      uni.navigateTo({
        url: `/pages/order-detail/order-detail?id=${order.id}`
      })
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 底部导航切换
    switchTab(tab) {
      const routes = {
        home: '/pages/index/index',
        order: '/pages/calculator/calculator',
        shipping: '/pages/shipping-orders/shipping-orders',
        profile: '/pages/profile/profile'
      }
      
      const route = routes[tab]
      if (route) {
        // 使用 navigateTo 而不是 switchTab，因为这些页面不在 tabBar 配置中
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

/* 标签栏样式 */
.tabs-section {
  background: white;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
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
  padding: 30rpx 20rpx;
  margin-right: 40rpx;
  display: flex;
  align-items: center;
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
  height: 4rpx;
  background: #667eea;
  border-radius: 2rpx;
}

.tab-text {
  font-size: 28rpx;
  color: #666;
  margin-right: 8rpx;
}

.tab-badge {
  background: #ff4757;
  color: white;
  font-size: 20rpx;
  padding: 4rpx 8rpx;
  border-radius: 10rpx;
  min-width: 32rpx;
  text-align: center;
}

.badge-text {
  font-size: 20rpx;
  font-weight: 500;
}

/* 内容区域 */
.content-section {
  flex: 1;
  padding: 30rpx;
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
  width: 80%;
}

.loading-line.short {
  width: 50%;
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
}

/* 订单列表 */
.orders-list {
  padding-bottom: 40rpx;
}

.order-card {
  background: white;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

/* 订单头部 */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.order-info {
  flex: 1;
}

.order-number {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
  display: block;
}

.status-badge {
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  font-size: 22rpx;
  display: inline-block;
}

.status-badge.status-shipping {
  background: #FFF3E0;
  color: #F57C00;
}

.status-badge.status-packing {
  background: #E3F2FD;
  color: #1976D2;
}

.status-badge.status-payment {
  background: #F3E5F5;
  color: #7B1FA2;
}

.status-badge.status-delivery {
  background: #E8F5E8;
  color: #388E3C;
}

.status-text {
  font-weight: 500;
}

.order-time {
  font-size: 24rpx;
  color: #999;
  text-align: right;
}

/* 订单内容 */
.order-content {
  margin-bottom: 20rpx;
}

.order-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.summary-item {
  text-align: center;
  flex: 1;
}

.summary-label {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.summary-value {
  display: block;
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
}

.summary-value.price {
  color: #f56565;
  font-weight: 600;
}

.items-preview, .address-info {
  margin-bottom: 12rpx;
  font-size: 26rpx;
  line-height: 1.4;
}

.items-label, .address-label {
  color: #666;
  margin-right: 8rpx;
}

.items-text, .address-text {
  color: #333;
}

/* 操作按钮 */
.order-actions {
  border-top: 2rpx solid #f0f0f0;
  padding-top: 20rpx;
}

.action-buttons {
  display: flex;
  gap: 16rpx;
  justify-content: flex-end;
}

.action-btn {
  padding: 16rpx 32rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
  font-weight: 500;
  border: none;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.secondary {
  background: #f8f9fa;
  color: #667eea;
  border: 2rpx solid #667eea;
}

.action-btn.success {
  background: #48bb78;
  color: white;
}

.action-btn.warning {
  background: #ed8936;
  color: white;
}

.action-btn.outline {
  background: transparent;
  color: #667eea;
  border: 2rpx solid #e2e8f0;
}

.btn-text {
  font-size: 26rpx;
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

.nav-icon-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}

.nav-icon {
  font-size: 40rpx;
  color: #9ca3af;
}

.nav-text {
  font-size: 20rpx;
  color: #666;
}
</style>
