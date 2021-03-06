// ==UserScript==
// @name           DealExtreme.com Mexico
// @namespace      dealextreme.com
// @include        http://www.dealextreme.com/*
// @include        http://s.dealextreme.com/*
// ==/UserScript==


// x MXN for 1 USD; IF there is no cookie set, use this one
var MXN_USD = 12.80;
var MXN_USD_date = 'never set';
var MXN_USD_today = false;

// reoplaces singe text
function replacePrice(text, method)
{
	if (!method){
		method = 0;
	}
	
	if (method == 1){
		// prices with rounded values
		var patt_usd = new RegExp('[$]([0-9]+)[^.^0-9]*');
	}else{
		// default
		var patt_usd = new RegExp('[$]([0-9]+[.][0-9]{2})');
	}
	
	var res;
	while (res = patt_usd.exec(text)){
		if (method == 1){
			// integer
			value = Math.round(parseFloat(res[1]) * MXN_USD);
		}else{
			// float
			value = Math.round(parseFloat(res[1]) * MXN_USD*100)/100;
		}
		// some useless tag was used (avoiding using existing tags like span
		if (method == 2){
			text = text.replace('$'+res[1], value+' MXN', 'gi');
		}else{
			text = text.replace('$'+res[1], '<font title="&#36; '+res[1]+'">'+value+' MXN'+'</font>', 'gi');
		}
	}
	
	return text;

}

// loops all tags and calls the function to replace single text => happens for all tags
function replacePriceOnTags(tag, method)
{
	if (!method){
		method = 0;
	}
	
	if (method == 1){
		// prices with rounded values
		var patt_usd = new RegExp('[$]([0-9]+)[^.^0-9]*');
	}else{
		// default
		var patt_usd = new RegExp('[$]([0-9]+[.][0-9]{2})');
	}
	
	// els - means 'elements'
	var els = document.getElementsByTagName(tag);
	for(i = 0; i < els.length; i++){
		// replace only when there are prices in the elements
		if (patt_usd.test(els[i].innerHTML)){
			els[i].innerHTML = replacePrice(els[i].innerHTML, method);
		}
	}
}

function currency_mod()
{
	
	var i, res = Array;
	
	// replace prices under different tags
	replacePriceOnTags('strong');
	replacePriceOnTags('span');
	replacePriceOnTags('title', 2); // do not add additional tags
	replacePriceOnTags('dd');
	replacePriceOnTags('li');
	replacePriceOnTags('a');
	replacePriceOnTags('a', 1); // integer valued prices
	replacePriceOnTags('b');
}

function add_favorite_button()
{
	

	var els = document.getElementsByTagName('div');
	for (i in els)
	{
		if(/DisplayCell productsRating/.test(els[i].className))
			{
				var textcode =  els[i].getElementsByTagName('a')[0].href;
				var productcode = textcode.substring(textcode.lastIndexOf('sku.')+4, textcode.length);
				els[i].innerHTML = els[i].innerHTML +'<img id="imgAddToWishList" class="img_addwishlist" alt="Add to Wish List" src="/images/add-wishlist-icon.png"/  onclick="SavedCart.MYaddToWishList(this,'+productcode+')">';
			}
	}

}

 



