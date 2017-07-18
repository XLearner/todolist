/** 2017.7.17
 *	问题1： 不能够动态的给delete，checkbox绑定事件。
 *		  	-已解决delete的动态绑定(通过绑定在document上实现)，
 *			但checkbox的动态绑定未能完成。
 *			-已解决。
 *	问题2： 将事情加入到localstorage后无法读取。 
 *			-已解决
 *	问题3： 刷新页面时加载localstorage中的数据，并按类型放置。
 *			-经考虑，决定更改数据的存储方式为JSON，设置两个值为-title-done。前者表示内容，后者表示是否完成。
 */
$(document).ready(function(){
	shuru = $("#shuru");
	dolist = $("#doshow");
	donelist = $("#doneshow");
	counter = $("#do-list");
	counter1 = $("#done-list");
	loadstorage();
});

// 为了能够动态的添加事件，需要绑定在document上。
// 删除事件
$(document).on('click', function(){
	var del = $(".delete");
	del.each(function(key, value){
		$(this).on('click', function(){
			
			$(this).parent().remove();
			clearstorage($(this).parent());
			// 判断事情在哪
			if($(this).siblings().is(":checked")){
				counter1.html(donelist.children().length);
			}else {
				counter.html(dolist.children().length);
			}
		});
	});	
});

// 添加事件功能
function add(){
	var value = shuru.val();
	if(!value){
		alert("请输入事件");
		return;
	}
	var todo = {'title':value, 'done': 'false'};
	save(todo);
	loadstorage();
	shuru.val('');
}

// checkbox点击事件 -- 未能成功实现动态绑定 -- 已解决
function updata(e){
	var shf = $(e);
	if(shf.is(':checked')){
		var temp = shf.parent().remove();
		$("#doneshow").append(temp);
		counter.html(dolist.children().length);
		counter1.html(donelist.children().length);
		//改 done
		var data = $(e).parent().text();
		data = data.slice(0, data.length-1);
		for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var zhis = localStorage.getItem(key);
		zhis = JSON.parse(zhis);
		if(zhis.title == data){
			clearstorage($(e).parent());
			var todo = { 'title':zhis.title, 'done':'true'};
			save(todo);
			}
		}
	}
	else if(!shf.is(':checked')){
		var temp = shf.parent().remove();
		$("#doshow").append(temp);
		counter.html(dolist.children().length);
		counter1.html(donelist.children().length);

		var data = $(e).parent().text();
		data = data.slice(0, data.length-1);
		for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var zhis = localStorage.getItem(key);
		zhis = JSON.parse(zhis);
		if(zhis.title == data){
			clearstorage($(e).parent());
			var todo = { 'title':zhis.title, 'done':'false'};
			save(todo);
			}
		}
	}
}

function save(data){
	var time = new Date().getTime();
		// if(itemq){
		// 	time = itemq;
		// }
	data = JSON.stringify(data);
	localStorage.setItem(time,data);
}

function clearstorage(e){
	var data = e.text();
	data = data.slice(0, data.length-1);
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var zhis = localStorage.getItem(key);
		zhis = JSON.parse(zhis);
		if(zhis.title == data){
			localStorage.removeItem(key);
			return;
		}
	}
}

function loadstorage(){
	if(!localStorage){
		return;
	}
	var liq = '<li>' + '<input type="checkbox" onchange="updata(this)"/>';
	var liqg = '<li>' + '<input type="checkbox" checked onchange="updata(this)"/>';
	var lih = '<span class="delete">-</span>' + '</li>';
	var li1 = '';
	var li = '';
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var zhis = localStorage.getItem(key);
		zhis = JSON.parse(zhis);
		if(zhis.done == "false"){
			li += liq + zhis.title + lih;
		}else{
			li1 += liqg + zhis.title + lih;
		}
	}
	dolist.html(li);
	donelist.html(li1);
	counter.html(dolist.children().length);
	counter1.html(donelist.children().length);
}