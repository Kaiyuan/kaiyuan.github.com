$('#btc-key').hover(function() {
	$(this).select();
});
$('#btc>span').click(function() {
	$("#btc>ul").toggleClass('block');
});
$("img").lazyload({
    effect : "fadeIn"
});