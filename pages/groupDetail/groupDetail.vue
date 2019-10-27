<template>
  <div style="position:relative;background-color:#f8f8f8">
    <div class="top">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAADb0lEQVRogeWbz0sbQRTHv2CoNyE91lO9hYKI8V4RT578BWI8SJSsJz2JB5EWo7Q2oERaU2kToQkVstAQBP23aptf+/v1sDMljVo12Zld3C+8S4hv5iMvM2/evAHEKALgBYARABMApgEkACQBpJgl2WfT7Dsj7G8igubkmZ4BiAGYArAKQOnSVpmPGPMZGEUBjANYQfdwd9kK8x2VxHKrBgBMwg1DrwE7LcXGGpBCxtQHII7ewrOXsI6zOQhVFMCcD4CdNgeB4fwS7krpNyS3JJuTp3oFOb/Fx1qKzc0TjQYA6D4b7RVyOAAQD7XhbiGHEMxw/V8YDz0WMopgLTwPtSQesRr3IRhbSLc2hwfus3E/JjgzM/OmXq//JKarq6uLHvzF74McgA8Zz8LCwm6j0fjFIavVaqVHn6u4J12clA25vLy832q1aozRUVVV9cj35F2QUUheZdfW1t5pmtbgkKVS6dxD/ykAz28DfS0TcmNj44Ou600iIsdxnEKhUBQwzngnZD/EnCdvtc3NzUPDMDQGaZ+enp4JGmuFsf1VTBbk9vZ21jRNnUFax8fHXwWPGWsHnZIBmU6nP1qWZRAR2bZtZjKZzxLGneKQEUjYUg4ODnK2bZtERJZlGXt7e59k/HMZWwRwK29CBzs6Ovpi27ZFRGSapr6zs5OVBMltEHDLjMIGOTk5Kdi2bRMRGYahbW1tHUqGVBgjJkQNUCgUvjmOYxMR6breWl9fz/gAqTBGTItwXiwWvzuO4xARaZrWUBTlvU+QCmNEwmvH5XK5TEQOEVGr1aonk8l9HyEVxuhtolCpVH7w5LzZbP5OJBJpnyEVuOdU7/Lby8vLCw5Zr9ev5+fn3wYAUmGMYkBrtdr17OxsoEA9Dd1qtVppD93FxcXdAIAmAQGLkaqqKl+MNE2rBWUxErK9lEql86BtL8IShnw+X+SwQUgYhKaAuVzujGdHfqeAwpP6bDYbiKQ+NMc0ICQHbyBEpZTQFMcAn8ud+XxeSrkTcIu9vhWwHceRVsAGQnIlAYTokgl4GteGY/dBAiG6CAZCcrXPFYpmDa5QtN9whaKhiisULXJcoWh65ApFGytXH9wN2a/G5DFIaExu15NvNe+UjMcDd55C/FA/vH8OcuPQHDRF4Fbe2h/4LOHmA58l/PvAZxCCHvj8AdgT4IeWfoOhAAAAAElFTkSuQmCC" @click="goBack" >
        <img src="data:image/png;base64,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" class="cart" >
    </div>



	<!-- 轮播 -->
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" circular="true" indicator-dots="indicatorDots" autoplay="autoplay" interval="4000" duration="500" indicator-color="#fff" indicator-active-color="#ff5000">
					<swiper-item v-for="(item,i) of product.Products_JSON.ImgPath" :key="i">
						 <img :src="item" >
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
    <!-- 产品信息描述 -->
    <div class="section1">
        <div class="leftss">
            <span class="pricef">¥</span>
            <span class="prices">{{product.Products_PriceX}}</span>
            <span class="pricet">¥ {{product.Products_PriceY}}</span>

        </div>
        <div class="rightss">
            <div class="countdown">
               <span>{{countdown.d}}</span>天<span>{{countdown.h}}</span>小时<span>{{countdown.m}}</span>分<span>{{countdown.s}}</span>后结束
            </div>
            <div class="haha">
                已团{{product.pintuan_flag}}件  {{product.pintuan_people}}人团
            </div>
        </div>
    </div>
    <!-- 领券 -->
    <div class="section2" >
        <div class="titles">
            <div class="title">{{product.Products_Name}}</div>
			<span class="share" @click="showTick" data-type="share">分享此产品</span>
        </div>
        <div class="titlet">
           {{product.Products_BriefDescription}}
        </div>
    </div>
    <!-- 包邮等信息 -->
    <div class="section3">
        <span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAEs0lEQVRIiZ1WW2xUVRQ9LSC0pbS0hkc74tBMmBnvnbPX5gaQRAiJwoekMfpl/PWBkVdiQoIStcngn0QIECmJWI0hxGiCMRpfBB8oogiFSqHVpJIKtB06M/fuPeXz+tFpQifDtGX93n322nevfdY+xlRAJh6vHyNaXQBeUuCYMp8X4IYCw8J8S5gvCfNxH9gZWLvOd5ymSvnKIvS8OVnXtQHRbmE+K8BFAX4IgM8FOCrAu0J0RIg+FeZTynxegQtClPaJVg9Eo/OmRTRkbZ1Y+2wAnBGgW4neD4Cn7gBRdZwl+VRq4WgstiAHNA677uJcMvmwAhuF6IACvytwSYhezqdSCysSjcZiC4R5hwLXBDhZAJ4MEonmT4yZVbETxlTlgEZhXi/MJwToF6K0WLuo7IGbnlcrRNsV6BWi9+5Yu3wqknKkY0StQpQW5l4hSv+XSDRPDtqwYbYQPaPMVwXoHLM2MhOSUgSJRLMAHQL0CbB1kobC/Igw/6TAVwHRivvIXzUYidRk4vH60JhqY4wZI2pV5o+U+XwBWBUaU20y8Xi9ArsE6M4TbQqNqZopUyYerxeiLT7R9qznNUwUkCNiAc4I88FMPN5ifGsfVeCCAl33c09CY6p8YJWOT+6BEGic+DbiOPMF2KtATz6VesIUmJ9X4EJgbXtHsQUzwZC1ixToEuBXdV0b3pUjNKZKAQjzWWFOmwDoEuZTOSA6U6LTxsz2U6nnBOiTlSu3XHGcB0pjCp63VJm/FuazRoBuAU6q6y6eKZnvOLHiYH076roPlYsJgUYBOpX5lil63JG7ez0dDFlbp8Brynw1sLY9vIcEoefVCrBHma8bBUYConcy8Xj9pCBjqrNtbQ2htXVl/8raNQJcLB2KUgxEo/OEaJsA/UaBYQEO50oOZNvaGnxgpwB7CswtkwoBGgPmfQr0+NauMRWuS7h2bU1AtFuZ/zUCXBHmz0p9LPS8WiV6VcZdZf+Eq4TGVBesbRfmy8L8ZmlHSpH1vIYCcEiAYSPMJ4To+6zjLJtEZkxVsGLFg0K0TYFrAfBh3trlo9ZGBPhYge/EdZOViIwxRl13sQJfKPOfppjsD7X28XLucbOlpTYAXhDgL2E+LkCHMF8W4JXp7C1x3aQAPwfM+0wulVqvzJcEOHSX1UxCGIvNDYieFuZuGde4Ux1nyVREg5FITdEKrxSAzeMOzZxW4LeiYZYVO/S8OT6wWYFjeaJN01k/o0SOAKe1KIExRcNU4JwwnyjVbhKhMbN8x2kKyzhFKYJEolmIDgrQk7V2XThR3N+x2NwAeDFg/scH9galC2+GKBrwVgH6yk6s7zhNAuxV5l4B3sokk0vvh2jQcZqEaFvxynSO3msRi7WLhCgtQJ8CXflUyhtxnPnTIQkjkZrA2rgA+wXoF6BzSnP3HadJrN0hQK8AvwjQUbB25W2i1nwqtXDI2rqBaHTeTc+rzQGNhWRyqRA5CuwSolMy/ljquE3UOr1WRCI1WaLHlOiAAD3Ft+M3AhwVojfE2h0B8LoAhxX4slhUTwB8kAc2TuUq5VA14jhLFNgYAG8L848KDCrzdQH6FRgQ5hsKnBNgf2Bt+x3PW9ZRYQH/DyS2ZcSf28uXAAAAAElFTkSuQmCC" alt="">
            <span>假一赔十</span>
        </span>
        <span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAEs0lEQVRIiZ1WW2xUVRQ9LSC0pbS0hkc74tBMmBnvnbPX5gaQRAiJwoekMfpl/PWBkVdiQoIStcngn0QIECmJWI0hxGiCMRpfBB8oogiFSqHVpJIKtB06M/fuPeXz+tFpQifDtGX93n322nevfdY+xlRAJh6vHyNaXQBeUuCYMp8X4IYCw8J8S5gvCfNxH9gZWLvOd5ymSvnKIvS8OVnXtQHRbmE+K8BFAX4IgM8FOCrAu0J0RIg+FeZTynxegQtClPaJVg9Eo/OmRTRkbZ1Y+2wAnBGgW4neD4Cn7gBRdZwl+VRq4WgstiAHNA677uJcMvmwAhuF6IACvytwSYhezqdSCysSjcZiC4R5hwLXBDhZAJ4MEonmT4yZVbETxlTlgEZhXi/MJwToF6K0WLuo7IGbnlcrRNsV6BWi9+5Yu3wqknKkY0StQpQW5l4hSv+XSDRPDtqwYbYQPaPMVwXoHLM2MhOSUgSJRLMAHQL0CbB1kobC/Igw/6TAVwHRivvIXzUYidRk4vH60JhqY4wZI2pV5o+U+XwBWBUaU20y8Xi9ArsE6M4TbQqNqZopUyYerxeiLT7R9qznNUwUkCNiAc4I88FMPN5ifGsfVeCCAl33c09CY6p8YJWOT+6BEGic+DbiOPMF2KtATz6VesIUmJ9X4EJgbXtHsQUzwZC1ixToEuBXdV0b3pUjNKZKAQjzWWFOmwDoEuZTOSA6U6LTxsz2U6nnBOiTlSu3XHGcB0pjCp63VJm/FuazRoBuAU6q6y6eKZnvOLHiYH076roPlYsJgUYBOpX5lil63JG7ez0dDFlbp8Brynw1sLY9vIcEoefVCrBHma8bBUYConcy8Xj9pCBjqrNtbQ2htXVl/8raNQJcLB2KUgxEo/OEaJsA/UaBYQEO50oOZNvaGnxgpwB7CswtkwoBGgPmfQr0+NauMRWuS7h2bU1AtFuZ/zUCXBHmz0p9LPS8WiV6VcZdZf+Eq4TGVBesbRfmy8L8ZmlHSpH1vIYCcEiAYSPMJ4To+6zjLJtEZkxVsGLFg0K0TYFrAfBh3trlo9ZGBPhYge/EdZOViIwxRl13sQJfKPOfppjsD7X28XLucbOlpTYAXhDgL2E+LkCHMF8W4JXp7C1x3aQAPwfM+0wulVqvzJcEOHSX1UxCGIvNDYieFuZuGde4Ux1nyVREg5FITdEKrxSAzeMOzZxW4LeiYZYVO/S8OT6wWYFjeaJN01k/o0SOAKe1KIExRcNU4JwwnyjVbhKhMbN8x2kKyzhFKYJEolmIDgrQk7V2XThR3N+x2NwAeDFg/scH9galC2+GKBrwVgH6yk6s7zhNAuxV5l4B3sokk0vvh2jQcZqEaFvxynSO3msRi7WLhCgtQJ8CXflUyhtxnPnTIQkjkZrA2rgA+wXoF6BzSnP3HadJrN0hQK8AvwjQUbB25W2i1nwqtXDI2rqBaHTeTc+rzQGNhWRyqRA5CuwSolMy/ljquE3UOr1WRCI1WaLHlOiAAD3Ft+M3AhwVojfE2h0B8LoAhxX4slhUTwB8kAc2TuUq5VA14jhLFNgYAG8L848KDCrzdQH6FRgQ5hsKnBNgf2Bt+x3PW9ZRYQH/DyS2ZcSf28uXAAAAAElFTkSuQmCC" alt="">
            <span>包邮</span>
        </span>
        <span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAEs0lEQVRIiZ1WW2xUVRQ9LSC0pbS0hkc74tBMmBnvnbPX5gaQRAiJwoekMfpl/PWBkVdiQoIStcngn0QIECmJWI0hxGiCMRpfBB8oogiFSqHVpJIKtB06M/fuPeXz+tFpQifDtGX93n322nevfdY+xlRAJh6vHyNaXQBeUuCYMp8X4IYCw8J8S5gvCfNxH9gZWLvOd5ymSvnKIvS8OVnXtQHRbmE+K8BFAX4IgM8FOCrAu0J0RIg+FeZTynxegQtClPaJVg9Eo/OmRTRkbZ1Y+2wAnBGgW4neD4Cn7gBRdZwl+VRq4WgstiAHNA677uJcMvmwAhuF6IACvytwSYhezqdSCysSjcZiC4R5hwLXBDhZAJ4MEonmT4yZVbETxlTlgEZhXi/MJwToF6K0WLuo7IGbnlcrRNsV6BWi9+5Yu3wqknKkY0StQpQW5l4hSv+XSDRPDtqwYbYQPaPMVwXoHLM2MhOSUgSJRLMAHQL0CbB1kobC/Igw/6TAVwHRivvIXzUYidRk4vH60JhqY4wZI2pV5o+U+XwBWBUaU20y8Xi9ArsE6M4TbQqNqZopUyYerxeiLT7R9qznNUwUkCNiAc4I88FMPN5ifGsfVeCCAl33c09CY6p8YJWOT+6BEGic+DbiOPMF2KtATz6VesIUmJ9X4EJgbXtHsQUzwZC1ixToEuBXdV0b3pUjNKZKAQjzWWFOmwDoEuZTOSA6U6LTxsz2U6nnBOiTlSu3XHGcB0pjCp63VJm/FuazRoBuAU6q6y6eKZnvOLHiYH076roPlYsJgUYBOpX5lil63JG7ez0dDFlbp8Brynw1sLY9vIcEoefVCrBHma8bBUYConcy8Xj9pCBjqrNtbQ2htXVl/8raNQJcLB2KUgxEo/OEaJsA/UaBYQEO50oOZNvaGnxgpwB7CswtkwoBGgPmfQr0+NauMRWuS7h2bU1AtFuZ/zUCXBHmz0p9LPS8WiV6VcZdZf+Eq4TGVBesbRfmy8L8ZmlHSpH1vIYCcEiAYSPMJ4To+6zjLJtEZkxVsGLFg0K0TYFrAfBh3trlo9ZGBPhYge/EdZOViIwxRl13sQJfKPOfppjsD7X28XLucbOlpTYAXhDgL2E+LkCHMF8W4JXp7C1x3aQAPwfM+0wulVqvzJcEOHSX1UxCGIvNDYieFuZuGde4Ux1nyVREg5FITdEKrxSAzeMOzZxW4LeiYZYVO/S8OT6wWYFjeaJN01k/o0SOAKe1KIExRcNU4JwwnyjVbhKhMbN8x2kKyzhFKYJEolmIDgrQk7V2XThR3N+x2NwAeDFg/scH9galC2+GKBrwVgH6yk6s7zhNAuxV5l4B3sokk0vvh2jQcZqEaFvxynSO3msRi7WLhCgtQJ8CXflUyhtxnPnTIQkjkZrA2rgA+wXoF6BzSnP3HadJrN0hQK8AvwjQUbB25W2i1nwqtXDI2rqBaHTeTc+rzQGNhWRyqRA5CuwSolMy/ljquE3UOr1WRCI1WaLHlOiAAD3Ft+M3AhwVojfE2h0B8LoAhxX4slhUTwB8kAc2TuUq5VA14jhLFNgYAG8L848KDCrzdQH6FRgQ5hsKnBNgf2Bt+x3PW9ZRYQH/DyS2ZcSf28uXAAAAAElFTkSuQmCC" alt="">
            <span>7天包退</span>
        </span>
        <span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAEs0lEQVRIiZ1WW2xUVRQ9LSC0pbS0hkc74tBMmBnvnbPX5gaQRAiJwoekMfpl/PWBkVdiQoIStcngn0QIECmJWI0hxGiCMRpfBB8oogiFSqHVpJIKtB06M/fuPeXz+tFpQifDtGX93n322nevfdY+xlRAJh6vHyNaXQBeUuCYMp8X4IYCw8J8S5gvCfNxH9gZWLvOd5ymSvnKIvS8OVnXtQHRbmE+K8BFAX4IgM8FOCrAu0J0RIg+FeZTynxegQtClPaJVg9Eo/OmRTRkbZ1Y+2wAnBGgW4neD4Cn7gBRdZwl+VRq4WgstiAHNA677uJcMvmwAhuF6IACvytwSYhezqdSCysSjcZiC4R5hwLXBDhZAJ4MEonmT4yZVbETxlTlgEZhXi/MJwToF6K0WLuo7IGbnlcrRNsV6BWi9+5Yu3wqknKkY0StQpQW5l4hSv+XSDRPDtqwYbYQPaPMVwXoHLM2MhOSUgSJRLMAHQL0CbB1kobC/Igw/6TAVwHRivvIXzUYidRk4vH60JhqY4wZI2pV5o+U+XwBWBUaU20y8Xi9ArsE6M4TbQqNqZopUyYerxeiLT7R9qznNUwUkCNiAc4I88FMPN5ifGsfVeCCAl33c09CY6p8YJWOT+6BEGic+DbiOPMF2KtATz6VesIUmJ9X4EJgbXtHsQUzwZC1ixToEuBXdV0b3pUjNKZKAQjzWWFOmwDoEuZTOSA6U6LTxsz2U6nnBOiTlSu3XHGcB0pjCp63VJm/FuazRoBuAU6q6y6eKZnvOLHiYH076roPlYsJgUYBOpX5lil63JG7ez0dDFlbp8Brynw1sLY9vIcEoefVCrBHma8bBUYConcy8Xj9pCBjqrNtbQ2htXVl/8raNQJcLB2KUgxEo/OEaJsA/UaBYQEO50oOZNvaGnxgpwB7CswtkwoBGgPmfQr0+NauMRWuS7h2bU1AtFuZ/zUCXBHmz0p9LPS8WiV6VcZdZf+Eq4TGVBesbRfmy8L8ZmlHSpH1vIYCcEiAYSPMJ4To+6zjLJtEZkxVsGLFg0K0TYFrAfBh3trlo9ZGBPhYge/EdZOViIwxRl13sQJfKPOfppjsD7X28XLucbOlpTYAXhDgL2E+LkCHMF8W4JXp7C1x3aQAPwfM+0wulVqvzJcEOHSX1UxCGIvNDYieFuZuGde4Ux1nyVREg5FITdEKrxSAzeMOzZxW4LeiYZYVO/S8OT6wWYFjeaJN01k/o0SOAKe1KIExRcNU4JwwnyjVbhKhMbN8x2kKyzhFKYJEolmIDgrQk7V2XThR3N+x2NwAeDFg/scH9galC2+GKBrwVgH6yk6s7zhNAuxV5l4B3sokk0vvh2jQcZqEaFvxynSO3msRi7WLhCgtQJ8CXflUyhtxnPnTIQkjkZrA2rgA+wXoF6BzSnP3HadJrN0hQK8AvwjQUbB25W2i1nwqtXDI2rqBaHTeTc+rzQGNhWRyqRA5CuwSolMy/ljquE3UOr1WRCI1WaLHlOiAAD3Ft+M3AhwVojfE2h0B8LoAhxX4slhUTwB8kAc2TuUq5VA14jhLFNgYAG8L848KDCrzdQH6FRgQ5hsKnBNgf2Bt+x3PW9ZRYQH/DyS2ZcSf28uXAAAAAElFTkSuQmCC" alt="">
            <span>正品保证</span>
        </span>
    </div>
    <!-- 小伙伴在拼团 -->
    <div class="pintuan">
        <div class="pinTitle">
            小伙伴在开团
        </div>
        <div class="pinCenter" v-for="(team,idx) in teamList">
            <div class="image">
                <image :src="team.User_HeadImg" class="img" />
            </div>
            <div class="info">
                <div class="nick">
                    {{team.User_NickName}}
                </div>
                <div class="message">
                    还差{{product.pintuan_people-team.teamnum}}人，剩余{{team.addtime|endtime}}
                </div>
            </div>
            <div class="cantuan" @click="toJoinGroup(team.id,team)">
                去参团
            </div>
        </div>
    </div>
    <!-- 评价 -->
    <!-- 评价 -->
    <div class="comment">
        <div class="c_title">
            <span>评价</span>
            <div class="right" @click="gotoComments">查看全部 <image class="img" src="/static/detail/right.png" alt="" /></div>
        </div>
        <block v-for="(item,index) of commit" :key="item">
        	<div class="c_content" v-if="!item.ImgPath">
        	    <div class="c_content_title">
        	        <img :src="item.User_HeadImg" alt="">
        	        <span class="user_name">{{item.User_NickName}}</span>
        	        <span class="c_time">{{item.CreateTime}}</span>
        	    </div>
        	    <div class="c_content_msg">{{item.Note}}</div>
        	    <div class="c_content_img"></div>
        	</div>
        	<div class="c_content" v-else>
        	    <div class="c_content_title">
        	        <img :src="item.User_HeadImg" alt="">
        	        <span class="user_name">{{item.User_NickName}}</span>
        	        <span class="c_time">{{item.CreateTime}}</span>
        	    </div>
        	    <div class="c_content_msg">{{item.Note}}</div>
        	    <div class="c_content_img">
        			<block v-for="(i,j) of item.ImgPath">
        				 <img :src="i" @click="yulanImg(index,j)">
        			</block>
        	    </div>
        	</div>
        </block>
    </div>
    <!-- 商品详情 -->
    <div class="pro_detail">
        <div class="p_detail_title">商品详情</div>
    	<!-- <div v-html="product.Products_Description" class="p_detail_des"></div> -->
