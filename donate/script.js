jQuery(document).ready(function() {
	var ppbusiness	=	alioptEmail	=	"\u0073\u0065\u0061\u006c\u006f\u0075\u0072\u0040\u0067\u006d\u0061\u0069\u006c\u002e\u0063\u006f\u006d";	//账户

	//创建 Paypal 表单
	function ppPost() { 
		var tempForm	=	document.createElement("form"); 
		tempForm.id	=	"paypal"; 
		tempForm.method	=	"post"; 
		tempForm.action	=	"https://www.paypal.com/cgi-bin/webscr"; 
		tempForm.target	=	"paypal"; 

		var cmd	=	document.createElement("input"); 
		cmd.type	=	"hidden"; 
		cmd.name	=	"cmd" 
		cmd.value	=	"_donations"; 
		tempForm.appendChild(cmd); 

		var business	=	document.createElement("input"); 
		business.type	=	"hidden"; 
		business.name	=	"business" 
		business.value	=	ppbusiness; 
		tempForm.appendChild(business); 

		var lc	=	document.createElement("input"); 
		lc.type	=	"hidden"; 
		lc.name	=	"lc" 
		lc.value	=	"US"; 
		tempForm.appendChild(lc); 

		var item_name	=	document.createElement("input"); 
		item_name.type	=	"hidden"; 
		item_name.name	=	"item_name" 
		item_name.value	=	ppitem_name; 
		tempForm.appendChild(item_name); 

		var no_note	=	document.createElement("input"); 
		no_note.type	=	"hidden"; 
		no_note.name	=	"no_note" 
		no_note.value	=	"0"; 
		tempForm.appendChild(no_note); 

		var currency_code	=	document.createElement("input"); 
		currency_code.type	=	"hidden"; 
		currency_code.name	=	"currency_code" 
		currency_code.value	=	"USD"; 
		tempForm.appendChild(currency_code); 

		var bn	=	document.createElement("input"); 
		bn.type	=	"hidden"; 
		bn.name	=	"bn" 
		bn.value	=	"PP-DonationsBF:btn_donate_SM.gif:NonHostedGuest"; 
		tempForm.appendChild(bn); 

		document.body.appendChild(tempForm); 
		tempForm.submit(); 
		document.body.removeChild(tempForm); 
	} 

	//	Alipay 表单
	function aliPost() { 

		var tempForm	=	document.createElement("form"); 
		tempForm.id	=	"paypal"; 
		tempForm.method	=	"post"; 
		tempForm.action	=	"https://shenghuo.alipay.com/send/payment/fill.htm"; 
		tempForm.target	=	"alipay"; 

		var optEmail	=	document.createElement("input"); 
		optEmail.type	=	"hidden"; 
		optEmail.name	=	"optEmail" 
		optEmail.value	=	alioptEmail; 
		tempForm.appendChild(optEmail); 

		var payAmount	=	document.createElement("input"); 
		payAmount.type	=	"hidden"; 
		payAmount.name	=	"payAmount" 
		payAmount.value	=	donatrNo; 
		tempForm.appendChild(payAmount); 

		var title	=	document.createElement("input"); 
		title.type	=	"hidden"; 
		title.name	=	"title" 
		title.value	=	alititle;
		tempForm.appendChild(title); 

		document.body.appendChild(tempForm); 
		tempForm.submit(); 
		document.body.removeChild(tempForm); 
	} 

	//	Buttons

	$('body').on('click', '#ppButton', function() {
		ppPost();
	});


    $('#btc>ul').on("click", "#btc-key", function() {
        $("#btc-key").select();
    });
    $('#btc').on("click", "span", function() {
        $("#btc>ul").fadeToggle('fast');
    });

	$('body').on('click', '#aliButton', function() {
		aliPost();
	});

});