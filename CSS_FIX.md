# 🔧 微信小程序CSS兼容性修复

## 问题原因
微信小程序不支持CSS通配符选择器 `*`，导致WXSS编译错误：
```
[ WXSS 文件编译错误] 
./pages/guide/guide.wxss(3:1): unexpected token `*`
```

## 修复内容

### ❌ 移除的问题代码
```css
/* 这在微信小程序中会报错 */
* {
  box-sizing: border-box;
}

view {
  box-sizing: border-box;
  max-width: 100%;
}
```

### ✅ 修复后的代码
为每个具体的容器单独添加 `box-sizing` 和宽度限制：

```css
.page {
  box-sizing: border-box;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
}

.header-bg,
.function-section,
.contact-section,
.pricing-section {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}
```

## 修复的文件

1. **`src/pages/index/index.vue`**
   - 移除 `*` 通配符选择器
   - 移除 `view` 通用选择器
   - 为具体容器单独添加 `box-sizing: border-box`

2. **`src/pages/guide/guide.vue`**
   - 移除 `*` 通配符选择器
   - 为页面容器添加 `box-sizing: border-box`

## 微信小程序CSS限制

### 🚫 不支持的选择器
- `*` 通配符选择器
- 标签选择器（如 `view`, `text` 等）在某些情况下
- 复杂的组合选择器

### ✅ 推荐使用
- 类选择器 `.class-name`
- ID选择器 `#id-name`
- 伪类选择器 `:hover`, `:active` 等
- 属性选择器 `[attribute]`

## 验证步骤

1. **编译检查**：确保没有 WXSS 编译错误
2. **模拟器测试**：在微信开发者工具中验证页面显示正常
3. **布局检查**：确认页面不会横向溢出
4. **功能测试**：验证所有交互功能正常

## 下次开发注意事项

1. **避免使用通配符选择器** `*`
2. **优先使用类选择器**而非标签选择器
3. **每个容器单独设置** `box-sizing: border-box`
4. **测试前先检查编译输出**，确保无错误

现在可以正常在微信开发者工具中打开和调试小程序了！
