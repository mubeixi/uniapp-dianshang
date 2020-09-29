import T from '@/common/langue/i18n' 
import { hexMD5 } from './tool/md5'
import Base64 from './tool/base64.js'
import { ls, isWeiXin } from './tool.js'
import { ajax } from './interceptors.js'
import { error } from './index'
export const GET_ENV = () => {
  var rt = ''
  // #ifdef APP-PLUS
  rt = 'app'
  // #endif

  // #ifdef MP-WEIXIN
  rt = 'wx_lp'
  // #endif

  // #ifdef MP-TOUTIAO
  rt = 'tt_lp'
  // #endif

  // #ifdef MP-ALIPAY
  rt = 'ali_lp'
  // #endif

  // #ifdef H5
  // 需要考虑是不是普通浏览器
  if (isWeiXin()) {
    rt = 'wx_mp'
  } else {
    rt = 'wap'
  }
  // #endif
  return rt
}

/**
 * 允许通过act和url参数，配置请求接口。推荐使用url方式(url和action同时填写)，这样便于控制台调试
 * @param act
 * @param param
 * @param options
 * @param url
 * @param method
 * @returns {Promise<any>}
 */
const fetch = function (act, param, options = false, url = '/api/little_program/shopconfig.php', method = 'post') {
  if (!act) {
    uni.showToast({
      title: T._(2),
      mask: true,
      duration: 2000
    })
    return
  }

  url = `/api/v1/${act}.html`// 替换url

  const d = new Date()
  if (options.hasOwnProperty('is_tap') && options.is_tap) {
    const temp_act_info = ls.get('temp_act_info')
    if (temp_act_info && temp_act_info.hasOwnProperty('act') && temp_act_info.hasOwnProperty('time') && temp_act_info.act && temp_act_info.time) {
      // 同一个请求，不能在0.5s内连点两次

      if (act === temp_act_info.act && d.getTime() < (temp_act_info.time + 500)) {
        error('请求过快')
        return new Promise((resolve, reject) => {
          reject(Error('请求过快'))
        })
      }
    }
  }

  ls.set('temp_act_info', {
    act,
    time: d.getTime()
  })

  if (!param) param = {}

  param.act = act
  if (!param.User_ID) {
	  param.User_ID = get_User_ID()
  }

  if (!param.hasOwnProperty('access_token')) {
    param.access_token = GET_ACCESS_TOKEN()
  }

  if (options && options.noUid) delete param.User_ID

  param.Users_ID = get_Users_ID() // Users_ID  写死
  // param.appid = get_Appid();
  param.env = GET_ENV()

  // lang
  param.user_lang = get_user_lang()

  // 数据加密
  const data = createToken(param)

  // 保持签名通过，同时支持传空字符串
  Object.assign(data, param)
  return ajax(url, method, data, options)
}

export const GET_ACCESS_TOKEN = () => ls.get('access_token')

// 获取全局配置
export const getSystemConf = (data, options) => fetch('shopconfig', data, options)

// 用户登录
export const login = (data, options) => {
  // 获取推荐人id
  let owner_id = ls.get('owner_id')
  if (!owner_id) {
    owner_id = 0
  }
  data = {
    ...data,
    owner_id
  }
  return fetch('user_login', data, options)
}

// 获取可用的同城配送方式
export const getAvailableCityExpress = (data, options) => fetch('getAvailableCityExpress', data, options)

// 物流编号获取
export const getOrderExpressCode = (data, options) => fetch('getOrderExpressCode', data, options)

// 获取直播信息
export const getLiveInfo = (data, options) => fetch('getLiveInfo', data, options)

// 查询商品的购买者信息
export const storeApplyReject = (data, options) => fetch('store_apply_reject', data, options)

// 查询商品的购买者信息
export const getStoreApplyList = (data, options) => fetch('get_store_apply_list', data, options)

// 查询商品的购买者信息
export const getBuyerByProd = (data, options) => fetch('getBuyerByProd', data, options)

// 大转盘初始化
export const rotateInit = (data, options) => fetch('initTurn', data, options)

// 门店推广下级二维码
export const getStoreShare = (data, options) => fetch('getStoreShare', data, options)

// 大转盘开始
export const rotateBegin = (data, options) => fetch('beginTurn', data, options)

// 获取中奖记录
export const getRotateRecord = (data, options) => fetch('getPrizeRecord', data, options)

