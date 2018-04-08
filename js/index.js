var news = new Vue({
	el: '#app',
	data: {
		dateParam: '', //最新的日报日期
		tapTitle: '首页', //标题栏标题，
		swiperInitSwitch: false, //swiper初始化开关
		moreSwitch: false, //控制更多菜单的显示
		top_items: [], //轮播图数据
		list_items: [], //图文列表数据
		list_height: [], // 记录列表高度 
		maskSwitch: false //遮罩层开关
	},
	methods: {

		/* 
		 *   @description  用于格式化时间字符串 
		 *   @example  
		 * 	 	
		 * 	 实例：formatDate(1479706360)  return "今日热闻"||"xx月xx日"
		 * 
		 * 	 @param {Nmuber}  val  时间字符串（毫秒单位）
		 *   @return {String}  时间字符串
		 * 
		 */
		formatDate: function(val) {
			if(val.length !== 8 || !val) {
				return '日期异常'
			}
			var dateStr = val.substring(0, 4) + '/' + val.substring(4, 6) + '/' + val.substring(6, 8);
			var dailyDate = new Date(dateStr);
			var presentDate = new Date();
			if(presentDate.toDateString() === dailyDate.toDateString()) {
				return '今日热闻'
			} else {
				var day = dailyDate.getDay();
				var weekAry = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
				var result = val.substring(4, 6) + '月' + val.substring(6, 8) + '日 ' + weekAry[day];
				return result;
			}

		},
		/*
		 *  @description 消息按钮点击事件		 * 
		 * 
		 */
		message: function() {
			//弹窗提醒
			mui.toast('功能暂不可用，请等待后续版本');
		},
		/*
		 *  @description 更多按钮点击事件
		 */
		showMore: function() {
			this.maskSwitch = true;
			this.moreSwitch = true;
		},
		/*
		 *  @description 遮罩层点击事件
		 * 
		 */
		maskClick: function() {
			this.moreSwitch = false;
			this.maskSwitch = false;
		},
		/*  @description 初始化swiper
		 * 
		 */
		initSwiper: function() {
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: { //开启自动切换
					delay: 5000, //自动切换的时间间隔，单位ms
					disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
				},
				speed: 250, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
				direction: 'horizontal', //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
				loop: true, //是否开启loop模式 
				//分页器
				pagination: {
					el: '.swiper-pagination', //分页器容器
					bulletClass: 'app-swiper-bullet' //设定分页指示器（小点）的HTML标签。
				}
			})
			/*   @description  监听轮播图移动事件，如果触发slider向后或向前切换则执行。
			 * 	 
			 *   切换时同时调整分页指示器的位置，使分页指示器跟随切换位置。
			 * 
			 */
			mySwiper.on('slideNextTransitionStart', function() {
				var el = document.querySelector('.app-slider-transition-action');
				var index = mySwiper.realIndex;
				//判断是否为最后一个
				if(index === 0) {
					var offset = -40;
					var start = 40;
					var id = setInterval(function() {
						start -= 4;
						el.style.left = start + 'px';
						if(start <= offset) {
							clearInterval(id);
						}
					}, 10);
				} else {
					//因index 从0开始，所以需再加1
					var start = -60 + 20 * index;
					var offset = -60 + 20 * (index + 1);
					var id = setInterval(function() {
						start += 2;
						el.style.left = start + 'px';
						if(start >= offset) {
							clearInterval(id);
						}
					}, 20);
				}
			});
			mySwiper.on('slidePrevTransitionStart', function() {
				var el = document.querySelector('.app-slider-transition-action');
				var index = mySwiper.realIndex;
				if(index === 4) {
					var offset = 40;
					var start = -40;
					var id = setInterval(function() {
						start += 4;
						el.style.left = start + 'px';
						if(start >= offset) {
							clearInterval(id);
						}
					}, 10);
				} else {
					var start = -40 + 20 * (index + 1);
					var offset = -40 + 20 * index;
					var id = setInterval(function() {
						start -= 2;
						el.style.left = start + 'px';
						if(start <= offset) {
							clearInterval(id);
						}
					}, 20);
				}
			});
		},
		/*
		 * @description  用户点击列表打开日报详情
		 * 
		 * @param {Obj}  Event  事件对象
		 * @param {Number} id  文章ID
		 * @param {Number} Index 索引 
		 */
		openDetails: function(event, id, index) {
			//日报标题
			var title = event.target.innerText;
			//获得详情页面
			var detailPage = plus.webview.getWebviewById('detail');
			//打开详情页面          
			mui.openWindow({
				id: 'detail',
				show: {
					aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
					duration: 280 //页面动画持续时间
				}
			});
			//触发自定义事件，传递参数
			mui.fire(detailPage, 'open_detail', {
				id: id,
				title: title
			});
		},
		/*
		 * @description  打开侧边栏菜单
		 * 
		 */
		openMenu: function() {
			mui.openWindow({
				id: 'menu',
				extras: {},
				show: {
					aniShow: 'slide-in-left', //页面显示动画，默认为”slide-in-right“；
					duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				}
			})
			//更多菜单关闭
			this.moreSwitch = false;
			//遮罩层显示
			mask.show();
		},
		/*
		 *  @description  接受JSON数据对象，展现到页面
		 *  @param {Obj} json 需要展现的JSON对象
		 */
		showData: function(obj) {
			//将列表数据格式成：日期+列表数据的形式，方便数据展现
			var list ={};
			//列表数据 
			list.stories = obj.stories;
			list.date=obj.date; 
			//添加到数组中
			news.list_items.push(list);
			//记录当前数据的日期
			news.dateParam = obj.date;
			//轮播图数据
			news.top_items = obj.top_stories;
		}
	},
	watch: {
		/*
		 *  @description 列表数据更新时，重新计算列表高度
		 * 
		 */
		list_items: function(newList, oldList) {
			//等待dom 绘制
			setTimeout(function() {
				var dailyList = document.querySelectorAll('.messages-wrapper');
				var tmp = [];
				var height = 0;
				tmp.push(height);
				for(var i = 0; i < dailyList.length; i++) {
					var item = dailyList[i];
					height += item.clientHeight;
					tmp.push(height);
				}
				news.list_height = tmp;
			}, 1800)
		}
	},
	updated() {
		//初始化Swiper，只初始化一次，避免多次初始化。
		if(!this.swiperInitSwitch) {
			this.initSwiper();
			this.swiperInitSwitch = true;
		}
	}

});

