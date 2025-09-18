<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header-section">
      <view class="header-bg">
        <view class="header-content">
          <view class="header-top">
            <view class="back-btn" @click="goBack">
              <text class="back-icon">‹</text>
            </view>
            <text class="page-title">{{ t('myAddress.title') }}</text>
            <view class="placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 地址列表内容 -->
    <view class="content-section">
      <!-- 空状态 -->
      <view class="empty-state" v-if="addressList.length === 0 && !loading">
        <view class="empty-icon">📮</view>
        <text class="empty-title">{{ t('myAddress.emptyTitle') }}</text>
        <text class="empty-desc">{{ t('myAddress.emptyDesc') }}</text>
      </view>

      <!-- 地址列表 -->
      <view class="address-list" v-else>
        <view 
          class="address-item" 
          v-for="(address, index) in addressList" 
          :key="address.id"
          @click="editAddress(address)"
        >
          <view class="address-content">
            <view class="address-header">
              <text class="recipient-name">{{ address.name }}</text>
              <text class="recipient-phone">{{ address.phone }}</text>
              <view class="default-tag" v-if="address.isDefault">
                <text class="tag-text">{{ t('myAddress.defaultTag') }}</text>
              </view>
            </view>
            <text class="address-detail">{{ address.fullAddress }}</text>
          </view>
          <view class="address-actions">
            <view class="action-btn edit" @click.stop="editAddress(address)">
              <text class="action-text">{{ t('myAddress.editBtn') }}</text>
            </view>
            <view class="action-btn delete" @click.stop="deleteAddress(address.id, index)">
              <text class="action-text">{{ t('myAddress.deleteBtn') }}</text>
            </view>
          </view>
          <view class="arrow-icon">
            <text class="arrow">›</text>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="loading">
        <text class="loading-text">{{ t('myAddress.loading') }}</text>
      </view>
    </view>

    <!-- 新增收货地址按钮 -->
    <view class="add-address-section">
      <view class="add-btn" @click="addNewAddress">
        <text class="add-btn-text">{{ t('myAddress.addNewBtn') }}</text>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="switchTab('home')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">🏠</text>
        </view>
        <text class="nav-text">{{ t('myAddress.navHome') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">{{ t('myAddress.navOrder') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">{{ t('myAddress.navShipping') }}</text>
      </view>
      <view class="nav-item active" @click="switchTab('profile')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">👤</text>
        </view>
        <text class="nav-text">{{ t('myAddress.navProfile') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { languagePacks } from '../../locales/index'

// 初始化多语言
onMounted(() => {
  initLocale()
  setLanguagePacks(languagePacks)
})

interface Address {
  id: string
  name: string
  phone: string
  fullAddress: string
  isDefault: boolean
}

const loading = ref(false)
const addressList = ref<Address[]>([])

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 获取地址列表
const getAddressList = async () => {
  loading.value = true
  try {
    // TODO: 替换为真实的API调用
    // const response = await uni.request({
    //   url: '/api/user/address/list',
    //   method: 'GET',
    //   header: {
    //     'Authorization': `Bearer ${getToken()}`
    //   }
    // })
    
    // 模拟数据 - 初始为空状态，可以通过添加地址来测试
    setTimeout(() => {
      addressList.value = [
        // 取消注释下面的代码来显示示例地址
        // {
        //   id: '1',
        //   name: '颜',
        //   phone: '18679982792',
        //   fullAddress: '首尔特别市 江南区 테헤란로 123길 45, 678호',
        //   isDefault: true
        // }
      ]
      loading.value = false
    }, 500)
  } catch (error) {
    loading.value = false
    uni.showToast({
      title: t('myAddress.fetchError'),
      icon: 'none'
    })
  }
}

// 新增地址
const addNewAddress = () => {
  uni.navigateTo({
    url: '/pages/address-form/address-form?mode=add'
  })
}

// 编辑地址
const editAddress = (address: Address) => {
  uni.navigateTo({
    url: `/pages/address-form/address-form?mode=edit&id=${address.id}`
  })
}

// 删除地址
const deleteAddress = (addressId: string, index: number) => {
  uni.showModal({
    title: t('myAddress.confirmDeleteTitle'),
    content: t('myAddress.confirmDeleteContent'),
    success: async (res) => {
      if (res.confirm) {
        try {
          // TODO: 替换为真实的API调用
          // await uni.request({
          //   url: `/api/user/address/${addressId}`,
          //   method: 'DELETE',
          //   header: {
          //     'Authorization': `Bearer ${getToken()}`
          //   }
          // })
          
          // 模拟删除
          addressList.value.splice(index, 1)
          uni.showToast({
            title: t('myAddress.deleteSuccess'),
            icon: 'success'
          })
        } catch (error) {
          uni.showToast({
            title: t('myAddress.deleteFailed'),
            icon: 'none'
          })
        }
      }
    }
  })
}

// 底部导航切换
const switchTab = (tab: string) => {
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
    uni.redirectTo({
      url: '/pages/profile/profile'
    })
  }
}

// 页面加载
onMounted(() => {
  getAddressList()
})

// 监听页面显示（使用 uni-app 的页面生命周期）
uni.addInterceptor('navigateBack', {
  success() {
    // 从其他页面返回时刷新数据
    getAddressList()
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 220rpx;
}

/* 头部区域 */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: var(--status-bar-height, 44px);
}

.header-bg {
  padding: 20rpx;
}

.header-content {
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20rpx;
  backdrop-filter: blur(10rpx);
}

.back-icon {
  font-size: 36rpx;
  color: white;
  font-weight: bold;
}

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: white;
  text-align: center;
}

.placeholder {
  width: 60rpx;
}

/* 内容区域 */
.content-section {
  padding: 40rpx 30rpx;
  min-height: 50vh;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 120rpx 40rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
  display: block;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16rpx;
  display: block;
}

.empty-desc {
  font-size: 26rpx;
  color: #7f8c8d;
  display: block;
}

/* 地址列表 */
.address-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.address-item {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  position: relative;
  display: flex;
  align-items: center;
}

.address-content {
  flex: 1;
  margin-right: 20rpx;
}

.address-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  gap: 20rpx;
}

.recipient-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2937;
}

.recipient-phone {
  font-size: 28rpx;
  color: #6b7280;
}

.default-tag {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 4rpx 16rpx;
  border-radius: 16rpx;
}

.tag-text {
  font-size: 20rpx;
  color: white;
  font-weight: 500;
}

.address-detail {
  font-size: 26rpx;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 20rpx;
  display: block;
}

.address-actions {
  display: flex;
  gap: 16rpx;
  margin-bottom: 0;
}

.action-btn {
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
  border: 1rpx solid;
}

.action-btn.edit {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.action-btn.delete {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.action-btn.edit .action-text {
  color: #667eea;
  font-size: 22rpx;
  font-weight: 500;
}

.action-btn.delete .action-text {
  color: #ef4444;
  font-size: 22rpx;
  font-weight: 500;
}

.arrow-icon {
  margin-left: 20rpx;
}

.arrow {
  font-size: 32rpx;
  color: #d1d5db;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60rpx;
}

.loading-text {
  font-size: 28rpx;
  color: #6b7280;
}

/* 新增按钮区域 */
.add-address-section {
  position: fixed;
  bottom: 180rpx;
  left: 30rpx;
  right: 30rpx;
  z-index: 50;
}

.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 24rpx;
  padding: 32rpx;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.3);
}

.add-btn-text {
  font-size: 32rpx;
  color: white;
  font-weight: 600;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: 100vw;
  height: 140rpx;
  background: white;
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
  box-sizing: border-box;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  transition: all 0.3s ease;
}

.nav-item:active {
  transform: scale(0.9);
}

.nav-icon-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
  transition: all 0.3s ease;
}

.nav-item.active .nav-icon-wrapper {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.3);
}

.nav-item .nav-icon-wrapper {
  background: transparent;
}

.nav-icon {
  font-size: 32rpx;
  transition: all 0.3s ease;
}

.nav-item.active .nav-icon {
  filter: grayscale(100%) brightness(0) invert(1);
  transform: scale(1.1);
}

.nav-item .nav-icon {
  color: #95a5a6;
}

.nav-text {
  font-size: 20rpx;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item.active .nav-text {
  color: #667eea;
  font-weight: 600;
}

.nav-item .nav-text {
  color: #95a5a6;
}

/* 响应式优化 */
@media (max-width: 400px) {
  .content-section {
    padding: 30rpx 20rpx;
  }
  
  .address-item {
    padding: 24rpx;
  }
  
  .address-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8rpx;
  }
  
  .add-address-section {
    left: 20rpx;
    right: 20rpx;
  }
}
</style>