// 分销累计利润接口
export const getBalanceDetail = (data, options) => fetch('getBalanceDetail', data, options)

// 获取文章详情
export const getArticle = (data, options) => fetch('getArticle', data, options)

// 上报分析的数据
export const sendAnalysisData = (data, options) => fetch('clickRecord', data, options)

// 获取产品列表
export const getProductList = (data, options) => fetch('get_prod', data, options)

export const getShopSkinList = (data, options) => fetch('get_shopskin', data, options)

export const chooseShopSkin = (data, options) => fetch('choose_shopskin', data, options)

// 获取商城的配置
export const getSkinConfig = (data, options) => fetch('get_shophome', data, options)

export const getSkinPreData = (data, options) => fetch('get_skin_data', data, options)

export const getDiySkinConfig = (data, options) => fetch('get_makeup_home_data', data, options)

// 更新商城的配置
export const setSkinConfig = (data, options) => fetch('update_shophome', data, options)
// 获取商品列表
export const getProductCategory = (data, options) => fetch('pro_cate', data, options)

// 获取团队业绩来源
export const getTeamSalesList = (data, options) => fetch('getTeamSalesList', data, options)

// 获取详情页
export const getProductDetail = (data, options) => fetch('prod_detail', data, options)

// 获取秒杀详情页
export const flashsaleDetail = (data, options) => fetch('flashsale_detail', data, options)

// 获取秒杀详情页
export const spikeProdDetail = (data, options) => fetch('spike_prod_detail', data, options)

// 秒杀预约
export const flashsaleReserve = (data, options) => fetch('flashsale_reserve', data, options)

// 支付成功页面显示优惠券权益
export const getPayCoupons = (data, options) => fetch('getPayCoupons', data, options)

// 获取评论详情
export const getCommit = (data, options) => fetch('get_commit', data, options)
// 获取搜索结果

// 获取购物车信息
export const getCart = (data, options) => fetch('get_cart', data, options)

// 获取普通产品
export const getProd = (data, options) => fetch('get_prod', data, options)

// 获取收货地址
export const getAddress = (data, options) => fetch('get_address', data, options)

// 更新购物车
export const updateCart = (data, options) => fetch('update_cart', data, options)

// 获取订单操作
export const createOrderCheck = (data, options) => fetch('create_order_check', data, options)

// 延迟发货
export const extendOrderConfirm = (data, options) => fetch('extendOrderConfirm', data, options)

// 获取用户信息（临时）
export const get_user_info = (data, options) => fetch('get_user_info', data, options)

// 获取评论
export const getComments = (data, options) => fetch('get_commit', data, options)

// 获取收藏列表
export const getFavouritePro = (data, options) => fetch('get_favourite_prod_list', data, options)

// 添加收藏产品
export const addCollection = (data, options) => fetch('add_favourite_prod', data, options)

// 取消收藏
export const cancelCollection = (data, options) => fetch('cancel_favourite_prod', data, options)

// 获取订单列表
export const getOrder = (data, options) => fetch('get_order', data, options)

// 删除订单
export const delOrder = (data, options) => fetch('del_order', data, options)

// 删除购物车产品
export const delCart = (data, options) => fetch('del_cart', data, options)

export const getStoreList = (data, options) => fetch('get_store_list', data, options)

// 获取可领取的优惠券
export const getCoupon = (data, options) => fetch('get_unaccalimed_coupon', data, options)

// 用户领取优惠券
export const getUserCoupon = (data, options) => fetch('user_receive_coupon', data, options)

// 获取用户已领取的优惠券
export const getUserReceivedCoupon = (data, options) => fetch('get_user_coupon', data, options)

// 获取用户已失效的优惠券
export const getExpiredCoupon = (data, options) => fetch('get_expired_coupon', data, options)

// 提交订单
export const createOrder = (data, options) => fetch('create_order', data, options)

// 提交订单
export const getWithdrawConfig = (data, options) => fetch('get_withdraw_config', data, options)

// 获取结算详情
export const settlement = (data, options) => fetch('settlement', data, options)

// 获取结算列表
export const getSettlements = (data, options) => fetch('get_settlements', data, options)

// 上传图片
export const uploadImage = (data, options) => fetch('upload_image', data, options)

// 获取订单详情
export const getOrderDetail = (data, options) => fetch('get_order_detail', data, options)

// 取消订单
export const cancelOrder = (data, options) => fetch('cancel_order', data, options)

