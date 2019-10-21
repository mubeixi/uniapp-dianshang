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
            <div>
               还有<span>5</span>天<span>522</span>小时<span>25</span>分5秒结束
            </div>
            <div class="haha">
                已团19833件   2人团
            </div>
        </div>
    </div>
    <!-- 领券 -->
    <div class="section2" >
        <div class="titles">
            {{product.Products_Name}}
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
                <img src="/static/tuan/info.png">
            </div>
            <div class="info">
                <div class="nick">
                    你+我=幸福
                </div>
                <div class="message">
                    还差1人，剩余23 : 32 : 06
                </div>
            </div>
            <div class="cantuan">
                去参团
            </div>
        </div>
    </div>
    <!-- 评价 -->
    <!-- 评价 -->
    <div class="comment">
        <div class="c_title">
            <span>评价</span>
            <div class="right" @click="gotoComments">查看全部 <img src="/static/detail/right.png" alt=""></div>
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
    <div style="height:50px;"></div>
    <popupLayer ref="popupLayer" :direction="'top'" >
    	<div class="shareinfo" v-if="type=='share'">
    		<div class="s_top">
    			<div>
    				<img src="/static/detail/share1.png" alt="">
    				<div>发送好友</div>
    			</div>
    			<div>
    				<img src="/static/detail/share2.png" alt="">
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
				<div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAE7klEQVRYhbWYXYhVVRTH99Xxo8S+GKx0Ria9zUXPvfuc9f+dW0gStyAqMvADQQUfJLWEJEGKnnqoJOjbXgwCKxAfokAiawzqwSDw48EHIXsQywfxczSR0XSUHmZdOd6Zm5ONCzZczll7rd9ee52197oh3KKY2XRJr5nZj5J2SXrVzKY339dqtVnAZ5L2StpnZnuavyV9D6wul8t33ar/IsR7wHHgCnAZOC7pvSaMmT0OHJZ0rXW4/m+SngkhjL8lCGAm8AlwDhgEjvoY9GefVKvV7iRJHpD0rqTvJf3gUdgp6VfgIjAgaVOlUpn6nyFijA9J+hQ4L+mqpH3Ac8BzHvKrwHlgS5ZlPcDd1Wr1/uLI8/wpBx+Q9HGWZff8F4ZSlmUPA59LuuCr3yPp6Uaj0dFoNDokPQ3sAQYlXZC0FZgdQigVDaVpapKOOMiHwN2jhpA0B9gODLijX9I0faLRaHQ0lRqNRkeapk8AvzjoRWC7pDlFGOBRSX+4rQ9GCzKuVqvVJH0j6RJwRdJPaZrODyMn2fg0TedL+tl1L0n6OsZYDSGMCyEEM5vnW3PRzDaPZmvGeRi/9Sy/LKkPeLQNxHUYX3Wfz/tb0rdZlmVNm8BhYMDM3r9ZRIYZM7MdaZpac2WjWYSZ7QD+bi7CzHKgU9KHkvokLQghdLQzMiy8wFdpmiajhCjCJMBXrduaJMl9Zja9p6dn8ogzPfufLCTcgKRtMcZKaMn+UUopxliRtK2Q6LvzPH+smOg3CDDBzJ4tfoJ5nm+VVL5FiOswkspu6/qn774m3KCZJMlEYKGkA82iJOnTGOND/wPgBhmhGB4AFiZJMjGEEAJwJ7AUOOgQ57yEzxwriKYUjwf3dTDLsqXAncHMXgAOAdeA08BbMcZpYw3RlBjjNElvu69rwKEsy1YHYJdn9AngzRhjpV6vP3A9ZGMongIPxhgrwFvu84qkHwLwCrAD2OjF5kvguzzPHwn/L0lbpZTn+SPATuAL97UR2GFm60OMcUqMcVqlUpkqaYHfK/olrRnLqCRJMlHSGkn97mNBpVKZGmOcFmOcUtQdD6zwvesH1pXL5UljBVIulycB69z2aWBFaHNUdJjZMkkn8zw/I+nFNiClGOOUWq1270jDVzdsS8vl8iRJL7rtk2a2LLQp76MBKaVpOsPMNgJbvC5sKf42s41pms5ohRlTkCRJJprZSuCoH/HDBnDUzFa25teYgnR1dd0haQPwl5fqY8DvPo75s78kbejq6rrjtoKY2XrgLHBG0gYzm2tmcx3wDHDWzNbfVpCenp7JBZDjkp4PQ7lQkvQ8Q+3FWTNb33rE3zYQSSckLQpDd5RxkhZ5pRw7EA/72pFAJL1cAFkchmrBeEmLmyCSXm4DstZt3xRkOXDKlVe1Kvqd5SWg340taYKY2RJfRL/rTGi1L2mV59EpM1veFsSvA6f8KvB6tVrtLjZH9Xq9G3jDv5qTrVsDnPR3b9Tr9e6W5qobeN1tnwKWtgMJwHzgT/8MD/vJvFPeLgJ93hwNSjpiZvOac81sXvEd0Ncyd5fbHHQf80eEcJBOYLOHb1AjN9CDwGlJH/X29nY25/b29nZK+sjPkX+be8Z9dLYFCSGUqtXqbOAdSbs11M/uLfylsN+fb6rVarPCjWW8VKvVZkna5Dr7W+buk7QbeKdarQ5rRf8BWCCVbhfAsqMAAAAASUVORK5CYII=" ></div>
				<div class="txt">首页</div>
			</div>
			<div class="first" @click="collect">
				<div>
					<img v-if="isCollected"  src="data:image/png;base64,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" >
					<img v-else src="data:image/png;base64,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" >
				</div>
				<div class="txt">收藏</div>
			</div>
			<div class="first">
				<div><img src="data:image/png;base64,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" ></div>
				<div class="txt">客服</div>
			</div>
		</div>
		<div class="rightss">
			<div class="dan bTitle" @click="myPay">
				<div class="danLeft">
					<span class="bF">¥</span><span class="bS">{{product.flashsale_pricex}}</span>
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
import {getProductDetail,getCommit,updateCart,addCollection,getCoupon,getUserCoupon,cancelCollection,checkProdCollected,getPintuanTeam,addProductViews} from '../../common/fetch.js'
import {goBack,numberSort}  from '../../common/tool.js'
import {pageMixin} from "../../common/mixin";
import {error} from "../../common";

