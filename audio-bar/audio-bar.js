var music = document.getElementById("audio-bar"); //處理 audio 必須使用 js 原來的選擇方式
var audio = $('#audio-bar');
var text1 = '<span style="display:inline-block;margin: 0 2px -6px 2px;"><ul class="audio-bar-box sup';
var text2 = '" data-img="';
var text3 = '" data-text="'
var text4 = '"><li id="playan">&nbsp;</li><li><div class="bar-box"><div id="play-bar"></div></div></li><li id="playtime">00:00</li><li>&nbsp;<div class="auVolume"><span id="auVbar">&nbsp;</span></div></li>';
var text5 = '</ul></span>';
var dataimg = audio.data("img");
var datatext = audio.data("text");//獲取註釋內容
if (dataimg) {
  audio.before(text1+text2+dataimg+text4);
} else if (datatext) {
  audio.before(text1+text3+datatext+text4);
} else{
  audio.before(text1+datatext+text4);
};//audio 標籤前插入的內容
audio.after(text5);//audio 標籤之後插入的內容
var barbox = $('.audio-bar-box .bar-box');
var barWidth = barbox.width();//进度条总长度
var playbar = $("#play-bar");
var pbw = playbar.width();//时间轴长度
var auV = $('.auVolume')
var auVw = auV.width();//音量条长度
var playtime = $("#playtime");//时间显示
var playan = $(".audio-bar-box > li:first-child");//播放暂停按钮
music.addEventListener("timeupdate", showtime, true);//获得当前播放时间
music.addEventListener("loadedmetadata", show, true);//获得音频总时间
music.addEventListener("error", audioerror, true);//载入失败时候
function gettime (s) {        //格式化秒数函数
  ltime = parseInt(s);
  lmm = parseInt(ltime/60);
  lss = ltime-lmm*60;
  gett = (lmm<10?"0":"")+lmm+":"+(lss<10?"0":"")+lss;//格式化秒数成分钟
  return gett;
}
function show() {
  showtime = gettime(music.duration);//调用格式化函数
  playtime.text(showtime);//时间
}
function showtime() {
	showtime = gettime(music.duration-music.currentTime);
  playtime.text(showtime); //当前播放时间
playbar.css("width", music.currentTime/music.duration*barWidth-2);//进度条
}
function audioerror () {
  $('.audio-bar-box').append('<div id="auError">Audio Error!</div>');
}//加載失敗時候提示
playan.click(function(){
  if (music.paused) {
        $(this).addClass('stop');//暂停
        music.play();
      }
      else {
        $(this).removeClass('stop');//播放
        music.pause();
    } 
});
music.addEventListener('ended', function() {
	playan.removeClass('stop');//播放完毕
	playbar.css("width", 0);//进度条归零
  showtime = gettime(music.duration);
  playtime.text(showtime);//时间还原
}, false);
barbox.click( function (event) {
  music.currentTime = (event.pageX-$(this).offset().left)/barWidth*parseInt(music.duration); //点击进度条跳转
});
$('#auVbar').css("width",music.volume*auVw);
auV.click( function (event) {
  music.volume = (event.pageX-$(this).offset().left-2)/auVw;//音量控制
  $('#auVbar').css("width",event.pageX-$(this).offset().left-2);//最后减2是因为 css 設置有边线和留白
});