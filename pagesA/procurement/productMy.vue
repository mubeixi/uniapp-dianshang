<template>
	<view>
		<view class="topImg">
			<view class="topAll" @click="changIndex(1)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/procurement/zai.png"></image>
				</view>
				<view class="font-13">
					在售产品
				</view>
			</view>

			<view class="topAll" @click="changIndex(2)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/procurement/zai.png"></image>
				</view>
				<view class="font-13">
					库存紧张
				</view>
			</view>

			<view class="topAll" @click="changIndex(3)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/procurement/zai.png"></image>
				</view>
				<view class="font-13">
					统计价值
				</view>
			</view>

			<view class="topAll" @click="changIndex(4)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/procurement/zai.png"></image>
				</view>
				<view class="font-13">
					{{is_refund && is_fourth?'取消':'退货'}}
				</view>
			</view>
			
		</view>
		
		<view class="marginAuto">
			<template v-if="index == 4">
				<view class="blockDiv" v-for="(item,index) of productMy" :key="index">
					<view class="mbxa" v-if="isShow" @click="checkedSelect(index)">
						<img class="imgs" :src="checked[index].checked?checked_img_url:uncheck_img_url" >
					</view>
					<view style="width: 10rpx" v-if="!isShow">
					</view>
					<view class="imgDiv">
						<image class="imgHund" :src="item.ImgPath"></image>
					</view>
					<view class="textRight" :style="{width: isShow?'415':'425'+'rpx'}">
						<view class="productName">
							{{item.Products_Name}}
						</view>
						<view class="skuMy">
							<span>库存：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">销量：{{item.Products_Sales}}</span>
						</view>
						<view class="bottomDiv">
							<view class="skuCount">
								规格库存
							</view>
							<view class="allPrice">
								<view v-if="!(is_refund&&is_fourth)">
									总价值：<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
								</view>
								<view v-else class="back-btn" @click="apply_back(item,index)">申请退货</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else-if="index == 2">
				<view class="blockDiv" v-for="(item,index) of productMy_soldout" :key="index">
					<view class="mbxa" v-if="isShow" @click="checkedSelect(index)">
						<img class="imgs" :src="checked[index].checked?checked_img_url:uncheck_img_url" >
					</view>
					<view style="width: 10rpx" v-if="!isShow">
					</view>
					<view class="imgDiv">
						<image class="imgHund" :src="item.ImgPath"></image>
					</view>
					<view class="textRight" :style="{width: isShow?'415':'425'+'rpx'}">
						<view class="productName">
							{{item.Products_Name}}
						</view>
						<view class="skuMy">
							<span>库存：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">销量：{{item.Products_Sales}}</span>
						</view>
						<view class="bottomDiv">
							<view class="skuCount">
								规格库存
							</view>
							<view class="allPrice">
								<view v-if="!(is_refund&&is_fourth)">
									总价值：<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
								</view>
								<view v-else class="back-btn" @click="apply_back(item,index)">申请退货</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="blockDiv" v-for="(item,index) of productlist" :key="index">
					<view class="mbxa" v-if="isShow" @click="checkedSelect(index)">
						<img class="imgs" :src="checked[index].checked?checked_img_url:uncheck_img_url" >
					</view>
					<view style="width: 10rpx" v-if="!isShow">
					</view>
					<view class="imgDiv">
						<image class="imgHund" :src="item.ImgPath"></image>
					</view>
					<view class="textRight" :style="{width: isShow?'415':'425'+'rpx'}">
						<view class="productName">
							{{item.Products_Name}}
						</view>
						<view class="skuMy">
							<span>库存：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">销量：{{item.Products_Sales}}</span>
						</view>
						<view class="bottomDiv">
							<view class="skuCount">
								规格库存
							</view>
							<view class="allPrice">
								<view v-if="!(is_refund&&is_fourth)">
									总价值：<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
								</view>
								<view v-else class="back-btn" @click="apply_back(item,index)">申请退货</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>
		
		<view v-if="index==3" style="height: 86rpx;width: 750rpx;">
			
		</view>
		<view v-if="index==3" class="buttonLast" @click="allSum">
			统计价值
		</view>
		
		
		<!--  遮罩层	-->
		<view class="mask" :hidden="isHiddenMask" @click="hiddenMask"></view>
		<!--  产品属性弹窗	-->
		<view class="sku-pop" v-if="showSku">
		    <view class="sku-title">选择商品属性</view>
		    <view class="sku-content">
		        <view class="skulist" v-for="item in prosku.skujosn_new" :key="">
		            <view class="sku-name">{{item.sku}}</view>
		            <view class="sku-item">
		                <view :class="[check_attr[item.sku]==index?'active':'','sku']" @click="selectAttr(index,item.sku)"  v-for="(attr,index) of item.val" :key="">{{attr}}</view>
		            </view>
		        </view>
		        <view class="skulist">
		            <view class="sku-name">数量</view>
		            <view class="sku-item">
		                <view class="handle" @click="minus">-</view>
		                <view class="pro-num">{{postData.qty}}</view>
		                <view class="handle" @click="plus">+</view>
		            </view>
		        </view>
		        <view class="sku-btns">
		            <view class="cancel btn" @click="cancel">取消</view>
		            <view class="confirm btn" @click="confirm(prosku)"  :class="submit_flag?'':'disabled'">确定</view>
		        </view>
		    </view>
		</view>
		<!--  价值弹窗	-->
		<view class="sku-pop" v-if="showSum">
		    <view class="sku-title">您查看的商品总价值为</view>
			<view class="priceSum">
				¥<span class="span">{{prod_money}}</span>
			</view>
		</view>
		<view style="height:90rpx;" v-if="index == 4 && amount > 0 ">
		    <view class="check" :style="{'z-index': zIndex}">
		        <view class="check-msg" @click="showSelected">已选取<text class="num">{{amount}}</text>个普通商品 <image class="img" :class="isClicked?'turn':''" src="/static/top.png"></image></view>
		        <view class="submit" @click="submit">发起退货</view>
		    </view>
		</view>
		<!--	明细	-->
		<popup-layer ref="detail"  @maskClicked="handClicked" :direction="'top'" :bottomHeight="45" >
		    <view class="mxdetail">
		        <template v-for="(pro,index) of productMy">
							<block v-if="pro.skuvaljosn">
		            <template v-for="(attr,attr_id) in pro.skuvaljosn">
		                <view class="product" v-if="attr.myqty>0">
		                    <view class="proImg">
		                        <image :src="attr.Attr_Image" class="img"></image>
		                    </view>
		                    <view class="proMsg">
		                        <view class="proName">
		                            <view class="name">{{pro.Products_Name}}</view>
		                            <image class="del"  @click="delList(index,attr.myqty,attr_id)" src="/static/procurement/del.png"></image>
		                        </view>
		                        <view class="attrInfo">
		                            <view>{{attr.check_attrnames}}</view>
		                        </view>
		                        <view class="proPrice">
		                            <view class="newPrice">￥<text class="number">{{pro.Products_PriceX}}</text></view>
		                            <view class="oldPrice">￥{{pro.Products_PriceY}}</view>
		                            <view class="amount">
		                                <view class="icon" @click="delNumber(attr,pro)">-</view>
		                                <view class="num">{{attr.myqty}}</view>
		                                <view class="icon" @click="addNumber(attr,pro)">+</view>
		                            </view>
		                        </view>
		                    </view>
		                </view>
		            </template>
							</block>
							<block v-else>
								<view class="product" v-if="pro.myqty>0">
								    <view class="proImg">
								        <image :src="pro.ImgPath" class="img"></image>
								    </view>
								    <view class="proMsg">
								        <view class="proName">
								            <view class="name">{{pro.Products_Name}}</view>
								            <image class="del"  @click="delListNoAttr(pro,index,pro.myqty)" src="/static/procurement/del.png"></image>
								        </view>
								        <view class="proPrice">
								            <view class="newPrice">￥<text class="number">{{pro.Products_PriceX}}</text></view>
								            <view class="oldPrice">￥{{pro.Products_PriceY}}</view>
								            <view class="amount">
								                <view class="icon" @click="delNumberNoAttr(pro)">-</view>
								                <view class="num">{{pro.myqty}}</view>
								                <view class="icon" @click="addNumberNoAttr(pro)">+</view>
								            </view>
								        </view>
								    </view>
								</view>
							</block>
		        </template>
		    </view>
		</popup-layer>
		<!-- 修改渠道 -->
		<view class="sku-pop" v-if="isChangeChannel">
		    <view class="sku-title">修改渠道</view>
		    <view class="sku-content" style="padding-left:53rpx;">
		        <view class="skulist" @click="active_id = 0">
							
		            <image class="selected" src="/static/procurement/selected.png" mode="" v-if="active_id == 0"></image>
								<view class="nochecked" v-else></view>
								<view>平台进货</view>
		        </view>
		        <view class="skulist" @click="active_id = 1">
								<image class="selected" src="/static/procurement/selected.png" mode="" v-if="active_id == 1"></image>
								<view class="nochecked" v-else></view>
								<view>门店进货</view>
		        </view>
		        <view class="skulist" v-if="active_id == 1">
								<input class="input" type="text" v-model="purchase_store_sn" placeholder="请输入门店编号" placeholder-style="color: #C9C9C9;font-size: 24rpx;" />
		        </view>
						<view class="skulist change-btn">
							<view class="btn cancel" @click="sub_cancel">取消</view>
							<view class="btn confirm" @click="sub_confirm">确定</view>
						</view>
		    </view>
		</view>
	</view>
