// 多语言管理工具类
import { ref, computed } from 'vue'

// 支持的语言类型
export type Locale = 'zh' | 'ko'

// 当前语言状态
const currentLocale = ref<Locale>('zh')

// 语言包类型定义 - 移到这里并导出
export interface LanguagePack {
  // 通用
  common: {
    back: string
    submit: string
    cancel: string
    confirm: string
    loading: string
    success: string
    failed: string
    error: string
    all: string
    contactService: string
    phoneConsult: string
    onlineService: string
  }
  // 首页相关
  home: {
    greeting: string
    mainTitle: string
    subTitle: string
    promoText: string
    sectionTitle: string
    sectionDesc: string
    serviceTime: string
    needHelp: string
    needHelpDesc: string
    followWechat: string
    contactService: string
    getLatestOffers: string
    professionalSupport: string
    pricingTitle: string
    pricingSubtitle: string
    // 功能菜单
    guide: string
    guideDesc: string
    calculator: string
    calculatorDesc: string
    flow: string
    flowDesc: string
    customs: string
    customsDesc: string
    shipping: string
    shippingDesc: string
    faq: string
    faqDesc: string
    // 运费标准
    seaShipping: string
    seaShippingPrice: string
    airShipping: string
    airShippingPrice: string
    postShipping: string
    postShippingPrice: string
    // 底部导航
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
  }
  // 运费计算页面
  calculator: {
    title: string
    transport: string
    seaTransport: string
    airTransport: string
    logistics: string
    koreaExpress: string
    postalEms: string
    weight: string
    weightPlaceholder: string
    dimensions: string
    length: string
    width: string
    height: string
    lengthPlaceholder: string
    widthPlaceholder: string
    heightPlaceholder: string
    quantity: string
    quantityPlaceholder: string
    calculating: string
    calculate: string
    result: string
    estimatedFee: string
    transportTime: string
  }
  // 操作指南页面
  guide: {
    title: string
    welcomeTitle: string
    welcomeDesc: string
    stepsTitle: string
    step1Title: string
    step1Tag: string
    step1Desc1: string
    step1Desc2: string
    step1Desc3: string
    step1Tip: string
    step2Title: string
    step2Tag: string
    step2Warning: string
    step3Title: string
    step3Tag: string
    step4Title: string
    step4Tag: string
    step5Title: string
    step5Tag: string
    notesTitle: string
    quickActionsTitle: string
  }
  // 发货流程页面
  flow: {
    title: string
    welcomeTitle: string
    welcomeDesc: string
    chartTitle: string
    userOperations: string
    warehouseOperations: string
    packagePreview: string
    submitShipping: string
    payShippingFee: string
    receivePackage: string
    warehouseReceive: string
    packagePacking: string
    warehouseShipping: string
    detailsTitle: string
    userCard: string
    warehouseCard: string
    tipsTitle: string
  }
  // 个人通关号页面
  customs: {
    title: string
    welcomeTitle: string
    welcomeDesc: string
    importantTitle: string
    stepsTitle: string
    step1Title: string
    step2Title: string
    step3Title: string
    step4Title: string
    alternativeTitle: string
    faqTitle: string
    helpTitle: string
  }
  // 发货需知页面
  shipping: {
    title: string
    headerTitle: string
    headerSubtitle: string
    importantTitle: string
    packagingTitle: string
    prohibitedTitle: string
    limitTitle: string
    feeTitle: string
    tipsTitle: string
  }
  // 常见问题页面
  faq: {
    title: string
    headerTitle: string
    headerSubtitle: string
    searchPlaceholder: string
    noResults: string
    noResultsDesc: string
    hotQuestions: string
    shippingSection: string
    feeSection: string
    prohibitedSection: string
    customsSection: string
    contactSection: string
    contactDesc: string
  }
  // 预报页面
  order: {
    title: string
    trackingNumber: string
    trackingPlaceholder: string
    packageCount: string
    remarks: string
    remarksPlaceholder: string
    packageDetails: string
    addDetail: string
    productName: string
    productPlaceholder: string
    unitPrice: string
    pricePlaceholder: string
    quantity: string
    quantityPlaceholder: string
    deleteConfirm: string
    deleteMessage: string
    submitting: string
    submitSuccess: string
    submitFailed: string
    fillComplete: string
  }
  // 个人中心页面
  profile: {
    loginTitle: string
    memberCenter: string
    wechatLogin: string
    promotionTitle: string
    promotionCode: string
    teamMembers: string
    teamOrders: string
    commission: string
    packageTitle: string
    packageClaim: string
    packageWaiting: string
    packageAbnormal: string
    packageConfirm: string
    orderTitle: string
    orderShipping: string
    orderPacking: string
    orderPayment: string
    orderDelivery: string
    warehouseAddress: string
    myAddress: string
    logout: string
  }
  // 仓库地址页面
  warehouse: {
    title: string
    warehouseName: string
    copyAll: string
    copy: string
    usageInstructions: string
    instruction1: string
    instruction2: string
    instruction3: string
    instruction4: string
    instruction5: string
    copyAllInfo: string
    contactService: string
    copySuccess: string
    copyFailed: string
    allInfoCopied: string
  }
  // 地址表单页面
  addressForm: {
    title: string
    editTitle: string
  }
  // 我的地址页面
  myAddress: {
    title: string
  }
  // 佣金页面
  commission: {
    title: string
  }
  // 推广码页面
  promotionCode: {
    title: string
    myPromotion: string
    scanToRegister: string
    promotionStats: string
    totalPromotion: string
    monthPromotion: string
    totalCommission: string
    monthCommission: string
    sharePromotion: string
    refreshQR: string
    copyCode: string
  }
  // 团成员页面
  teamMembers: {
    title: string
    teamOverview: string
    totalMembers: string
    activeMembers: string
    newMembers: string
    emptyTitle: string
    emptyDesc: string
  }
  // 团订单页面
  teamOrders: {
    title: string
    teamOrderOverview: string
    totalOrders: string
    totalAmount: string
    expectedCommission: string
    all: string
    pending: string
    completed: string
    emptyTitle: string
    emptyDesc: string
  }
}

// 设置当前语言
export const setLocale = (locale: Locale) => {
  currentLocale.value = locale
  // 保存到本地存储
  uni.setStorageSync('locale', locale)
}

// 获取当前语言
export const getLocale = () => {
  return currentLocale.value
}

// 从本地存储初始化语言设置
export const initLocale = () => {
  const savedLocale = uni.getStorageSync('locale') as Locale
  if (savedLocale && (savedLocale === 'zh' || savedLocale === 'ko')) {
    currentLocale.value = savedLocale
  }
}

// 切换语言
export const toggleLocale = () => {
  const newLocale: Locale = currentLocale.value === 'zh' ? 'ko' : 'zh'
  setLocale(newLocale)
}

// 响应式的当前语言
export const locale = computed(() => currentLocale.value)

// 获取语言显示名称
export const getLocaleName = (lang: Locale) => {
  return lang === 'zh' ? '中文' : '한국어'
}

// 多语言翻译函数（将在语言包加载后实现）
let languagePacks: Record<Locale, LanguagePack> | null = null

export const setLanguagePacks = (packs: Record<Locale, LanguagePack>) => {
  languagePacks = packs
}

export const t = (path: string): string => {
  if (!languagePacks) {
    return path
  }
  
  const keys = path.split('.')
  let value: any = languagePacks[currentLocale.value]
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path
    }
  }
  
  return typeof value === 'string' ? value : path
}