function currency_rate_form()
{
	var div = document.createElement('div');
	div.setAttribute('style', 'position: fixed; z-index: 100; top: 0px; left: 0px; background-color: #EEE; padding: 2px 5px 2px 5px; border: 1px solid #CCC; font-size: 11px; font-style: italic; color: #0CA4C5; cursor: pointer; -moz-border-radius-bottomright: 7px; -webkit-border-bottom-right-radius: 7px; border-radius-bottomright: 7px; overflow: hidden; width: 240px; height: 16px;');
	div.setAttribute('onClick', 'var reply = prompt("Update the currency conversion rate, 1 USD is how much MXN? (reloads the page)", "'+MXN_USD+'"); var new_rate = parseFloat(reply); if (new_rate && new_rate != '+MXN_USD+'){ var exdate=new Date(); exdate.setDate(exdate.getDate() + 1000); document.cookie = "MOD_MXN_USD="+escape(new_rate)+"; expires="+exdate.toUTCString(); var currentTime = new Date(); document.cookie = "MOD_MXN_USD_date="+currentTime.getDate()+"."+(currentTime.getMonth() + 1)+"."+currentTime.getFullYear()+"; expires="+exdate.toUTCString(); window.location.reload(); } ');
	// add current stored rate
	div.innerHTML = '1 USD = <b>'+MXN_USD+'</b> MXP ('+MXN_USD_date+')';
	
	// Add BNB Iframe info
	
	/* - TODO - improve it with automatic currency update
	
	if (!MXN_USD_today){
		// Only load BNB page when hte last set date is not today
		div.setAttribute('onMouseOver', 'this.style.height="100px"');
		div.setAttribute('onMouseOut', 'this.style.height="16px"');
		var currentTime = new Date();
		div.innerHTML += '<div style="width: 230px; height: 60px; overflow: hidden; border: 1px solid #CCC;"><iframe src="http://finances.need.bg/rates_arhiv.php?rate[]=USD&bday='+currentTime.getDate()+'&bmonth='+(currentTime.getMonth() + 1)+'&byear='+currentTime.getFullYear()+'&eday='+currentTime.getDate()+'&emonth='+(currentTime.getMonth() + 1)+'&eyear='+currentTime.getFullYear()+'" style="width: 800px; height: 600px; margin-top: -255px; margin-left: -320px; " SCROLLING="NO"></iframe></div>';
	}
	*/
	document.body.appendChild(div);
}

function chr(AsciiNum)
{
	return String.fromCharCode(AsciiNum)
}

function setCookie(c_name, value)
{
	c_name = 'MOD_'+c_name;
	document.cookie = c_name + "=" + escape(value);
}

function getCookie(c_name)
{
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++){
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == 'MOD_'+c_name){
			return unescape(y);
		}
	}
}

function search_by_price_mod()
{
	// detect if we have to apply it
	var startPrice = document.getElementById('startPrice');
	var endPrice = document.getElementById('endPrice');
	if (startPrice && endPrice){
		// do the modification
		var startPrice_code = 'document.getElementById(\'startPrice\').value = Math.round(this.value / '+MXN_USD+'); if (document.getElementById(\'startPrice\').value == 0) {document.getElementById(\'startPrice\').value = \'\';} ';
		var endPrice_code = 'document.getElementById(\'endPrice\').value = Math.round(this.value / '+MXN_USD+'); if (document.getElementById(\'endPrice\').value == 0) {document.getElementById(\'endPrice\').value = \'\';} ';
		// modify it
		startPrice.parentNode.innerHTML = '<input type="text" class="text" style="border: 1px solid #aaa;" onChange="'+startPrice_code+'" onKeyDown="'+startPrice_code+'" onKeyUp="'+startPrice_code+'" /> MXN - <input type="text" class="text" style="border: 1px solid #aaa;" onKeyDown="'+endPrice_code+'" onKeyUp="'+endPrice_code+'" /> MXN  <input type="button" class="price" id="searchByPrice" value="search"/><div style="display: none;">'+startPrice.parentNode.innerHTML+'</div>';
	}
}

function main(){
	if (!getCookie('MXN_USD')){
		// set cookie value if not
		setCookie('MXN_USD', MXN_USD);
		setCookie('MXN_USD_date', MXN_USD_date);
	}else{
		// get cookie value
		MXN_USD = parseFloat(getCookie('MXN_USD'));
		MXN_USD_date = getCookie('MXN_USD_date');
		var currentTime = new Date();
		if (MXN_USD_date == currentTime.getDate()+"."+(currentTime.getMonth() + 1)+"."+currentTime.getFullYear()){
			MXN_USD_today = true;
		}
	}
	currency_rate_form();
	currency_mod();
	search_by_price_mod();
	add_favorite_button();
}

// Some old fasioned C style, for fun mostly
main();

