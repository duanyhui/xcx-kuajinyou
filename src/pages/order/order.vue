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
            <text class="page-title">包裹预报</text>
            <view class="header-placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 表单内容 -->
    <view class="form-section">
      <!-- 基本信息卡片 -->
      <view class="form-card">
        <view class="card-header">
          <text class="card-title">包裹预报</text>
        </view>
        
        <view class="form-group">
          <view class="form-item required">
            <text class="form-label">快递单号</text>
            <input 
              class="form-input" 
              v-model="packageForm.trackingNumber"
              placeholder="单个国内快递或物流单号"
              @input="onTrackingNumberInput"
            />
          </view>
          
          <view class="form-item required">
            <text class="form-label">包裹件数</text>
            <input 
              class="form-input" 
              v-model="packageForm.packageCount"
              placeholder="1"
              type="number"
              @input="onPackageCountInput"
            />
          </view>
          
          <view class="form-item">
            <text class="form-label">留言备注</text>
            <textarea 
              class="form-textarea" 
              v-model="packageForm.remarks"
              placeholder="如有特别要求请在此填写"
              maxlength="200"
              show-confirm-bar="false"
            />
          </view>
        </view>
      </view>

      <!-- 包裹明细卡片 -->
      <view class="form-card">
        <view class="card-header">
          <text class="card-title">包裹明细</text>
          <view class="add-btn" @click="addPackageDetail">
            <text class="add-btn-text">添加明细</text>
          </view>
        </view>
        
        <!-- 明细列表 -->
        <view class="detail-list" v-if="packageDetails.length > 0">
          <view 
            class="detail-item" 
            v-for="(detail, index) in packageDetails" 
            :key="detail.id"
          >
            <view class="detail-header">
              <text class="detail-index">明细 {{ index + 1 }}</text>
              <view class="delete-btn" @click="deletePackageDetail(index)">
                <text class="delete-text">删除</text>
              </view>
            </view>
            
            <view class="detail-form">
              <view class="form-item required">
                <text class="form-label">申报品名</text>
                <input 
                  class="form-input" 
                  v-model="detail.productName"
                  placeholder="请填写中文货品名"
                  @input="onDetailInput(index, 'productName', $event)"
                />
              </view>
              
              <view class="form-item required">
                <text class="form-label">申报单价</text>
                <view class="price-input-wrapper">
                  <input 
                    class="form-input price-input" 
                    v-model="detail.unitPrice"
                    placeholder="请填写价格"
                    type="digit"
                    @input="onDetailInput(index, 'unitPrice', $event)"
                  />
                  <text class="currency-label">RMB</text>
                </view>
              </view>
              
              <view class="form-item required">
                <text class="form-label">申报数量</text>
                <input 
                  class="form-input" 
                  v-model="detail.quantity"
                  placeholder="请填写数量"
                  type="number"
                  @input="onDetailInput(index, 'quantity', $event)"
                />
              </view>
            </view>
          </view>
        </view>
        
        <!-- 空状态 -->
        <view class="empty-state" v-else>
          <text class="empty-text">暂无明细信息</text>
          <text class="empty-desc">点击"添加明细"按钮添加包裹明细</text>
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-section">
      <view class="submit-btn" @click="submitPackage" :class="{ disabled: !canSubmit }">
        <text class="submit-text">提交</text>
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
      <view class="nav-item active" @click="switchTab('order')">
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

    <!-- 安全距离 -->
    <view class="safe-area"></view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 包裹基本信息
interface PackageForm {
  trackingNumber: string
  packageCount: string
  remarks: string
}

// 包裹明细信息
interface PackageDetail {
  id: string
  productName: string
  unitPrice: string
  quantity: string
}

// API 提交数据结构
interface ApiSubmitData {
  trackingNumber: string
  packageCount: number
  remarks: string
  details: Array<{
    productName: string
    unitPrice: number
    quantity: number
  }>
}

const packageForm = ref<PackageForm>({
  trackingNumber: '',
  packageCount: '1',
  remarks: ''
})

const packageDetails = ref<PackageDetail[]>([])