export default {
	mixins:[pageMixin],
    data(){
        return {
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
			postData: {
			    act: 'add_cart',
			    Users_ID: 'wkbq6nc2kc',      //商家ID
			    User_ID: 3,       //会员ID
			    prod_id: 0,    //产品ID  在 onLoad中赋值
			    atrid_str: '',    //选择属性  1；2   数字从小到大
			    atr_str: '',      //选择属性名称
			    count: 0,         //选择属性的库存
			    showimg: '',      //选择属性的图片(用产品图片代替)
			    qty: 1,           //购买数量
			    cart_key: '',     //购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
			},
			isCollected: false, // 该产品是否已收藏
        }
    },
    components: {
        popupLayer
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
		getPintuanTeamList(id){
			getPintuanTeam({prod_id:id}).then(res=>{
				if(res.errorCode === 0){
					this.teamList = res.data
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
			uni.previewImage({
			            urls: this.commit[i].ImgPath,
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
			this.$refs.cartPopu.show();
		},
		//单独购买
		myPay(){
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
        		//console.log(res)
        		if(res.errorCode == 0) {
        			if(this.postData.cart_key == 'CartList') {
        				uni.showLoading({
        					title: '加入购物车成功',
        					icon: 'success'
        				})
        			}else {
        				uni.navigateTo({
        					url: '../check/check?cart_key=DirectBuy'
        				})
        			}
        		}else {
        			uni.showToast({
        				title: res.msg
        			})
        		}
        	})
        	//确定加入购物车
        	this.$refs.cartPopu.close();
        },
        addNum(){
        	if (this.postData.qty < this.postData.count) {
        		this.postData.qty += 1;
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
        		this.postData.qty -= 1;
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
        		Users_ID:'wkbq6nc2kc',
        		Products_ID:item,
        		page:1,
        		pageSize:2
        	}
        	getCommit(data).then(res=>{
        		if(res.errorCode === 0){
					this.commit=res.data;
				}
        	}).catch(e=>{
        		console.log(e)
        	})
        },
		getDetail(item){
        	let data={
        		prod_id:item,
        		Users_ID:'wkbq6nc2kc'
        	}
        	let _self = this;
			getProductDetail(data).then(res=>{
        		console.log(res)
				if(res.errorCode === 0){

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

				}

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
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        width: 100%;
        padding: 15px 0 45px;
        color: #333;
        z-index: 100;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
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
    .s_top img {
        width: 38px;
        height: 38px;
        display: block;
        margin: 0 auto 5px;
    }
    .s_top>div:nth-child(1) {
        margin-right: 60px;
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
    .price .share {
        float: right;
        background: red;
        color: #fff;
        text-align: center;
        margin-right: -10px;
        margin-top: -10px;
        font-size: 13px;
        padding: 5px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
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
        padding-left: 26rpx;
		padding-top: 20rpx;
		padding-right: 37rpx;
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
    .right img{
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
            div{
                    color:#ddd;
                    font-size: 22rpx;
                    .haha{

                    }
                    span{
                        margin: 0 4px;
                        padding: 0 5px;
                        //width:23px;
                        height:37rpx;
                        text-align: center;
                        background:linear-gradient(0deg,rgba(12,12,12,1) 0%,rgba(197,195,195,1) 100%);
                        box-shadow:0px 1px 1px 0px rgba(4,0,0,0.5), 0px 1px 1px 0px rgba(255,255,255,0.65);
                        display: inline-block;

                    }
            }
        }
    }
    .titles{
        font-size:28rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:22px;
    }
    .titlet{
        margin-top: 12px;
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
                    img{
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
			div.first{
				width: 33.3%;
				height: 98rpx;
				text-align: center;
				padding-top: 15rpx;
				img{
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
