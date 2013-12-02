jQuery(document).ready(function($) {
	$('#btc-key').hover(function() {
		$(this).select();
	});
	$('#btc>span').click(function() {
		$("#btc>ul").toggleClass('block');
	});
});