/*************************** mui初始化  ******************************/
mui.init({
	pullRefresh: {
		container: '#app',
		down: {
			style: 'circle', 
			offset: '55px',
			auto: true,
			callback: pulldownRefresh
		},
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	},
	preloadPages: [{
		"url": 'html/detail.html',
		"id": 'detail',
		"styles": {
			/*  窗口的缓存模式：只要存在缓存（即使过期）数据则使用，否则从网络获取
			 *  详细说明：http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewStyles
			 */
			'cachemode': 'cacheElseNetwork',
			/* 窗口的侧滑返回功能
			 * 详细说明：http://ask.dcloud.net.cn/question/8071
			 * 			http://www.html5plus.org/doc/zh_cn/webview.html
			 */
			"popGesture": "hide",
		}
	}, {
		"url": 'html/menu.html',
		"id": 'menu',
		"styles": {
			'cachemode': 'cacheElseNetwork',
			"width": '80%' //新页面宽度，默认为100%

		}
	}]
});

//下拉刷新
function pulldownRefresh() {
	if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('哦，似乎网络开小差了', {
			verticalAlign: 'bttom'
		});
		mui('#app').pullRefresh().endPulldown();
		return;
	}
	//增加随机数避免缓存
	mui.ajax('https://news-at.zhihu.com/api/4/news/latest', {
		dataType: 'json', //服务器返回json格式数据
		timeout: 4000, //超时时间设置为4秒；
		type: 'get', //HTTP请求类型
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(rsp) {
			//关闭动画
			mui('#app').pullRefresh().endPulldown();
			//记录返回值,确定是否需要整体更新
			var val = monitoringDataUpdate(rsp);
			if(!val) {
				return false;
			}
			//json 对象转为字符串并存储数据
			var st = JSON.stringify(rsp);
			plus.storage.setItem(rsp.date, st);
			//记录最新数据的日期
			plus.storage.setItem("latestData", rsp.date);
			//展现数据
			news.showData(rsp);
		},
		error: function(xhr, type, errorThrown) {
			//关闭动画
			mui('#app').pullRefresh().endPulldown();
			plus.nativeUI.toast('更新超时，请稍后再试吧', {
				verticalAlign: 'bottom'
			});
		}
	});
}
/*
 *  
 *  @description 监测服务端的数据，是否需要“整体”更新页面
 * 
 *  @param  {Object}  obj  ajax响应的json对象 
 *  @return  {true||false}   true=需要更新页面  false=不需要更新
 * 
 */