<!--    	<rich-text :nodes="product.Products_Description|formatRichText" class="p_detail_des"></rich-text>-->
    	<!-- <u-parse :content="product.Products_Description"  /> -->


		<!-- #ifdef H5||APP-PLUS -->
		<div v-html="formatRichTexts(product.Products_Description)" class="p_detail_des"></div>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<rich-text :nodes="product.Products_Description|formatRichText" class="p_detail_des"></rich-text>
		<!-- #endif -->
    </div>
    <div style="clear: both;">

    </div>
    <div style="height:60px;background: white;"></div>
    <popupLayer ref="popupLayer" :direction="'top'" >
    	<div class="shareinfo" v-if="type=='share'">
    		<div class="s_top">
				<!-- #ifdef APP-PLUS -->
				<div class="flex1" @click="shareFunc('wx')">
					<image class='img' src="/static/detail/share1.png" alt=""></image>
					<div>发送好友</div>
				</div>
				<div class="flex1" @click="shareFunc('wxtimeline')">
					<image class='img' src="/static/detail/sahre3.png" alt=""></image>
					<div>朋友圈</div>
				</div>
				<!--只有配置了这个参数的app，才有分享到小程序选项-->
				<div class="flex1" @click="shareFunc('wxmini')" v-if="wxMiniOriginId">
					<img class='img' src="/static/detail/share4.png" alt="">
					<div>微信小程序</div>
				</div>
				<!-- #endif -->

				<div class="flex1" @click="shareFunc('pic')">
					<image class='img' src="/static/detail/share2.png" alt=""></image>
					<div>分享海报</div>
				</div>
    		</div>
    		<div class="s_bottom" @click="cancel">取消</div>
    	</div>
    	<scroll-view class="ticks" v-if="type=='ticks'" scroll-y=true  @scrolltolower="goNextPage">
    	    <div class="t_title">
    	        领券
    	        <image src="/static/detail/x.png"  @click="close" ></image>
    	    </div>
    	    <div class="t_content" v-for="(item,i) of couponList" :key="i">
    	        <div class="t_left">
    	            <div class="t_left_t"><span>￥</span><span class="money">{{item.Coupon_Cash}}</span><span>{{item.Coupon_Title}}</span></div>
    	            <div class="t_left_c">{{item.Coupon_Description}}</div>
    	            <div class="t_left_b">有效期{{item.Coupon_StartTime}}-{{item.Coupon_EndTime}}</div>
    	        </div>
    	        <div class="t_right" @click="getMyCoupon(item.Coupon_ID,i)">立即领取</div>
    	    </div>
    	</scroll-view>
    </popupLayer>
	<popupLayer ref="cartPopu" :direction="'top'">
		<div class="cartSku">
			<div class="cartTop">
				<image :src="product.Products_JSON.ImgPath[0]" mode=""></image>
				<div class="cartTitle">
					<div class="cartTitles">{{product.Products_Name}}</div>
					<div class="addInfo">
						<div class="addPrice">{{product.Products_PriceX}}元</div>
						<div class="proSale">库存{{postData.count}}</div>
					</div>
				</div>
			</div>
			<div class="cartCenter">
				<div class="cartAttr" v-for="(item,i) of product.skujosn" :key="i">
					<div class="sku">
						{{i}}
					</div>
					<div class="skuValue">
						<div :class="check_attr[i]==index?'skuCheck':''" @click="selectAttr(index,i)"  v-for="(mbx,index) of item" :key="index">{{mbx}}</div>
					</div>
				</div>
			</div>
			<div class="numBer">
				<div class="numBers">
					数量
				</div>
				<div class="inputNumber">
						<div class="clicks" @click="delNum">-</div>
