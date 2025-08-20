# 小程序 TabBar 配置建议

## 当前导航方式
目前小程序使用的是普通页面导航方式，通过 `uni.navigateTo()` 进行页面跳转。

## TabBar 配置选项

如果您希望使用微信小程序的原生 tabBar 功能，可以在 `src/pages.json` 中添加以下配置：

### 选项一：四个主要页面作为 TabBar

```json
{
  "pages": [
    // ...现有页面配置...
  ],
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#667eea",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/icons/home.png",
        "selectedIconPath": "static/icons/home-active.png"
      },
      {
        "pagePath": "pages/calculator/calculator",
        "text": "预报",
        "iconPath": "static/icons/calculator.png",
        "selectedIconPath": "static/icons/calculator-active.png"
      },
      {
        "pagePath": "pages/shipping/shipping",
        "text": "发货",
        "iconPath": "static/icons/shipping.png",
        "selectedIconPath": "static/icons/shipping-active.png"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "static/icons/profile.png",
        "selectedIconPath": "static/icons/profile-active.png"
      }
    ]
  }
}
```

### 图标资源需求

如果使用 tabBar 配置，需要准备以下图标文件（建议尺寸 81px × 81px）：

```
static/icons/
├── home.png              # 首页普通状态图标
├── home-active.png       # 首页选中状态图标
├── calculator.png        # 预报普通状态图标
├── calculator-active.png # 预报选中状态图标
├── shipping.png          # 发货普通状态图标
├── shipping-active.png   # 发货选中状态图标
├── profile.png           # 我的普通状态图标
└── profile-active.png    # 我的选中状态图标
```

### 使用 TabBar 后的代码修改

1. **删除自定义底部导航栏**：
   - 移除所有页面中的 `.bottom-nav` 相关代码和样式

2. **修改页面跳转方式**：
   ```javascript
   // 原来的代码
   uni.navigateTo({
     url: '/pages/index/index'
   })
   
   // 改为
   uni.switchTab({
     url: '/pages/index/index'
   })
   ```

3. **调整页面样式**：
   - 移除 `padding-bottom: 120rpx;` 等为自定义导航栏预留的空间

### 优缺点对比

#### 原生 TabBar 优点：
- ✅ 性能更好，切换更流畅
- ✅ 微信原生体验，用户熟悉
- ✅ 自动管理页面栈，内存占用更少
- ✅ 支持徽章显示（badge）

#### 原生 TabBar 缺点：
- ❌ 样式定制能力有限
- ❌ 需要准备图标资源
- ❌ 无法自定义复杂的交互效果

#### 自定义导航栏优点：
- ✅ 完全自定义样式和交互
- ✅ 可以使用 emoji 作为图标
- ✅ 灵活的布局和动效
- ✅ 易于维护和修改

#### 自定义导航栏缺点：
- ❌ 页面栈管理需要手动处理
- ❌ 性能相对较差
- ❌ 需要在每个页面重复代码

## 推荐方案

**建议保持当前的自定义导航栏方案**，原因：

1. **设计一致性**：当前的渐变色设计与自定义导航栏更匹配
2. **开发效率**：已经实现完整，无需额外开发图标资源
3. **灵活性**：后续功能扩展更容易实现
4. **用户体验**：当前的设计已经提供了良好的用户体验

## 当前问题解决方案

已修复的导航错误：
- ✅ 将 `uni.switchTab()` 改为 `uni.navigateTo()`
- ✅ 保持自定义导航栏的完整功能
- ✅ 确保所有页面导航正常工作

如需改为原生 tabBar，请按照上述配置进行修改。
