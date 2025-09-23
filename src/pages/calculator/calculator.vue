<template>
  <view class="calculator-page">
    <!-- 头部导航 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">{{ t('calculator.title') }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 计算表单 -->
      <view class="calculator-form">
        
        <!-- 运输方式选择 -->
        <view class="form-section">
          <view class="section-header">
            <text class="required-star">*</text>
            <text class="section-title">{{ t('calculator.transport') }}</text>
          </view>
          <view class="radio-group">
            <view 
              class="radio-item" 
              :class="{ active: formData.transport === 'sea', disabled: formData.logistics === 'postal_ems' }"
              @click="selectTransport('sea')"
            >
              <view class="radio-check">
                <text v-if="formData.transport === 'sea'" class="check-icon">✓</text>
              </view>
              <text class="radio-label">{{ t('calculator.seaTransport') }}</text>
            </view>
            <view 
              class="radio-item" 
              :class="{ active: formData.transport === 'air' }"
              @click="selectTransport('air')"
            >
              <view class="radio-check">
                <text v-if="formData.transport === 'air'" class="check-icon">✓</text>
              </view>
              <text class="radio-label">{{ t('calculator.airTransport') }}</text>
            </view>
          </view>
          <text v-if="errors.transport" class="error-text">{{ errors.transport }}</text>
        </view>

        <!-- 物流方式选择 -->
        <view class="form-section">
          <view class="section-header">
            <text class="required-star">*</text>
            <text class="section-title">{{ t('calculator.logistics') }}</text>
          </view>
          <view class="radio-group">
            <view 
              class="radio-item" 
              :class="{ active: formData.logistics === 'korea_express' }"
              @click="selectLogistics('korea_express')"
            >
              <view class="radio-check">
                <text v-if="formData.logistics === 'korea_express'" class="check-icon">✓</text>
              </view>
              <text class="radio-label">{{ t('calculator.koreaExpress') }}</text>
            </view>
            <view 
              class="radio-item" 
              :class="{ active: formData.logistics === 'postal_ems' }"
              @click="selectLogistics('postal_ems')"
            >
              <view class="radio-check">
                <text v-if="formData.logistics === 'postal_ems'" class="check-icon">✓</text>
              </view>
              <text class="radio-label">{{ t('calculator.postalEms') }}</text>
            </view>
          </view>
          <text v-if="errors.logistics" class="error-text">{{ errors.logistics }}</text>
        </view>

        <!-- 重量输入 -->
        <view class="form-section">
          <view class="section-header">
            <text class="required-star">*</text>
            <text class="section-title">{{ t('calculator.weight') }}</text>
          </view>
          <view class="input-group">
            <input 
              class="form-input"
              :class="{ error: errors.weight }"
              type="digit"
              :placeholder="t('calculator.weightPlaceholder')"
              v-model="formData.weight"
              @blur="validateWeight"
              @input="clearError('weight')"
            />
            <text class="input-unit">kg</text>
          </view>
          <text v-if="errors.weight" class="error-text">{{ errors.weight }}</text>
        </view>

        <!-- 尺寸输入 -->
        <view class="dimensions-section">
          <!-- 长度 -->
          <view class="form-section">
            <view class="section-header">
              <text class="required-star">*</text>
              <text class="section-title">{{ t('calculator.length') }}</text>
            </view>
            <view class="input-group">
              <input 
                class="form-input"
                :class="{ error: errors.length }"
                type="digit"
                :placeholder="t('calculator.lengthPlaceholder')"
                v-model="formData.length"
                @blur="validateLength"
                @input="clearError('length')"
              />
              <text class="input-unit">cm</text>
            </view>
            <text v-if="errors.length" class="error-text">{{ errors.length }}</text>
          </view>

          <!-- 宽度 -->
          <view class="form-section">
            <view class="section-header">
              <text class="required-star">*</text>
              <text class="section-title">{{ t('calculator.width') }}</text>
            </view>
            <view class="input-group">
              <input 
                class="form-input"
                :class="{ error: errors.width }"
                type="digit"
                :placeholder="t('calculator.widthPlaceholder')"
                v-model="formData.width"
                @blur="validateWidth"
                @input="clearError('width')"
              />
              <text class="input-unit">cm</text>
            </view>
            <text v-if="errors.width" class="error-text">{{ errors.width }}</text>
          </view>

          <!-- 高度 -->
          <view class="form-section">
            <view class="section-header">
              <text class="required-star">*</text>
              <text class="section-title">{{ t('calculator.height') }}</text>
            </view>
            <view class="input-group">
              <input 
                class="form-input"
                :class="{ error: errors.height }"
                type="digit"
                :placeholder="t('calculator.heightPlaceholder')"
                v-model="formData.height"
                @blur="validateHeight"
                @input="clearError('height')"
              />
              <text class="input-unit">cm</text>
            </view>
            <text v-if="errors.height" class="error-text">{{ errors.height }}</text>
          </view>
        </view>

        <!-- 件数输入 -->
        <view class="form-section">
          <view class="section-header">
            <text class="required-star">*</text>
            <text class="section-title">{{ t('calculator.quantity') }}</text>
          </view>
          <view class="input-group">
            <input 
              class="form-input"
              :class="{ error: errors.quantity }"
              type="number"
              :placeholder="t('calculator.quantityPlaceholder')"
              v-model="formData.quantity"
              @blur="validateQuantity"
              @input="clearError('quantity')"
            />
          </view>
          <text v-if="errors.quantity" class="error-text">{{ errors.quantity }}</text>
        </view>

        <!-- 提交按钮 -->
        <view class="submit-section">
          <button 
            class="submit-btn"
            :class="{ loading: isCalculating }"
            @click="calculateShipping"
            :disabled="isCalculating"
          >
            <text v-if="isCalculating" class="loading-text">{{ t('calculator.calculating') }}</text>
            <text v-else class="btn-text">{{ t('calculator.calculate') }}</text>
          </button>
        </view>

        <!-- 计算结果 -->
        <view v-if="result" class="result-section">
          <view class="result-card">
            <view class="result-header">
              <text class="result-title">💰 {{ t('calculator.resultTitle') }}</text>
            </view>
            <view class="result-content">
              <view class="result-item">
                <text class="result-label">{{ t('calculator.transportMethod') }}：</text>
                <text class="result-value">{{ getTransportLabel(formData.transport) }}</text>
              </view>
              <view class="result-item">
                <text class="result-label">{{ t('calculator.logisticsMethod') }}：</text>
                <text class="result-value">{{ getLogisticsLabel(formData.logistics) }}</text>
              </view>
              <view class="result-item">
                <text class="result-label">{{ t('calculator.actualWeight') }}：</text>
                <text class="result-value">{{ formData.weight }}kg</text>
              </view>
              <view class="result-item">
                <text class="result-label">{{ t('calculator.volumeWeight') }}：</text>
                <text class="result-value">{{ result.volumeWeight }}kg</text>
              </view>
              <view class="result-item">
                <text class="result-label">{{ t('calculator.chargingWeight') }}：</text>
                <text class="result-value">{{ result.chargingWeight }}kg</text>
              </view>
              <view class="result-item">
                <text class="result-label">{{ t('calculator.packageCount') }}：</text>
                <text class="result-value">{{ formData.quantity }}{{ t('calculator.packageUnit') }}</text>
              </view>
              <view class="result-divider"></view>
              <view class="result-total">
                <text class="total-label">{{ t('calculator.totalShippingFee') }}：</text>
                <text class="total-amount">¥{{ result.totalAmount }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 运费标准说明 -->
        <view class="pricing-info">
          <view class="info-header">
            <text class="info-title">📋 {{ t('calculator.pricingStandard') }}</text>
          </view>
          <view class="pricing-list">
            <view class="pricing-item">
              <view class="pricing-icon">🚢</view>
              <view class="pricing-content">
                <text class="pricing-type">{{ t('calculator.seaShipping') }}</text>
                <text class="pricing-detail">{{ t('calculator.seaShippingPrice') }}</text>
              </view>
            </view>
            <view class="pricing-item">
              <view class="pricing-icon">✈️</view>
              <view class="pricing-content">
                <text class="pricing-type">{{ t('calculator.airShipping') }}</text>
                <text class="pricing-detail">{{ t('calculator.airShippingPrice') }}</text>
              </view>
            </view>
            <view class="pricing-item">
              <view class="pricing-icon">📮</view>
              <view class="pricing-content">
                <text class="pricing-type">{{ t('calculator.postalShipping') }}</text>
                <text class="pricing-detail">{{ t('calculator.postalShippingPrice') }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部安全距离 -->
      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { locale, t, initLocale, setLanguagePacks } from '../../utils/i18n'
import { zhLanguagePack, koLanguagePack } from '../../locales/index'

// 初始化多语言系统
onMounted(() => {
  setLanguagePacks({
    zh: zhLanguagePack,
    ko: koLanguagePack
  })
  initLocale()
})

// 类型定义
interface FormData {
  transport: string
  logistics: string
  weight: string
  length: string
  width: string
  height: string
  quantity: string
}

interface Errors {
  transport: string
  logistics: string
  weight: string
  length: string
  width: string
  height: string
  quantity: string
}

interface CalculationResult {
  totalAmount: string
  formula: string
  volumeWeight: string
  chargingWeight: string
  breakdown: {
    basePrice: number
    additionalPrice: number
    quantity: number
  }
}

// 表单数据
const formData = reactive<FormData>({
  transport: '', // 运输方式: sea/air
  logistics: '', // 物流方式: korea_express/postal_ems
  weight: '',
  length: '',
  width: '',
  height: '',
  quantity: '1'
})

// 错误信息
const errors = reactive<Errors>({
  transport: '',
  logistics: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  quantity: ''
})

// 计算状态和结果
const isCalculating = ref(false)
const result = ref<CalculationResult | null>(null)

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 选择运输方式
const selectTransport = (type: string) => {
  // 如果选择了邮政EMS，不能选择海运
  if (formData.logistics === 'postal_ems' && type === 'sea') {
    uni.showToast({
      title: t('calculator.postalSeaNotSupported'),
      icon: 'none'
    })
    return
  }
  formData.transport = type
  clearError('transport')
}

// 选择物流方式
const selectLogistics = (type: string) => {
  formData.logistics = type
  clearError('logistics')
  
  // 如果选择了邮政EMS，且当前选择了海运，则切换到空运
  if (type === 'postal_ems' && formData.transport === 'sea') {
    formData.transport = 'air'
    uni.showToast({
      title: t('calculator.postalAirOnlySupported'),
      icon: 'none'
    })
  }
}

// 清除错误信息
const clearError = (field: keyof Errors) => {
  errors[field] = ''
}

// 验证函数
const validateTransport = () => {
  if (!formData.transport) {
    errors.transport = '请选择运输方式'
    return false
  }
  return true
}

const validateLogistics = () => {
  if (!formData.logistics) {
    errors.logistics = '请选择物流方式'
    return false
  }
  return true
}

const validateWeight = () => {
  if (!formData.weight) {
    errors.weight = '请输入重量'
    return false
  }
  const weight = parseFloat(formData.weight)
  if (isNaN(weight) || weight <= 0) {
    errors.weight = '请输入有效的重量'
    return false
  }
  if (weight > 100) {
    errors.weight = '重量不能超过100kg'
    return false
  }
  return true
}

const validateLength = () => {
  if (!formData.length) {
    errors.length = '请输入长度'
    return false
  }
  const length = parseFloat(formData.length)
  if (isNaN(length) || length <= 0) {
    errors.length = '请输入有效的长度'
    return false
  }
  return true
}

const validateWidth = () => {
  if (!formData.width) {
    errors.width = '请输入宽度'
    return false
  }
  const width = parseFloat(formData.width)
  if (isNaN(width) || width <= 0) {
    errors.width = '请输入有效的宽度'
    return false
  }
  return true
}

const validateHeight = () => {
  if (!formData.height) {
    errors.height = '请输入高度'
    return false
  }
  const height = parseFloat(formData.height)
  if (isNaN(height) || height <= 0) {
    errors.height = '请输入有效的高度'
    return false
  }
  return true
}

const validateQuantity = () => {
  if (!formData.quantity) {
    errors.quantity = '请输入件数'
    return false
  }
  const quantity = parseInt(formData.quantity)
  if (isNaN(quantity) || quantity <= 0) {
    errors.quantity = '请输入有效的件数'
    return false
  }
  if (quantity > 50) {
    errors.quantity = '件数不能超过50件'
    return false
  }
  return true
}

// 验证所有字段
const validateAll = () => {
  const validations = [
    validateTransport(),
    validateLogistics(),
    validateWeight(),
    validateLength(),
    validateWidth(),
    validateHeight(),
    validateQuantity()
  ]
  return validations.every(v => v)
}

// 获取运输方式标签
const getTransportLabel = (transport: string) => {
  return transport === 'sea' ? t('calculator.seaTransport') : t('calculator.airTransport')
}

// 获取物流方式标签  
const getLogisticsLabel = (logistics: string) => {
  return logistics === 'korea_express' ? t('calculator.koreaExpress') : t('calculator.postalEms')
}

// 计算体积重量
const calculateVolumeWeight = (length: number, width: number, height: number): number => {
  return (length * width * height) / 6000
}

// 计算运费接口（预留）
const calculateShippingAPI = async (data: FormData): Promise<CalculationResult> => {
  // 这里是预留的计算接口，实际项目中需要调用后端API
  return new Promise((resolve) => {
    setTimeout(() => {
      const actualWeight = parseFloat(data.weight)
      const length = parseFloat(data.length)
      const width = parseFloat(data.width)
      const height = parseFloat(data.height)
      const quantity = parseInt(data.quantity)
      
      // 计算体积重量
      const volumeWeight = calculateVolumeWeight(length, width, height)
      
      // 取实际重量和体积重量的较大值作为计费重量
      const chargingWeight = Math.max(actualWeight, volumeWeight)
      
      let basePrice = 0
      let additionalPrice = 0
      let formula = ''
      
      if (data.logistics === 'postal_ems') {
        // 邮政EMS：首重70元+续重1元/50g
        basePrice = 70
        if (chargingWeight > 0.05) { // 50g = 0.05kg
          const additionalWeight = Math.ceil((chargingWeight - 0.05) / 0.05) // 按50g进位
          additionalPrice = additionalWeight * 1
        }
        formula = chargingWeight > 0.05 
          ? `70 + ${Math.ceil((chargingWeight - 0.05) / 0.05)} × 1 × ${quantity} = ${(basePrice + additionalPrice) * quantity}`
          : `70 × ${quantity} = ${basePrice * quantity}`
      } else {
        // CJ大韩通运
        if (data.transport === 'sea') {
          // 海运：首重25元+续重6元/kg
          basePrice = 25
          if (chargingWeight > 1) {
            additionalPrice = (chargingWeight - 1) * 6
          }
          formula = chargingWeight > 1 
            ? `25 + (${chargingWeight.toFixed(2)} - 1) × 6 × ${quantity} = ${(basePrice + additionalPrice) * quantity}`
            : `25 × ${quantity} = ${basePrice * quantity}`
        } else if (data.transport === 'air') {
          // 空运：首重33.8元+续重9元/0.5kg
          basePrice = 33.8
          if (chargingWeight > 0.5) {
            const additionalWeight = Math.ceil((chargingWeight - 0.5) / 0.5)
            additionalPrice = additionalWeight * 9
          }
          formula = chargingWeight > 0.5 
            ? `33.8 + ${Math.ceil((chargingWeight - 0.5) / 0.5)} × 9 × ${quantity} = ${(basePrice + additionalPrice) * quantity}`
            : `33.8 × ${quantity} = ${basePrice * quantity}`
        }
      }
      
      const totalAmount = ((basePrice + additionalPrice) * quantity).toFixed(2)
      
      resolve({
        totalAmount,
        formula,
        volumeWeight: volumeWeight.toFixed(2),
        chargingWeight: chargingWeight.toFixed(2),
        breakdown: {
          basePrice,
          additionalPrice,
          quantity
        }
      })
    }, 1500)
  })
}

// 计算运费
const calculateShipping = async () => {
  if (!validateAll()) {
    uni.showToast({
      title: '请完善必填信息',
      icon: 'none'
    })
    return
  }
  
  isCalculating.value = true
  
  try {
    const calculationResult = await calculateShippingAPI(formData)
    result.value = calculationResult
    
    // 滚动到结果区域
    uni.pageScrollTo({
      duration: 300,
      scrollTop: 1000
    })
    
  } catch (error) {
    uni.showToast({
      title: '计算失败，请重试',
      icon: 'none'
    })
  } finally {
    isCalculating.value = false
  }
}
</script>

<style scoped>
/* 页面容器 */
.calculator-page {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow-x: hidden;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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

/* 内容滚动区 */
.content-scroll {
  height: calc(100vh - 150rpx);
  padding: 0 30rpx;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* 表单容器 */
.calculator-form {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

/* 表单区块 */
.form-section {
  margin-bottom: 40rpx;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.required-star {
  color: #ff4757;
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 8rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
}

/* 单选按钮组 */
.radio-group {
  display: flex;
  gap: 30rpx;
}

.radio-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-radius: 16rpx;
  border: 2rpx solid #e9ecef;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.radio-item.active {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.radio-check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #dee2e6;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  transition: all 0.3s ease;
}

.radio-item.active .radio-check {
  border-color: #667eea;
  background: #667eea;
}

.check-icon {
  color: white;
  font-size: 20rpx;
  font-weight: bold;
}

.radio-label {
  font-size: 26rpx;
  color: #495057;
  font-weight: 500;
}

.radio-item.active .radio-label {
  color: #667eea;
  font-weight: 600;
}

.radio-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f1f3f4;
}

.radio-item.disabled .radio-check {
  border-color: #ced4da;
  background: #f1f3f4;
}

.radio-item.disabled .radio-label {
  color: #adb5bd;
}

/* 输入框组 */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  flex: 1;
  height: 80rpx;
  padding: 0 20rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #495057;
  background: #f8f9fa;
}

.form-input.error {
  border-color: #ff4757;
}

.form-input:focus {
  border-color: #667eea;
  background: white;
}

.input-unit {
  position: absolute;
  right: 20rpx;
  font-size: 24rpx;
  color: #6c757d;
  background: white;
  padding: 0 8rpx;
}

/* 尺寸区域 */
.dimensions-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

/* 错误提示 */
.error-text {
  color: #ff4757;
  font-size: 22rpx;
  margin-top: 8rpx;
  display: block;
}

/* 提交区域 */
.submit-section {
  margin-top: 60rpx;
}

.submit-btn {
  width: 100%;
  height: 100rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.submit-btn:active {
  transform: scale(0.96);
}

.submit-btn.loading {
  background: #95a5a6;
}

.submit-btn[disabled] {
  opacity: 0.6;
}

.loading-text, .btn-text {
  color: white;
}

/* 结果区域 */
.result-section {
  margin-top: 40rpx;
}

.result-card {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 24rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(102, 126, 234, 0.2);
}

.result-header {
  margin-bottom: 24rpx;
}

.result-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.result-label {
  font-size: 24rpx;
  color: #6c757d;
}

.result-value {
  font-size: 24rpx;
  color: #495057;
  font-weight: 500;
}

.result-divider {
  height: 1rpx;
  background: #dee2e6;
  margin: 24rpx 0;
}

.result-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.total-label {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c3e50;
}

.total-amount {
  font-size: 32rpx;
  font-weight: 700;
  color: #ff4757;
}

.result-formula {
  text-align: center;
  margin-top: 16rpx;
}

.formula-text {
  font-size: 22rpx;
  color: #6c757d;
  background: rgba(255, 255, 255, 0.8);
  padding: 12rpx 20rpx;
  border-radius: 12rpx;
}

/* 运费标准说明 */
.pricing-info {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-top: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.info-header {
  margin-bottom: 24rpx;
}

.info-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
}

.pricing-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16rpx;
  margin-bottom: 16rpx;
}

.pricing-icon {
  font-size: 32rpx;
  margin-right: 20rpx;
}

.pricing-content {
  flex: 1;
}

.pricing-type {
  font-size: 24rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-right: 20rpx;
}

.pricing-detail {
  font-size: 22rpx;
  color: #6c757d;
}

.bottom-safe {
  height: 60rpx;
}

/* 响应式 */
@media (max-width: 400px) {
  .dimensions-section {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 16rpx;
  }
}
</style>