</template>

<script>
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	import {domainFn} from "../../common/filter";
	import {mapGetters} from 'vuex'
	import {numberSort,ls} from '../../common/tool.js'
	import {getStoreProdMoney,getSelfStoreProd,storeProdBackSubmit}  from '../../common/fetch'
	export default {
		data() {
			return {
				checked_img_url:'/static/client/checked.png',
				uncheck_img_url:'/static/client/uncheck.png',
				isShow:true,
				index:1,
				page:1,
				pageSize:10,
				totalCount:0,
				productMy:[],
				checked:[],
				checkedData:[],
				loading:false,
				isHiddenMask: true, // 是否隐藏遮罩
				showSum:false,// 总价值弹窗
				prod_money:0,
				showSku: false,
				is_refund: false, // 是否是退货状态
				is_fourth: false, // 是否是第四个状态
				prosku: {},
				check_attr: {},
				check_attrid_arr: [],
				postData: {
				    prod_id: 0,    //产品ID  在 onLoad中赋值
				    attr_id: 0,    //选择属性id
				    count: 0,         //选择属性的库存
				    // showimg: '',      //选择属性的图片(用产品图片代替)
				    qty: 1,           //购买数量
				    productDetail_price: 0
				},
				submit_flag: true, //提交按钮是否可以用
				// amount: 0 , // 用户要退货的总数量
				prosku_index: 0, //产品在数组中的索引，用于修改产品库存数量
				check_attrid:'',//选中的商品规格1;2;3
				check_attrnames:"",//选中的商品名称
				zIndex: 100,
				productMy_soldout: [], // 库存紧张
				productlist: [], // index为1，3的时候，产品列表
				isChangeChannel: false, // 修改渠道
				active_id: 0,
				purchase_store_sn: '', // 门店编号,
				isClicked: false
			};
		},
		components: {
		    popupLayer
		},
		computed: {
		    ...mapGetters(['Stores_ID']),		
				amount: function(){
					let amount = 0;
					if(this.productMy) {
						this.productMy.forEach(item=>{
							if(item.skuvaljosn) {
								for(let attr_id in item.skuvaljosn) {
									if(item.skuvaljosn[attr_id].myqty) {
										amount += item.skuvaljosn[attr_id].myqty
									}
								}								
							}else {
								amount += item.myqty
							}
						})						
					}
					return amount
				}
		},
		watch: {
			amount: function(val){
				if(val == 0) {
					this.$refs.detail.close();
				}
			}
		},
		onShow() {
			ls.remove('productMy')
			this.checked_img_url = domainFn(this.checked_img_url)
			this.uncheck_img_url = domainFn(this.uncheck_img_url)
			this.load();
		},
		onLoad() {
			
		},
		onHide(){
			ls.remove('productMy')
		},
		onReachBottom() {
			if(this.productMy.length<this.totalCount){
				this.page++;
				this.getSelfStoreProd();
			}
		},
		methods:{
			load(){
				this.productMy = [];
				this.productlist = [];
				this.page = 1;
				this.getSelfStoreProd();
			},
			// 提交退货
			submit(){
				this.$refs.detail.close();
				this.zIndex = 100;
				this.isChangeChannel = true;
				this.isHiddenMask = false;
			},
			sub_cancel(){
				this.isChangeChannel = false;
				this.isHiddenMask = true;
			},
			sub_confirm(){
				let productMy = this.productMy;
				let arr = []; // 选中的产品数组
				productMy.forEach(item=>{
					if(item.skuvaljosn) {
						for(let attr_id in item.skuvaljosn) {
							if(item.skuvaljosn[attr_id].myqty > 0) {
								arr.push(item.skuvaljosn[attr_id])
							}
						}						
					}else if(item.myqty > 0){
						arr.push(item)
					}
				})
				console.log(arr)
				let prod_json = {};
				for(let i in arr) {
					if(!arr[i].Products_ID){
						arr[i].Products_ID=arr[i].prod_id
					}
					if(prod_json[arr[i].Products_ID]) {
						prod_json[arr[i].Products_ID]['num'] = prod_json[arr[i].Products_ID]['num'] + arr[i].myqty
						if(prod_json[arr[i].Products_ID]['attr']) {
							prod_json[arr[i].Products_ID]['attr'][arr[i].Product_Attr_ID] = arr[i].myqty
						}else {
							if(arr[i].Product_Attr_ID){
								prod_json[arr[i].Products_ID]['attr'] = {
									[arr[i].Product_Attr_ID]: arr[i].myqty
								}		
							}
															
						}
					}else {
						prod_json[arr[i].Products_ID] = {
							"num": arr[i].myqty
						} 
						if(prod_json[arr[i].Products_ID]['attr']) {
							prod_json[arr[i].Products_ID]['attr'][arr[i].Product_Attr_ID] = arr[i].myqty
						}else {
							if(arr[i].Product_Attr_ID){
								prod_json[arr[i].Products_ID]['attr'] = {
									[arr[i].Product_Attr_ID]: arr[i].myqty
								}		
							}									
						}
					}
				}
				if(this.active_id == 1 && !this.purchase_store_sn) {
					uni.uni.showToast({
						title: '门店编号必传',
						icon:  'none'
					});
					return;
				}
				storeProdBackSubmit({
					store_id: this.Stores_ID,
					prod_json: JSON.stringify(prod_json),
					purchase_type: this.active_id == 0 ? 'shop' : 'store',
					purchase_store_sn: this.purchase_store_sn
				}).then(res=>{
					uni.showToast({
						title: res.msg
					});
					// 关闭遮罩
					this.isHiddenMask = true;
					// 关闭选择渠道
					this.isChangeChannel = false;
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pages/procurement/refundRecords'
						})
					},500)
				})
			},
			// 删除不含属性的
			delListNoAttr(pro,index,qty) {
				console.log(this.productMy,index,qty)
				this.productMy[index].myqty = 0;
				this.productMy[index].prod_stock+=qty
			},
			// 减少数量
			delNumberNoAttr(pro) {
				if(pro.myqty==1){
					uni.showToast({
					    title: '数量最少为1，您可以删除',
					    icon: 'none'
					})
					return
				}
				pro.myqty -- ;
				pro.prod_stock ++;
				
			},
			// 增加数量
			addNumberNoAttr(pro){
				pro.myqty ++ ;
				pro.prod_stock --;
				
			},
			// 删除有属性的
			delNumber(num,pro){
				if(num.myqty==1){
					uni.showToast({
					    title: '数量最少为1，您可以删除',
					    icon: 'none'
					})
					return
				}
				num.myqty--;
				pro.prod_stock++;
				num.Property_count ++;
				num.attr_count--;
				// ls.remove('productMy')
				// ls.set('productMy',this.productMy);
			},
			addNumber(num,pro){
				let my=num.Product_Attr_ID;
				let numbers=pro.sku_stock[my]
				if(num.myqty<numbers){
					num.myqty++;
					pro.prod_stock--;
					num.Property_count --;
					num.attr_count ++;
					// this.amount ++;
					return
				}
				uni.showToast({
					title: '该规格已经没有库存',
					icon: 'none'
				})
				
			},
			handClicked(){
				 this.$refs.detail.close();
			},
			delList(index,qty,attr_id){
				console.log(index,this.productMy)
				this.productMy[index].skuvaljosn[attr_id].myqty=0
				this.productMy[index].prod_stock+=qty
				// this.amount-=qty
			},
			// 取消退货
			cancel(){
				this.isHiddenMask = true;
				this.showSku = false;
			},
			
			
			showSelected(){
				if(this.total_cart_count == 0) return;
			    if(!this.isClicked) {
			        this.zIndex = 9999999;
			        this.$refs.detail.show();
			    }else {
			        this.$refs.detail.close();
			        setTimeout(()=>{
			            this.zIndex = 100;
			        },500)
			    }
			    this.isClicked = !this.isClicked;
			},
			// 确认退货
			confirm(prosku){		
				console.log(prosku);
				console.log(this.prosku_index);//产品下表
				if(!this.submit_flag) {return;}
				
				if(prosku.skuvaljosn && !this.postData.attr_id) {
				    uni.showToast({
				        title: '请选择规格',
				        icon: 'none'
				    });
				    return;
				}
				if(prosku.skuvaljosn) {
					this.productMy[this.prosku_index].prod_stock-=this.postData.qty
					this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].attr_count = this.postData.qty;
					this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].Property_count-=this.postData.qty
					this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].check_attrid_arr = this.check_attrid_arr;
					//存选中商品的属性名
					this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].check_attrnames=this.check_attrnames
					//存选中商品的规格数量
					this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].myqty+=this.postData.qty					
				}else {
					this.productMy[this.prosku_index].prod_stock -= this.postData.qty;
					this.productMy[this.prosku_index].myqty += this.postData.qty;
				}
				
				
				// 确认以后，该产品改属性的库存减少 qty个，
				// this.amount += this.postData.qty;
				this.isHiddenMask = true;
				this.showSku = false;
			},
			// 申请退货
			apply_back(item,index){
				this.check_attr = {};
				this.check_attrid_arr = [];
				this.postData.qty = 1;
				this.submit_flag = true;
				this.prosku_index = index; // 产品在数组中的索引，用于修改产品库存数量
				this.postData.count = item.prod_stock;
				if(item.skujosn) {
				    let skujosn = item.skujosn;
				    let skujosn_new = [];
				    for (let i in item.skujosn) {
				        skujosn_new.push({
				            sku: i,
				            val: skujosn[i]
				        });
				    }
				    item.skujosn_new = skujosn_new;
				    item.skuvaljosn = item.skuvaljosn;
				}
				this.prosku = item;
				this.isHiddenMask = false;
				// 防止切换产品属性有时候出现 null
				setTimeout(()=>{
					this.showSku = true;
				},100)
			},
			// 选择属性
			selectAttr(index,i){
				this.zIndex = 100;
			    var value_index = index; //选择的属性值索引
			    var attr_index = i;   //选择的属性索引
			    // if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
			    //记录选择的属性
			    var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }); //记录选择的属性  attr_index外的[]必须
			    //属性处理
			    var check_attrid = [];
			    var check_attrname = [];
			    var check_attrnames = [];
				var check_name=[]
			    for (var i in check_attr) {
			        var attr_id = check_attr[i];
			        check_attrid.push(attr_id);
			        check_attrname[attr_id] = i;
			    }
			    //数组排序  按从小到大排
			    var check_attrid_arr = check_attrid;
			    check_attrid = numberSort(check_attrid);
			    //获取对应的属性名称
			    for (var i = 0; i < check_attrid.length; i++) {
			        var attr_id = check_attrid[i];
			        var attr_name = check_attrname[attr_id];
			        check_attrnames.push(attr_name + ':' + this.prosku.skujosn[attr_name][attr_id]);
					check_name.push(this.prosku.skujosn[attr_name][attr_id])
			    }
				let mySku='';
				for(let item of check_name){
					mySku+=item+";"
				}
				mySku=mySku.substring(0,mySku.length-1)
			    check_attrid = check_attrid.join(';');
			    var attr_val = this.prosku.skuvaljosn[check_attrid];   //选择属性对应的属性值
			    //数组转化为字符串
			    check_attrnames = check_attrnames.join(';');
			    //属性判断
			    if (attr_val) {
			        this.postData.attr_id = attr_val.Product_Attr_ID;   //选择属性的id
			        this.postData.count = attr_val.Property_count;   //选择属性的库存
			        // this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
			        this.postData.productDetail_price = attr_val.Attr_Price?attr_val.Attr_Price:this.prosku.Products_PriceX; // 选择属性的价格
			        this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) ? false : true;
			    }
			    //判断属性库存
			    if (attr_val && attr_val.Property_count <= 0) {
			        uni.showToast({
			            title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
			            icon: 'none'
			        })
			        this.submit_flag =  false;
			        return false;
			    }
					this.check_attr = {};
					console.log(check_attr);
					console.log(check_attrid);
					//存取1；2；3
					this.check_attrid=check_attrid;
					this.check_attrnames=mySku;
					console.log(check_attrid_arr);
			    this.check_attr = check_attr;
			    this.check_attrid_arr = check_attrid_arr;
			    this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) || Object.getOwnPropertyNames(this.prosku.skuvaljosn).indexOf(check_attrid)==-1 ? false : true;
			},
			plus(){
			    if (this.postData.qty < this.postData.count) {
			        this.postData.qty = Number(this.postData.qty) + 1;
			    }else {
			        uni.showToast({
			            title: '购买数量不能大于库存量',
			            icon: 'none',
			        });
			        this.postData.qty = this.postData.count;
			    }
			},
			minus(){
			    if (this.postData.qty > 1) {
			        this.postData.qty -= 1;
			    } else {
			        uni.showToast({
			            title: '购买数量不能小于1',
			            icon: 'none',
			        });
			        this.postData.qty = 1;
			    }
			},
			// 点击遮罩
			hiddenMask(){
				this.isHiddenMask = true;
				this.zIndex = 100;
				this.isClicked = false;
				this.showSku = false;
				this.showSum = false;
				this.isChangeChannel = false;
			},
			allSum(){
				let arr=[];
				for(let item of this.checked){
					if(item.checked){
						arr.push(this.productlist[item.index].Products_ID)
					}
				}
				if(arr.length<=0){
					uni.showToast({
						title:"还未选择商品",
						icon:"none"
					})
					return
				}
				let data={
					store_id:this.Stores_ID,
					prod_ids:JSON.stringify(arr)
				}
				getStoreProdMoney(data).then(res=>{
					this.prod_money=res.data.prod_money
				}).catch(e=>{
					console.log(e)
				});
				this.showSum=true
				this.isHiddenMask = false;
			},
			checkedSelect(index){
				this.checked[index].checked=!this.checked[index].checked;
			},
			getSelfStoreProd(){
				if(this.loading)return
				this.checkedData=this.checked
				this.loading=true
				let data={
					store_id:this.Stores_ID,
					page:this.page,
					pageSize:this.pageSize
				}
				getSelfStoreProd(data).then(res=>{
					this.productMy = this.productMy.concat(res.data);
					this.productlist = this.productlist.concat(res.data);
					this.checked = [];
					for(let i in this.productlist) {
						this.checked.push({
							index: i,
							checked: false
						})
					}
					for(let i=0;i<this.checkedData.length;i++){
						this.checked[i].checked=this.checkedData[i].checked
					}
					this.totalCount=res.totalCount
					this.loading=false
					
					for(let item of this.productMy){
						if(item.skuvaljosn) {
							for(let i in item.skuvaljosn){
								item.skuvaljosn[i].myqty=0
							}							
						}else {
							item.myqty = 0;
						}
					}
					ls.set('productMy',this.productMy);
				}).catch(e=>{
					this.loading=false
				})
				
			},
			changIndex(index){
				// 切换存一下数组，否则之前处理的逻辑都没了
				if(index != 4) {
					// ls.remove('productMy');
					// ls.set('productMy', this.productMy);
				}
				ls.set('productMy', this.productMy);
				this.index=index
				if(index != 4) {
					this.is_refund = false;
				}else {
					this.is_fourth = true;
					this.is_refund = !this.is_refund;
				}
				if(this.index==3){
					this.isShow=true
				}else{
					this.isShow=false
				}
				if(this.index == 2) {
					// 库存紧张
					this.productMy_soldout = this.productlist.filter(item=>{
						return item.prod_stock <= 10
					})
				}else if(this.index == 4){
					this.productMy = ls.get('productMy')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.topImg{
	box-sizing: border-box;
	width: 750rpx;
	height: 180rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.topAll{
	width: 120rpx;
	text-align: center;
}
.imgHund{
	width: 100%;
	height: 100%;
}
.ulDiv{
	width: 78rpx;
	height: 78rpx;
	margin: 0 auto;
}
.font-13{
	font-size: 13px;
	color: #333333;
	margin-top: 14rpx;
}
.marginAuto{
	width: 710rpx;
	margin: 0 auto;
	background-color: #FFFFFF;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 20rpx 26rpx 18rpx 10rpx;
}
.blockDiv{
	width: 664rpx;
	margin-bottom: 30rpx;
	height: 220rpx;
	display: flex;
}
.imgDiv{
	width: 220rpx;
	height: 220rpx;
}
.textRight {
	padding-top: 16rpx;
	padding-left: 19rpx;
	width: 425rpx;
}
.productName{
	width:100%;
	height: 60rpx;
	line-height: 30rpx;
	overflow: hidden;
	font-size: 13px;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.skuMy{
	color: #666666;
	font-size: 12px;
	margin-top: 28rpx;
}
.bottomDiv{
	margin-top: 20rpx;
	height: 46rpx;
	display: flex;
	align-content: center;
	justify-content: space-between;
}
.skuCount{
	width: 120rpx;
	height: 46rpx;
	background-color: #FFF2F1;
	font-size: 11px;
	color: #666666;
	text-align: center;
	line-height: 46rpx;
}
.allPrice{
	font-size: 24rpx;
	color: #666666;
	height: 46rpx;
	line-height: 46rpx;
}
.span1{
	color: #F43131;
}
.span2{
	color: #F43131;
	font-size: 28rpx;
	margin-left: 4rpx;
}
.mbxa{
		display: flex;
		align-items: center;
		margin-right: 10rpx;
		.imgs{
			width: 34rpx;
			height: 34rpx;
		}
	}
.buttonLast{
		width:750rpx;
		height:86rpx;
		background-color:$wzw-primary-color;
		font-size: 32rpx;
		line-height: 86rpx;
		text-align: center;
		color: #FFFFFF;
		position: fixed;
		bottom: 0px;
		left: 0px;
}

	.mask {
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
		.sku-pop {
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    z-index: 10000;
		    width: 526rpx;
		    transform: translate(-50%,-50%);
		    border-radius: 10rpx;
		    .sku-title {
		        height: 60rpx;
		        line-height: 60rpx;
		        background-color: #f6f6f6;
		        color: #333;
		        font-size: 24rpx;
		        text-align: center;
		        border-top-left-radius: 10rpx;
		        border-top-right-radius: 10rpx;
		    }
		    .sku-content {
		        padding: 40rpx 46rpx 34rpx 40rpx;
		        background-color: #fff;
		        border-bottom-left-radius: 10rpx;
		        border-bottom-right-radius: 10rpx;
		        .skulist {
		            margin-bottom: 30rpx;
		            display: flex;
		            align-items: center;
		    				&.change-btn {
		    					padding-top: 43rpx;
		    					justify-content: center;
		    				}
		    				.selected,
		    				.nochecked {
		    					display: block;
		    					width: 40rpx;
		    					height: 40rpx;
		    					margin-right: 23rpx;
		    				}
		    				.nochecked {
		    					box-sizing: border-box;
		    					border:2rpx solid rgba(214,214,214,1);
		    					border-radius:3px;
		    				}
		    				.input {
		    					width:420rpx;
		    					height:60rpx;
		    					border:1px solid rgba(214,214,214,1);
		    					font-size: 24rpx;
		    					padding-left: 24rpx;
		    					box-sizing: border-box;
		    					line-height: 36rpx;
		    				}
		    				.btn {
		    					width: 130rpx;
		    					height: 50rpx;
		    					text-align: center;
		    					line-height: 50rpx;
		    					background-color: #E9E9E9;
		    					font-size: 24rpx;
		    				}
		    				.cancel {
		    					color: #666;
		    					margin-right: 25rpx;
		    				}
		    				.confirm {
		    					color: #fff;
		    					background-color: $wzw-primary-color;
		    				}
		            .sku-name {
		                color: #333;
		                font-size: 24rpx;
		                margin-right:26rpx;
		            }
		            .sku-item {
		                display: flex;
		                align-items: center;
		                color: #666;
		                /*flex: 1;*/
		                .img {
		                    width: 27rpx;
		                    height: 32rpx;
		                }
		                .sku {
		                    width: 80rpx;
		                    height: 46rpx;
		                    line-height: 46rpx;
		                    text-align: center;
		                    background-color: #f6f6f6;
		                    color: #666;
		                    font-size: 24rpx;
		                    margin-right: 13rpx;
		                    border-radius: 5rpx;
		                }
		                .active {
		                    background-color: $wzw-primary-color;
		                    color: #fff;
		                }
		                .handle {
		                    width: 50rpx;
		                    height: 45rpx;
		                    line-height: 45rpx;
		                    text-align: center;
		                    font-size: 32rpx;
		                    color: #777;
		                    background: #f6f6f6;
		                }
		                .pro-num {
		                    margin: 0 15rpx;
		                    font-size: 24rpx;
		                    color: #777;
		                }
		            }
		        }
		        .sku-btns {
		            display: flex;
		            justify-content: center;
		            align-items: center;
		            margin-top: 60rpx;
		            .btn {
		                width: 130rpx;
		                height: 50rpx;
		                text-align: center;
		                line-height: 50rpx;
		                font-size: 24rpx;
		            }
		            .cancel {
		                background: #e9e9e9;
		                color: #666;
		                margin-right: 25rpx;
		            }
		            .confirm {
		                background-color: $wzw-primary-color;
		                color: #fff;
		            }
		        }
		    }
		}
		.back-btn {
			height: 50rpx;
			width: 130rpx;
			text-align: center;
			background-color: $wzw-primary-color;
			color: #fff;
			border-radius: 25rpx;
			line-height: 50rpx;
		}
		.check {
		    position: fixed;
		    bottom: 0;
		    width: 100%;
		    height: 90rpx;
		    display: flex;
		    line-height: 90rpx;
		    font-size: 24rpx;
		    color: #333;
		    background-color: #fff;
		    box-shadow: 0px 0px 22px 0px rgba(4,0,0,0.12);
		    .check-msg {
		        flex: 1;
		        display: flex;
		        align-items: center;
		        justify-content: center;
		        font-size: 24rpx;
		        color: #333;
		        .num {
		            color: $wzw-primary-color;
		            fong-size: 28rpx;
		        }
		        .img {
		            width: 17rpx;
		            height: 14rpx;
		            margin-left: 12rpx;
		        }
		        .turn {
		            transform: rotate(180deg);
		        }
		    }
		    .submit {
		        width: 210rpx;
		        height: 100%;
		        line-height: 90rpx;
		        background: $wzw-primary-color;
		        font-size: 28rpx;
		        color: #fff;
		        text-align: center;
		    }
		}
		.mxdetail {
		    padding: 20rpx;
				max-height: 70vh;
				overflow-y: scroll;
		    .product {
		        display: flex;
		        margin-bottom: 40rpx;
		        .proImg {
		            width: 190rpx;
		            height: 190rpx;
		            .img {
		                width: 100%;
		                height: 100%;
		            }
		        }
		        .proMsg {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
		            flex: 1;
		            margin-left: 20rpx;
		            .proName {
		                overflow: hidden;
		                margin-bottom: 20rpx;
		                .name {
		                    width: 440rpx;
		                    word-wrap: break-word;
		                    font-size: 24rpx;
		                    float: left;
		                }
		                .del {
		                    float: right;
		                    width: 26rpx;
		                    height: 31rpx;
		                    margin-left: 34rpx;
		                }
		            }
		            .attrInfo {
		                display: inline-block;
		                padding: 12rpx 16rpx;
		                background-color: #FFF5F5;
		                color: #666;
		                font-size: 22rpx;
		                border-radius: 5rpx;
		                margin-bottom: 24rpx;
		            }
		            .proPrice {
		                display: flex;
		                justify-content: space-between;
		                align-items: center;
		                .newPrice {
		                    font-size: 24rpx;
		                    color: $wzw-primary-color;
		                    .number {
		                        font-size: 30rpx;
		                    }
		                }
		                .oldPrice {
		                    flex: 1;
		                    color: #afafaf;
		                    font-size: 24rpx;
		                    text-decoration: line-through;
		                    margin-left: 20rpx;
		                }
		                .amount {
		                    display: flex;
		                    height: 45rpx;
		                    line-height: 45rpx;
		                    width: 160rpx;
		                    border: 2rpx solid #D1D1D1;
		                    box-sizing: border-box;
		                    .icon {
		                        font-size: 32rpx;
		                        color: #777;
		                        width: 43rpx;
		                        display: flex;
		                        justify-content: center;
		                        align-items: center;
		                    }
		                    .num {
		                        flex: 1;
		                        color: #777;
		                        font-size: 24rpx;
		                        text-align: center;
		                        border-left: 2rpx solid #d1d1d1;
		                        border-right: 2rpx solid #d1d1d1;
		                    }
		                }
		            }
		        }
		    }
		}
</style>
