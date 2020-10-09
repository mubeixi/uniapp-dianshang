## 写作规范
1.有新的定制项目（改一行代码也属于定制),请使用用户的唯一信息（公司英文名称或者users_id)创建一个分支。  
2.任何分支在开发、编译前，都要从主分支合并代码，并且解决掉冲突。如果定制影响的范围大，每次合并主分支的时候，合并时要仔细处理完所有冲突。

## 定制项目配置规范（针对小程序/APP而言，h5不需要修改）
1.删除根目录ext.json  
2.修改common/env.js中isCustom参数为true  
3.修改common/env.js中APP_USERS_ID参数的值  
4.修改common/env.js中apiBaseUrl的值  
5.修改common/env.js中appProdStatic的值  


## 其他配置

商城  __UNI__E5E1B20
com.zz.wzw.wzwdianshang
wkbq6nc2kc

ios 包名  com.zz.wzw.wzwdianshang
秘钥 1234


## 关于新零售打包
	因为是第三方平台我们需要带直播的和不带直播的小程序   故分为develop  和 open-live俩个分支（先发带直播的  许总上传过代码之后   再切换分支发不带直播的小程序）
	##注意open-live分支记得 合并develop的修改   并解决冲突  打包之后至少走一遍下单和登录等正常流程




