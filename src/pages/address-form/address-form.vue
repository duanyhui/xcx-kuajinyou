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
            <text class="page-title">{{ isEditMode ? t('addressForm.editTitle') : t('addressForm.title') }}</text>
            <view class="placeholder"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 表单内容 -->
    <view class="content-section">
      <view class="form-container">
        <!-- 通关号码 -->
        <view class="form-group">
          <view class="form-label">
            <text class="label-text">{{ t('addressForm.customsCodeLabel') }}</text>
            <text class="required">*</text>
          </view>
          <view class="form-input">
            <input 
              v-model="formData.customsCode"
              :placeholder="t('addressForm.customsCodePlaceholder')"
              class="input-field"
              :class="{ error: formData.customsCode.trim() !== '' && formData.customsCode.trim() === '' }"
              maxlength="50"
            />
            <text class="field-error" v-if="formData.customsCode.trim() === '' && hasSubmitAttempt">
              {{ t('addressForm.customsCodeRequired') }}
            </text>
          </view>
        </view>

        <!-- 收件人名 -->
        <view class="form-group">
          <view class="form-label">
            <text class="label-text">{{ t('addressForm.recipientNameLabel') }}</text>
            <text class="required">*</text>
          </view>
          <view class="form-input">
            <input 
              v-model="formData.recipientName"
              :placeholder="t('addressForm.recipientNamePlaceholder')"
              class="input-field"
              :class="{ error: formData.recipientName.trim() === '' && hasSubmitAttempt }"
              maxlength="20"
            />
            <text class="field-error" v-if="formData.recipientName.trim() === '' && hasSubmitAttempt">
              {{ t('addressForm.recipientNameRequired') }}
            </text>
          </view>
        </view>

        <!-- 联系方式 -->
        <view class="form-group">
          <view class="form-label">
            <text class="label-text">{{ t('addressForm.phoneLabel') }}</text>
            <text class="required">*</text>
          </view>
          <view class="form-input">
            <input 
              v-model="formData.phone"
              :placeholder="t('addressForm.phonePlaceholder')"
              class="input-field"
              :class="{ error: (formData.phone.trim() === '' || !isPhoneValid) && hasSubmitAttempt }"
              maxlength="11"
              type="number"
            />
            <text class="field-error" v-if="formData.phone.trim() === '' && hasSubmitAttempt">
              {{ t('addressForm.phoneRequired') }}
            </text>
            <text class="field-error" v-if="formData.phone.trim() !== '' && !isPhoneValid && hasSubmitAttempt">
              {{ t('addressForm.phoneInvalid') }}
            </text>
          </view>
        </view>

        <!-- 韩国地址 -->
        <view class="form-group">
          <view class="form-label">
            <text class="label-text">{{ t('addressForm.koreanAddressLabel') }}</text>
            <text class="required">*</text>
          </view>
          <view class="form-input">
            <textarea 
              v-model="formData.koreanAddress"
              :placeholder="t('addressForm.koreanAddressPlaceholder')"
              class="textarea-field"
              :class="{ error: formData.koreanAddress.trim() === '' && hasSubmitAttempt }"
              maxlength="200"
              auto-height
            />
            <text class="field-error" v-if="formData.koreanAddress.trim() === '' && hasSubmitAttempt">
              {{ t('addressForm.koreanAddressRequired') }}
            </text>
            <view class="address-actions">
              <view class="address-action" @click="showAddressTips">
                <text class="action-icon">💡</text>
                <text class="action-text">{{ t('addressForm.addressFormatTips') }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 韩国邮编 -->
        <view class="form-group">
          <view class="form-label">
            <text class="label-text">{{ t('addressForm.koreanPostalCodeLabel') }}</text>
            <text class="required">*</text>
          </view>
          <view class="form-input">
            <input 
              v-model="formData.koreanPostalCode"
              :placeholder="t('addressForm.koreanPostalCodePlaceholder')"
              class="input-field"
              :class="{ error: formData.koreanPostalCode.trim() === '' && hasSubmitAttempt }"
              maxlength="10"
              type="number"
            />
            <text class="field-error" v-if="formData.koreanPostalCode.trim() === '' && hasSubmitAttempt">
              {{ t('addressForm.koreanPostalCodeRequired') }}
            </text>
          </view>
        </view>

        <!-- 设为默认地址 -->
        <view class="form-group checkbox-group">
          <view class="checkbox-item" @click="toggleDefault">
            <view class="checkbox" :class="{ checked: formData.isDefault }">
              <text class="check-icon" v-if="formData.isDefault">✓</text>
            </view>
            <text class="checkbox-text">{{ t('addressForm.setDefaultAddress') }}</text>
          </view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-section">
        <view class="submit-btn" @click="submitForm" :class="{ disabled: !isFormValid }">
          <text class="submit-text">{{ submitLoading ? t('addressForm.submitting') : t('addressForm.submit') }}</text>
        </view>
      </view>
    </view>

    <!-- 地址格式说明弹窗 -->
    <view class="modal-overlay" v-if="showTipsModal" @click="hideTipsModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">{{ t('addressForm.addressFormatTitle') }}</text>
          <view class="close-btn" @click="hideTipsModal">
            <text class="close-icon">×</text>
          </view>
        </view>
        <view class="modal-body">
          <view class="tip-item">
            <text class="tip-title">{{ t('addressForm.formatRequirement') }}</text>
            <text class="tip-desc">{{ t('addressForm.formatRequirementDesc') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-title">{{ t('addressForm.addressOrder') }}</text>
            <text class="tip-desc">{{ t('addressForm.addressOrderDesc') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-title">{{ t('addressForm.example') }}</text>
            <text class="tip-desc">{{ t('addressForm.exampleDesc') }}</text>
          </view>
          <view class="tip-item">
            <text class="tip-title">{{ t('addressForm.suggestion') }}</text>
            <text class="tip-desc">{{ t('addressForm.suggestionDesc') }}</text>
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
        <text class="nav-text">{{ t('addressForm.navHome') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('order')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📋</text>
        </view>
        <text class="nav-text">{{ t('addressForm.navOrder') }}</text>
      </view>
      <view class="nav-item" @click="switchTab('shipping')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">📦</text>
        </view>
        <text class="nav-text">{{ t('addressForm.navShipping') }}</text>
      </view>
      <view class="nav-item active" @click="switchTab('profile')">
        <view class="nav-icon-wrapper">
          <text class="nav-icon">👤</text>
        </view>
        <text class="nav-text">{{ t('addressForm.navProfile') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { languagePacks } from '../../locales/index'

// 初始化多语言
onMounted(() => {
  initLocale()
  setLanguagePacks(languagePacks)
})

interface AddressForm {
  customsCode: string
  recipientName: string
  phone: string
  koreanAddress: string
  koreanPostalCode: string
  isDefault: boolean
}

const isEditMode = ref(false)
const addressId = ref('')
const submitLoading = ref(false)
const showTipsModal = ref(false)
const hasSubmitAttempt = ref(false)

const formData = ref<AddressForm>({
  customsCode: '',
  recipientName: '',
  phone: '',
  koreanAddress: '',
  koreanPostalCode: '',
  isDefault: false
})

// 手机号验证
const isPhoneValid = computed(() => {
  const phonePattern = /^1[0-9]{10}$/; // 11位中国手机号
  return phonePattern.test(formData.value.phone)
})

// 表单验证
const isFormValid = computed(() => {
  return formData.value.customsCode.trim() !== '' &&
         formData.value.recipientName.trim() !== '' &&
         formData.value.phone.trim() !== '' &&
         formData.value.koreanAddress.trim() !== '' &&
         formData.value.koreanPostalCode.trim() !== '' &&
         isPhoneValid.value
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 切换默认地址
const toggleDefault = () => {
  formData.value.isDefault = !formData.value.isDefault
}

// 显示地址格式说明
const showAddressTips = () => {
  showTipsModal.value = true
}

// 隐藏地址格式说明
const hideTipsModal = () => {
  showTipsModal.value = false
}

// 获取地址详情（编辑模式）
const getAddressDetail = async (id: string) => {
  try {
    // TODO: 替换为真实的API调用
    // const response = await uni.request({
    //   url: `/api/user/address/${id}`,
    //   method: 'GET',
    //   header: {
    //     'Authorization': `Bearer ${getToken()}`
    //   }
    // })
    
    // 模拟数据
    setTimeout(() => {
      formData.value = {
        customsCode: 'P12345678',
        recipientName: '颜',
        phone: '186666666661',
        koreanAddress: '서울특별시 강남구 테헤란로 123',
        koreanPostalCode: '06142',
        isDefault: false
      }
    }, 300)
  } catch (error) {
    uni.showToast({
      title: '获取地址信息失败',
      icon: 'none'
    })
  }
}

// 提交表单
const submitForm = async () => {
  hasSubmitAttempt.value = true
  
  if (!isFormValid.value || submitLoading.value) {
    uni.showToast({
      title: '请完善表单信息',
      icon: 'none'
    })
    return
  }

  submitLoading.value = true

  try {
    if (isEditMode.value) {
      // TODO: 替换为真实的API调用 - 编辑地址
      // await uni.request({
      //   url: `/api/user/address/${addressId.value}`,
      //   method: 'PUT',
      //   data: formData.value,
      //   header: {
      //     'Authorization': `Bearer ${getToken()}`
      //   }
      // })
    } else {
      // TODO: 替换为真实的API调用 - 新增地址
      // await uni.request({
      //   url: '/api/user/address',
      //   method: 'POST',
      //   data: formData.value,
      //   header: {
      //     'Authorization': `Bearer ${getToken()}`
      //   }
      // })
    }

    // 模拟提交
    setTimeout(() => {
      submitLoading.value = false
      uni.showToast({
        title: isEditMode.value ? '地址修改成功' : '地址添加成功',
        icon: 'success'
      })
      
      // 返回地址列表
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }, 1000)

  } catch (error) {
    submitLoading.value = false
    uni.showToast({
      title: isEditMode.value ? '地址修改失败' : '地址添加失败',
      icon: 'none'
    })
  }
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
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const options = currentPage.options || {}
  
  if (options.mode === 'edit' && options.id) {
    isEditMode.value = true
    addressId.value = options.id
    getAddressDetail(options.id)
  }
})
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
}

.form-container {
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 40rpx;
}

/* 表单组 */
.form-group {
  margin-bottom: 40rpx;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.label-text {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 500;
}

.required {
  color: #ef4444;
  font-size: 28rpx;
  margin-left: 4rpx;
}

.form-input {
  position: relative;
}

.input-field {
  width: 100%;
  height: 80rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  color: #1f2937;
  background: #ffffff;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #667eea;
  outline: none;
}

.input-field.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.textarea-field {
  width: 100%;
  min-height: 120rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
  font-size: 28rpx;
  color: #1f2937;
  background: #ffffff;
  box-sizing: border-box;
  line-height: 1.5;
  transition: border-color 0.3s ease;
}

.textarea-field:focus {
  border-color: #667eea;
  outline: none;
}

.textarea-field.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

/* 错误提示文字 */
.field-error {
  font-size: 22rpx;
  color: #ef4444;
  margin-top: 8rpx;
  display: block;
  line-height: 1.4;
}

/* 地址操作 */
.address-actions {
  margin-top: 16rpx;
}

.address-action {
  display: flex;
  align-items: center;
  padding: 16rpx;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12rpx;
  border: 1rpx solid rgba(102, 126, 234, 0.2);
}

.action-icon {
  font-size: 24rpx;
  margin-right: 8rpx;
}

.action-text {
  font-size: 24rpx;
  color: #667eea;
  font-weight: 500;
}

/* 复选框组 */
.checkbox-group {
  border-top: 1rpx solid #f3f4f6;
  padding-top: 32rpx;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #d1d5db;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
}

.checkbox.checked {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
}

.check-icon {
  font-size: 24rpx;
  color: white;
  font-weight: bold;
}

.checkbox-text {
  font-size: 28rpx;
  color: #374151;
}

/* 提交按钮 */
.submit-section {
  margin-top: 40rpx;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 24rpx;
  padding: 32rpx;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.3);
}

.submit-btn.disabled {
  background: #d1d5db;
  box-shadow: none;
}

.submit-text {
  font-size: 32rpx;
  color: white;
  font-weight: 600;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 40rpx;
}

.modal-content {
  background: white;
  border-radius: 24rpx;
  width: 100%;
  max-width: 600rpx;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f3f4f6;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f3f4f6;
}

.close-icon {
  font-size: 32rpx;
  color: #6b7280;
  font-weight: bold;
}

.modal-body {
  padding: 32rpx;
  max-height: 400rpx;
  overflow-y: auto;
}

.tip-item {
  margin-bottom: 24rpx;
}

.tip-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8rpx;
  display: block;
}

.tip-desc {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.5;
  display: block;
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
  
  .form-container {
    padding: 30rpx;
  }
}
</style>