<!--					v-enter-number-->
						<input  type="number" v-model="postData.qty"  disabled>
						<div class="clicks" @click="addNum">+</div>
				</div>
			</div>
		</div>
		<div class="cartSub" @click="skuSub" :class="submit_flag?'':'disabled'">
			确定
		</div>
	</popupLayer>
	<div class="fixed">
		<div class="leftss">
			<div class="first" @click="goHome">
				<div><image class="img" src="/static/detail/home.png" ></image></div>
				<div class="txt">首页</div>
			</div>
			<div class="first" @click="collect">
				<div>
					<image class="img" v-if="isCollected"  src="/static/tuan/xx.png" ></image>
					<image class="img" v-else src="/static/sc.png" ></image>
				</div>
				<div class="txt">收藏</div>
			</div>
			<div class="first">
				<div><image class="img" src="/static/kf.png" ></image></div>
				<div class="txt">客服</div>
			</div>
		</div>
		<div class="rightss">
			<div class="dan bTitle" @click="myPay">
				<div class="danLeft">
					<span class="bF">¥</span><span class="bS">{{product.Products_PriceX}}</span>
				</div>
				<div class="danRight">
					单独购买
				</div>
			</div>
			<div class="tuan bTitle" @click="myPin">
				<div>
					<span class="bF">¥</span><span class="bS">{{product.pintuan_pricex}}</span>
				</div>
				<div class="danRight">
					一键开团
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {getProductDetail,getCommit,updateCart,addCollection,getCoupon,getUserCoupon,cancelCollection,checkProdCollected,getPintuanTeam,addProductViews,getProductSharePic} from '../../common/fetch.js'
import {goBack,numberSort,getGroupCountdown,buildSharePath,getProductThumb,ls}  from '../../common/tool.js'
import {pageMixin} from "../../common/mixin";
import {error} from "../../common";
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
	mixins:[pageMixin],
    data(){
        return {
			// #ifdef APP-PLUS
			wxMiniOriginId:'',
			// #endif

			JSSDK_INIT:false,//自己有分享的业务
			type: '', // 优惠券内容， 分享内容
            shareShow: false,
			teamList:[],//正在开团的列表
            ticksShow: false,
			product:'',//商品结果
			commit:[],//获取评论
			Products_ID: 0 ,
			count:1,//商品数量
			skuF:1,//规格详情
			checkAttr: {} , // 选择的属性
			check_attrid_arr: [],
			check_attr: {},
			couponList:[],//优惠券列表
			submit_flag: true, //提交按钮
			page:1,//优惠券页
			pageSize:10,//优惠券页
			totalCount:0,//优惠券个数
			countdown:{d:0,h:0,m:0,s:0},
			postData: {
			    prod_id: 0,    //产品ID  在 onLoad中赋值
			    atrid_str: '',    //选择属性  1；2   数字从小到大
			    atr_str: '',      //选择属性名称
			    count: 0,         //选择属性的库存
			    showimg: '',      //选择属性的图片(用产品图片代替)
			    qty: 1,           //购买数量
			    cart_key: 'DirectBuy',     //购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
					active: 'pintuan',   //拼团时候选，不是拼团不选
			},
			isCollected: false, // 该产品是否已收藏
        }
    },
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	//自定义小程序分享
	onShareAppMessage(){

		let path = '/pages/groupDetail/groupDetail?Products_ID='+this.Products_ID;

		let shareObj = {
			title: this.product.Products_Name,
			desc:this.product.Products_BriefDescription,
			imageUrl:this.product.ImgPath,
			path: buildSharePath(path)
		};
		console.log(shareObj)
		return shareObj

	},
	// #endif
    components: {
        popupLayer
    },
	computed:{
		...mapGetters(['userInfo']),
		...mapState(['initData'])
		// countdown(){
		// 	if(this.product || !this.product.pintuan_end_time)return {};
		//
		// 	let computedStamp = getGroupCountdown({start_timeStamp:this.product.pintuan_end_time})
		// 	if(computedStamp){
		// 		return computedStamp
		// 	}
		//
		// 	return {}
		//
		// }
	},
	onLoad: function (option) {
		  this.Products_ID = option.Products_ID;
		  this.checkProdCollected();
	},
	onShow() {
		this.getDetail(this.Products_ID);
		this.getCommit(this.Products_ID);

		addProductViews({prod_id:this.Products_ID}).then().catch()

		//获取正在拼团的团队
		this.getPintuanTeamList(this.Products_ID)


	},
	filters: {
		endtime(timeStamp){

			//一天过期
			let end_timeStamp = timeStamp+60*60*24
			let current = (new Date()).getTime()

			let {d=0,h=0,m=0,s=0} = {};
			//时间戳格式转换
			current = parseInt(current/1000)

			// console.log(end_timeStamp,current)
			let countTime = end_timeStamp - current
			if(countTime<0){
				console.log('已经结束')
				return false
			};

			h = parseInt(countTime/(60*60))
			m = parseInt((countTime-h*60*60)/60)
			s = countTime-h*60*60-m*60

			if(h<10)h='0'+h;
			if(m<10)m='0'+m;
			if(s<10)s='0'+s;

			return `${h}:${m}:${s}`
		},
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */
		formatRichText (html) { //控制小程序中图片大小
			if(!html) return;
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent= newContent.replace(/<div[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent= newContent.replace(/<p[^>]*>/gi,'');
			newContent= newContent.replace(/<[/]p[^>]*>/gi,'');
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
				return match;
			});

			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi, '<img style="width:100%;float:left;"');
			//newContent = newContent.replace(/>[\s]*</gi, "><");
			return newContent;
		}
	},
    methods: {
		...mapActions(['getUserInfo']),
		toJoinGroup(tid,team){
			console.log(team)
			if(!this.$fun.checkIsLogin())return;

			for(var usr of team.join_user){
				console.log(usr)
				if(this.userInfo.User_ID == usr){

					this.$fun.confirm({title:'操作提示',content:'您已经参加该团,是否继续查看?'}).then(res=>{
						uni.navigateTo({
							url:"/pages/groupJoin/groupJoin?Team_ID="+tid+"&Products_ID="+this.Products_ID
						})
					},err=>{

					})
					return;
				}
			}


			uni.navigateTo({
				url:"/pages/groupJoin/groupJoin?Team_ID="+tid+"&Products_ID="+this.Products_ID
			})
		},
		async shareFunc(channel) {

			let _self = this
			let path = 'pages/groupDetail/groupDetail?Products_ID=' + this.Products_ID;
			let front_url = this.initData.front_url;
			console.log('front_url is '+front_url)

			let shareObj = {
				title: this.product.Products_Name,
				desc: this.product.Products_BriefDescription,
				imageUrl: getProductThumb(this.product.ImgPath),
				path: buildSharePath(path)
			};

			console.log(shareObj)

			switch (channel) {
				case 'wx':
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: front_url + shareObj.path,
						title: shareObj.title,
						summary: shareObj.desc,
						imageUrl: shareObj.imageUrl,
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
					break;
				case 'wxtimeline':
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						type: 0,
						href: front_url + shareObj.path,
						title: shareObj.title,
						summary: shareObj.desc,
						imageUrl: shareObj.imageUrl,
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
					break;
				case 'wxmini':

					uni.share({
						provider: 'weixin',
						scene: "WXSceneSession",
						type: 5,
						imageUrl: shareObj.imageUrl,
						title: shareObj.title,
						miniProgram: {
							id: _self.wxMiniOriginId,
							path: '/' + shareObj.path,
							type: 0,
							webUrl: 'http://uniapp.dcloud.io'
						},
						success: ret => {
							console.log(JSON.stringify(ret));
						}
					});
					break;
				case 'pic':
					//this.$toast('comming soon')

					let sharePic = await getProductSharePic({'product_id': this.Products_ID}).then(res => {
						console.log(res)
						ls.set('temp_sharepic_info', res.data)
						return res.data.img_url
					})

					console.log('海报的地址是' + sharePic)

					if (!sharePic) {
						error('获取分享参数失败');
						return;
					}

					setTimeout(function () {
						uni.navigateTo({
							url: '/pages/detail/sharepic/sharepic'
						})
					}, 200)
					// uni.previewImage({
					// 	urls: [sharePic],
					// 	indicator:'default',
					// 	current:0
					// });
					break;
			}

		},
		getPintuanTeamList(id){
			getPintuanTeam({prod_id:id},{errtip:false}).then(res=>{
				if(res.errorCode === 0){
					this.teamList = res.data.splice(0,3)
				}

			}).catch(e=>{

			})
		},
		formatRichTexts(html){
			if(!html) return;
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');

				//图片app不支持
				// #ifdef APP-PLUS
				match = match.replace(/!*.webp/gi, '')
				// #endif

				return match;
			});
			newContent= newContent.replace(/<div[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent= newContent.replace(/<p[^>]*>/gi,'');
			newContent= newContent.replace(/<[/]p[^>]*>/gi,'');
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
				return match;
			});

			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi, '<img style="width:100%;float:left;"');
			newContent = newContent.replace(/src="\/\//gi, 'src="http://');
			//newContent = newContent.replace(/>[\s]*</gi, "><");
			// console.log(newContent);
			return newContent;
		},
		//评价预览
		yulanImg(i,j){



			let tempArr = this.commit[i].ImgPath.map((img,idx)=>{
				return img.replace(/\/n3\//,'/');
			});
			console.log(tempArr)

			uni.previewImage({
			            urls: tempArr,
						indicator:'number',
						current:j,
			            longPressActions: {
			                success: function(data) {

			                },
			                fail: function(err) {

			                }
			            }
			});
		},
		// 收藏
		collect(){
			// 检查是否已收藏
			if(this.isCollected) {
				cancelCollection({prod_id: this.Products_ID}).then(res=>{
					if(res.errorCode == 0) {
						uni.showToast({
							title: res.msg
						});
						this.isCollected = false;
					}

				})
			}else {
				addCollection({prod_id: this.Products_ID,}).then(res=>{
					if(res.errorCode == 0) {
						uni.showToast({
							title: '收藏成功'
						});
						this.isCollected = true;
					}else {
						uni.showToast({
							title: res.msg,
							icon: 'fail'
						})
					};
				})
			}
		},
		// 检查产品是否已收藏
		checkProdCollected() {
			checkProdCollected({prod_id: this.Products_ID}).then(res => {
				if(res.errorCode == 0) {
					this.isCollected = res.data.is_favourite == 1
				}
			}).catch(e => {

			})
		},
		//拼团
		myPin(){
			if(!this.$fun.checkIsLogin(1))return;
			this.postData.active = 'pintuan';
			this.$refs.cartPopu.show();
		},
		//单独购买
		myPay(){
			if(!this.$fun.checkIsLogin(1))return;
			delete this.postData.active ;
			this.$refs.cartPopu.show();
		},
		//返回首页
		goHome(){
			uni.switchTab({
				url:'../index/index'
			})
		},
        // 选择属性
        selectAttr(index,i){
        	var value_index = index; //选择的属性值索引
        	var attr_index = i;   //选择的属性索引
        	// if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
        	//记录选择的属性
        	var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }); //记录选择的属性  attr_index外的[]必须
        	//属性处理
        	var check_attrid = [];
        	var check_attrname = [];
        	var check_attrnames = [];
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
        	    check_attrnames.push(attr_name + ':' + this.product.skujosn[attr_name][attr_id]);
        	}
        	check_attrid = check_attrid.join(';');
        	var attr_val = this.product.skuvaljosn[check_attrid];   //选择属性对应的属性值
        	//数组转化为字符串
        	check_attrnames = check_attrnames.join(';');
        	this.postData.atr_str = check_attrnames;
        	this.postData.atrid_str = check_attrid;
        	//属性判断
        	if (attr_val) {
        		this.postData.count = attr_val.Property_count;   //选择属性的库存
        		this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
        		this.productDetail_price = attr_val.Txt_PriceSon; // 选择属性的价格
        		this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
        	}
        	//判断属性库存
        	if (attr_val && attr_val.Property_count <= 0) {
        	    // wx.showToast({
        	    //     title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
        	    //     icon: 'none'
        	    // })
        		this.submit_flag =  false;
        	    return false;
        	}
        	this.check_attr = check_attr;
        	this.check_attrid_arr = check_attrid_arr;
        	this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
        	//购买数量处理  大于最高时赋值最高值
        	if (this.postData.qty > this.postData.count) {
        		this.postData.qty = this.postData.count;
        	}
        },
        skuSub(){
        	if(!this.submit_flag) {
        		return ;
        	}
        	this.postData.prod_id = this.Products_ID;
        	if(this.postData.atr_str==''||this.postData.atrid_str==''){
        		if(this.product.skujosn){
        			wx.showToast({
        			    title: '您还没有选择规格',
        			    icon: 'none'
        			})
        			return;
        		}
        	}
        	console.log(this.postData)
        	updateCart(this.postData).then(res=>{
        		console.log(res)
        		if(res.errorCode == 0) {
        				uni.navigateTo({
        					url: '../check/check?cart_key=DirectBuy'
        				})
        		}else {

        		}

        	}).catch(e=>{
				console.log(e)
				uni.showToast({
					title: e.msg
				})
			})
        	//确定加入购物车
        	this.$refs.cartPopu.close();
        },
        addNum(){
        	if (this.postData.qty < this.postData.count) {
				this.postData.qty = parseInt(this.postData.qty) + 1;
        	}else {
        	    uni.showToast({
        			title: '购买数量不能大于库存量',
        	        icon: 'none',
        	    });
        		this.postData.qty = this.postData.count;
        	}
        },
        delNum(){
        	if (this.postData.qty > 1) {
				this.postData.qty = parseInt(this.postData.qty) - 1;
        	} else {
        		uni.showToast({
        	        title: '购买数量不能小于1',
        	        icon: 'none',
        	    });
        		this.postData.qty = 1;
        	}
        },
        goCart(){
        	uni.switchTab({
        		url: '../cart/cart'
        	})
        },
        goBack(){
        	goBack();
        },
        getCommit(item){
        	let data={
        		Products_ID:item,
        		page:1,
        		pageSize:2
        	}

        	getCommit(data,{errtip:false}).then(res=>{
				this.commit=res.data;
        	},err=>{
        		console.log('获取评论失败',err)
			}).catch(e=>{

			})
        },
		stampCount(){

			let rt  = {};
			if(this.product && this.product.pintuan_end_time){
				let computedStamp = getGroupCountdown({end_timeStamp:this.product.pintuan_end_time})
				if(computedStamp){
					rt = computedStamp
				}else{
					//如果不对，就清空
					window.clearInterval(window.groupStam)
				}
			}

			//console.log(rt)

			this.countdown = rt
		},
		getDetail(item){
        	let data={
        		prod_id:item,
        		Users_ID:'wkbq6nc2kc'
        	}
        	let _self = this;
			let product = null;

			getProductDetail(data).then(res=>{

        		console.log(res)
				if(res.errorCode != 0){
					return;
				}

				if(!res.data.is_pintuan){
					error('不是拼团产品');
					let linkObj = {link:'/pages/index/index',linkType:'default'};
					setTimeout(function(){
						_self.$fun.linkTo(linkObj)
					},100)
					return;
				}



				this.product = res.data;

				this.postData.count = res.data.Products_Count;
				if(res.data.skujosn) {
					this.product.skujosn = typeof res.data.skujosn ==='string' ?JSON.parse(res.data.skujosn):res.data.skujosn;
					this.product.skuvaljosn = typeof res.data.skuvaljosn === 'string' ?JSON.parse(res.data.skuvaljosn):res.data.skuvaljosn;
				}


				//this.stampCount()
				//开发时候一直倒计时太乱了
				window.groupStam = setInterval(this.stampCount,1000)

				product = res.data

				// #ifdef H5

				let path = 'pages/groupDetail/groupDetail?Products_ID='+this.Products_ID;
				let front_url = this.initData.front_url;


				this.WX_JSSDK_INIT(this).then((wxEnv)=>{

					this.$wx.onMenuShareTimeline({
						title: '#网中网#'+product.Products_Name, // 分享标题
						link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: product.ImgPath, // 分享图标
						success: function() {
							// 用户点击了分享后执行的回调函数
						}
					});

					//两种方式都可以
					wxEnv.onMenuShareAppMessage({
						title: '#网中网#'+product.Products_Name, // 分享标题
						link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: product.ImgPath, // 分享图标
						desc: product.Products_BriefDescription||'好物推荐',
						type: 'link', // 分享类型,music、video或link，不填默认为link
						// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户点击了分享后执行的回调函数
						}
					});

				}).catch(()=>{
					console.log('不是微信环境')
				})

				// #endif



        	}).catch(e=>{
        		console.log(e)
        	})
        },
        addCart(){
        	this.$refs.cartPopu.show();
        	console.log('cart')
        	this.postData.cart_key = 'CartList';
        },
        directBuy(){
        	this.$refs.cartPopu.show();
        	this.postData.cart_key = 'DirectBuy'
        	let arg = {
        		Users_ID: 'wkbq6nc2kc',
        		User_ID: 3,
        		cart_key: this.cart_key,
        		prod_id:  this.Products_ID,
        		qty: 1,
        		// atr_str: "颜色:黑色;尺寸:大号;",
        		// atrid_str: "1;3",
        	}
        	updateCart(arg).then(res=>{
        		console.log(res)
        		if(res.errorCode == 0) {
        			uni.navigateTo({
        				url: '../check/check?cart_key=DirectBuy'
        			})
        		}
        	})
        },
        gotoComments(){
            uni.navigateTo({
            	url: '../comments/comments?pro_id='+this.Products_ID
            });
        },
        showTick(e){
        	this.type = e.currentTarget.dataset.type
            this.$refs.popupLayer.show();
        },
        close(){
        	this.$refs.popupLayer.close();
        },
        cancel(){
            this.$refs.popupLayer.close();
        }

    },
	async created(){

		let initData = await this.getInitData();

		console.log('初始化信息',initData)
		let WX_MINI_ORIGIN_ID = ls.get('WX_MINI_ORIGIN_ID');
		if(!WX_MINI_ORIGIN_ID){

			let login_methods = initData.login_methods
			for(var i in login_methods){
				if(i!='component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name){
					WX_MINI_ORIGIN_ID = login_methods[i].authorizer_user_name
					break;
				}
			}

		}

		this.wxMiniOriginId = WX_MINI_ORIGIN_ID;
		console.log('wxMiniOriginId is '+this.wxMiniOriginId)

	}
}
</script>