function monitoringDataUpdate(obj) {
	//判断内容是否已存在
	if(news.list_items.length) {
		//判断今天内容是否已存在
		if(obj.date === news.list_items[0].date) {
			//记录列表第一项的ID
			var firstItemID = news.list_items[0].stories[0].id;
			//判断内容是否有更新
			if(firstItemID === obj.stories[0].id) {
				//console.log("没有更新")
				return false;
			} else {
				//console.log("有更新")
				//遍历数组，追加新数据
				obj.stories.every(function(val, index) {
					//检测当前项是否已存在
					if(val.id !== firstItemID) {
						news.list_items[0].stories.unshift(val);
					} 
				})
				//更新本地数据
				var st = JSON.stringify(obj);
				plus.storage.setItem(obj.date, st);
				return false;
			}
		}
	}
	return true;
}

//上拉刷新 
function pullupfresh() {
	mui.getJSON("https://news-at.zhihu.com/api/4/news/before/" + news.dateParam, {}, function(rsp) {
		var data = {}; //存储临时数据
		data.stories = rsp.stories;
		data.date = rsp.date;
		news.dateParam = rsp.date;
		news.list_items.push(data);
		mui('#app').pullRefresh().endPullupToRefresh(false);
	});
}

/*******************	事件监听    *************************/

/*
 * @description  监听滚动事件，更新标题
 * 
 */
window.onscroll = function() {
	//关闭遮罩
	news.maskClick();
	//减去banner+标题栏的高度
	var top = document.body.scrollTop - 225;
	if(top < 0) {
		news.tapTitle = '首页'
	} else {
		//遍历列表高度数组
		for(var i = 0; i < news.list_height.length; i++) {
			if(top >= news.list_height[i] && top <= news.list_height[i + 1]) {
				//更新时间标题
				var date_list = news.$refs.date;
				news.tapTitle = date_list[i].innerText;
				break;
			}
		}
	}
}

//mui遮罩层点击回调函数
var mask = mui.createMask(function() {
	//点击蒙版事件
	news.moreSwitch = false;
	plus.webview.hide("menu", "slide-out-left", 300);
});
//自定义事件：关闭遮罩层
document.addEventListener('close_mask', function(event) {
	mask.close();
});
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}
// H5 plus事件处理
function plusReady() {
	init();
}

/*
 *  @description  尝试从本地存储中读取离线数据，绘制到页面中。 
 * 
 */

function init() {
	//获取最新数据的日期
	var latestData = plus.storage.getItem("latestData");
	if(latestData) {
		//获取最新的数据并转换为json 对象
		var json_data = JSON.parse(plus.storage.getItem(latestData));
		//展示数据
		news.showData(json_data);
	}

}
//应用从后台切换到前台，触发更新
document.addEventListener("resume", function() {
	mui('#app').pullRefresh().pulldownLoading();
});