# 地址管理功能实现说明

## 功能概述
实现"我的"界面中的地址管理功能，包括地址列表展示、新增地址、编辑地址、删除地址等完整功能。

## 页面结构

### 1. 地址列表页面 (`my-address.vue`)
- **路径**: `/pages/my-address/my-address`
- **功能**: 
  - 展示用户所有收货地址
  - 支持编辑和删除操作
  - 新增地址入口
  - 空状态展示

### 2. 地址表单页面 (`address-form.vue`)
- **路径**: `/pages/address-form/address-form`
- **功能**:
  - 新增收货地址
  - 编辑现有地址
  - 表单验证
  - 地址格式说明

## 功能特性

### 地址列表页面

#### 界面元素
- **头部导航**: 返回按钮 + 页面标题
- **地址卡片**: 收件人信息 + 地址详情 + 操作按钮
- **空状态**: 无地址时的引导界面
- **新增按钮**: 底部固定的新增地址按钮
- **底部导航**: 统一的应用导航栏

#### 交互功能
- **地址展示**: 卡片式布局，信息清晰
- **编辑地址**: 点击地址卡片或编辑按钮
- **删除地址**: 删除按钮 + 确认弹窗
- **默认地址**: 默认标签显示

### 地址表单页面

#### 表单字段
1. **通关号码**: 个人通关号（必填）
2. **收件人名**: 收货人姓名（必填）
3. **联系方式**: 手机号码，12或13位（必填）
4. **韩国地址**: 韩文详细地址（必填）
5. **韩国邮编**: 韩国邮政编码（必填）
6. **默认地址**: 是否设为默认收货地址

#### 表单验证
- **必填验证**: 所有标记*的字段必须填写
- **格式验证**: 手机号格式验证
- **长度限制**: 各字段有相应的长度限制
- **实时验证**: 表单填写过程中实时验证

#### 地址格式说明
- **弹窗提示**: 详细的韩国地址填写说明
- **格式要求**: 地址顺序和格式规范
- **示例地址**: 标准格式示例
- **辅助工具**: 建议使用地址查询网站

## 技术实现

### Vue 3 Composition API
```javascript
// 地址列表数据管理
const addressList = ref([])
const loading = ref(false)

// 表单数据管理
const formData = ref({
  customsCode: '',
  recipientName: '',
  phone: '',
  koreanAddress: '',
  koreanPostalCode: '',
  isDefault: false
})

// 表单验证
const isFormValid = computed(() => {
  return formData.value.customsCode.trim() !== '' &&
         formData.value.recipientName.trim() !== '' &&
         formData.value.phone.trim() !== '' &&
         formData.value.koreanAddress.trim() !== '' &&
         formData.value.koreanPostalCode.trim() !== '' &&
         /^1[0-9]{11,12}$/.test(formData.value.phone)
})
```

### API 接口设计
```javascript
// 获取地址列表
export const getUserAddressList = async () => {
  // 返回用户所有收货地址
}

// 获取地址详情
export const getAddressDetail = async (addressId) => {
  // 根据ID获取单个地址详情
}

// 新增地址
export const addUserAddress = async (addressData) => {
  // 创建新的收货地址
}

// 更新地址
export const updateUserAddress = async (addressId, addressData) => {
  // 更新现有地址信息
}

// 删除地址
export const deleteUserAddress = async (addressId) => {
  // 删除指定地址
}

// 设置默认地址
export const setDefaultAddress = async (addressId) => {
  // 设置为默认收货地址
}
```

### 路由配置
```json
{
  "path": "pages/my-address/my-address",
  "style": {
    "navigationBarTitleText": "我的地址",
    "navigationStyle": "custom"
  }
},
{
  "path": "pages/address-form/address-form",
  "style": {
    "navigationBarTitleText": "地址管理",
    "navigationStyle": "custom"
  }
}
```

## 数据结构

### 地址对象
```javascript
interface Address {
  id: string                // 地址ID
  customsCode: string       // 通关号码
  recipientName: string     // 收件人姓名
  phone: string            // 联系电话
  koreanAddress: string    // 韩国地址
  koreanPostalCode: string // 韩国邮编
  fullAddress: string      // 完整地址（显示用）
  isDefault: boolean       // 是否默认地址
  createTime: string       // 创建时间
  updateTime: string       // 更新时间
}
```

### API 响应格式
```javascript
// 成功响应
{
  success: true,
  data: Address | Address[],
  message: string
}

// 错误响应
{
  success: false,
  message: string,
  code?: number
}
```

## 用户操作流程

### 新增地址流程
1. 用户进入"我的地址"页面
2. 点击"新增收货地址"按钮
3. 进入地址表单页面
4. 填写所有必填信息
5. 可选择查看地址格式说明
6. 提交表单，验证通过后保存
7. 返回地址列表页面

### 编辑地址流程
1. 在地址列表中点击地址卡片或编辑按钮
2. 进入地址表单页面（编辑模式）
3. 表单自动填充现有地址信息
4. 修改需要更新的字段
5. 提交表单保存更改
6. 返回地址列表页面

### 删除地址流程
1. 在地址列表中点击删除按钮
2. 弹出确认删除对话框
3. 确认后调用删除API
4. 删除成功后从列表中移除

## 设计特色

### 视觉设计
- **统一风格**: 延续应用的渐变色主题
- **卡片布局**: 清晰的信息层次
- **圆角设计**: 现代化的视觉效果
- **阴影效果**: 增强层次感

### 交互体验
- **加载状态**: 数据加载时的友好提示
- **空状态**: 无数据时的引导界面
- **表单验证**: 实时验证和错误提示
- **确认对话**: 重要操作的二次确认

### 用户体验
- **一键返回**: 简单的导航操作
- **批量操作**: 支持设置默认地址
- **格式帮助**: 详细的填写指导
- **错误处理**: 友好的错误提示

## 扩展功能

### 已预留接口
- **地址验证**: 可集成地址有效性验证
- **地理位置**: 支持GPS定位辅助填写
- **地址导入**: 支持从其他平台导入地址
- **批量管理**: 支持批量删除和导出

### 性能优化
- **数据缓存**: 地址列表本地缓存
- **懒加载**: 大量地址时的分页加载
- **防抖处理**: 表单输入的防抖验证

## 测试建议

### 功能测试
- [ ] 地址列表正常加载和显示
- [ ] 新增地址功能正常
- [ ] 编辑地址功能正常
- [ ] 删除地址功能正常
- [ ] 表单验证正确
- [ ] 导航跳转正常

### 兼容性测试
- [ ] 不同设备尺寸适配
- [ ] iOS/Android 兼容性
- [ ] 微信小程序环境测试

### 用户体验测试
- [ ] 操作流程顺畅
- [ ] 信息显示清晰
- [ ] 错误处理友好
- [ ] 加载状态合理

地址管理功能现已完成，提供了完整的地址管理体验，符合整体应用的设计风格和用户体验标准。