// 获取订单状态角标数
export const getOrderNum = (data, options) => fetch('get_order_num', data, options)

// 获取申请退货退款
export const getRefund = (data, options) => fetch('get_refund_info', data, options)

// 取消申请退款
export const cancelRefund = (data, options) => fetch('cancel_refund', data, options)

// 获取退款单详情
export const getBackOrderDetail = (data, options) => fetch('get_back_order_detail', data, options)

// 用户退款发货
export const refundSend = (data, options) => fetch('refund_send', data, options)

// 获取商品规格库存
export const getProductAtts = (data, options) => fetch('get_product_atts', data, options)

// 支付订单
export const orderPay = (data, options) => fetch('order_pay', data, options)

// 检查产品是否已收藏
export const checkProdCollected = (data, options) => fetch('check_prod_favourite', data, options)

// 获取乡镇
export const getTown = (data, options) => fetch('get_town', data, options)

// 编辑收货地址
export const editAddress = (data, options) => fetch('edit_address', data, options)

// 添加收货地址
export const addAddress = (data, options) => fetch('add_address', data, options)

// 删除收货地址
export const delAddress = (data, options) => fetch('del_address', data, options)

// 获取分销中心首页数据
export const getDisInit = (data, options) => fetch('get_dis_init', data, options)

// 获取团队对应等级人数
export const getDisTeamCount = (data, options) => fetch('get_dis_team_count', data, options)

// 获取团队对应等级人数
export const getDisTeamList = (data, options) => fetch('get_dis_team_list', data, options)

// 获取用户提现方式
export const getUserWithdrawMethod = (data, options) => fetch('get_user_withdraw_method', data, options)

// 用户新增提现方式
export const addUserWithdrawMethod = (data, options) => fetch('add_user_withdraw_method', data, options)

// 获取商城提现方式
export const getShopWithdrawMethod = (data, options) => fetch('get_shop_withdraw_method', data, options)

// 申请提现
export const withdrawApply = (data, options) => fetch('withdraw_apply', data, options)

// 获取申请提现记录
export const getWithdrawRecordList = (data, options) => fetch('get_withdraw_record_list', data, options)

// 删除提现方式
export const delUserWithdrawMethod = (data, options) => fetch('del_user_withdraw_method', data, options)

// 提交评论
export const comment = (data, options) => fetch('comment', data, options)

// 订单确认收货
export const confirmOrder = (data, options) => fetch('confirm_order', data, options)

// 短信验证码
export const getSmsCode = (data, options) => fetch('login_sms', data, options)

// 获取赠品列表
export const getGiftList = (data, options) => fetch('get_gift_list', data, options)

// 退款
export const orderRefund = (data, options) => fetch('order_refund', data, options)

// 获取兑换产品详情
export const jifenProdDetail = (data, options) => fetch('jifen_prod_detail', data, options)

// 获取赠品详情
export const judgeReceiveGift = (data, options) => fetch('judge_receive_gift', data, options)

// 获取海报模板
export const getPosterList = (data, options) => fetch('getPosterList', data, options)

// 获取海报模板详情
export const getPosterDetail = (data, options) => fetch('getPosterDetail', data, options)

// 获取佣金列表 爵位
export const getNobiRecordList = (data, options) => fetch('get_nobi_record_list', data, options)

// 获取佣金列表分销
export const getDisRecordList = (data, options) => fetch('get_dis_record_list', data, options)

// 获取佣金列表 股东
export const getShaRecordList = (data, options) => fetch('get_sha_record_list', data, options)

// 获取佣金列表 区域代理
export const getAgentRecordList = (data, options) => fetch('get_agent_record_list', data, options)

// 分销中心-获取微信二维码
export const getDistributeWxQrcode = (data, options) => fetch('get_distribute_wxqrcode', data, options)

// 获取爵位晋升
export const nobiInfo = (data, options) => fetch('nobi_info', data, options)
// 获取分销商信息
export const getUserDisInfo = (data, options) => fetch('get_user_dis_info', data, options)
// 获取分销商信息
export const getDisUserList = (data, options) => fetch('get_dis_user_list', data, options)

// 修改分销商分享语 店名  头像信息
export const updateUserDisInfo = (data, options) => fetch('update_user_dis_info', data, options)
// 获取区域代理
export const agentInfo = (data, options) => fetch('agent_info', data, options)
// 获取股东
export const shaInit = (data, options) => fetch('sha_init', data, options)

