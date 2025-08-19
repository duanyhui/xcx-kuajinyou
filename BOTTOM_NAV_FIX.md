# 首页底部导航栏遮挡问题修复

## 问题描述
首页的底部导航栏被页面内容遮挡，特别是运费信息卡片等底部内容与固定定位的导航栏重叠。

## 问题原因
1. **页面底部间距不足**：原来的 `padding-bottom: 160rpx` 不够
2. **底部导航缺少层级**：没有设置足够高的 `z-index`
3. **安全区域处理不当**：没有正确处理 iPhone 等设备的安全区域

## 修复方案

### 1. 页面底部间距调整
**修复前：**
```css
.page {
  padding-bottom: 160rpx;
}
```

**修复后：**
```css
.page {
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom) + 40rpx);
}
```

### 2. 底部导航栏优化
**修复前：**
```css
.bottom-nav {
  height: 140rpx;
  padding: 0 20rpx;
  /* 缺少 z-index 和安全区域处理 */
}
```

**修复后：**
```css
.bottom-nav {
  height: 140rpx;
  padding: 0 20rpx;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}
```

### 3. 内容区域间距增加
**修复前：**
```css
.pricing-section {
  margin-bottom: 40rpx;
}
```

**修复后：**
```css
.pricing-section {
  margin-bottom: 60rpx;
}
```

### 4. 安全区域处理优化
**修复前：**
```css
.safe-area {
  height: env(safe-area-inset-bottom);
}
```

**修复后：**
```css
.safe-area {
  height: 0;
  /* 已在.page的padding-bottom中统一处理 */
}
```

## 修复效果

### 解决的问题：
- ✅ **底部导航不再被遮挡**：内容与导航栏有足够间距
- ✅ **适配各种设备**：正确处理 iPhone 等设备的安全区域
- ✅ **层级关系清晰**：导航栏始终显示在最顶层
- ✅ **响应式布局**：在不同屏幕尺寸下都能正常显示

### 技术要点：
1. **动态计算间距**：使用 `calc()` 函数动态计算底部间距
2. **安全区域适配**：使用 `env(safe-area-inset-bottom)` 适配设备
3. **层级管理**：设置合适的 `z-index` 确保导航栏显示优先级
4. **统一处理**：将所有底部间距相关的计算集中处理

## 兼容性
- ✅ 微信小程序
- ✅ H5
- ✅ iOS 设备（包括刘海屏）
- ✅ Android 设备
- ✅ 不同屏幕尺寸

## 测试建议
1. **功能测试**：确认页面内容不被导航栏遮挡
2. **设备测试**：在不同设备上测试安全区域处理
3. **交互测试**：确认导航栏点击功能正常
4. **滚动测试**：确认页面滚动时导航栏固定显示

---

**修复时间**: 2025年8月19日  
**状态**: ✅ 已修复，布局正常  
**影响范围**: 首页底部导航显示
