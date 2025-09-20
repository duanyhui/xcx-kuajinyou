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
  }
  // 首页相关
  home: {
    greeting: string
    mainTitle: string
    subTitle: string
    promoText: string
    sectionTitle: string
    sectionDesc: string
    chooseLanguage: string
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
    // 运费标准
    pricingStandard: string
    seaShipping: string
    seaShippingPrice: string
    airShipping: string
    airShippingPrice: string
    postalShipping: string
    postalShippingPrice: string
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
    step2Desc1: string
    step2Desc2: string
    step2Warning: string
    step3Title: string
    step3Tag: string
    step3Subtitle: string
    step3Item1: string
    step3Item2: string
    step3Item3: string
    step4Title: string
    step4Tag: string
    step4Desc1: string
    step4Desc2: string
    step4Desc3: string
    step4Desc4: string
    step4Note: string
    step5Title: string
    step5Tag: string
    step5Desc1: string
    step5Desc2: string
    step5Desc3: string
    step5Desc4: string
    notesTitle: string
    note1Title: string
    note1Content: string
    note2Title: string
    note2Content: string
    note3Title: string
    note3Content: string
    note4Title: string
    note4Content: string
    quickActionsTitle: string
    actionCalculator: string
    actionFlow: string
    actionCustoms: string
    actionShipping: string
    actionFAQ: string
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
    userDetail1: string
    userDetail1Desc: string
    userDetail2: string
    userDetail2Desc: string
    userDetail3: string
    userDetail3Desc: string
    userDetail4: string
    userDetail4Desc: string
    warehouseDetail1: string
    warehouseDetail1Desc: string
    warehouseDetail2: string
    warehouseDetail2Desc: string
    warehouseDetail3: string
    warehouseDetail3Desc: string
    tip1: string
    tip2: string
    tip3: string
  }
  // 个人通关号页面
  customs: {
    title: string
    welcomeTitle: string
    welcomeDesc: string
    importantTitle: string
    // 重要说明内容
    importantInfo1: string
    importantInfo2: string
    importantInfo3: string
    // 申请步骤
    stepsTitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step2Tag1: string
    step2Tag2: string
    step3Title: string
    step3Desc: string
    step3Tip1: string
    step3Tip2: string
    step3Tip3: string
    step4Title: string
    step4Desc: string
    step4Success: string
    // 备用方案
    alternativeTitle: string
    alternativeText: string
    alternativeWarning: string
    alternativeNote: string
    // 常见问题
    faqTitle: string
    faqQ1: string
    faqA1: string
    faqQ2: string
    faqA2: string
    faqQ3: string
    faqA3: string
    // 联系帮助
    helpTitle: string
    helpText: string
    // 复制成功消息
    urlCopied: string
  }
  // 运输页面
  shipping: {
    title: string
    headerTitle: string
    headerSubtitle: string
    importantTitle: string
    important1: string
    important2: string
    important3: string
    packagingTitle: string
    packageMaterial: string
    packageMaterialDesc: string
    innerFilling: string
    innerFillingDesc: string
    sealing: string
    sealingDesc: string
    labelPasting: string
    labelPastingDesc: string
    prohibitedTitle: string
    batteryCategory: string
    batteryDesc: string
    liquidCategory: string
    liquidDesc: string
    sharpCategory: string
    sharpDesc: string
    valuableCategory: string
    valuableDesc: string
    limitTitle: string
    singleLengthLabel: string
    totalSizeLabel: string
    singleWeightLabel: string
    singleLength: string
    totalSize: string
    singleWeight: string
    feeTitle: string
    basicFee: string
    basicFeeDesc: string
    customsFee: string
    customsFeeDesc: string
    insuranceFee: string
    insuranceFeeDesc: string
    tipsTitle: string
    tip1: string
    tip2: string
    tip3: string
    tip4: string
    feeCalculator: string
    shippingFlow: string
  }
  // 订单发货页面
  shippingOrders: {
    pageTitle: string
    loading: string
    empty: {
      title: string
      description: string
    }
    orderCard: {
      orderNumber: string
      itemName: string
      price: string
      quantity: string
      packageCount: string
      packageUnit: string
    }
    status: {
      customs: {
        passed: string
        failed: string
        pending: string
      }
      warehouse: {
        in: string
        out: string
        pending: string
      }
    }
    actions: {
      viewDetail: string
      confirmShipping: string
    }
    modals: {
      confirmShipping: {
        title: string
        content: string
        cancel: string
        confirm: string
      }
      statusDetail: {
        customs: {
          title: string
          content: string
        }
        warehouse: {
          title: string
          content: string
        }
        confirm: string
      }
    }
    messages: {
      shipping: string
      shippingSuccess: string
      shippingFailed: string
      networkError: string
      fetchOrdersFailed: string
      funcInDevelopment: string
    }
    bottomNav: {
      home: string
      order: string
      shipping: string
      profile: string
    }
  }
  // 常见问题页面
  faq: {
    title: string
    headerTitle: string
    headerSubtitle: string
    searchPlaceholder: string
    noResults: string
    noResultsDesc: string
    // 热门问题
    hotQuestions: string
    hotQ1: string
    hotQ2: string
    hotQ3: string
    hotQ4: string
    // 分类标题
    shippingSection: string
    feeSection: string
    prohibitedSection: string
    customsSection: string
    // 快捷入口
    shippingGuide: string
    operationGuide: string
    // 具体问答内容
    questions: {
      // 发货相关
      shippingTimeQ: string
      shippingTimeA: string
      shippingPickupQ: string
      shippingPickupA: string
      shippingPackageQ: string
      shippingPackageA: string
      shippingWeightLimitQ: string
      shippingWeightLimitA: string
      // 费用相关
      feeCalculationQ: string
      feeCalculationA: string
      feeExtraQ: string
      feeExtraA: string
      feePaymentQ: string
      feePaymentA: string
      // 禁寄物品
      prohibitedItemsQ: string
      prohibitedItemsA: string
      prohibitedCosmeticsQ: string
      prohibitedCosmeticsA: string
      prohibitedFoodQ: string
      prohibitedFoodA: string
      // 通关相关
      customsCodeQ: string
      customsCodeA: string
      customsDetainedQ: string
      customsDetainedA: string
      customsTaxQ: string
      customsTaxA: string
    }
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
    // 新增字段
    detailIndex: string
    deleteAction: string
    declarationName: string
    declarationNamePlaceholder: string
    declarationPrice: string
    declarationPricePlaceholder: string
    declarationQuantity: string
    declarationQuantityPlaceholder: string
    emptyDetails: string
    emptyDetailsDesc: string
    submitAction: string
    bottomNav: {
      home: string
      order: string
      shipping: string
      profile: string
    }
  }
  // 个人中心页面
  profile: {
    loginTitle: string
    loginSuccess: string
    loggingIn: string
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
    // 新增字段
    companyName: string
    companySubtitle: string
    defaultNickname: string
    userIdPrefix: string
    allPackages: string
    allOrders: string
    confirmLogout: string
    logoutMessage: string
    loggedOut: string
  }
  // 订单页面
  orders: {
    // 状态相关
    statusAll: string
    statusShipping: string
    statusPacking: string
    statusPayment: string
    statusDelivery: string
    unknownStatus: string
    orderManagement: string
    // 页面内容
    noOrders: string
    noOrdersDesc: string
    orderNumber: string
    packageCount: string
    packageUnit: string
    totalWeight: string
    shippingFee: string
    goods: string
    etc: string
    recipient: string
    // 操作按钮
    confirmShipping: string
    confirmPacking: string
    payNow: string
    confirmDelivery: string
    details: string
    // 消息和对话框
    processing: string
    confirmSuccess: string
    packingComplete: string
    deliverySuccess: string
    operationFailed: string
    loadFailed: string
    confirmShippingMessage: string
    confirmPackingMessage: string
    confirmDeliveryMessage: string
    redirectingPayment: string
    paymentSuccess: string
    paymentFailed: string
    // 底部导航
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
  }
  // 包裹页面
  packages: {
    // 基础信息
    title: string
    // 状态标签
    statusAll: string
    statusPending: string
    statusWarehouse: string
    statusAbnormal: string
    statusConfirm: string
    // 状态标签文本
    statusLabelPending: string
    statusLabelShipped: string
    statusLabelWarehouse: string
    statusLabelAbnormal: string
    statusLabelConfirm: string
    statusLabelCompleted: string
    statusLabelUnknown: string
    // 包裹卡片标签
    sender: string
    weight: string
    time: string
    // 操作按钮
    actionClaim: string
    actionConfirmWarehouse: string
    actionHandleAbnormal: string
    actionConfirm: string
    actionDetail: string
    // 空状态提示
    emptyStatus: string
    emptyAll: string
    emptyPending: string
    emptyWarehouse: string
    emptyAbnormal: string
    emptyConfirm: string
    emptyDefault: string
    // 对话框和消息
    confirmClaimTitle: string
    confirmClaimContent: string
    claimSuccess: string
    claimFailed: string
    warehouseInProgress: string
    confirmInProgress: string
    errorFetchData: string
    // 示例包裹
    sampleKorea: string
    sampleSeoul: string
    sampleBusan: string
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
    contactServiceInProgress: string
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
  }
  // 地址表单页面
  addressForm: {
    title: string
    editTitle: string
    customsCodeLabel: string
    customsCodePlaceholder: string
    customsCodeRequired: string
    recipientNameLabel: string
    recipientNamePlaceholder: string
    recipientNameRequired: string
    phoneLabel: string
    phonePlaceholder: string
    phoneRequired: string
    phoneInvalid: string
    koreanAddressLabel: string
    koreanAddressPlaceholder: string
    koreanAddressRequired: string
    addressFormatTips: string
    koreanPostalCodeLabel: string
    koreanPostalCodePlaceholder: string
    koreanPostalCodeRequired: string
    setDefaultAddress: string
    submit: string
    submitting: string
    addressFormatTitle: string
    formatRequirement: string
    formatRequirementDesc: string
    addressOrder: string
    addressOrderDesc: string
    example: string
    exampleDesc: string
    suggestion: string
    suggestionDesc: string
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
  }
  // 我的地址页面
  myAddress: {
    title: string
    emptyTitle: string
    emptyDesc: string
    defaultTag: string
    editBtn: string
    deleteBtn: string
    loading: string
    addNewBtn: string
    fetchError: string
    confirmDeleteTitle: string
    confirmDeleteContent: string
    deleteSuccess: string
    deleteFailed: string
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
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
    defaultNickname: string
    promoterIdPrefix: string
    promoCodeBtn: string
    teamMembersBtn: string
    teamOrdersBtn: string
    commissionBtn: string
    packageSection: string
    viewAll: string
    claimedStatus: string
    waitingStatus: string
    abnormalStatus: string
    pendingStatus: string
    qrLoading: string
    codeLabel: string
    infoTitle: string
    infoStep1: string
    infoStep2: string
    infoStep3: string
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
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
    sharePromoBtn: string
    memberListTitle: string
    filterBtn: string
    joinedText: string
    totalSpent: string
    orderCount: string
    levelVip: string
    levelGold: string
    levelSilver: string
    levelBronze: string
    levelNormal: string
    memberDetailDeveloping: string
    sendMessage: string
    viewDetail: string
    messageDeveloping: string
    filterAll: string
    filterActive: string
    filterVip: string
    filterNewThisMonth: string
    filterDeveloping: string
    navHome: string
    navOrder: string
    navShipping: string
    navProfile: string
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