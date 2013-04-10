/* 
** Kaiyuan
** http://boxks.com
** Github: https://github.com/Kaiyuan/Music-Player
*/
// sup
$('.sup').hover(
  function () {
    var suptext = $(this).data("text");
    var supimg = $(this).data("img");
    if (suptext||supimg) {
      if (supimg) {
        $("body").append('<div class="sup-box sup-img"><img src="'+supimg+'"></div>' );
      }else {
        $("body").append('<div class="sup-box">'+suptext+'</div>' );
      };
      var sbox = $('.sup-box');
      var supx = $(this).offset().left;
      var supy = $(this).offset().top;
      var supw = $(this).outerWidth();
      var boxx = sbox.outerWidth();
      var boxy = sbox.outerHeight();
      sbox.css('left', supx+supw/2-boxx/2);
      sbox.css('top', supy-boxy-8);
      sbox.hide();
      sbox.fadeIn("fast");
    };
  },
  function () {
    $('.sup-box').detach();
  }
);
//Music Player
audio = document.getElementById("music");
playtime = $("#audiotime");
play = $('#play');
pberbox = $('#pbar');
playber = $('#playber');
playberW = 327;
retreat = $('#retreat');
onward = $('#onward');
vbox = $('#volumebar');
vboxw = 120;
vbutton = $('#vbutton');
vber = $('#vber');
mlbox = $('#list')
mimg = $('#img');
musicname = $('#name');
addbutton = $("#addbutton");
addmusic = $("#addmusic");
addimg = $("#addimg");
addname = $("#addname");
//form time
function gettime (s) {        //格式化秒数函数
  	var ltime = parseInt(s);
  	var lmm = parseInt(ltime/60);
  	var lss = ltime-lmm*60;
	var gett = (lmm<10?"0":"")+lmm+":"+(lss<10?"0":"")+lss;//格式化秒数成分钟
  	return gett;
}
function show() {
  	showtime = gettime(audio.duration);//调用格式化函数
  	playtime.text(showtime);//时间
}
function showtime() {
	showtime = gettime(audio.duration-audio.currentTime);
  	playtime.text(showtime); //当前播放时间
  	playber.css("width", audio.currentTime/audio.duration*playberW-6);//进度条
}
// Add Music
function additem (aname,aurl,aurl) {
	if (aurl) {
		if (addimg) {
			if (aname) {
				var musicname = aname;
			} else {
				var musicname = aurl;
			};
			var musicimg = aurl;
			musics.musiclist.push({"mname":[musicname],"url":[musicurl],"img":[musicimg]});
		} else {
			if (aname) {
				var musicname = aname;
			} else {
				var musicname = aurl.substring(aurl.lastIndexOf("/")+1,aurl.lastIndexOf(".mp3"));
			};
			musics.musiclist.push({"mname":[musicname],"url":[musicurl]});
		};
		mlbox.append('<li draggable="true"><span>'+musicname+'</span><div class="edit"></div><div class="del"></div></li>');
		localStorage['musiclist'] = JSON.stringify(musics);
	} else {
		var error = "URL Null!";
		return error;
	};
};
// Music Play
function echomusic (no) {	//调用数据播放函数
	musicname.text(musics.musiclist[no].mname);
	audio.src = musics.musiclist[no].url;
	musicimg = musics.musiclist[no].img;
	mimg.css('background-image','url(CompactDisk.png)');
	if (musicimg) {
		mimg.css('background-image','url('+musicimg+')');//添加封面
	};
	audio.play();
	play.addClass('stop');
}
// Echo Data
var echob = 0;
$("#EchoB").click(function () {
	if (echob) {
		$('#EchoBox').removeClass("top0");
		echob = 0;
	} else {
		$('#EchoBox').addClass("top0");
		echob = 1;
	};
});
$('#EchoDataButton').click(function () {
	$('#EchoData').val(localStorage.musiclist);
});
$('#SaveDataButton').click(function () {
	saveData = $('#EchoData').val();
	if (saveData.substring(0,14) == '{"musiclist":[') {
		localStorage['musiclist'] = saveData;//写入数据库
		$('#list li').detach();
		musics = JSON.parse(localStorage.musiclist);
		if (musics.musiclist[0]) {
			for (i = 0; i < musics.musiclist.length; i++) {
				muname = musics.musiclist[i].mname;
				mlbox.append('<li draggable="true"><span>'+muname+'</span><div class="edit"></div><div class="del"></div></li>');
			};
			musicname.text(musics.musiclist[0].mname);
			audio.src = musics.musiclist[0].url;
			musicimg = musics.musiclist[0].img;
			mimg.css('background-image','url()');
			if (musicimg) {
				mimg.css('background-image','url('+musicimg+')');
			};
			play.removeClass('stop');
			mNo = 0;//使用标号方式控制整个播放进度
			$('#EchoDataBox').removeClass('warn');
		};
	} else{
		$('#EchoDataBox').addClass('warn');
		$('#DataError').css('top','10px');
	};
});
$("#EchoDataBox").click(function () {
	$(this).removeClass("warn");
});
// add music
addbutton.click(function () {
	if (addmusic.val().substring(0,7) == "http://" || addmusic.val().substring(0,8) == "https://") {
		var musicurl = addmusic.val();
		if (addimg.val()) {
			if (addname.val()) {
				var musicname = addname.val();
			} else {
				var musicname = musicurl;
			};
			var musicimg = addimg.val();
			musics.musiclist.push({"mname":[musicname],"url":[musicurl],"img":[musicimg]}); //增加数组
		} else {
			if (addname.val()) {
				var musicname = addname.val();
			} else {
				var musicname = musicurl.substring(musicurl.lastIndexOf("/")+1);
			};
			musics.musiclist.push({"mname":[musicname],"url":[musicurl]});
		};
		mlbox.append('<li draggable="true"><span>'+musicname+'</span><div class="edit"></div><div class="del"></div></li>');//添加li
		$('#list li:last').hide();
		$('#list li:last').slideDown("show");
		localStorage['musiclist'] = JSON.stringify(musics);//写入数据库
		addname.val("");//清空表单
		addmusic.val("");
		addimg.val("");
		$('#urlerror').removeClass('top0');
		$('#addmusicbox').removeClass('warn');
  //   	$('#addbox').removeClass("backtop"); //添加窗口上缩
		// btbutton = 0;
	} else {
		$('#urlerror').addClass('top0');
		$('#addmusicbox').addClass('warn');
	};
});
//Close error
$('#urlerror').click(function () {
	$(this).removeClass('top0');
	$('#addmusicbox').removeClass('warn');
});
// add music box
var btbutton = 0;
$("#addclick").click(function () {
	if (btbutton) {
		$('#addbox').removeClass("backtop");
		btbutton = 0;
	} else {
		$('#addbox').addClass("backtop");
		btbutton = 1;
	};
});
//Play and stop button
play.click(function(){
  if (audio.paused) {
    $(this).addClass('stop');//暂停
    audio.play();
  } else {
    $(this).removeClass('stop');//播放
    audio.pause();
  } 
});
//Back off play
retreat.click(function () {
	if (mNo > 0) {
		mNo = mNo-1;
		echomusic(mNo); //上一曲
	};
});
//Next Play
onward.click(function () {
	if (mNo < musics.musiclist.length-1) {
		mNo = mNo+1;
		echomusic(mNo); //下一曲
	};
});
//For Music Ilst
if (localStorage.musiclist) {	//判断数据库是否为空
	musics = JSON.parse(localStorage.musiclist);//获取数据组
	if (localStorage.musicvolume) {
		if (localStorage.volumestate == 'false') {
			$('#vbutton').addClass('mute');
			music.volume = 0;
		} else {
			music.volume = localStorage.musicvolume;//自動設置為用戶之前大音量大小
		};
	} else{
		music.volume = localStorage.musicvolume = 0.5;
	};
	if (musics.musiclist[0]) {
		for (i = 0; i < musics.musiclist.length; i++) {
			muname = musics.musiclist[i].mname;
			mlbox.append('<li draggable="true"><span>'+muname+'</span><div class="edit"></div><div class="del"></div></li>');
		};
		musicname.text(musics.musiclist[0].mname);
		audio.src = musics.musiclist[0].url;
		musicimg = musics.musiclist[0].img;
		mimg.css('background-image','url()');
		if (musicimg) {
			mimg.css('background-image','url('+musicimg+')');
		};
		play.removeClass('stop');
		mNo = 0;//使用标号方式控制整个播放进度
	};
} else {
	musicsl = "{\"musiclist\":[]}";
	localStorage['musiclist'] = musicsl;
	musics = JSON.parse(localStorage.musiclist);//获取数据组
};
music.addEventListener("timeupdate", showtime, true);//获得当前播放时间
music.addEventListener("loadedmetadata", show, true);//获得音频总时间
pberbox.click( function () {
  	audio.currentTime = (event.pageX-$(this).offset().left)/playberW*parseInt(audio.duration); //点击进度条跳转
});
// Music Vlome
vber.css("width",audio.volume*vboxw);
vbox.click( function () {
  	audio.volume = (event.pageX-vbox.offset().left-3)/vboxw;//音量控制
  	localStorage.musicvolume = audio.volume;
  	vber.css("width",event.pageX-vbox.offset().left-3);
  	if (audio.volume < 0.02) {
		vbutton.addClass('mute');
		localStorage.volumestate = 'false';
  	} else {
  		vbutton.removeClass('mute');
  		localStorage.volumestate = 'true';
  	};
});
vbutton.click(function () {
	if (audio.volume != 0) {
		localStorage.volumestate = 'false';
		audio.volume = 0;
		$(this).addClass('mute');
  		vber.css("width",0);
	} else if(audio.volume==0) {
		audio.volume = localStorage.musicvolume;
		localStorage.volumestate = 'true';
		$(this).removeClass('mute');
  		vber.css("width",audio.volume*vboxw);
	};
});
//Music End
audio.addEventListener('ended', function() {	//播放完毕
	playber.css("width", "0");//进度条归零
  	if (mNo < musics.musiclist.length-1) {//判断是否最后一首
  		mNo = mNo+1;
  		echomusic(mNo);
  	} else {
  		mNo = 0;
  		echomusic(mNo);
		// play.removeClass('stop');
  // 		playtime.text(showtime);//时间还原
  // 		showtime = gettime(music.duration);
	};
}, false);