export const getSpikeProd = (data, options) => fetch('get_spike_prod', data, options)

// 获取成为分销商配置信息
export const disApplyInit = (data, options) => fetch('dis_apply_init', data, options)

// 申请成为分销商
export const disApply = (data, options) => fetch('dis_apply', data, options)

// 获取区域代理申请记录
export const getAgentApply = (data, options) => fetch('get_agent_apply', data, options)
// 获取股东申请记录
export const getShaApply = (data, options) => fetch('get_sha_apply', data, options)
// 购买分销商
export const disBuy = (data, options) => fetch('dis_buy', data, options)
// 用户获取系统消息
export const getUserMessage = (data, options) => fetch('get_user_message', data, options)
// 用户已读系统消息
export const readUserMessage = (data, options) => fetch('read_user_message', data, options)
// 获取个人中心签到状态
export const judgeSignin = (data, options) => fetch('judge_signin', data, options)
// 获取个人中心签到状态
export const signin = (data, options) => fetch('signin', data, options)
// 获取签到页信息
export const getSignin = (data, options) => fetch('get_signin', data, options)
// 分销佣金 管理列表
export const getManageRecordList = (data, options) => fetch('getManageRecordList', data, options)
// 申请成为区域代理
export const agentApply = (data, options) => fetch('agent_apply', data, options)
// 区域代理支付
export const agentApplyPay = (data, options) => fetch('agent_apply_pay', data, options)
// 股东支付
export const shaApplyPay = (data, options) => fetch('sha_apply_pay', data, options)

// 取消代理申请
export const cancelAgentApply = (data, options) => fetch('cancel_agent_apply', data, options)
// 取消股东申请
export const cancelShaApply = (data, options) => fetch('cancel_sha_apply', data, options)

// 申请成为股东
export const shaApply = (data, options) => fetch('sha_apply', data, options)

// 获取订单物流追踪
export const getOrderExpress = (data, options) => fetch('get_order_express', data, options)
// 获取任务中心数据
export const getTaskCenter = (data, options) => fetch('get_task_center', data, options)

// jssdk签名
export const getJsSign = (data, options) => fetch('share_config', data, options)
// jssdk签名

export const getProductCountInfo = (data, options) => fetch('get_users_info', data, options)

export const getBalanceRank = (data, options) => fetch('get_balance_rank', data, options)

// 获取商品的海报
export const getProductSharePic = (data, options) => fetch('get_product_tgqrcode', data, options)

// 推广小助手 添加文章
export const addPromotionArticle = (data, options) => fetch('add_promotion_article', data, options)

// 零售单拒单
export const systemRefuseApply = (data, options) => fetch('system_refuse_apply', data, options)

// 零售单确认退款
export const systemConfirmApply = (data, options) => fetch('system_confirm_apply', data, options)
// 零售单收货
export const systemReceiptRefundProd = (data, options) => fetch('system_receipt_refund_prod', data, options)

// 获取拼团的团队
export const getPintuanTeam = (data, options) => fetch('get_pintuan_team', data, options)

// 更新用户信息
export const upDateUserInfo = (data, options) => fetch('update_user_info', data, options)

// 修改登录密码
export const updateUserLoginPsw = (data, options) => fetch('update_user_login_psw', data, options)

// 修改支付密码
export const updateUserPayPsw = (data, options) => fetch('update_user_pay_psw', data, options)

// 更新用户手机号  获取验证码
export const updateMobileSms = (data, options) => fetch('update_mobile_sms', data, options)

// 更新用户手机号
export const updateUserMobile = (data, options) => fetch('update_user_mobile', data, options)
// 获取会员等级信息
export const getLevelCenter = (data, options) => fetch('get_level_center', data, options)

// 积分记录
export const userIntegralRecord = (data, options) => fetch('user_integral_record', data, options)
// 积分兑换产品列表
export const getJifenProd = (data, options) => fetch('get_jifen_prod', data, options)
// 我的积分兑换列表
export const jifenProdOrder = (data, options) => fetch('jifen_prod_order', data, options)
// 取消积分兑换订单
export const cancelJifenProdOrder = (data, options) => fetch('cancel_jifen_prod_order', data, options)
// 确定兑换订单
export const confirmJifenProdOrder = (data, options) => fetch('confirm_jifen_prod_order', data, options)

