import type { LanguagePack } from '../utils/i18n'

// 中文语言包 
export const zhLanguagePack: LanguagePack = {
  // 通用
  common: {
    back: '返回',
    submit: '提交', 
    cancel: '取消',
    confirm: '确认',
    loading: '加载中...',
    success: '成功',
    failed: '失败',
    error: '错误',
    all: '全部',
    contactService: '联系客服',
    phoneConsult: '电话咨询',
    onlineService: '在线客服'
  },
  // 首页相关
  home: {
    greeting: 'Hi, 欢迎使用',
    mainTitle: '中韩跨境邮',
    subTitle: '快速·安全·便捷的跨境物流服务',
    promoText: '🎉 新用户首单免运费',
    sectionTitle: '服务功能',
    sectionDesc: '一站式跨境物流解决方案',
    chooseLanguage: '选择语言',
    serviceTime: '服务时间：工作日 8:30-17:30',
    needHelp: '需要帮助？',
    needHelpDesc: '专业客服团队为您服务',
    followWechat: '关注公众号',
    contactService: '联系客服',
    getLatestOffers: '获取最新优惠',
    professionalSupport: '专业服务支持',
    pricingTitle: '运费标准',
    pricingSubtitle: '透明计费，安心选择',
    // 功能菜单
    guide: '操作指南',
    guideDesc: '详细使用说明',
    calculator: '运费计算',
    calculatorDesc: '智能费用估算',
    flow: '发货流程',
    flowDesc: '图示操作步骤',
    customs: '个人通关号',
    customsDesc: '通关身份码申请',
    shipping: '发货需知',
    shippingDesc: '包装要求说明',
    faq: '常见问题',
    faqDesc: '快速问题解答',
    // 运费标准
    seaShipping: '海运',
    seaShippingPrice: '首重25元+续重6元/kg',
    airShipping: '空运',
    airShippingPrice: '首重33.8元+续重9元/0.5kg',
    postShipping: '邮政',
    postShippingPrice: '首重70元/50g+续重1元/50g',
    // 底部导航
    navHome: '首页',
    navOrder: '预报',
    navShipping: '发货',
    navProfile: '我的'
  },
  // 运费计算页面
  calculator: {
    title: '运费计算',
    transport: '运输方式',
    seaTransport: '海运（走得慢，省得多，值！）',
    airTransport: '空运（飞一般的寄件速度～）',
    logistics: '物流',
    koreaExpress: 'CJ大韩通运',
    postalEms: '邮政EMS',
    weight: '重量',
    weightPlaceholder: '请输入重量',
    dimensions: '尺寸',
    length: '长',
    width: '宽',
    height: '高',
    lengthPlaceholder: '长度',
    widthPlaceholder: '宽度',
    heightPlaceholder: '高度',
    quantity: '件数',
    quantityPlaceholder: '请输入件数',
    calculating: '计算中...',
    calculate: '计算运费',
    result: '计算结果',
    estimatedFee: '预估运费',
    transportTime: '运输时效',
    // 运费标准
    pricingStandard: '运费标准',
    seaShipping: '海运',
    seaShippingPrice: '首重25元+续重6元/kg',
    airShipping: '空运',
    airShippingPrice: '首重33.8元+续重9元/0.5kg',
    postalShipping: '邮政EMS',
    postalShippingPrice: '首重70元/50g+续重1元/50g'
  },
  // 操作指南页面
  guide: {
    title: '操作指南',
    welcomeTitle: '超详细攻略来啦！',
    welcomeDesc: '姐妹们，跨境寄包裹再也不踩坑～',
    stepsTitle: '寄件流程',
    step1Title: '获取专属地址',
    step1Tag: '超重要',
    step1Desc1: '👉 进入【我的】→【仓库地址】',
    step1Desc2: '👉 复制你的专属地址和收件人信息',
    step1Desc3: '👉 用这个地址向仓库邮寄包裹',
    step1Tip: '💡 记得告诉仓库小哥哥你的地址哦～',
    step2Title: '包裹预报',
    step2Tag: '必做',
    step2Desc1: '📦 包裹寄出后立即预报',
    step2Desc2: '📱 微信关注【中韩跨境邮】',
    step2Desc3: '🔍 点击【集运服务】→【包裹预报】',
    step2Warning: '⚠️ 不支持一个快递拆分多个订单给不同收件人',
    step3Title: '填写信息',
    step3Tag: '仔细',
    step3Subtitle: '📋 预报时需要填写：',
    step3Item1: '• 快递单号（要准确哦）',
    step3Item2: '• 商品详细信息',
    step3Item3: '• 价格用人民币（如实填写）',
    step4Title: '入库确认',
    step4Tag: '自动',
    step4Desc1: '📸 仓库会拍照验货',
    step4Desc2: '📨 微信公众号推送入库消息',
    step4Desc3: '👀 点击查看入库详情',
    step4Note: '如果选择了拆包检查服务，会有详细拆包照片',
    step5Title: '发货出库',
    step5Tag: '最后',
    step5Desc1: '🚚 仓库按要求收货打包',
    step5Desc2: '📤 点击【集运发货】→【下单发运】',
    step5Desc3: '🎯 指定包裹和收货地址',
    step5Desc4: '🛫 次日即可到达韩国清关',
    notesTitle: '注意事项',
    note1Title: '💰 价格填写',
    note1Content: '必须如实填写，虚报会导致扣货或罚款',
    note2Title: '📦 拆包服务',
    note2Content: '收费增值服务，可选择是否开通',
    note3Title: '📋 商品分类',
    note3Content: '多种商品要分别录入，不能混合申报',
    note4Title: '🚫 禁运物品',
    note4Content: '查看禁运清单，避免违禁物品',
    quickActionsTitle: '快捷操作',
    actionCalculator: '运费计算',
    actionFlow: '发货流程',
    actionCustoms: '个人通关号',
    actionShipping: '发货需知',
    actionFAQ: '常见问题',
    actionService: '联系客服'
  },
  // 发货流程页面
  flow: {
    title: '发货流程图示',
    welcomeTitle: '超清晰流程图来啦！',
    welcomeDesc: '姐妹们，一图看懂整个发货流程～',
    chartTitle: '🚀 完整发货流程',
    userOperations: '用户操作',
    warehouseOperations: '仓库操作',
    packagePreview: '包裹预报',
    submitShipping: '提交发运',
    payShippingFee: '支付运费',
    receivePackage: '收货',
    warehouseReceive: '收货检查',
    packagePacking: '打包',
    warehouseShipping: '出库发运',
    detailsTitle: '📝 流程详解',
    userCard: '👤 用户操作',
    warehouseCard: '🏢 仓库操作',
    tipsTitle: '💡 温馨提示',
    connectionLabel1: '公众号信息推送',
    connectionLabel2: '公众号信息推送',
    userDetail1: '包裹预报',
    userDetail1Desc: '网购后立即预报包裹信息',
    userDetail2: '提交发运',
    userDetail2Desc: '包裹到库后申请发运到韩国',
    userDetail3: '支付运费',
    userDetail3Desc: '确认运费并完成支付',
    userDetail4: '收货',
    userDetail4Desc: '坐等包裹送到韩国地址',
    warehouseDetail1: '收货检查',
    warehouseDetail1Desc: '仓库收货并拍照验货',
    warehouseDetail2: '打包',
    warehouseDetail2Desc: '专业打包，确保运输安全',
    warehouseDetail3: '出库发运',
    warehouseDetail3Desc: '发往韩国，全程可追踪',
    tip1: '关注微信公众号【中韩跨境邮】，及时接收流程推送',
    tip2: '包裹预报越早越好，有助于仓库提前准备',
    tip3: '每个步骤都有状态更新，随时掌握包裹动态'
  },
  // 个人通关号页面
  customs: {
    title: '如何获取个人通关号',
    welcomeTitle: '个人通关号申请攻略！',
    welcomeDesc: '轻松搞定韩国个人通关号～',
    importantTitle: '重要提醒',
    // 重要说明内容
    importantInfo1: '个人通关号码是以P开头的一串数字',
    importantInfo2: '这是发运必须提交的关键数据',
    importantInfo3: '需要登录韩国海关网站申请',
    // 申请步骤
    stepsTitle: '📝 申请步骤',
    step1Title: '访问韩国海关网站',
    step1Desc: '点击下方链接即可直接访问',
    step2Title: '选择申请类型',
    step2Desc: '在网站首页找到个人通关号码申请入口',
    step2Tag1: '조회 (查询)',
    step2Tag2: '신규발급 (新发放)',
    step3Title: '填写个人信息',
    step3Desc: '按照页面提示填写真实个人信息',
    step3Tip1: '姓名要与护照完全一致',
    step3Tip2: '生日格式要正确',
    step3Tip3: '邮箱地址要能正常接收',
    step4Title: '提交申请',
    step4Desc: '完成申请后会收到通关号码',
    step4Success: '申请成功后，通关号会发送到你的邮箱',
    // 备用方案
    alternativeTitle: '🆘 无法申请怎么办？',
    alternativeText: '如果无法申请个人通关号，可以使用护照号',
    alternativeWarning: '将通过简易申报进行清关',
    alternativeNote: '护照号也是有效的清关方式，不用担心哦～',
    // 常见问题
    faqTitle: '❓ 常见问题',
    faqQ1: '申请需要多长时间？',
    faqA1: '通常几分钟就能完成，立即获得通关号',
    faqQ2: '通关号有有效期吗？',
    faqA2: '个人通关号长期有效，申请一次可重复使用',
    faqQ3: '忘记通关号怎么办？',
    faqA3: '可以在网站上用个人信息查询，或联系客服',
    // 联系帮助
    helpTitle: '🤝 需要帮助？',
    helpText: '如果申请过程中遇到困难，随时联系我们的客服小姐姐',
    helpButton: '联系客服',
    // 复制成功消息
    urlCopied: '网址已复制到剪贴板'
  },
  // 发货需知页面
  shipping: {
    title: '发货需知',
    headerTitle: '📦 发货需知',
    headerSubtitle: '新手必看，发货不踩坑！',
    importantTitle: '重要提醒',
    // 重要提醒内容
    important1: '🚫 禁寄物品请勿邮寄，违者后果自负',
    important2: '📋 发货前请详细阅读以下须知',
    important3: '💰 超重、超尺寸将产生额外费用',
    // 包装要求
    packagingTitle: '包装要求',
    packageMaterial: '• 包装材料',
    packageMaterialDesc: '使用质量好的纸箱或塑料袋，避免破损',
    innerFilling: '• 内部填充',
    innerFillingDesc: '易碎物品需用泡沫、气泡膜等填充材料',
    sealing: '• 密封处理',
    sealingDesc: '用透明胶带密封，确保包裹不会散落',
    labelPasting: '• 标签粘贴',
    labelPastingDesc: '面单粘贴在平整面，避免折角处',
    // 禁寄物品
    prohibitedTitle: '禁寄物品',
    batteryCategory: '🔋 电池类',
    batteryDesc: '锂电池、充电宝、电子烟等',
    liquidCategory: '💊 液体类',
    liquidDesc: '化妆品、香水、药品、食品等',
    sharpCategory: '🔪 尖锐物',
    sharpDesc: '刀具、剪刀、指甲刀等',
    valuableCategory: '💎 贵重物品',
    valuableDesc: '现金、首饰、古董等',
    // 重量尺寸限制
    limitTitle: '重量尺寸限制',
    singleLengthLabel: '单边长度',
    totalSizeLabel: '长+宽+高',
    singleWeightLabel: '单件重量',
    singleLength: '≤ 60cm',
    totalSize: '≤ 120cm',
    singleWeight: '≤ 20kg',
    // 费用说明
    feeTitle: '费用说明',
    basicFee: '💵 基础运费',
    basicFeeDesc: '按重量和体积计费，取较大值',
    customsFee: '📋 通关费',
    customsFeeDesc: '个人物品无需额外通关费',
    insuranceFee: '🎁 保险费',
    insuranceFeeDesc: '建议购买，保障物品安全',
    // 发货小贴士
    tipsTitle: '发货小贴士',
    tip1: '✨ 提前1-2天预约取件，避免节假日延误',
    tip2: '📱 保存好快递单号，方便查询物流状态',
    tip3: '💬 有问题及时联系客服，我们随时为您服务',
    tip4: '🎯 首次发货建议选择标准服务，熟悉流程后再选快速服务',
    // 快捷入口
    feeCalculator: '运费计算',
    shippingFlow: '发货流程'
  },
  // 常见问题页面
  faq: {
    title: '常见问题',
    headerTitle: '❓ 常见问题',
    headerSubtitle: '解答您的疑惑，发货无忧！',
    searchPlaceholder: '搜索您的问题...',
    noResults: '没有找到相关问题',
    noResultsDesc: '试试其他关键词吧～',
    // 热门问题
    hotQuestions: '🔥 热门问题',
    hotQ1: '多长时间能到韩国？',
    hotQ2: '运费怎么计算？',
    hotQ3: '什么东西不能邮寄？',
    hotQ4: '什么是个人通关号？',
    // 分类标题
    shippingSection: '📦 发货相关',
    feeSection: '💰 费用相关',
    prohibitedSection: '🚫 禁寄物品',
    customsSection: '📋 通关相关',
    contactSection: '💬 还有疑问？',
    contactDesc: '找不到答案？我们的客服小姐姐随时为您解答～',
    // 联系方式
    onlineService: '在线客服',
    phoneConsult: '电话咨询',
    contactConnecting: '正在连接客服...',
    // 快捷入口
    shippingGuide: '发货需知',
    operationGuide: '操作指南',
    // 具体问答内容
    questions: {
      // 发货相关
      shippingTimeQ: 'Q: 包裹多长时间能到韩国？',
      shippingTimeA: 'A: 海运7-10个工作日，空运3-5个工作日。具体时效受海关检查、天气等因素影响。',
      shippingPickupQ: 'Q: 可以上门取件吗？',
      shippingPickupA: 'A: 可以！我们提供上门取件服务，需提前1-2天预约。部分偏远地区可能无法覆盖。',
      shippingPackageQ: 'Q: 包装有什么要求？',
      shippingPackageA: 'A: 使用结实的纸箱或塑料袋，易碎品需填充保护材料，用透明胶带密封，面单粘贴在平整面。详情查看"发货需知"页面。',
      shippingWeightLimitQ: 'Q: 重量和尺寸有什么限制？',
      shippingWeightLimitA: 'A: 单件重量≤20kg，单边长度≤60cm，长+宽+高≤120cm。超出限制将产生额外费用。',
      // 费用相关
      feeCalculationQ: 'Q: 运费是怎么计算的？',
      feeCalculationA: 'A: 按重量计费。海运首重25元+续重6元/kg，空运首重33.8元+续重9元/0.5kg。使用运费计算器可精确计算。',
      feeExtraQ: 'Q: 有额外费用吗？',
      feeExtraA: 'A: 基础运费外，可选购保险服务。个人物品无需额外通关费。超重超尺寸会产生额外费用，发货前请仔细核对。',
      feePaymentQ: 'Q: 支持哪些支付方式？',
      feePaymentA: 'A: 支持微信支付、支付宝、银行卡等多种支付方式，安全便捷。',
      // 禁寄物品
      prohibitedItemsQ: 'Q: 哪些物品不能邮寄？',
      prohibitedItemsA: 'A: 禁寄电池类（锂电池、充电宝、电子烟）、液体类（化妆品、香水、药品）、尖锐物（刀具、剪刀）、贵重物品（现金、首饰）等。详细清单请查看"发货需知"页面。',
      prohibitedCosmeticsQ: 'Q: 化妆品可以邮寄吗？',
      prohibitedCosmeticsA: 'A: 液体类化妆品不可邮寄，粉状、固体类可以。建议发货前咨询客服确认。',
      prohibitedFoodQ: 'Q: 食品可以邮寄吗？',
      prohibitedFoodA: 'A: 密封包装的干货类食品可以，但需符合韩国海关要求。新鲜食品、液体食品不可邮寄。',
      // 通关相关
      customsCodeQ: 'Q: 什么是个人通关号？',
      customsCodeA: 'A: 个人通关号是以P开头的一串数字，是韩国海关的身份识别码，用于清关。每个收件人都需要提供，详情查看相关页面。',
      customsDetainedQ: 'Q: 包裹被海关扣留怎么办？',
      customsDetainedA: 'A: 我们会协助处理，通常需要提供相关证明文件。请保持联系方式畅通，配合处理流程。',
      customsTaxQ: 'Q: 需要缴纳关税吗？',
      customsTaxA: 'A: 个人物品一般无需缴纳关税，但超过限额或商业用途可能产生关税，由收件人承担。'
    }
  },
  // 预报页面
  order: {
    title: '包裹预报',
    trackingNumber: '快递单号',
    trackingPlaceholder: '请输入快递单号',
    packageCount: '包裹件数',
    remarks: '备注信息',
    remarksPlaceholder: '请输入备注信息（可选）',
    packageDetails: '包裹明细',
    addDetail: '添加明细',
    productName: '商品名称',
    productPlaceholder: '请输入商品名称',
    unitPrice: '单价',
    pricePlaceholder: '请输入单价',
    quantity: '数量',
    quantityPlaceholder: '请输入数量',
    deleteConfirm: '确认删除',
    deleteMessage: '确定要删除这条明细吗？',
    submitting: '提交中...',
    submitSuccess: '提交成功',
    submitFailed: '提交失败',
    fillComplete: '请填写完整信息',
    // 新增字段
    detailIndex: '明细',
    deleteAction: '删除',
    declarationName: '申报品名',
    declarationNamePlaceholder: '请填写中文货品名',
    declarationPrice: '申报单价',
    declarationPricePlaceholder: '请填写价格',
    declarationQuantity: '申报数量',
    declarationQuantityPlaceholder: '请填写数量',
    emptyDetails: '暂无明细信息',
    emptyDetailsDesc: '点击"添加明细"按钮添加包裹明细',
    submitAction: '提交',
    bottomNav: {
      home: '首页',
      order: '预报',
      shipping: '发货',
      profile: '我的'
    }
  },
  // 个人中心页面
  profile: {
    loginTitle: '登录',
    memberCenter: '会员中心',
    wechatLogin: '微信一键登录',
    promotionTitle: '推广赚钱',
    promotionCode: '推广码',
    teamMembers: '团成员',
    teamOrders: '团订单',
    commission: '佣金',
    packageTitle: '包裹',
    packageClaim: '认领',
    packageWaiting: '待入仓',
    packageAbnormal: '异常',
    packageConfirm: '待确认',
    orderTitle: '订单',
    orderShipping: '待货齐',
    orderPacking: '待打包',
    orderPayment: '待支付',
    orderDelivery: '待发货',
    warehouseAddress: '仓库地址',
    myAddress: '我的地址',
    logout: '退出登录'
  },
  // 仓库地址页面
  warehouse: {
    title: '仓库地址',
    warehouseName: '威海仓',
    copyAll: '复制全部',
    copy: '复制',
    usageInstructions: '使用说明',
    instruction1: '请将此地址填写为您的收货地址',
    instruction2: '收货人姓名请填写：',
    instruction3: '联系电话请填写：13061124980',
    instruction4: '包裹到达仓库后，我们会及时为您处理',
    instruction5: '如有疑问，请联系在线客服',
    copyAllInfo: '一键复制全部信息',
    contactService: '联系客服',
    copySuccess: '复制成功',
    copyFailed: '复制失败',
    allInfoCopied: '全部信息已复制'
  },
  // 地址表单页面
  addressForm: {
    title: '地址管理',
    editTitle: '编辑地址'
  },
  // 我的地址页面
  myAddress: {
    title: '我的地址'
  },
  // 佣金页面
  commission: {
    title: '佣金'
  },
  // 推广码页面
  promotionCode: {
    title: '推广码',
    myPromotion: '我的推广码',
    scanToRegister: '扫码注册，享受优惠价格',
    promotionStats: '推广统计',
    totalPromotion: '累计推广',
    monthPromotion: '本月推广',
    totalCommission: '累计佣金',
    monthCommission: '本月佣金',
    sharePromotion: '分享推广码',
    refreshQR: '刷新二维码',
    copyCode: '复制推广码'
  },
  // 团成员页面
  teamMembers: {
    title: '团成员',
    teamOverview: '团队概览',
    totalMembers: '总成员数',
    activeMembers: '活跃成员',
    newMembers: '新增成员',
    emptyTitle: '暂无团成员',
    emptyDesc: '快去推广吧，邀请更多小伙伴加入'
  },
  // 团订单页面
  teamOrders: {
    title: '团订单',
    teamOrderOverview: '团队订单概览',
    totalOrders: '总订单数',
    totalAmount: '总订单金额',
    expectedCommission: '预计佣金',
    all: '全部',
    pending: '进行中',
    completed: '已完成',
    emptyTitle: '暂无团订单',
    emptyDesc: '您的团队成员还没有下单哦'
  },
  // 订单发货页面
  shippingOrders: {
    pageTitle: '订单发货',
    loading: '加载中...',
    empty: {
      title: '暂无待发货订单',
      description: '暂时没有需要发货的订单'
    },
    orderCard: {
      orderNumber: '订单号',
      itemName: '商品名',
      price: '价格',
      quantity: '数量',
      packageCount: '包裹数',
      packageUnit: '包'
    },
    status: {
      customs: {
        passed: '核验通过',
        failed: '核验未通过',
        pending: '核验中'
      },
      warehouse: {
        in: '已入仓',
        out: '已出仓',
        pending: '待入仓'
      }
    },
    actions: {
      viewDetail: '查看详情',
      confirmShipping: '确认发货'
    },
    modals: {
      confirmShipping: {
        title: '确认发货',
        content: '确定要发货订单吗？',
        cancel: '取消',
        confirm: '确认'
      },
      statusDetail: {
        customs: {
          title: '核验状态',
          content: '订单正在进行海关核验，请耐心等待'
        },
        warehouse: {
          title: '入仓状态',
          content: '包裹正在等待入仓，请确认发货信息'
        },
        confirm: '知道了'
      }
    },
    messages: {
      shipping: '发货中...',
      shippingSuccess: '发货成功',
      shippingFailed: '发货失败',
      networkError: '网络异常，请重试',
      fetchOrdersFailed: '获取订单失败',
      funcInDevelopment: '功能开发中'
    },
    bottomNav: {
      home: '首页',
      order: '订单',
      shipping: '发货',
      profile: '我的'
    }
  }
}

