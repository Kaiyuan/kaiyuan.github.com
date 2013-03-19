var music = document.getElementById("audio-bar");
var barbox = $('.audio-bar-box .bar-box');
var barWidth = barbox.width();
var playbar = $("#play-bar");
var pbw = playbar.width();
var auV = $('.auVolume')
var auVw = auV.width();
var playtime = $("#playtime");
var playan = $(".audio-bar-box > li:first-child");
music.addEventListener("timeupdate", showtime, true);//获得当前播放时间
music.addEventListener("loadedmetadata", show, true);//获得音频总时间
// music.addEventListener("error", audioerror, true);//载入失败时候
function show() {
	var ltime = parseInt(music.duration);
	var lmm = parseInt(ltime/60);
	var lss = ltime-lmm*60;
  var musicT = (lmm<10?"0":"")+lmm+":"+(lss<10?"0":"")+lss;
  playtime.text(musicT);//时间
}
function showtime() {
	var ctime = parseInt(music.duration)-parseInt(music.currentTime);
	var cmm = parseInt(ctime/60);
	var css = ctime-cmm*60;
  var playT = (cmm<10?"0":"")+cmm+":"+(css<10?"0":"")+css;
  playtime.text(playT); //当前播放时间
playbar.css("width", music.currentTime/music.duration*barWidth-2);//进度条
}
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
	playbar.css("width", 0);//进度条
  var ltime = parseInt(music.duration);//不知道为什么这里要重新获取一次。
  var lmm = parseInt(ltime/60);
  var lss = ltime-lmm*60;
  var musicT = (lmm<10?"0":"")+lmm+":"+(lss<10?"0":"")+lss;
  playtime.text(musicT);//时间
}, false);
barbox.click( function (event) {
  music.currentTime = (event.pageX-$(this).offset().left)/barWidth*parseInt(music.duration); //点击进度条跳转
});
$('#auVbar').css("width",music.volume*auVw);
auV.click( function (event) {
  music.volume = (event.pageX-$(this).offset().left-2)/auVw;//音量控制
  $('#auVbar').css("width",event.pageX-$(this).offset().left-2);
});