// 生成唯一ID
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// 添加包裹明细
const addPackageDetail = () => {
  const newDetail: PackageDetail = {
    id: generateId(),
    productName: '',
    unitPrice: '',
    quantity: ''
  }
  packageDetails.value.push(newDetail)
}

// 删除包裹明细
const deletePackageDetail = (index: number) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条明细吗？',
    success: (res) => {
      if (res.confirm) {
        packageDetails.value.splice(index, 1)
      }
    }
  })
}

// 检查是否可以提交
const canSubmit = computed(() => {
  const hasBasicInfo = packageForm.value.trackingNumber.trim() && 
                      packageForm.value.packageCount.trim()
  
  const hasValidDetails = packageDetails.value.length > 0 && 
                         packageDetails.value.every(detail => 
                           detail.productName.trim() && 
                           detail.unitPrice.trim() && 
                           detail.quantity.trim()
                         )
  
  return hasBasicInfo && hasValidDetails
})

// 输入事件处理
const onTrackingNumberInput = (e: any) => {
  packageForm.value.trackingNumber = e.detail.value
}

const onPackageCountInput = (e: any) => {
  packageForm.value.packageCount = e.detail.value
}

const onDetailInput = (index: number, field: keyof PackageDetail, e: any) => {
  if (field !== 'id') {
    packageDetails.value[index][field] = e.detail.value
  }
}

// 提交包裹预报
const submitPackage = async () => {
  if (!canSubmit.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }

  try {
    // 显示加载中
    uni.showLoading({
      title: '提交中...'
    })

    // 构建提交数据
    const submitData: ApiSubmitData = {
      trackingNumber: packageForm.value.trackingNumber.trim(),
      packageCount: parseInt(packageForm.value.packageCount) || 1,
      remarks: packageForm.value.remarks.trim(),
      details: packageDetails.value.map(detail => ({
        productName: detail.productName.trim(),
        unitPrice: parseFloat(detail.unitPrice) || 0,
        quantity: parseInt(detail.quantity) || 1
      }))
    }

    console.log('提交数据:', submitData)

    // TODO: 替换为实际的API请求
    const result = await submitPackagePreview(submitData)
    
    uni.hideLoading()
    
    if (result.success) {
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      })
      
      // 清空表单
      resetForm()
      
      // 可选：跳转到列表页面
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({
        title: result.message || '提交失败',
        icon: 'none'
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('提交失败:', error)
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none'
    })
  }
}

// API请求函数 - 需要修改这里的URL和参数处理
const submitPackagePreview = async (data: ApiSubmitData): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve) => {
    // 模拟API请求
    setTimeout(() => {
      // TODO: 替换为实际的API调用
      /*
      uni.request({
        url: 'https://your-api-domain.com/api/package/preview', // 替换为实际API地址
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          // 如需要认证，添加token
          // 'Authorization': 'Bearer ' + uni.getStorageSync('token')
        },
        data: data,
        success: (res) => {
          if (res.statusCode === 200 && res.data.code === 0) {
            resolve({ success: true })
          } else {
            resolve({ 
              success: false, 
              message: res.data.message || '提交失败' 
            })
          }
        },
        fail: (error) => {
          resolve({ 
            success: false, 
            message: '网络异常' 
          })
        }
      })
      */
      
      // 模拟成功响应
      resolve({ success: true })
    }, 1500)
  })
}

