// 注册全局组件
Vue.component('appNav', {
	// 组件模板
	template: "<header class='mui-bar app-bar'><div class='app-bar-left' ><slot name='left'></slot></div><div class='app-bar-right'><slot name='right'></slot></div></header>"
})
Vue.component('appBanner', {
	template: "<div class='app-banner'><slot></slot></div>"
})

Vue.component('appList', {
	// 声明 props
	props: ['message'],
	template: "<div class='row'><p class='title'>{{message.title}}</p><img :src='message.images' class='img'></div>"
})