<style scoped lang="scss">
// 轮播样式
.uni-padding-wrap{
	width: 750rpx;
	height: 750rpx;
	.page-section,.page-section-spacing,.swiper,.uni-swiper-wrapper,.uni-swiper-slides{
			width: 750rpx;
			height: 750rpx;
			img{
				width: 100%;
				height: 100%;
			}
	}
}


    /* 返回按钮和购物车按钮 */
    .top {
        position: absolute;
        top: 10px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        z-index: 10;
        width: 95%;
    }
    .top img{
        width: 30px;
        height: 30px;
    }
    .ticks,.shareinfo {
		background: #fff;
		width: 100%;
		padding: 30rpx 0 60rpx;
		color: #333;
		z-index: 100;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
    }
    .t_title {
        text-align:center;
        margin-bottom: 20px;
    }
    .t_title img {
        float: right;
        margin-right: 10px;
    }
    .t_content {
        position: relative;
        width: 355px;
        height: 80px;
        background: url('/static/detail/yhq.png') no-repeat ;
        background-size: cover;
        margin: 0 auto 15px;
        padding: 10px 0 14px 20px;
        box-sizing: border-box;
        font-size: 11px;
        color:  #F43131 ;
    }
    .t_left {
        float: left;
    }
    .t_left .t_left_t .money {
        font-size: 18px;
        margin-right: 5px;
    }
    .t_left .t_left_t {
        font-size: 13px;
        margin-bottom: 5px;
    }
    .t_left .t_left_t i {
        font-size: 11px;
        font-style: normal;
    }
    .t_right {
        float: right;
        height: 58px;
        line-height: 58px;
        padding: 0 18px;
        font-size: 15px;
        border-left: 1px dotted #999;
        width: 62px;
        text-align: center;
    }
    .aleady {
        color: #999;
    }
    .shareinfo{
        padding-bottom: 0;
        color: #333;
        font-size: 12px;
    }
    .shareinfo>div {
        text-align: center;
    }
    .s_top {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .s_top .img {
        width: 38px;
        height: 38px;
        display: block;
        margin: 0 auto 5px;
    }
    .s_top>div:nth-child(1) {
        /*margin-right: 60px;*/
    }
    .s_bottom {
        position: relative;
        bottom: 0;
        width: 100%;
        background: #e8e8e8;
        color: #666;
        font-size: 13px;
        text-align: center;
        line-height: 30px;
        margin-top: 25px;
    }
    /* 轮播图 */
    .van-swipe-item img {
        width: 100%;
        height: 100%;
    }
    /* 产品描述部分 start */
    .section1 {
       height: 100rpx;
       background-color: #fff;
    }
    .price {
        margin-top: 22px;
    }
    .price i {
        font-size: 10px;
        font-style: normal;
    }
    .price
    .n_price {
        color: #ff0000;
        font-size: 18px;
    }
    .o_price {
        color: #afafaf;
        font-size: 14px;
        text-decoration: line-through;
    }
    .name {
        color: #333;
        font-size: 14px;
        font-weight: 700;
        margin: 5px 0;
    }
    .sold span {
        color: #999;
        font-size: 13px;
    }
    .sold span:nth-child(2) {
        float: right;
    }
    /* 产品描述部分 end */
    /* 领券start */
    .section2 {
		position: relative;
        padding-left: 26rpx;
		padding-top: 20rpx;
		padding-right: 0rpx;
		padding-bottom: 20rpx;
        font-size: 22rpx;
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        border-bottom: 1px solid #ece8e8;
        background-color: #fff;
    }
    .section2 .btn {
        padding: 0 5px;
        color: #f43131;
        border: 1px solid #f43131;
    }
    .right {
        display: flex;
        align-items: center;
        font-size: 24rpx;
		color: #666666;
    }
    .right .img{
        width: 19rpx;
        height: 30rpx;
        margin-left: 20rpx;
    }
    /* 领券 end */
    /* 包邮信息等 start */
    .section3 {
        display: flex;
        flex-wrap: wrap;
        font-size: 22rpx;
        padding: 15px 10px;
        border-bottom: 17px solid #f8f8f8;
        justify-content: space-around;
        background-color: #fff;
    }
    .section3>span {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    .section3 img {
        width: 30rpx;
		height: 30rpx;
        margin-right: 5px;
    }
    /* 包邮信息等 end */
    /* 评价 start */
    .comment {
        padding: 30rpx 26rpx;
        border-bottom: 10px solid #f8f8f8;
        background-color: #fff;
    }
    .c_title {
        display: flex;
        justify-content: space-between;
    }
    .c_title>span {
        font-size: 30rpx;
        color: #333;
    }
    .c_content {
        margin-top: 15px;
    }
    .c_content_title {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #333;
    }
    .c_content_title>img {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
    }
    .user_name {
        flex: 1;
		font-size: 30rpx;
    }
    .c_time {
        font-size: 26rpx;
        color: #777;
    }
    .c_content_msg {
        font-size: 24rpx;
        color: #333;
        line-height: 18px;
        padding: 9px 0;
        border-bottom: 1px solid #f8f8f8;
    }
    .c_content_img img {
        width: 142rpx;
        height: 142rpx;
        margin-right: 20rpx;
    }
    /* 评价 end */
    /* 商品详情 start */
    // .pro_detail {
    //     padding: 26rpx 26rpx;
    //     background-color: #fff;
    // }
    // .p_detail_title {
    //     color: #333;
    //     font-size: 30rpx;
    // }

	.pro_detail {
		background: white;
		.p_detail_des {
			width:100%;
			img {
				width:100% !important;
			}
		}
	}
	.p_detail_title {
		padding: 30rpx 20rpx;
	    color: #333;
	    font-size: 30rpx;

	}
    /* 商品详情 end */
    /* 遮罩层 */
    .modal {
        position: fixed;
        width:100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 1000;
    }
    .section1{
        display: flex;
        padding-left: 15rpx;
		padding-right: 15rpx;
        align-items: center;
        justify-content: space-between;
        background-color: #F43131;
        color: #fff;
        .leftss{
            font-size: 0;
            span.pricef{
                font-size: 36rpx;
            }
            span.prices{
                font-size: 50rpx;
                margin-left: 4px;
                font-weight: 500;
            }
            span.pricet{
                font-size: 28rpx;
                margin-left: 6px;
                color: #ddd;
                text-decoration:line-through;
            }
        }
        .rightss{
			.countdown{
				color:#ddd;
				font-size: 24rpx;
				line-height: 32rpx;
				overflow: hidden;
				margin-bottom: 4px;

				span{
					margin: 0 2px;
					padding: 0 2px;
					//width:23px;
					height:32rpx;
					line-height: 32rpx;
					text-align: center;
					background:linear-gradient(0deg,rgba(12,12,12,1) 0%,rgba(197,195,195,1) 100%);
					box-shadow:0px 1px 1px 0px rgba(4,0,0,0.5), 0px 1px 1px 0px rgba(255,255,255,0.65);
					display: inline-block;

				}
            }
			.haha{
				font-size: 24rpx;
				line-height: 32rpx;
			}
        }
    }
    .titles{
		position: relative;
		padding-right: 150rpx;
        .title{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:22px;
		}

		.share {
			position: absolute;
			right: 0;
			z-index: 999;
			top: 50%;
			background: red;
			color: #fff;
			text-align: center;
			margin-top: -10px;
			font-size: 13px;
			padding: 5px;
			border-top-left-radius: 20px;
			border-bottom-left-radius: 20px;
		}
    }
    .titlet{
        margin-top: 12px;
		padding-right: 36rpx;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(110,110,110,1);
        line-height:20px;
    }
    .pintuan{
        margin-bottom: 17px;
        background-color: #fff;
        .pinTitle{
            font-size:30rpx;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:20px;
            padding:26rpx;
        }
        .pinCenter{
                padding: 15rpx 25rpx;
                display: flex;
                align-items: center;
                .image{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                    overflow: hidden;
                    .img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .info{
					margin-left: 21rpx;
                    .nick{
                        font-size:26rpx;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:20px;
                    }
                    .message{
                        font-size:24rpx;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(110,110,110,1);
                        line-height:20px;
                    }
                }
                .cantuan{
                    width:119rpx;
                    height:48rpx;
                    border:1px solid rgba(244,49,49,1);
                    border-radius:3px;
                    color:  rgba(244,49,49,1);
                    text-align: center;
                    line-height: 48rpx;
                    font-size: 26rpx;
                    margin-left: auto;
                }
        }
    }
	.fixed{
		height: 98rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #F8F8F8;
		z-index: 9999;
		.leftss,.rightss{
			width: 50%;
			height: 98rpx;
			display: flex;
		}
		.leftss{
			.first{
				width: 33.3%;
				height: 98rpx;
				text-align: center;
				padding-top: 15rpx;
				.img{
					width: 38rpx;
					height: 38rpx;
					display: block;
					margin: 0 auto;
				}
				.txt{
					font-size: 22rpx;
					margin-top: 10rpx;
				}
			}
		}
		.rightss{
			.dan{
				width: 50%;
				background-color: #FA6B27;
			}
			.tuan{
				width: 50%;
				background-color: #F43131;
			}
			.bTitle{
				color: #fff;
				text-align: center;
				.bF{
					font-size: 24rpx;
				}
				.bS{
					font-size: 32rpx;
				}
				.danRight{
					font-size: 26rpx;
				}
			}
		}
	}
	//规格
	.cartSku{
		padding: 0rpx 10rpx;
		.cartTop{
			position: relative;
			display: flex;
			padding-top: 20rpx;
			image{
				width: 220rpx;
				height: 220rpx;
			}
			.cartTitle{
				margin-left: 20rpx;
				font-size: 32rpx;
				width: 420rpx;
				.cartTitles{
					height: 80rpx;
					overflow: hidden;
					margin-top: 20rpx;
				}
				.addInfo{
					width: 450rpx;
					margin-top: 70rpx;
					display: flex;
					flex-flow: row;
					justify-content: space-between;
					align-items: flex-end;
					.addPrice{
						font-size: 42rpx;
						color: #ff4200;
					}
					.proSale{
						font-size: 24rpx;
						color: #999;
						justify-content: flex-end;
					}
				}
			}
		}
		.cartCenter{
			margin-top: 20rpx;
			.cartAttr{
				display: flex;
				padding: 15rpx 0rpx;
				.sku{
					font-size: 28rpx;
					height: 70rpx;
					line-height: 70rpx;
					width: 140rpx;
				}
				.skuValue{
					display: flex;
					div{
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
						border-radius: 10rpx;
						color: #000;
						background-color: #fff;
						padding-left: 20rpx;
						padding-right: 20rpx;
						margin-right: 20rpx;
						border: 1px solid #ccc;
					}
				}
			}
		}
		.numBer{
			margin-top: 20rpx;
			display: flex;
			padding: 15rpx 0rpx;
			justify-content: space-between;
			.numBers{
				font-size: 28rpx;
				height: 70rpx;
				line-height: 70rpx;
				width: 140rpx;
			}
			.inputNumber{
				border: 1px solid #ccc;
				border-radius: 6rpx;
				height: 50rpx;
				margin-right: 50rpx;
				display: flex;
				input{
					color: black;
					margin: 0 auto;
					width: 80rpx;
					height: 50rpx;
					text-align: center;
					font-size: 24rpx;
					border-left: 2rpx solid #ccc;
					border-right: 2rpx solid #ccc;
				}
				.clicks{
					height: 50rpx;
					line-height: 50rpx;
					width: 60rpx;
					text-align: center;
				}
			}
		}
	}
	.cartSub{
		width: 100%;
		height: 90rpx;
		background-color: #F43131;
		font-size:20px;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		margin-top: 30rpx;
		&.disabled {
			background: #999;
		}
	}
	.skuCheck{
		color: #fff !important;
		background-color: #ff4200 !important;
	}
</style>
