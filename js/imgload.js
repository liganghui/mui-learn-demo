//设置背景图时,去掉图片灰色边框,第一次使用请检查路径是否正确!!
var img_translate="images/translate.png";

var taskArr = new Array(); //图片下载任务集合
var isStartTask = false; //是否开启下载任务

/**
 * 通过设置src默认图,来触发onload的方法
 * 如果本地不存在,则联网下载,保存至本地
 * 如果本地存在,则直接显示
 * 
 * 所以src默认图,必须设置,否则无法触发onload;
 * 格式如下:
 * <img src='默认图片' data-src='网络地址' onload='load(this)'/>
 */
function load(obj) {
	if (obj.getAttribute('data-loaded')) return;
	var image_url = obj.getAttribute('data-src');
	if (!image_url) return;
	//本地缓存路径
	var hb_path = '_downloads/image/' + md5(image_url) + '.jpg'; //HBuilder平台路径
	var sd_path = plus.io.convertLocalFileSystemURL(hb_path); //SD卡绝对路径
	
	//temp用于判断图片文件是否存在
	var temp = new Image();
	temp.src = sd_path;
	temp.onload = function() {
		// 1存在, 则直接显示
//		console.log('已存在,直接显示==' + hb_path);
		setLoaded(obj,sd_path);
	};
	temp.onerror = function() {
		// 2不存在, 则下载图片
//		console.log('不存在==' + hb_path);
		//为避免下载出错或下载超时过长,先用src加载图显示
		var temp = new Image();
		temp.onload = function() {
			setLoaded(obj, image_url); //设置图片
		};
		temp.src = image_url;
		//添加图片下载任务
		//(本来打算先检查图片是否已在任务队列中,如果存在则不加入;但是可能图刚加入时就被取出,导致后面相同的图又重复加入,出现本地图存在,下载无回调的问题)
		obj.setAttribute('hb_path', hb_path);
		obj.setAttribute('sd_path', sd_path);
		taskArr.push(obj);
		//启动下载
		if (!isStartTask) {
			isStartTask = true;
			startTask();
		}
	};
}

/**
 * 图片任务下载 
 * 递归调用方式保持只有一个downloader在下载,避免批量创建downloader手机发烫
 */
function startTask() {
	if (taskArr.length == 0) {
		isStartTask = false;
		return;
	}
	//从任务集合中取一个任务
	var obj = taskArr.shift();
	var image_url = obj.getAttribute('data-src');
	var hb_path = obj.getAttribute('hb_path');
	var sd_path=obj.getAttribute('sd_path');
//	console.log("从任务集合中取一个任务==" + hb_path);
	//检查是否已经下载过,避免downloader文件存在时无回调,手机发烫;
	//(本来打算先检查图片是否已在任务队列中,如果存在则不加入;但是可能图刚加入时就被取出,导致后面相同的图又重复加入,出现本地图存在,下载无回调的问题)
	var temp = new Image();
	temp.src = sd_path;
	temp.onload = function() {
		//已下载则跳过
//		console.log("已下载则跳过==" + hb_path);
		startTask();
	};
	temp.onerror = function() {
		//执行下载
		var task = plus.downloader.createDownload(image_url, {
			"filename": hb_path,
			"timeout": 10,
			"retry": 2
		}, function(download, status) {
//			console.log("下载回调status==" + status+"-->"+hb_path);
			if (status == 200) {
				setLoaded(obj,sd_path);
			}else{
				//下载失败,取消下载任务,需删除本地临时文件,否则下次进来时会检查到图片已存在
				//download.abort();取消任务,但有时会删除文件失败,固使用delFile(hb_path)先进行删除
				delFile(hb_path);
				download.abort();
			}
			//继续下载
			startTask();
		});
		task.start();
	};
}

/*给<img>设置背景,标志加载成功*/
function setLoaded(obj,bg_url) {
	if (obj.getAttribute("data-loaded")) return;
	obj.classList.add("anim_opacity"); //渐变动画
	obj.setAttribute("data-loaded", true);//标记成功
//	obj.setAttribute("src",img_translate); //去掉灰色边,只有背景图才可居中铺满图片
	obj.style.backgroundImage = "url(" + bg_url + ")"; //背景
}

/*删除指定文件*/
function delFile(hb_path) {
	if (hb_path) {
		plus.io.resolveLocalFileSystemURL(hb_path, function(entry) {
			entry.remove(function(entry) {
				console.log("文件删除成功==" + hb_path);
			}, function(e) {
				console.log("文件删除失败=" + hb_path);
			});
		});
	}
}