// 积分支付
export const jifenProdDuihuan = (data, options) => fetch('jifen_prod_duihuan', data, options)
// 获取退款单列表
export const getBackOrder = (data, options) => fetch('get_back_order', data, options)

// 获取物流
export const getShipping = (data, options) => fetch('get_shipping', data, options)

// 获取用户资金变动记录
export const getUserMoneyRecord = (data, options) => fetch('user_money_record', data, options)

// 获取用户的余额记录
export const getUserChargeRecord = (data, options) => fetch('user_charge_record', data, options)

// 余额充值
export const depositBalance = (data, options) => fetch('deposit_balance', data, options)

// 余额转出
export const transferBalance = (data, options) => fetch('transfer_balance', data, options)

// 获取余额充值优惠
export const getBalance = (data, options) => fetch('get_balance', data, options)

// 实体店消费
export const storeConsume = (data, options) => fetch('store_consume', data, options)

// 积分转出
export const transferIntegral = (data, options) => fetch('transfer_integral', data, options)

// 积分兑换运费
export const jifenProdShippingPrice = (data, options) => fetch('jifen_prod_shipping_price', data, options)

// 积分兑换订单支付
export const jifenProdPay = (data, options) => fetch('jifen_prod_pay', data, options)

export const saveTempData = (data, options) => fetch('save_redis_data', data, options)

export const getTempData = (data, options) => fetch('get_redis_data', data, options)

// 获取礼品物流信息
export const get_ship_gift = (data, options) => fetch('get_ship_gift', data, options)

// 长链接转换短链接
export const traslateShorten = saveTempData

export const bindUserClientId = (data, options) => fetch('user_uuid_set', data, options)

export const confirmOrderPayStatus = (data, options) => fetch('judge_ispay', data, options)

// 秒杀列表
export const getFlashSaleList = (data, options) => fetch('get_flashsale', data, options)

// 门店入驻申请
export const userStoreApply = (data, options) => fetch('user_store_apply', data, options)
// 获取门店补货产品
export const getPifaStoreProd = (data, options) => fetch('get_pifa_store_prod', data, options)

// 统计门店总价值
export const getStoreProdMoney = (data, options) => fetch('get_store_prod_money', data, options)

// 零售订单拒单
export const systemRejectOrder = (data, options) => fetch('system_reject_order', data, options)

// 删除采购单
export const storePifaOrderDel = (data, options) => fetch('store_pifa_order_del', data, options)

// 获取门店信息
export const getStoreDetail = (data, options) => fetch('get_store_detail', data, options)

// 门店发送验证码
export const updateStoreMobileSms = (data, options) => fetch('update_store_mobile_sms', data, options)

// 门店更新号码
export const updateStoreMobile = (data, options) => fetch('update_store_mobile', data, options)

// 获取门店在售商品
export const getSelfStoreProd = (data, options) => fetch('get_self_store_prod', data, options)
// 修改门店信息
export const updateStoreInfo = (data, options) => fetch('update_store_info', data, options)
// 获取用户门店申请最后的信息
export const getUserStoreApply = (data, options) => fetch('get_user_store_apply', data, options)
// 写入用户日志
export const upUserLog = (data, options) => {
  return fetch('write_user_log', data, options)
}

export const checkOrderByCode = (data, options) => fetch('system_consumption_order', data, options)

// 获取批发的订单
export const getStorePurchaseSales = (data, options) => fetch('get_store_pifa_assign_order', data, options)

// 驳回退货单（平台 | 接收门店 操作）
export const storeProdBackOrderReject = (data, options) => fetch('store_prod_back_order_reject', data, options)
// 确认退货单（平台 | 接收门店 操作）
export const storeProdBackOrderPass = (data, options) => fetch('store_prod_back_order_pass', data, options)
// 确认 退货单（平台 | 接收门店 操作）
export const storeProdBackOrderArrived = (data, options) => fetch('store_prod_back_order_arrived', data, options)

// 进货单相关处理
export const getStorePurchaseApply = (data, options) => fetch('get_store_pifa_apply_order', data, options)
// 取消采购单
export const storePifaOrderCancel = (data, options) => fetch('store_pifa_order_cancel', data, options)

// 撤回采购单
export const storePifaOrderRecall = (data, options) => fetch('store_pifa_order_recall', data, options)
// 确认收货采购单
export const storePifaOrderCompleted = (data, options) => fetch('store_pifa_order_completed', data, options)

// 驳回进货请求