// list
$('#delall').click(function () {
	$('#list li').detach();
	localStorage['musiclist'] = "{\"musiclist\":[]}";
	musics = eval("(" + localStorage.musiclist + ")");
	audio.src = "";
	mimg.css('background-image','url(CompactDisk.png)');
	$(this).removeClass('stop');
  	playber.css("width", "0");
});
//Play
$('#list').on('click', 'li span',function() {//用 on 方式保证后面添加的 li 有效
	var thisbox = $(this).parent();
	var musiclNo = thisbox.index();//获取 li 序号
	mNo = musiclNo;
	echomusic(mNo);
});
//Delete
$('#list').on('click', 'li .del',function() {
	var thisbox = $(this).parent();
	var boxNo = thisbox.index();
	musics.musiclist.splice(boxNo,1);	//删除指定数组
	thisbox.slideUp("show",function () {
		$(this).detach();
	}, false);
	localStorage['musiclist'] = JSON.stringify(musics);
	if (boxNo == mNo) {
		echomusic(mNo); //如果是删除当前音乐自动跳转到下一首
	};
});
// Edit music
$('#list').on('click', 'li .edit',function() {
	var thisbox = $(this).parent();
	editNo = thisbox.index();
    var ebuttont = $(this).offset().top;
	$("#editbox").detach();
	if (musics.musiclist[editNo].img == undefined) {
		echoimg = "";
	} else{
		echoimg = musics.musiclist[editNo].img;
	};
	$('body').append('<div id="editbox"><ul class="left100"><li id="editnamebox"><input id="editname" type="text" value="'+musics.musiclist[editNo].mname+'" placeholder="Music Name"></li><li id="editurlbox"><input id="editurl" type="text" value="'+musics.musiclist[editNo].url+'" placeholder="URL"></li><li id="editimgbox"><input id="editimg" type="text" value="'+echoimg+'" placeholder="PHOTO"></li><button id="editbutton" class="right" onclick="editbutton()">Save</button></ul><div id="closebutton" onclick="closeedit()"></div></div>');
	closebutton = $("#closebutton");
	editbox = $("#editbox");
	var boxy = editbox.outerHeight();
	editbox.css('top', ebuttont-boxy-6);
	editbox.hide();
	editbox.fadeIn("fast");
});
$('body').on('click', '#editbutton',function () {
	var editname = $('#editname').val();
	var editurl = $('#editurl').val();
	var editimg = $('#editimg').val();
	if (editurl.substring(0,7) == "http://" || editurl.substring(0,8) == "https://") {
		listbox = document.getElementById("list");
		listeditbox = listbox.getElementsByTagName("li")[editNo];
		if (editname == "") {
			musics.musiclist[editNo].mname = editurl.substring(editurl.lastIndexOf("/")+1);
			editnames = editurl.substring(editurl.lastIndexOf("/")+1);
			listeditbox.innerHTML = '<span>'+editnames+'</span><div class="edit"></div><div class="del"></div>';
		} else if (editname != musics.musiclist[editNo].mname) {
			musics.musiclist[editNo].mname = editname;
			listeditbox.innerHTML = '<span>'+editname+'</span><div class="edit"></div><div class="del"></div>';
		};
		if (editurl != musics.musiclist[editNo].url) {musics.musiclist[editNo].url = editurl;};
		if (editimg != musics.musiclist[editNo].img) {musics.musiclist[editNo].img = editimg;};
		localStorage['musiclist'] = JSON.stringify(musics);
		$('#editurlbox').removeClass('warn');
		$("#editbox").fadeOut("fast", function () {
			$(this).detach();
		});
	} else{
		$('#editurlbox').addClass('warn');
	};
});
$("body").on("click", "#closebutton", function () {
	$("#editbox").fadeOut("fast", function () {
		$(this).detach();
	});
});
$('body').on('click','input',function () {
	$(this).select();
});
// sortable
// $('#list').sortable().on('sortupdate', function() {
// 	item: "li";
// });
