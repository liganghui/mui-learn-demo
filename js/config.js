/*
 *  app的配置
 *   
 *  该页面包含：
 * 		1.设置系统状态栏背景色
 * 		2.更新启动图片（暂未启用）
 *      3.首次启动APP时，提示用户注意事项
 *      4.程序后台切换前台时，触发下拉刷新
 * 
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}
// H5 plus事件处理
function plusReady() {
	// 设置系统状态栏背景色
	plus.navigator.setStatusBarBackground('#1976d2');
	plus.navigator.setStatusBarStyle('light');
	//改功能效果不好，暂不启用
	//updateSplashScreen()
	firstNotice();
}

//更新启动图片
function updateSplashScreen() {
	//当前是wifi时
	if(plus.networkinfo.getCurrentType() === 3) {
		//console.log("当前是wifi状态")
		//监测当天是否已下载图片
		var state = plus.storage.getItem(new Date().toLocaleDateString());
		if(state) {
			//console.log("图片已存在")
			return;
		}
		//本地缓存路径
		var hb_path = '_downloads/image/' + md5(new Date().toLocaleDateString()) + '.jpg'; //HBuilder平台路径
		//创建下载任务，更新
		var dtask = plus.downloader.createDownload("https://bing.ioliu.cn/v1?w=720&amp;h=1280", {
			"filename": hb_path,
			"timeout": 10,
			"retry": 2
		}, function(d, status) {
			// 下载完成
			if(status == 200) {
				plus.storage.setItem(new Date().toLocaleDateString(), 'true');
				//更新启动图片
				plus.navigator.updateSplashscreen({
					image: d.filename
				});
				//alert("Download success: " + d.filename);
			} else {
				//alert("Download failed: " + status);
			}
		});
		//开始下载任务
		dtask.start();
	}
}

function firstNotice() {
	var state =plus.storage.getItem('first');
	if(!state) { 
		plus.nativeUI.confirm("请注意：\n本程序为开源应用，仅为学习开发之用。", function(e) {
			if(e.index == 0) {
				plus.storage.setItem('first', 'true');
			} else {
				//退出应用程序（仅安卓支持）
				plus.runtime.quit();
			}
		});
	}
}
