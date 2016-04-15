var rdConnect = (function () {

    //Immediately returns an anonymous function which builds our modules
    return function (co) {    //co is short for config object


        var h               = document.location.hostname;
        var urlUse          = 'http://'+h+'/cake2/rd_cake/radaccts/get_usage.json'
        var urlUam          = 'http://'+h+'/rd_login/services/uam.php';
	    var urlSocialBase   = 'http://'+h+'/cake2/rd_cake/auth/'; //Be sure this is the same as specified in FB e.g. IP or DNS!!
	    var urlSocialInfoFor= 'http://'+h+'/cake2/rd_cake/third_party_auths/info_for.json'; //To pull the username and password associated with this ID + typ 
	    
	    var urlAdd			= 'http://'+h+'/cake2/rd_cake/register_users/new_permanent_user.json';
		var urlLostPw		= 'http://'+h+'/cake2/rd_cake/register_users/lost_password.json';
		
		var urlRemoveMac    = 'http://'+h+'/cake2/rd_cake/devices/remove_mac.json';
		
        var counter         = undefined; //refresh counter's id
        var timeUntilStatus = 20; //interval to refresh
        var refreshInterval = 20; //ditto

	    var timeUntilUsage  = 20 //Default value
	    var usageInterval	= 20;

        //Sometimes the CoovaChilli JSON interface is stubborn; so we have to try again
        var retryCount      = 4; //Make it high to start with --- sometimes it really takes long! //FIXME (was 5)
        var currentRetry    = 0;

        var userName        = undefined;
        var password        = undefined;
        var remember        = false;

	    var ajaxTimeout		= 4000;

        var sessionData     = undefined;
        var counter         = undefined;
	    var notRequired		= [ 'q', 'res',	'challenge', 'called', 'mac', 'ip', 'sessionid', 'userurl', 'md'];
	    var socialName		= undefined;

	    //We store the status feedback in this variable
	    var statusFb		= undefined;
	    
	    var cDynamicData    = undefined;
	    
	    var mac_username    = '';
	    
	    if(co.cDynamicData != undefined){
            cDynamicData = co.cDynamicData;
        }
	    
	    cDebug              = false;
	    
	    
	    fDebug          = function(message){  
            if(cDebug){
                console.log(message)  
            }
        };

        var index   = function(){
        
            //==== Connect Events ====
            if($$('btnLogin') != undefined){
                $$('btnLogin').attachEvent("onItemClick", function(){
                    onBtnConnectClick()
                });
            }
            
            if($$('btnGoInternet') != undefined){
                $$('btnGoInternet').attachEvent("onItemClick", function(){
                    onBtnGoInternetClick()
                });
            }
            
            if($$('btnDisconnect') != undefined){
                $$('btnDisconnect').attachEvent("onItemClick", function(){
                    onBtnDisconnectClick()
                });
            }
            
            if($$('btnClickToConnect') != undefined){
                $$('btnClickToConnect').attachEvent("onItemClick", function(){
                    onBtnClickToConnectClick()
                });
            }
            
            if($$('btnRemoveMac') != undefined){
                $$('btnRemoveMac').attachEvent("onItemClick", function(){
                    onBtnRemoveMacClick()
                });
            }
            
            //Social Login things
            if($$('btnFacebook') != undefined){
                $$('btnFacebook').attachEvent("onItemClick", function(){
                    onBtnClickSocialLogin('facebook');
                });
            }
            
            if($$('btnGoogle') != undefined){
                $$('btnGoogle').attachEvent("onItemClick", function(){
                    onBtnClickSocialLogin('google');
                });
            }
            
            if($$('btnTwitter') != undefined){
                $$('btnTwitter').attachEvent("onItemClick", function(){
                    onBtnClickSocialLogin('twitter');
                });
            }
            
            if($$('btnRegister') != undefined){
                $$('btnRegister').attachEvent("onItemClick", function(){
                    onBtnClickRegister();
                });
            }
            
            if($$('btnPassword') != undefined){
                $$('btnPassword').attachEvent("onItemClick", function(){
                    onBtnClickPassword();
                });
            }
            
            
            //==== END Connect Events ====
            if(testForHotspot()){
                fDebug("It is a hotspot, now check if connected or not...");
			    if(cDynamicData.settings.usage_show_check){
				    timeUntilUsage = cDynamicData.settings.usage_refresh_interval;
				    usageInterval  = timeUntilUsage;
			    }
                mtRefresh(true);
            }else{
                fDebug("It is NOT a hotspot");
                window.rdDynamic.showNotHotspot();
            }    
        }
        
        
        var clearRefresh = function(){
            if(counter != undefined){
                clearInterval(counter);
                counter   = undefined;
                timeUntilStatus = refreshInterval;
			    timeUntilUsage  = usageInterval;
            }
        }
        
        
        var testForHotspot = function(){
            var ls = getParameterByName('link_status');
            if(ls != undefined){  //Override defaults
                return true
            }else{
                return false;   //Not a hotspot
            }
        }

        
        function getParameterByName(name) {
           name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
           var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
               results = regex.exec(location.search);
           return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        
        
        var mtRefresh    = function(do_usage_also){

            if (typeof(do_usage_also) === "undefined") { do_usage_also = false; } //By default we give feedback
            var urlStatus = getParameterByName('link_status');

            $.ajax({url: urlStatus + "?var=?", dataType: "jsonp",timeout: ajaxTimeout})
            .done(function(j){
                statusFb = j;		//Store the status feedback
                
                fDebug("mtRefresh...");
				fDebug(j);
                
                currentRetry = 0 //Reset the current retry if it was perhaps already some value
                if(j.logged_in == 'no'){
                
                    window.rdDynamic.showConnect();
                    clearRefresh();
                    clearLoginError();  
                }

                if(j.logged_in == 'yes'){
                    hideOverlay();
                    var redirect_check 	= false;
				    var redirect_url  	= 'http://google.com';
				    if(cDynamicData != undefined){ //We had to add this sine it is not always populated by the time this is run
					    redirect_check = cDynamicData.settings.redirect_check;
					    redirect_url = cDynamicData.settings.redirect_url;
				    }

				    if(redirect_check){
			            window.location= redirect_url;
			        }else{
			        
			            window.rdDynamic.showStatus();
			             
                        //Refresh status window
                        refreshStatus(j);

					    //We also want ot get the latest usage if enabled
					    if(do_usage_also){
						    rdUsageRefresh();
					    }

                        if(counter == undefined){    //If it is the first time so initialise the loop counter
                            sessionData = j;
                            refreshCounter();
                        }
                    }
                }
            })
            .fail(function(){
                //console.log("Could not fetch the coova status");	
                //We will retry for me.retryCount
                currentRetry = currentRetry+1;
                if(currentRetry <= retryCount){
                    //console.log("Retry to fetch Coova status "+currentRetry);
                    mtRefresh(do_usage_also);
                }else{
                    fDebug("Timed out"); //FIXME
                    webix.alert({
                        title: "Hotspot not responding",
                        text: "The hotspot is not responding to status queries",
                        type:"confirm-error"
                    }); 
                    showLoginError("Hotspot not responding");
                }
            });
        }
               
        var showLoginError = function(msg){
		    if($$('tplConnectInfo') == undefined){
		        return;
		    }
		    var t= $$('tplConnectInfo').getNode();
		    $(t).removeClass("fbInfo");
		    $(t).addClass("fbError");
		    $$('tplConnectInfo').setHTML(msg);
            $$('tplConnectInfo').show();
            
            hideOverlay();	
        }

	    var clearLoginError	= function(){
		    hideFeedback();
	    }
	    
	    var showOverlay = function(){
	        $$("layoutConnect").showOverlay('<div style="background-color: grey; opacity: 0.5; height:100%; width: 100%; margin:0px;padding:0px;"></div>');
	    }
	    
	    var hideOverlay = function(){
	        //Hide the overlay
            $$("layoutConnect").hideOverlay();
	    }
        
        var showFeedback	= function(msg){
		    //console.log("Show feedback "+msg);
		    if($$('tplConnectInfo') == undefined){
		        return;
		    }
		    var t= $$('tplConnectInfo').getNode();
		    $(t).removeClass("fbError");
		    $(t).addClass("fbInfo");
            $$('tplConnectInfo').setHTML(msg);
            $$('tplConnectInfo').show();
	    }

	    var hideFeedback	= function(){
		    fDebug("Hide feedback");
		    if($$('tplConnectInfo') == undefined){
		        return;
		    }
		    
		    $$('tplConnectInfo').setHTML("");
		    $$('tplConnectInfo').define("css", "");
		    $$('tplConnectInfo').refresh();
	    }
	    
	     //____ Go Onto Internet _____
	    var onBtnGoInternetClick = function(){
	     
		    var redirect_url  	= 'http://google.com';
		    if(cDynamicData != undefined){ 
			    if(cDynamicData.settings.redirect_url != ''){
			        redirect_url = cDynamicData.settings.redirect_url;
			    }
		    }
            window.open(redirect_url, '_blank');   
	    }
	    
	    
	    //_______Disconnect_______
	    var onBtnDisconnectClick = function(){
		    showFeedback("Disconnect the user");
		    showOverlay();
            var urlLogout = getParameterByName('link_logout');
            $.ajax({url: urlLogout + "?var=?", dataType: "jsonp",timeout: ajaxTimeout ,date: {}})
            .done(function(j){
                hideOverlay();
                mtRefresh(); //Refresh
            })
            .fail(function(){ 
                //We will retry for me.retryCount
                currentRetry = currentRetry+1;
                if(currentRetry <= retryCount){
                    onBtnDisconnectClick();
                }else{
                    showLoginError("MT Not responding to logout requests");
                }     
            });
	    }
	    
	    var refreshStatus = function(j){
	     
            var dat_i   = bytes(j.bytes_in);
            var dat_o   = bytes(j.bytes_out);
            var t       = parseInt(j.bytes_out) + parseInt(j.bytes_in);
            var dat_t   = bytes(t);      
            $$('propertySession').setValues({acct_un:j.username,acct_up:j.uptime,acct_di:dat_i,acct_do:dat_o,acct_dt:dat_t});
             
        }
        
        var refreshCounter = function(){
            var me = this; 
            counter = setInterval (function(){
			    //Status part
                timeUntilStatus = timeUntilStatus-1;
                if(false){    //We remove ourself gracefully FIXME
                    clearInterval(counter);
                    counter   = undefined;
                    timeUntilStatus = refreshInterval;
                }else{
                    $('#status_refresh').text(timeUntilStatus);
                    if(timeUntilStatus == 0){      //Each time we reach null we refresh the screens
                        timeUntilStatus = refreshInterval; //Start anew
                        mtRefresh();
                    }
                }

			    //Usage part
			    timeUntilUsage = timeUntilUsage-1;
                if(false){    //We remove ourself gracefully FIXME
                    clearInterval(counter);
                    counter   = undefined;
                    timeUntilUsage = usageInterval;
                }else{
                    if(timeUntilUsage == 0){      //Each time we reach null we refresh the screens
                        timeUntilUsage = usageInterval; //Start anew
                        rdUsageRefresh();
                    }
                }

            }, 1000 );
        }
        
        //This one to do....
        
        var rdUsageRefresh = function(){

		    if(cDynamicData.settings.usage_show_check == false){
			    return;
		    }

		    if(statusFb != undefined){
			    if(statusFb.mac == undefined){
				    return;
			    }else{
                    var mac = statusFb.mac.replace(/:/g, "-");
			    }
			    if(statusFb.username == undefined){
				    return;
			    }else{
				    var un	= statusFb.username;
			    }
		    }

            $.getJSON(urlUse,{'username' : un, 'mac' : mac}, 
                function(j) {

                    fDebug(j);
				    if(j.success == false){
					    return;
				    }

                    //If the time available is 'NA' we must hide the time div
                    if(j.data.time_cap == null){
                        $$('sliderTime').hide();

                    }else{

                        var time_total     = j.data.time_cap;
			            var pers_time_used = (j.data.time_used / j.data.time_cap) * 100;
					    var time_avail	   = j.data.time_cap - j.data.time_used;
                        
                        $$('sliderTime').setValue(pers_time_used);
                        $$('sliderTime').define("title", "<strong>Used </strong>"+time(j.data.time_used)+"<strong> Available </strong>"+ time(time_avail));
                        $$('sliderTime').refresh();
                        
                    }

                    //If the data available is 'NA' we must hide the time div
                    if(j.data.data_cap == null){
                        $$('sliderData').hide();
                    }else{

                        var data_total     = j.data.data_cap;
			            var pers_data_used = (j.data.data_used / j.data.data_cap) * 100;  
					    var data_avail	   = j.data.data_cap - j.data.data_used;
					    
                        $$('sliderData').setValue(pers_data_used);
                        $$('sliderData').define("title", "<strong>Used </strong>"+bytes(j.data.data_used)+"<strong><br>Available </strong>"+ bytes(data_avail));
                        $$('sliderData').refresh();
                        
                        //.html("<strong>Used </strong>"+bytes(j.data.data_used)+"<strong> Available </strong>"+ bytes(data_avail));


                    }
                });
                
        }
               
        var onBtnClickToConnectClick = function(){
			var c_t_c_element	= cDynamicData.settings.connect_suffix;
			var element_val     = getParameterByName(c_t_c_element);

			var c_t_c_username 	= cDynamicData.settings.connect_username+"@"+element_val;
			var c_t_c_password	= cDynamicData.settings.connect_username;
            userName 			= c_t_c_username;
            password 			= c_t_c_password;
            
            if(cDynamicData.settings.t_c_check == true){
		        if($$('checkboxTandC') != undefined){
		            if(!$$('checkboxTandC').getValue()){
		                showLoginError("First agree to T&C");
		                return;
		            }
		        }
		    }
		    showOverlay();           
            login();   
        }
               
        var onBtnConnectClick = function(){  //Get the latest challenge and continue from there onwards....
         
            //Auto suffix check
		    var auto_suffix_check   = cDynamicData.settings.auto_suffix_check;
		    var auto_suffix			= cDynamicData.settings.auto_suffix;

		    //First we need to determine if the user used a Voucher or Username/Password
		    var voucher_present = false;
		    var user_present	= false;
		    
		    //Clear previous errors
		    clearLoginError();

		    if ($$('voucher') != undefined){ //This means the voucher controll is there	
			    voucher_present = true;
		    }

		    if ($$('Username') != undefined){ //This means the user controll is there	
			    user_present = true;
		    }

		    //User and Voucher present
		    if((voucher_present)&&(user_present)){
			    //console.log("Voucher and user present");
			    var found_flag = false;

			    //Both empty
			    if(	($$('voucher').getValue().length == 0)&&
				    ($$('Username').getValue().length == 0)
			    ){
				    //console.log("voucher and user EMPTY");
				    showLoginError("Required value missing - Please supply");
                	return;
			    }

			    //Voucher specified
			    if($$('voucher').getValue().length > 0){
				    userName = escape($$('voucher').getValue());
                	password = $$('voucher').getValue();
				    found_flag = true;	   
			    }

			    //Username specified
			    if(($$('Username').getValue().length > 0)&&($$('Password').getValue().length > 0)){
				    userName = escape($$('Username').getValue());
            		password = $$('Password').getValue();
				    found_flag = true;
			    }

			    if(!found_flag){
				    showLoginError("Required value missing - Please supply");
                	return;
			    }
		    }
		
		    if((voucher_present)&&(user_present == false)
		    ){
			    if($$('voucher').getValue().length == 0){
				    showLoginError("Supply value for voucher");
				    return;
			    }
			    userName = escape($$('voucher').getValue());
                password = $$('voucher').getValue();
		    }

		    if((user_present)&&(voucher_present == false)
		    ){
			    if(($$('Username').getValue().length == 0)||($$('Password').getValue().length == 0)){
				    showLoginError("Supply both username and password");
                	return;
			    }
			    if($$('Username').getValue().length == 0){
				    showLoginError("Supply Username");
                	return;
			    }
			    if($$('Password').getValue().length == 0){
				    showLoginError("Supply Password");
                	return;
			    }
			    userName = escape($$('Username').getValue());
        		password = $$('Password').getValue();
		    }
		    
		    if(cDynamicData.settings.t_c_check == true){
		        if($$('checkboxTandC') != undefined){
		            if(!$$('checkboxTandC').getValue()){
		                showLoginError("First agree to T&C");
		                return;
		            }
		        }
		    }
		    
		    //Auto suffix for permanent users only
			if(
			    (auto_suffix_check)&&
			    ($$('Username').getValue().length != 0)
			){
				//Check if not already in username
				var re = new RegExp(".*"+auto_suffix+"$");
				if(userName.match(re)==null){
				    userName = userName+auto_suffix;
				}
			}
			showOverlay(); 
         	login();   
        }
        
        var login =  function(){
            showFeedback("Log "+userName+" into Captive Portal");
            var urlLogin = getParameterByName('link_login_only');
            $.ajax({url: urlLogin + "?var=?", dataType: "jsonp",timeout: ajaxTimeout, data: {username: userName, password: password}})
            .done(function(j){
                loginResults(j);
            })
            .fail(function(){
                //We will retry for retryCount
                currentRetry = currentRetry+1;
                if(currentRetry <= retryCount){
                    login();
                }else{
                    webix.alert({
                        title: "MT Not responding to login requests",
                        text: "MT Not responding to login requests",
                        type:"confirm-error"
                    });
                    showLoginError("MT Not responding to login requests");
                }
            });
        }
        
        
        var loginResults = function(j){

            currentRetry = 0;    //Reset if there were retries
            if(j.logged_in == 'yes'){          
                mtRefresh(true); //Refresh
            }else{
                var msg = 'Authentication failure please try again'
                if(j.error_orig != undefined){
                    msg =j.error_orig;
                    //Test to see if it moans about the MAC
                    //var res = msg.match(/^User koos not registered/); //dummy
                    var res = msg.match(/^User ([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F]) belongs to realm/);   //Real one
                    if(res != null){
                        //Get the MAC
                        var mac = msg.match(/([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])/);
                       // var mac = msg.match(/koos/);
                        mac_username = mac[0];            
                       // console.log("Here we have a match!!! ");
                       $$('btnRemoveMac').show();
                       //// $('#remove_mac').show();
                    }else{
                      //  console.log("Here we have NOOOO match!!! ");
                       /// $('#remove_mac').hide();
                       $$('btnRemoveMac').hide();
                    }
                }
                showLoginError(msg);  
            }
        }
        
        
        var onBtnRemoveMacClick = function(){

            $.ajax({url: urlRemoveMac , dataType: "json",timeout: ajaxTimeout,date: {},data: {'mac':mac_username}})
            .done(function(j){
                console.log("Ajax call fine");
                if(j.success == true){
                    showLoginError("Device "+mac_username+" removed from realm, please log in again");
                    $$('btnRemoveMac').hide();
                }else{
                    showLoginError(j.message);
                }
            })
            .fail(function(){     
                showLoginError('Problems encountered while trying to remove '+mac_username);
            });
        }
        
        
        //_________ Social Login _________________
	    var onBtnClickSocialLogin = function(a){

            var me 				= this;
            
            if(cDynamicData.settings.t_c_check == true){
		        if($$('checkboxTandC') != undefined){
		            if(!$$('checkboxTandC').getValue()){
		                showLoginError("First agree to T&C");
		                return;
		            }
		        }
		    }
		    
            showOverlay();
            
		    socialName          = a.toLowerCase();
		    showFeedback('Starting social login for '+ socialName)

            userName = cDynamicData.settings.social_login.temp_username; 
            password = cDynamicData.settings.social_login.temp_password;  
            socialTempLogin(); 
	    }
                
        var socialTempLogin	= function(){
		    showFeedback("Log temp user into Captive Portal");

            var urlLogin = getParameterByName('link_login_only');
            $.ajax({url: urlLogin + "?var=?", dataType: "jsonp",timeout: ajaxTimeout, data: {username: userName, password: password}})
            .done(function(j){
                socialTempLoginResults(j);
            })
            .fail(function(){
                //We will retry for retryCount
                currentRetry = currentRetry+1;
                if(currentRetry <= retryCount){
                    socialTempLogin();
                }else{
                    showLoginError("MT Not responding to login requests");
                }
            });
	    }
	    
	    
	    var socialTempLoginResults = function(j){

            currentRetry = 0;    //Reset if there were retries
            if(j.logged_in == 'no'){       
                var msg = 'Authentication failure please try again'
                if(j.error_orig != undefined){
                    msg =j.error_orig;
                }
                showLoginError(msg);
            }else{            
                //console.log("Temp social login user logged in fine.... time to check if we are authenticated");
			    //We need to add a query string but do not need to add ALL the items

			    var queryString 		= window.location.search;
			    queryString 			= queryString.substring(1);
			    var query_object		= parseQueryString(queryString);
			    var required			= query_object;

			    $.each(notRequired, function( index, value ) { //FIXME adapt the notRequired list for MT
				    //console.log( index + ": " + value );
				    delete required[value];
			    });

			    required.pathname   	= window.location.pathname;
                required.hostname   	= window.location.hostname;
                required.protocol   	= window.location.protocol;
			    required.social_login 	= 1;

			    var q_s 	 			= $.param(required);
			    //console.log(q_s);
			    //Dynamically build the redirect URL to which Social Login we will use...
			    window.location			= urlSocialBase+socialName+"?"+q_s;
			    //window.location="http://rd01.wificity.asia/cake2/rd_cake/auth/facebook?"+q_s;
            }
	    }
        

        //FIXME this needs to run during startup! 
        var checkSocialLoginReturn = function(){

           	if(	(getParameterByName('sl_type') 	!= '')&& //e.g. user or voucher
			    (getParameterByName('sl_name') 	!= '')&& //e.g. Facebook
			    (getParameterByName('sl_value') != '')   //e.g. 3_34564654645694 (Dynamic Pages ID + provider unique ID)
		    ){ 
			    //console.log("Finding transaction details for "+ me.queryObj.tx);
			

			    var t = getParameterByName('sl_type');
			    var n = getParameterByName('sl_name');
			    var v = getParameterByName('sl_value');

			    t = t.replace(/#.?/g, ""); //JQuery Mobile tend to add a #bla which we need to filter out
			    n = n.replace(/#.?/g, "");
			    v = v.replace(/#.?/g, "");

			    var jqxhr = $.getJSON( urlSocialInfoFor, {'sl_type' : t,'sl_name' : n,'sl_value' : v}, function(j) {
				    //console.log( "success getting social login return" );
				    if(j.success){   
					    userName = j.data.username; //Makes this unique
					    password = j.data.password;   
					    //console.log(j.data.username);
					    //console.log(j.data.password);
					    socialTempDisconnect();
				    }else{
					    //console.log("big problems");
					    showLoginError("Could not retrieve Social Login Info");
				    }
			    })
			    .fail(function() {
				    showLoginError("Could not retrieve Social Login Info"); 
			    });
            }
	    }
	    
	    var socialTempDisconnect 	=  function(){
	    
            showFeedback("Disconnect the social temp user");
            var urlLogout = getParameterByName('link_logout');
            $.ajax({url: urlLogout + "?var=?", dataType: "jsonp",timeout: ajaxTimeout,date: {}})
            .done(function(j){
                retryCount = 0;
                socialFinalLogin();
            })
            .fail(function(){ 
                //We will retry for me.retryCount
                currentRetry = currentRetry+1;
                if(currentRetry <= retryCount){
                    socialTempDisconnect();
                }else{
                    showLoginError("MT Not responding to logout requests");
                }     
            });
        }

        var socialFinalLogin = function(encPwd){
		    showFeedback('Doing final login');

            var urlLogin = getParameterByName('link_login_only');
            $.ajax({url: urlLogin + "?var=?", dataType: "jsonp",timeout: ajaxTimeout, data: {username: userName, password: password}})
            .done(function(j){
                socialFinalLoginResults(j);
            })
            .fail(function(){
                //We will retry for retryCount
                currentRetry = currentRetry+1;
                if(currentRetry <= retryCount){
                    socialFinalLogin();
                }else{
                    showLoginError("MT Not responding to login requests");
                }
            });
        }
        
	    
        var socialFinalLoginResults = function(j){
            hideFeedback();
            currentRetry = 0;    //Reset if there were retries
            if(j.logged_in == 'yes'){          
                var redirect_check 	= false;
			    var redirect_url  	= 'http://google.com';
			    if($("body").data("DynamicDetail") != undefined){ //We had to add this sine it is not always populated by the time this is run
				    redirect_check = cDynamicData.settings.redirect_check;
				    redirect_url   = cDynamicData.settings.redirect_url;
			    }
			    if(redirect_check){
		            window.location= redirect_url;
			    }else{             
                    mtRefresh(true); //Refresh session and usage
                }
            }else{
                var msg = 'Authentication failure please try again'
                if(j.error_orig != undefined){
                    msg =j.error_orig;
                    //Test to see if it moans about the MAC
                    //var res = msg.match(/^User koos not registered/); //dummy
                    var res = msg.match(/^User ([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F]) belongs to realm/);   //Real one
                    if(res != null){
                        //Get the MAC
                        var mac = msg.match(/([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])/);
                       // var mac = msg.match(/koos/);
                        mac_username = mac[0];            
                       // console.log("Here we have a match!!! ");
                       //// $('#remove_mac').show();
                    }else{
                      //  console.log("Here we have NOOOO match!!! ");
                       //// $('#remove_mac').hide();
                    }
                }
                showLoginError(msg);  
            }
        }
        
        //== User Registration ==
        var onBtnClickRegister = function(){
        
            webix.rules.intNumber = function(val){ return /^\d{10}$/.test(val); }
             
            var mv = {
		        view    : "multiview",
		        id      : 'regMulti',
		        cells   : [
                    {
                        view    : "form",
                        scroll  : true,
                        id      : 'regForm',
                        elements: [ 
                            {
                               css      : 'tmplCenter',
                              view      : "template",
                              borderless:true, 
                              height    : 150,
                              template  : "<h3>Sign-up for free Internet</h3>"+
			                    "Welcome to free Wi-Fi by <b>"+cDynamicData.detail.name+"</b>.<br>"+
                                "Sign up once to get Internet access!<br>"
                            },
                            {
                                view        : 'text',
                                name        : 'mac',
                                hidden      : true
                            },
                            {
                                view        : 'text',
                                name        : 'login_page',
                                hidden      : true,
                                value       : cDynamicData.detail.name
                            },
	                        {
                                view        : 'text',
                                label       : 'First Name',
                                name        : 'name',
                                placeholder : 'Supply a value',
                                required    : true
                            },
                            {
                                view        : 'text',
                                label       : 'Surname',
                                name        : 'surname',
                                placeholder : 'Supply a value',
                                required    : true
                            },
                            {
                                view        : 'text',
                                label       : 'Email (username)',
                                name        : 'username',
                                placeholder : 'Supply a value',
                                required    : true
                            },
                            {
                                view        : 'text',
                                label       : 'Password',
                                name        : 'password',
                                placeholder : 'Supply a value',
                                bottomLabel : "* The password must have at least 5 characters",
                                required    : true
                                
                            },
                            {
                                view        : 'text',
                                label       : 'Cell',
                                name        : 'phone',
                                placeholder : 'Supply a value',
                                bottomLabel : "* The number must have 10 digits",
                                required    : true
                            },
	                        { view:"button", value: "Submit", type: 'form', click:function(){
	                            var button = this;
		                        if (this.getParentView().validate()){ //validate form
                                    //webix.message("All is correct");
                                    //with callback
                                    webix.ajax().post(urlAdd, this.getParentView().getValues(), function(text, data, xhr){ 
                                        if(data.json().success == true){
                                            fDebug("Got Dynamic Detail");                
                                            if(data.json().data.username){
                                                $$('Username').setValue(data.json().data.username);
                                            } 
                                            if(data.json().data.username){
                                                $$('Password').setValue(data.json().data.password);
                                            }
                                            //button.getTopParentView().hide(); //hide window
                                            $$('regMulti').setValue('regEnd'); 
                                        }else{
                                            if(data.json().errors){
                                                var error_string = '';
                                                Object.keys(data.json().errors).forEach(function(key) {
                                                  var val = data.json().errors[key];
                                                  var new_key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                                                  error_string = error_string+"<b>"+new_key+":</b> "+val+"<br>";
                                                });
                                                webix.alert({
                                                    title   : "Error",
                                                    text    : error_string,
                                                    type    :"confirm-error"
                                                }); 
                                            }
                                            
                                            webix.message({ type:"error", text:"Could not register user" });
                                        }
                                    });
                                }
		                        else
			                        webix.message({ type:"error", text:"Form data is invalid" });
	                        }}
                        ],
                        rules       :{
	                        "username"  : webix.rules.isEmail,
	                        $all        : webix.rules.isNotEmpty,
	                        'phone'     : webix.rules.intNumber,
	                        'password'  : function(value){ 
	                            if(value.length >= 5){
	                                return value;
	                            }
	                        }
                        },
                        elementsConfig:{
	                        labelPosition:"top"
                        }
                    },
                    {
                        view    : "form",
                        scroll  : true,
                        id      : 'regEnd',
                        cols    : [ 
                            {
                               view         : "template",
                               borderless   : true,
                               css          : 'tmplCenter',
                               template     : "<h3>Thank you!</h3>"+
			                    "Thank you for registering with us<br>"+
			                    "Your username and password are already populated, simply click the <b>Login</b> button to start using the Internet."
                            }
                         ]
                    }
                ]
		    };
        
            webix.ui({   
                view        : 'window',
                id          : 'winRegister',
                fullscreen  : true,
                position    : 'center',
                modal       : true,
                head        : {
			        view    : "toolbar", 
			        cols    : [
						{},
						{ view:"icon", icon:"times-circle", click:"$$('winRegister').close();"}
				    ]
				},
                body        : mv
            });    
            $$("winRegister").show();
        }
        
        var onBtnClickPassword = function(){
          
		    var mv = {
		        view    : "multiview",
		        id      : 'pwdMulti',
		        cells   : [
                    {
                        view    :"form",
                        scroll  : true,
                        id      : 'pwdIntro',
                        cols    :[   
                            {
                               css          : 'tmplCenter', 
                               borderless   : true,
                               view: "template", template: "<h3>Supply your email address</h3>"+
			                    "If you are registered with us<br>"+
			                    "we will send you your credentials."
                            }
                         ]
                    },
                    {
                        view    :"form",
                        id      : 'pwdForm',
                        scroll  : true,

                        cols    :[ 
                            {},
                            {
                                view        :"form",
                                minWidth    : cMinWidth,
                                maxWidth    : cMaxWidth,
                                borderless  :true,
                                elements    : [
                                   
                                    {
                                        view        : 'text',
                                        label       : 'Email',
                                        name        : 'email',
                                        placeholder : 'Supply a value'
                                    },
                                    { view:"button", value: "Submit", type: 'form', click:function(){
                                        if (this.getParentView().validate()){ //validate form
                                            //webix.message("All is correct");
                                            //with callback
                                            webix.ajax().post(urlLostPw, this.getParentView().getValues(), function(text, data, xhr){ 
                                                if(data.json().success == true){
                                                    fDebug("Got Dynamic Detail");                
                                                    $$('pwdMulti').setValue('pwdEnd'); 
                                                }else{
                                                    webix.message({ type:"error", text:"Could not register user" });
                                                }
                                            });
                                            //this.getTopParentView().hide(); //hide window
                                            //$$('regMulti').setValue('regEnd');
                                        }
                                        else
                                            webix.message({ type:"error", text:"Form data is invalid" });
                                    }}
                                ],
                                rules       :{
                                    'email'  : webix.rules.isEmail,
                                    $all     : webix.rules.isNotEmpty     
                                },
                                elementsConfig:{
                                    labelPosition:"top",
                                }
                            },
                            {}
                         ]
                    },
                    {
                        view    : "form",
                        id      : 'pwdEnd',
                        scroll  : true, 
                        cols    :[
                              {
                               css          : 'tmplCenter',
                               borderless   : true,
                               view         : "template", 
                               template     : "<h3>Action complete!</h3>"+
			                    "Please check your email<br>"
                            }
                         ]
                    }
                ]
		    };
		    
		    
            webix.ui({
                view        : "window",
                id          : "winPassword",
                fullscreen  : true,
                position    : "center",
                modal       : true,
                head        : {
			        view    : "toolbar", 
			        //margin  : -4, 
			        cols    : [
						{},
						{ view:"button", id: 'pwdNext', label:"Next", width:70, click:("$$('pwdMulti').setValue('pwdForm'); $$('pwdNext').hide();")},
						{ view:"icon", icon:"times-circle", css:"alter",
							click:"$$('winPassword').close();"
					    }
				    ]
				},
               // body        : webix.copy(form)
                body        : webix.copy(mv)
            });
            
            $$("winPassword").show();
        }
        
      
        var parseQueryString = function( queryString ) {
        	var params = {}, queries, temp, i, l;
     
        	// Split into key/value pairs
        	queries = queryString.split("&");
     
        	// Convert the array of strings into an object
        	for ( i = 0, l = queries.length; i < l; i++ ) {
            	temp = queries[i].split('=');
            	params[temp[0]] = temp[1];
        	}
        	return params;
	    }

        var time =   function ( t , zeroReturn ) {

            if(t == 'NA'){
		        return t;
	        }

            if ( typeof(t) == 'undefined' ) {
                return 'Not available';
            }

            t = parseInt ( t , 10 ) ;
            if ( (typeof (zeroReturn) !='undefined') && ( t === 0 ) ) {
                return zeroReturn;
            }

            var d = Math.floor( t/86400);
            //var h = Math.floor( (t/3600 ) ;
            var h = Math.floor( (t -86400*d)/3600 ) ;
            var m = Math.floor( (t -(86400*d)-(3600*h))/60 ) ;
            var s = t % 60  ;

            var s_str = s.toString();
            if (s < 10 ) { s_str = '0' + s_str;   }

            var m_str = m.toString();
            if (m < 10 ) { m_str= '0' + m_str;    }

            var h_str = h.toString();
            if (h < 10 ) { h_str= '0' + h_str;    }

            var d_str = d.toString();
            if (d < 10 ) { d_str= '0' + d_str;    } 

            if      ( t < 60 )   { return s_str + 's' ; }
            else if ( t < 3600 ) { return m_str + 'm' + s_str + 's' ; }
            else if ( t < 86400 ){ return h_str + 'h' + m_str + 'm' + s_str + 's'; }
            else                 { return d_str + 'd' + h_str + 'h' + m_str + 'm' + s_str + 's'; }
        }

        var bytes   = function ( b , zeroReturn ) {

	        if(b == 'NA'){
		        return b;
	        }

            if ( typeof(b) == 'undefined' ) {
                b = 0;
            } else {
                b = parseInt ( b , 10 ) ;
            }

            if ( (typeof (zeroReturn) !='undefined') && ( b === 0 ) ) {
                return zeroReturn;
            }
            var kb = Math.round(b/1024);
            if (kb < 1) return b  + ' '+'Bytes';

            var mb = Math.round(kb/1024);
            if (mb < 1)  return kb + ' '+'Kilobytes';

            var gb = Math.round(mb/1024);
            if (gb < 1)  return mb + ' '+'Megabytes';

            return gb + ' '+'Gigabytes';
        }
    

        //Expose those public items...
        return {         
            index               		: index,
            clearRefresh        		: clearRefresh,
            onBtnConnectClick   		: onBtnConnectClick,
		    onBtnClickToConnectClick   	: onBtnClickToConnectClick,
		    onBtnClickSocialLogin		: onBtnClickSocialLogin,
		    onBtnDisconnectClick		: onBtnDisconnectClick,
		    checkSocialLoginReturn		: checkSocialLoginReturn,
		    onBtnGoInternetClick        : onBtnGoInternetClick
        }   
  }
})();