// 韩文语言包（符合韩国年轻人的说话方式）
export const koLanguagePack: LanguagePack = {
  common: {
    back: '뒤로',
    submit: '제출',
    cancel: '취소',
    confirm: '확인',
    loading: '로딩 중...',
    success: '성공',
    failed: '실패',
    error: '오류',
    all: '전체',
    contactService: '고객센터 문의',
    phoneConsult: '전화 상담',
    onlineService: '온라인 상담'
  },
  home: {
    greeting: '안녕하세요, 환영합니다',
    mainTitle: '이런 속도는 못 참지! 창고 먼저 슝~',
    subTitle: '빠르고·안전하고·편리한 국제물류 서비스',
    promoText: '🎉 신규 고객 첫 주문 배송비 무료',
    sectionTitle: '서비스 기능',
    sectionDesc: '원스톱 국제물류 솔루션',
    chooseLanguage: '언어 선택',
    serviceTime: '서비스 시간: 평일 8:30-17:30',
    needHelp: '도움이 필요하세요?',
    needHelpDesc: '전문 고객서비스팀이 도와드립니다',
    followWechat: '공식계정 팔로우',
    contactService: '고객센터 문의',
    getLatestOffers: '최신 혜택 받기',
    professionalSupport: '전문 서비스 지원',
    pricingTitle: '배송비 기준',
    pricingSubtitle: '투명한 요금제, 안심하고 선택하세요',
    guide: '이용 가이드',
    guideDesc: '꼭 확인하세요!',
    calculator: '배송비 계산',
    calculatorDesc: '스마트 요금 계산',
    flow: '발송 절차',
    flowDesc: '단계별 이용 방법',
    customs: '개인통관고유부호',
    customsDesc: '통관 신원코드 신청',
    shipping: '발송 안내',
    shippingDesc: '포장 요구사항 안내',
    faq: '자주 묻는 질문',
    faqDesc: '빠른 문제 해결',
    seaShipping: '선박운송',
    seaShippingPrice: '기본요금 25위안+추가 6위안/kg',
    airShipping: '항공운송',
    airShippingPrice: '기본요금 33.8위안+추가 9위안/0.5kg',
    postShipping: '우편',
    postShippingPrice: '기본요금 70위안/50g+추가 1위안/50g',
    navHome: '홈',
    navOrder: '예보',
    navShipping: '발송',
    navProfile: '마이페이지'
  },
  calculator: {
    title: '배송비 계산',
    transport: '운송 방식',
    seaTransport: '해운(천천히 가도 많이 절약되니까 이득!)',
    airTransport: '항공운송(번개같은 발송 속도~)',
    logistics: '물류',
    koreaExpress: 'CJ대한통운',
    postalEms: '우체국EMS',
    weight: '무게',
    weightPlaceholder: '무게를 입력해주세요',
    dimensions: '크기',
    length: '길이',
    width: '너비',
    height: '높이',
    lengthPlaceholder: '길이',
    widthPlaceholder: '너비',
    heightPlaceholder: '높이',
    quantity: '개수',
    quantityPlaceholder: '개수를 입력해주세요',
    calculating: '계산 중...',
    calculate: '배송비 계산',
    result: '계산 결과',
    estimatedFee: '예상 배송비',
    transportTime: '운송 시간',
    // 운송비 기준
    pricingStandard: '배송비 기준',
    seaShipping: '해운',
    seaShippingPrice: '기본 25위안+추가 6위안/kg',
    airShipping: '항공',
    airShippingPrice: '기본 33.8위안+추가 9위안/0.5kg',
    postalShipping: '우체국EMS',
    postalShippingPrice: '기본 70위안/50g+추가 1위안/50g'
  },
  guide: {
    title: '이용 가이드',
    welcomeTitle: '완벽 사용 가이드 도착!',
    welcomeDesc: '국제배송, 실수 없이 바로 GO!',
    stepsTitle: '발송 절차',
    step1Title: '전용 주소 받기',
    step1Tag: '필수 코스',
    step1Desc1: '👉 【마이페이지】→【창고 주소】들어가기',
    step1Desc2: '👉 내 전용 주소와 수취인 정보 복사하기',
    step1Desc3: '👉 이 주소로 창고에 택배 보내기',
    step1Tip: '💡 창고에 내 주소 꼭 전달해주세요~',
    step2Title: '택배 예보',
    step2Tag: '꼭 해야 함',
    step2Desc1: '📦 택배 보낸 후, 바로 예보 진행',
    step2Desc2: '📱  [예보] 탭에서 중국내 택배송장번호, 수취인 정보 입력',
    step2Desc3: '',
    step2Warning: '⚠️ 하나의 택배를 여러 주문으로 나누어 다른 수취인에게 보내는 것은 불가!',
    step3Title: '정보 입력',
    step3Tag: '꼼꼼하게',
    step3Subtitle: '📋 예보할 때 입력할 내용:',
    step3Item1: '• 택배 송장번호 (정확하게 써주세요)',
    step3Item2: '• 상품 상세 정보',
    step3Item3: '• 가격은 위안화로 (실제 가격 써주세요)',
    step4Title: '입고 확인',
    step4Tag: '자동',
    step4Desc1: '📸 창고에서 사진 찍고 검사 완료! 먼저 한 발짝~',
    step4Desc2: '📨 입고 알림은 공식계정 에서 확인(팔로우 꼭 해두세요~)',
    step4Desc3: '👀 사진이랑 자세한 정보? 미니앱에서 확인해봐요~  이제 ‘발송’ 누르기만 하면 끝! 합포장도 분리포장도 당신 맘대로 💌',
    step4Note: '개봉 검사 서비스를 선택하시면 상세한 개봉 사진을 제공해드려요',
    step5Title: '발송 출고',
    step5Tag: '마지막',
    step5Desc1: '🚚 창고에서 요구사항에 따라 수취하고 포장',
    step5Desc2: '📤 【집운 발송】→【주문 발운】클릭',
    step5Desc3: '🎯 택배와 수취 주소 지정',
    step5Desc4: '🛫 다음날 한국 통관 도착',
    notesTitle: '주의사항',
    note1Title: '💰 가격 입력',
    note1Content: '반드시 실제 가격을 써주세요. 허위 신고는 압수나 벌금을 초래할 수 있어요',
    note2Title: '📦 개봉 검사 서비스',
    note2Content: '유료 부가 서비스, 선택적으로 이용 가능',
    note3Title: '📋 상품 분류',
    note3Content: '여러 상품은 각각 따로 입력해야 하고, 혼합 신고는 안 돼요',
    note4Title: '🚫 금지 물품',
    note4Content: '금지 물품 목록을 확인하고 위험 물품 피하기',
    quickActionsTitle: '빠른 작업',
    actionCalculator: '배송비 계산',
    actionFlow: '발송 절차',
    actionCustoms: '개인통관고유부호',
    actionShipping: '발송 안내',
    actionFAQ: '자주 묻는 질문',
    actionService: '고객센터 문의'
  },
  flow: {
    title: '발송 절차 도식',
    welcomeTitle: '완전 명확한 절차도 왔어요!',
    welcomeDesc: '언니들, 한 눈에 보는 전체 발송 절차~',
    chartTitle: '🚀 완전한 발송 절차',
    userOperations: '사용자 작업',
    warehouseOperations: '창고 작업',
    packagePreview: '택배 예보',
    submitShipping: '발송 신청',
    payShippingFee: '배송비 결제',
    receivePackage: '수취',
    warehouseReceive: '수취 검사',
    packagePacking: '포장',
    warehouseShipping: '출고 발송',
    detailsTitle: '📝 절차 상세설명',
    userCard: '👤 사용자 작업',
    warehouseCard: '🏢 창고 작업',
    tipsTitle: '💡 따뜻한 팁',
    connectionLabel1: '공식계정 정보 알림',
    connectionLabel2: '공식계정 정보 알림',
    userDetail1: '택배 예보',
    userDetail1Desc: '온라인 쇼핑 후 바로 택배 정보 예보',
    userDetail2: '발송 신청',
    userDetail2Desc: '택배 입고 후 한국 발송 신청',
    userDetail3: '배송비 결제',
    userDetail3Desc: '배송비 확인하고 결제 완료',
    userDetail4: '수취',
    userDetail4Desc: '한국 주소로 택배 도착 대기',
    warehouseDetail1: '수취 검사',
    warehouseDetail1Desc: '창고에서 수취하고 사진으로 검수',
    warehouseDetail2: '포장',
    warehouseDetail2Desc: '전문 포장으로 운송 안전 확보',
    warehouseDetail3: '출고 발송',
    warehouseDetail3Desc: '한국으로 발송, 전 과정 추적 가능',
    tip1: '위챗 공식계정【중한 국제택배】팔로우하고 절차 알림 받기',
    tip2: '택배 예보는 빠를수록 좋아요, 창고 사전 준비에 도움',
    tip3: '모든 단계에서 상태 업데이트, 실시간 택배 동향 확인'
  },
  customs: {
    title: '개인통관고유부호 받는 방법',
    welcomeTitle: '개인통관고유부호 신청 공략!',
    welcomeDesc: '쉽게 한국 개인통관고유부호 받아보자~',
    importantTitle: '중요 알림',
    // 重要说明内容
    importantInfo1: '개인통관고유부호는 P로 시작하는 숫자들',
    importantInfo2: '배송에 반드시 제출해야 하는 핵심 데이터',
    importantInfo3: '한국 세관 사이트에 로그인해서 신청 필요',
    // 申请步骤
    stepsTitle: '📝 신청 단계',
    step1Title: '한국 세관 사이트 접속',
    step1Desc: '아래 링크를 클릭하면 바로 접속',
    step2Title: '신청 유형 선택',
    step2Desc: '사이트 홈페이지에서 개인통관고유부호 신청 입구 찾기',
    step2Tag1: '조회 (查询)',
    step2Tag2: '신규발급 (新发放)',
    step3Title: '개인정보 입력',
    step3Desc: '페이지 안내에 따라 실제 개인정보 입력',
    step3Tip1: '이름은 여권과 완전히 일치해야 함',
    step3Tip2: '생년월일 형식이 정확해야 함',
    step3Tip3: '이메일 주소는 정상적으로 수신 가능해야 함',
    step4Title: '신청 제출',
    step4Desc: '신청 완료 후 통관번호 수신',
    step4Success: '신청 성공 후, 통관번호가 이메일로 발송됩니다',
    // 备用方案
    alternativeTitle: '🆘 신청 안 되면 어떡하지?',
    alternativeText: '개인통관고유부호 신청이 안 되면 여권번호 사용 가능',
    alternativeWarning: '간편신고를 통해 통관 진행',
    alternativeNote: '여권번호도 유효한 통관 방식이니 걱정 마세요~',
    // 常见问题
    faqTitle: '❓ 자주 묻는 질문',
    faqQ1: '신청에 얼마나 걸리나요?',
    faqA1: '보통 몇 분이면 완료, 즉시 통관번호 획득',
    faqQ2: '통관번호에 유효기간이 있나요?',
    faqA2: '개인통관고유부호는 장기간 유효, 한 번 신청으로 계속 사용',
    faqQ3: '통관번호를 잊어버리면 어떻게 하죠?',
    faqA3: '사이트에서 개인정보로 조회하거나 고객센터 연락',
    // 联系帮助
    helpTitle: '🤝 도움이 필요하세요?',
    helpText: '신청 과정에서 어려움이 있으면 언제든 저희 고객센터 언니에게 연락하세요',
    helpButton: '고객센터 연락',
    // 复制成功消息
    urlCopied: '웹사이트 주소가 클립보드에 복사되었습니다'
  },
  shipping: {
    pageTitle: '발송 안내',
    headerTitle: '📦 발송 안내',
    headerSubtitle: '초보자 필독, 발송 실수 없이!',
    importantTitle: '중요 알림',
    // 重要提醒内容
    important1: '🚫 발송 금지 물품은 보내지 마세요, 문제 발생 시 책임은 본인에게',
    important2: '📋 발송 전에 아래 안내사항을 자세히 읽어주세요',
    important3: '💰 초과 중량, 초과 크기 시 추가 요금 발생',
    // 包装要求
    packagingTitle: '포장 요구사항',
    packageMaterial: '• 포장 재료',
    packageMaterialDesc: '좋은 품질의 박스나 비닐봉지 사용, 파손 방지',
    innerFilling: '• 내부 완충재',
    innerFillingDesc: '깨지기 쉬운 물건은 스펀지, 에어캡 등 완충재 사용',
    sealing: '• 밀봉 처리',
    sealingDesc: '투명 테이프로 밀봉, 택배가 흩어지지 않도록 보장',
    labelPasting: '• 라벨 부착',
    labelPastingDesc: '운송장은 평평한 면에 부착, 모서리 부분 피하기',
    // 禁寄物品
    prohibitedTitle: '발송 금지 물품',
    batteryCategory: '🔋 배터리류',
    batteryDesc: '리튬배터리, 보조배터리, 전자담배 등',
    liquidCategory: '💊 액체류',
    liquidDesc: '화장품, 향수, 의약품, 식품 등',
    sharpCategory: '🔪 날카로운 물건',
    sharpDesc: '칼, 가위, 손톱깎이 등',
    valuableCategory: '💎 귀중품',
    valuableDesc: '현금, 보석, 골동품 등',
    // 重量尺寸限制
    limitTitle: '무게 크기 제한',
    singleLengthLabel: '한 변 길이',
    totalSizeLabel: '가로+세로+높이',
    singleWeightLabel: '개당 무게',
    singleLength: '≤ 60cm',
    totalSize: '≤ 120cm',
    singleWeight: '≤ 20kg',
    // 费用说明
    feeTitle: '요금 설명',
    basicFee: '💵 기본 운임',
    basicFeeDesc: '무게와 부피로 계산, 더 큰 값으로 적용',
    customsFee: '📋 통관비',
    customsFeeDesc: '개인 물품은 추가 통관비 없음',
    insuranceFee: '🎁 보험료',
    insuranceFeeDesc: '구매 권장, 물품 안전 보장',
    // 发货小贴士
    tipsTitle: '발송 꿀팁',
    tip1: '✨ 1-2일 전에 픽업 예약, 연휴 지연 방지',
    tip2: '📱 택배 운송장 번호 잘 보관, 물류 상태 조회 편리',
    tip3: '💬 문제 있으면 즉시 고객센터 연락, 언제든 서비스 제공',
    tip4: '🎯 첫 발송 시 표준 서비스 추천, 익숙해진 후 빠른 서비스 선택',
    // 快捷入口
    feeCalculator: '운임 계산',
    shippingFlow: '발송 절차'
  },
  faq: {
    title: '자주 묻는 질문',
    headerTitle: '❓ 자주 묻는 질문',
    headerSubtitle: '궁금증 해결, 걱정 없는 발송!',
    searchPlaceholder: '질문을 검색해보세요...',
    noResults: '관련 질문을 찾을 수 없어요',
    noResultsDesc: '다른 키워드로 검색해보세요~',
    // 热门问题
    hotQuestions: '🔥 인기 질문',
    hotQ1: '얼마나 걸려서 한국에 도착하나요?',
    hotQ2: '운임은 어떻게 계산하나요?',
    hotQ3: '어떤 물건은 보낼 수 없나요?',
    hotQ4: '개인통관고유부호가 뭔가요?',
    // 分类标题
    shippingSection: '📦 발송 관련',
    feeSection: '💰 요금 관련',
    prohibitedSection: '🚫 발송 금지 물품',
    customsSection: '📋 통관 관련',
    contactSection: '💬 더 궁금한 게 있나요?',
    contactDesc: '답을 못 찾겠어요? 저희 고객센터 언니가 언제든 도와드릴게요~',
    // 联系方式
    onlineService: '온라인 고객센터',
    phoneConsult: '전화 상담',
    contactConnecting: '고객센터에 연결 중...',
    // 快捷入口
    shippingGuide: '발송 안내',
    operationGuide: '이용 가이드',
    // 具体问答内容
    questions: {
      // 发货相关
      shippingTimeQ: 'Q: 택배가 얼마나 걸려서 한국에 도착하나요?',
      shippingTimeA: 'A: 해상운송 7-10일, 항공운송 3-5일입니다. 세관 검사, 날씨 등의 요인에 따라 달라질 수 있어요.',
      shippingPickupQ: 'Q: 집으로 픽업 와주시나요?',
      shippingPickupA: 'A: 네! 집으로 픽업 서비스를 제공해요. 1-2일 전에 미리 예약해주세요. 일부 외곽 지역은 어려울 수 있어요.',
      shippingPackageQ: 'Q: 포장에 어떤 요구사항이 있나요?',
      shippingPackageA: 'A: 튼튼한 박스나 비닐봉지를 사용하고, 깨지기 쉬운 물건은 완충재로 보호해주세요. 투명 테이프로 밀봉하고 운송장은 평평한 면에 붙여주세요. 자세한 내용은 "발송 안내" 페이지를 확인해주세요.',
      shippingWeightLimitQ: 'Q: 무게와 크기에 제한이 있나요?',
      shippingWeightLimitA: 'A: 개당 무게 ≤20kg, 한 변 길이 ≤60cm, 가로+세로+높이 ≤120cm입니다. 제한을 초과하면 추가 요금이 발생해요.',
      // 费用相关
      feeCalculationQ: 'Q: 운임은 어떻게 계산하나요?',
      feeCalculationA: 'A: 무게별로 계산해요. 해상운송은 첫 중량 25위안+추가 6위안/kg, 항공운송은 첫 중량 33.8위안+추가 9위안/0.5kg입니다. 운임 계산기로 정확하게 계산할 수 있어요.',
      feeExtraQ: 'Q: 추가 요금이 있나요?',
      feeExtraA: 'A: 기본 운임 외에 보험 서비스를 선택할 수 있어요. 개인 물품은 추가 통관비가 없어요. 초과 중량/크기일 때는 추가 요금이 발생하니 발송 전에 꼼꼼히 확인해주세요.',
      feePaymentQ: 'Q: 어떤 결제 방식을 지원하나요?',
      feePaymentA: 'A: 위챗페이, 알리페이, 은행카드 등 다양한 결제 방식을 지원해요. 안전하고 편리해요.',
      // 禁寄物品
      prohibitedItemsQ: 'Q: 어떤 물품은 보낼 수 없나요?',
      prohibitedItemsA: 'A: 배터리류(리튬배터리, 보조배터리, 전자담배), 액체류(화장품, 향수, 의약품), 날카로운 물건(칼, 가위), 귀중품(현금, 보석) 등은 보낼 수 없어요. 자세한 목록은 "발송 안내" 페이지를 확인해주세요.',
      prohibitedCosmeticsQ: 'Q: 화장품을 보낼 수 있나요?',
      prohibitedCosmeticsA: 'A: 액체류 화장품은 안 되고, 파우더나 고체류는 가능해요. 발송 전에 고객센터에 문의해서 확인하는 게 좋아요.',
      prohibitedFoodQ: 'Q: 식품을 보낼 수 있나요?',
      prohibitedFoodA: 'A: 밀봉 포장된 건식품은 가능하지만 한국 세관 요구사항에 맞아야 해요. 신선식품, 액체 식품은 보낼 수 없어요.',
      // 通关相关
      customsCodeQ: 'Q: 개인통관고유부호가 뭔가요?',
      customsCodeA: 'A: P로 시작하는 숫자들로, 한국 세관의 신분 식별코드예요. 통관할 때 사용해요. 수령인마다 제공해야 하며, 자세한 내용은 관련 페이지를 확인해주세요.',
      customsDetainedQ: 'Q: 택배가 세관에서 압류되면 어떻게 하나요?',
      customsDetainedA: 'A: 저희가 도와드릴게요. 보통 관련 증명서류를 제출해야 해요. 연락처를 항상 확인할 수 있게 해두시고 처리 과정에 협조해주세요.',
      customsTaxQ: 'Q: 관세를 내야 하나요?',
      customsTaxA: 'A: 개인 물품은 보통 관세가 없어요. 하지만 한도를 초과하거나 상업용도일 경우 관세가 발생할 수 있고, 수령인이 부담해야 해요.'
    }
  },
  order: {
    title: '택배 예보',
    trackingNumber: '택배 운송장 번호',
    trackingPlaceholder: '택배 운송장 번호를 입력해주세요',
    packageCount: '택배 개수',
    remarks: '비고',
    remarksPlaceholder: '비고를 입력해주세요 (선택사항)',
    packageDetails: '택배 상세',
    addDetail: '상세 추가',
    productName: '상품명',
    productPlaceholder: '상품명을 입력해주세요',
    unitPrice: '단가',
    pricePlaceholder: '단가를 입력해주세요',
    quantity: '수량',
    quantityPlaceholder: '수량을 입력해주세요',
    deleteConfirm: '삭제 확인',
    deleteMessage: '정말 이 상세정보를 삭제하시겠어요?',
    submitting: '제출 중...',
    submitSuccess: '제출 완료',
    submitFailed: '제출 실패',
    fillComplete: '정보를 완전히 입력해주세요',
    // 새로운 필드들
    detailIndex: '상세',
    deleteAction: '삭제',
    declarationName: '신고 품명',
    declarationNamePlaceholder: '중국어 상품명을 입력해주세요',
    declarationPrice: '신고 단가',
    declarationPricePlaceholder: '가격을 입력해주세요',
    declarationQuantity: '신고 수량',
    declarationQuantityPlaceholder: '수량을 입력해주세요',
    emptyDetails: '상세 정보가 없어요',
    emptyDetailsDesc: '"상세 추가" 버튼을 눌러서 택배 상세 정보를 추가해주세요',
    submitAction: '제출',
    bottomNav: {
      home: '홈',
      order: '예보',
      shipping: '발송',
      profile: '내 정보'
    }
  },
  profile: {
    loginTitle: '로그인',
    memberCenter: '회원센터',
    wechatLogin: '위챗 원클릭 로그인',
    promotionTitle: '추천해서 돈 벌기',
    promotionCode: '추천 코드',
    teamMembers: '팀 멤버',
    teamOrders: '팀 주문',
    commission: '수수료',
    packageTitle: '택배',
    packageClaim: '인수',
    packageWaiting: '입고 대기',
    packageAbnormal: '이상',
    packageConfirm: '확인 대기',
    orderTitle: '주문',
    orderShipping: '출고 대기',
    orderPacking: '포장 대기',
    orderPayment: '결제 대기',
    orderDelivery: '발송 대기',
    warehouseAddress: '창고 주소',
    myAddress: '내 주소',
    logout: '로그아웃'
  },
  warehouse: {
    title: '창고 주소',
    warehouseName: '웨이하이 창고',
    copyAll: '전체 복사',
    copy: '복사',
    usageInstructions: '사용 안내',
    instruction1: '이 주소를 수신 주소로 입력해주세요',
    instruction2: '수신인 이름은 다음과 같이 입력해주세요：',
    instruction3: '연락처는 다음과 같이 입력해주세요：13061124980',
    instruction4: '택배가 창고에 도착하면 즉시 처리해드립니다',
    instruction5: '문의사항이 있으시면 온라인 고객센터로 연락해주세요',
    copyAllInfo: '전체 정보 한번에 복사',
    contactService: '고객센터 문의',
    copySuccess: '복사 완료',
    copyFailed: '복사 실패',
    allInfoCopied: '전체 정보가 복사되었습니다'
  },
  // 주소 양식 페이지
  addressForm: {
    title: '주소 관리',
    editTitle: '주소 수정'
  },
  // 내 주소 페이지
  myAddress: {
    title: '내 주소'
  },
  // 수수료 페이지
  commission: {
    title: '수수료'
  },
  // 추천 코드 페이지
  promotionCode: {
    title: '추천 코드',
    myPromotion: '내 추천 코드',
    scanToRegister: '코드 스캔해서 가입하고 할인혜택 받아요',
    promotionStats: '추천 통계',
    totalPromotion: '총 추천 수',
    monthPromotion: '이번 달 추천',
    totalCommission: '총 수수료',
    monthCommission: '이번 달 수수료',
    sharePromotion: '추천 코드 공유하기',
    refreshQR: 'QR코드 새로고침',
    copyCode: '추천 코드 복사'
  },
  // 팀 멤버 페이지
  teamMembers: {
    title: '팀 멤버',
    teamOverview: '팀 개요',
    totalMembers: '총 멤버 수',
    activeMembers: '활동 멤버',
    newMembers: '신규 멤버',
    emptyTitle: '팀 멤버가 없어요',
    emptyDesc: '빨리 추천해서 더 많은 친구들을 초대해요'
  },
  // 팀 주문 페이지
  teamOrders: {
    title: '팀 주문',
    teamOrderOverview: '팀 주문 개요',
    totalOrders: '총 주문 수',
    totalAmount: '총 주문 금액',
    expectedCommission: '예상 수수료',
    all: '전체',
    pending: '진행 중',
    completed: '완료',
    emptyTitle: '팀 주문이 없어요',
    emptyDesc: '팀 멤버들이 아직 주문하지 않았어요'
  },
  // 주문 발송 페면
  shippingOrders: {
    pageTitle: '주문 발송',
    loading: '로딩 중...',
    empty: {
      title: '발송 대기 주문이 없어요',
      description: '아직 발송할 주문이 없어요'
    },
    orderCard: {
      orderNumber: '주문번호',
      itemName: '상품명',
      price: '가격',
      quantity: '수량',
      packageCount: '포장 수',
      packageUnit: '포장'
    },
    status: {
      customs: {
        passed: '검증 통과',
        failed: '검증 실패',
        pending: '검증 대기'
      },
      warehouse: {
        in: '창고 입고',
        out: '창고 출고',
        pending: '입고 대기'
      }
    },
    actions: {
      viewDetail: '상세 보기',
      confirmShipping: '발송 확인'
    },
    modals: {
      confirmShipping: {
        title: '발송 확인',
        content: '정말로 주문을 발송하시겠어요?',
        cancel: '취소',
        confirm: '확인'
      },
      statusDetail: {
        customs: {
          title: '검증 상태',
          content: '주문이 세관 검증 중이에요. 조금만 기다려주세요'
        },
        warehouse: {
          title: '입고 상태',
          content: '포장이 창고 입고 대기 중이에요. 발송 정보를 확인해주세요'
        },
        confirm: '알겠어요'
      }
    },
    messages: {
      shipping: '발송 중...',
      shippingSuccess: '발송 완료',
      shippingFailed: '발송 실패',
      networkError: '네트워크 오류. 다시 시도해주세요',
      fetchOrdersFailed: '주문 조회 실패',
      funcInDevelopment: '기능 개발 중'
    },
    bottomNav: {
      home: '홈',
      order: '주문',
      shipping: '발송',
      profile: '내 정보'
    }
  }
}