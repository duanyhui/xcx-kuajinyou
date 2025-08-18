# 微信小程序页面溢出修复说明

## 问题描述
在微信小程序模拟器中出现页面右侧超出边界的问题，导致出现横向滚动条。

## 原因分析
1. **缺少 `box-sizing: border-box` 设置**
2. **Grid 布局在微信小程序中存在兼容性问题**
3. **容器宽度未限制，padding/margin 导致内容溢出**
4. **部分元素未设置最大宽度限制**

## 修复方案

### 1. 全局样式重置
```css
* {
  box-sizing: border-box;
}

.page {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
}
```

### 2. 布局系统优化
- **替换 Grid 布局**：将 `display: grid` 改为 `display: flex` + `flex-wrap`
- **设置合适的宽度**：功能卡片使用 `width: calc(50% - 10rpx)` 确保两列布局
- **添加 flex-basis 约束**：确保在各种屏幕下都不会溢出

### 3. 容器宽度限制
所有主要容器都添加了：
```css
width: 100%;
max-width: 100%;
box-sizing: border-box;
```

### 4. 文本溢出处理
对可能过长的文本添加省略号处理：
```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

### 5. 响应式优化
针对小屏幕设备进行了专门优化：
- 减少 padding 值
- 功能卡片在超小屏幕下改为单列显示
- 联系按钮在小屏幕下改为垂直排列

## 修复的具体文件

### 1. 首页 (index.vue)
- ✅ 全局样式重置
- ✅ 头部区域宽度限制
- ✅ 功能网格布局优化（Grid → Flex）
- ✅ 联系客服卡片宽度限制
- ✅ 运费卡片宽度限制
- ✅ 底部导航宽度限制
- ✅ 响应式优化

### 2. 操作指南页 (guide.vue)
- ✅ 全局样式重置
- ✅ 页面容器宽度限制
- ✅ 头部导航宽度限制
- ✅ 内容滚动区宽度限制

## 技术细节

### 关键CSS修复点：
1. **盒模型统一**：`box-sizing: border-box`
2. **宽度约束**：`width: 100vw; max-width: 100vw`
3. **横向溢出控制**：`overflow-x: hidden`
4. **Flex布局替代Grid**：更好的微信小程序兼容性
5. **响应式断点**：`@media (max-width: 400px)`

### 兼容性保证：
- ✅ 微信小程序原生支持
- ✅ 各种屏幕尺寸适配
- ✅ iPhone/Android 设备兼容
- ✅ 横竖屏切换支持

## 测试验证
修复后的样式已正确编译到 `/dist/dev/mp-weixin/` 目录，可在微信开发者工具中验证：

1. 打开微信开发者工具
2. 导入项目目录：`/dist/dev/mp-weixin/`
3. 切换不同设备型号测试
4. 验证页面无横向滚动

## 后续建议
1. 定期测试不同设备尺寸
2. 新增内容时注意宽度限制
3. 优先使用 Flex 布局而非 Grid
4. 始终设置 `max-width: 100%` 约束