// 重置表单
const resetForm = () => {
  packageForm.value = {
    trackingNumber: '',
    packageCount: '1',
    remarks: ''
  }
  packageDetails.value = []
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 底部导航切换
const switchTab = (tab: string) => {
  console.log('切换标签:', tab)
  
  if (tab === 'home') {
    uni.redirectTo({
      url: '/pages/index/index'
    })
  } else if (tab === 'order') {
    // 当前页面，无需跳转
    return
  } else if (tab === 'shipping') {
    uni.navigateTo({
      url: '/pages/shipping-orders/shipping-orders'
    })
  } else {
    uni.showToast({
      title: `${tab}功能开发中`,
      icon: 'none',
      duration: 1000
    })
  }
}
</script>

<style scoped>
/* 页面样式 */
.page {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: calc(200rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 头部区域 */
.header-section {
  position: relative;
  padding: 80rpx 0 40rpx;
  overflow: hidden;
  width: 100%;
}

.header-bg {
  position: relative;
  padding: 0 30rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.back-btn:active {
  transform: scale(0.9);
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
  text-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.3);
}

.header-placeholder {
  width: 60rpx;
  height: 60rpx;
}

/* 表单区域 */
.form-section {
  padding: 0 30rpx;
  margin-top: -20rpx;
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.form-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
}

.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 16rpx 32rpx;
  border-radius: 50rpx;
  transition: all 0.3s ease;
}

.add-btn:active {
  transform: scale(0.95);
}

.add-btn-text {
  font-size: 24rpx;
  color: white;
  font-weight: 500;
}

/* 表单组件 */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.form-item.required .form-label::before {
  content: '*';
  color: #ff4757;
  margin-right: 8rpx;
}

.form-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #2c3e50;
}

.form-input {
  height: 80rpx;
  padding: 0 24rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 20rpx;
  font-size: 28rpx;
  color: #2c3e50;
  background: #fafbfc;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
}

.form-textarea {
  min-height: 120rpx;
  padding: 20rpx 24rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 20rpx;
  font-size: 28rpx;
  color: #2c3e50;
  background: #fafbfc;
  transition: all 0.3s ease;
  box-sizing: border-box;
  line-height: 1.5;
}

.form-textarea:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
}

.price-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.price-input {
  flex: 1;
  padding-right: 80rpx;
}

.currency-label {
  position: absolute;
  right: 24rpx;
  font-size: 28rpx;
  color: #7f8c8d;
  font-weight: 500;
}

/* 明细列表 */
.detail-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.detail-item {
  border: 2rpx solid #e9ecef;
  border-radius: 24rpx;
  padding: 32rpx;
  background: #fafbfc;
  transition: all 0.3s ease;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #e9ecef;
}

.detail-index {
  font-size: 28rpx;
  font-weight: 600;
  color: #667eea;
}

.delete-btn {
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  background: rgba(255, 71, 87, 0.1);
  transition: all 0.3s ease;
}

.delete-btn:active {
  transform: scale(0.95);
  background: rgba(255, 71, 87, 0.2);
}

.delete-text {
  font-size: 24rpx;
  color: #ff4757;
  font-weight: 500;
}

.detail-form {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #95a5a6;
  display: block;
  margin-bottom: 12rpx;
}

.empty-desc {
  font-size: 24rpx;
  color: #bdc3c7;
  display: block;
}

/* 提交区域 */
.submit-section {
  position: fixed;
  bottom: 140rpx;
  left: 0;
  right: 0;
  width: 100vw;
  padding: 20rpx 30rpx;
  background: white;
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 99;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
}

.submit-btn:active {
  transform: scale(0.98);
}

.submit-btn.disabled {
  background: #bdc3c7;
  box-shadow: none;
}

.submit-btn.disabled:active {
  transform: none;
}

.submit-text {
  font-size: 32rpx;
  font-weight: 600;
  color: white;
}

.submit-btn.disabled .submit-text {
  color: #ecf0f1;
}

/* 安全距离 */
.safe-area {
  height: 0;
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
  .header-bg,
  .form-section,
  .submit-section {
    padding-left: 20rpx;
    padding-right: 20rpx;
  }
  
  .form-card {
    padding: 30rpx;
  }
  
  .detail-item {
    padding: 24rpx;
  }
  
  .page-title {
    font-size: 32rpx;
  }
}

/* 输入框占位符样式 */
.form-input::placeholder,
.form-textarea::placeholder {
  color: #bdc3c7;
  font-size: 26rpx;
}

/* 滚动优化 */
.detail-list {
  max-height: none;
  overflow: visible;
}

/* 表单验证状态 */
.form-item.error .form-input,
.form-item.error .form-textarea {
  border-color: #ff4757;
  background: rgba(255, 71, 87, 0.05);
}

/* 加载状态 */
.submit-btn.loading {
  background: #95a5a6;
  pointer-events: none;
}

.submit-btn.loading .submit-text::after {
  content: '';
  width: 20rpx;
  height: 20rpx;
  border: 2rpx solid transparent;
  border-top: 2rpx solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 12rpx;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