export const refuseStorePurchaseApply = (data, options) => fetch('store_pifa_order_reject', data, options)

export const sendStorePurchaseApply = (data, options) => fetch('store_pifa_order_check', data, options)

// 更换采购渠道
export const changeStoreApplyChannel = (data, options) => fetch('store_pifa_order_change_wholesaler', data, options)

export const updateStoreApplyGoodsNum = (data, options) => fetch('store_pifa_order_edit', data, options)

export const cancalStorePurchaseApply = (data, options) => fetch('store_pifa_order_recall', data, options)
// 修改采购数量并提交
export const subStorePurchaseApply = (data, options) => fetch('store_pifa_order_submit', data, options)

export const delStorePurchaseApply = (data, options) => fetch('store_pifa_order_del', data, options)

export const storeProdBackSubmit = (data, options) => fetch('store_prod_back_submit', data, options)

export const getStoreProdBackOrder = (data, options) => fetch('get_store_prod_back_order', data, options)

export const storeProdBackOrderCancel = (data, options) => fetch('store_prod_back_order_cancel', data, options)

export const storeInit = (data, options) => fetch('store_init', data, options)
// 门店退货单详情
export const getStoreProdBackOrderDetail = (data, options) => fetch('get_store_prod_back_order_detail', data, options)
// 退货单发货
export const storeProdBackOrderSend = (data, options) => fetch('store_prod_back_order_send', data, options)
// 退货单确认收款
export const storeProdBackOrderConfirm = (data, options) => fetch('store_prod_back_order_confirm', data, options)

export const storePifaOrderCalc = (data, options) => fetch('store_pifa_order_calc', data, options)
// 获取门店类型列表
export const getStoreTypes = (data, options) => fetch('get_store_types', data, options)

// 获取门店类型列表
export const storeApplyPass = (data, options) => fetch('store_apply_pass', data, options)
// 门店发货
export const systemSendOrder = (data, options) => fetch('system_send_order', data, options)

// 获取分销功能模块
export const getFuncModule = (data, options) => fetch('getFuncModule', data, options)
// 获取礼包产品信息
export const getGitfpackRecordList = (data, options) => fetch('getGitfpackRecordList', data, options)

export const updatePwdSms = (data, options) => fetch('update_pwd_sms', data, options)
export const resetPwd = (data, options) => fetch('reset_pwd', data, options)


// 普通环境noop就行了
// let add_template_code = ()=>{}

// 小程序推送授权码

export const add_template_code = (data, option) => {
  // #ifdef MP-WEIXIN || MP-ALIPAY
  // return fetch('add_template_code', data, option ? option : {errtip: false})
  // #endif
}

// function get_Appid () {
//   return 'xhh'
// }

export const get_Users_ID = () => ls.get('users_id')

export const get_User_ID = () => ls.get('user_id') ? ls.get('user_id') : 'null'

export const get_user_lang = () => ls.get('language') ? ls.get('language') : ''

export const createToken = function (object) {
  object = ObjectToArr(object)
  var signString = ObjectToString(object)
  signString = signString.slice(0, -1)
  var timestamp = parseInt(new Date().getTime() / 1000).toString()
  var key = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T'
  var dataStr = signString + key + timestamp
  var sign = hexMD5(Base64.toBase64(dataStr)).toUpperCase()
  object.timestamp = timestamp
  object.sign = sign
  object.sortToken = 1
  return object
}

// 对象转数组，并排序
function ObjectToArr (object, addkey) {
  addkey = addkey || ''
  var arrs = {}
  for (var i in object) {
    var newkey = addkey + (addkey === '' ? i : '[' + i + ']')
    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign' && i !== 'sortToken') {
          arrs[newkey] = object[i]
        }
      }
    } else {
      ObjectToArr(object[i], newkey)
    }
  }
  var newkey_1 = Object.keys(arrs).sort()
  var newObj = {}// 创建一个新的对象，用于存放排好序的键值对

  // 此处不能使用for..in
  newkey_1.forEach(function (val) {
    newObj[val] = arrs[val]// 向新创建的对象中按照排好的顺序依次增加键值对
  })
  return newObj
}

// 对象转字符串
function ObjectToString (object, arrs) {
  arrs = arrs || ''
  for (var i in object) {
    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign') {
          arrs += object[i] + ','
        }
      }
    } else {
      arrs += this.ObjectToString(object[i], arrs)
    }
  }
  return arrs
}
