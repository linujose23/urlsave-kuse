var pageName="";
var showHideFlag = true;
var g_id = "";
var returnFlag=false;
var selectVideoToDlt = "";
var basePath ="https://img.youtube.com/vi/";
var loginFlag=false;
var savedToCluster =false;
var hideVideArr = [];

var g_videoLinks = ["https://www.youtube.com/embed/1CRihg1X89A","https://www.youtube.com/embed/GfBwjI9c70s","https://www.youtube.com/embed/9jgl0dRriNQ","https://www.youtube.com/embed/GuERa1mtDEc","https://www.youtube.com/embed/l01RWZzXhmQ","https://www.youtube.com/embed/o1l8SELYlLs","https://www.youtube.com/embed/ttCncWO6UPM","https://www.youtube.com/embed/EncKczSJPbs"];

var g_text = ["JOY by Dior – The new fragrance","Versace Commercial","Salvatore Ferragamo F80","The Dyson Pure Cool™ Personal Purifying Fan Technology Cool™ Personal Purifying Fan Technology","DoorStore™ Knives","Joseph Joseph BarWise™","Introducing: The 2nd generation Wing & Wing PRO with","How Netﬂix uses InVision to prototype rapidly and gather InVision to prototype rapidly and gather"];

/*var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
	$("#plusMenu4").css("display","block");
  } else {
    
	$("#plusMenu4").css("display","none");
  }
  prevScrollpos = currentScrollPos;
}
*/

function openMenu() {
  $("#popupmenu").css("display", "block");
  $("#plusMenu").css("display", "none");
}


function menuClick(p_option,obj) {
	if(p_option == "close")
	{
		$("#closeoption").attr('src', "images/drawable-xhdpi/click/CANCELPOPUP.png");
		$('#optionModel').modal('hide');
		$('#optionModelWithCluster').modal('hide');
	}
	else if(p_option == "save")
	{
		$("#saveoption").attr('src', "images/drawable-xhdpi/click/SAVEPOPUP.png");
		$('#optionModel').modal('hide');
	}
    else if(p_option == "share")
	{
		$("#shareoption").attr('src', "images/drawable-xhdpi/click/SHAREPOPUP.png");
		$('#optionModel').modal('hide');
	}else if(p_option == "report")
	{
		$("#reportoption").attr('src', "images/drawable-xhdpi/click/REPORTPOPUP.png");
		$('#optionModel').modal('hide');
		$('#optionModelWithCluster').modal('hide');
		showHideText();
		$("#hideVideo"+g_id).css("display","block");
		hideVideArr.push(g_id);
	}
	else if(p_option == "setting")
	{
		showSettingPage();
	}
}

function undoVideo(p_id)
{
	$("#hideVideo"+p_id).css("display","none");
	
	var position = hideVideArr.indexOf(p_id);
    hideVideArr.splice(position, 1);
}

function showSettingPage()
{
	pageName ="setting";
	$("#loadPage").load("settings.html",function(){
		$("#editCluster").css("display","block");
		$("#footer").css("display","none");
		$("#updateText").css("display","none");
		$(".searchIcon").css("display","none");
			$("#passwordUpdated").modal('hide');
	});
}

function showMenu()
{
	if(showHideFlag)
	{
		showHideFlag=false;
		$("#plusMenu4").attr('src', "images/drawable-xhdpi/MAINMENUON.png");
		$(".searchDiv").css("display","block");
		$(".searchDiv img").css("display","block");
		$("#footerOptions").css("display","block");
	}
	else
	{
		showHideFlag=true;
		$("#plusMenu4").attr('src', "images/drawable-xhdpi/MAINMENU.png");
		$(".searchDiv").css("display","none");
		$(".searchDiv img").css("display","none");
		$("#footerOptions").css("display","none");
	}
}

function populateData()
{
	if(pageName =="clusterlist")
	{
		pageName="";
		$("#videoSaved").modal('show');
	}
	pageName="main";
	$(".search-back-button").css("display","none");
	$("#footer").css("display","block");
	$("#header").css("display","block");
	$('body').removeAttr("style");
	$(".searchDiv").css("display","none");
	$(".searchDiv img").css("display","none");
	$(".searchDiv img").css("width","60%");
	$(".searchDiv img").css("height","75%");
	//$(".searchDiv").css("width","50%");
	$(".searchDiv").css("top","12px");
	$(".searchIcon").attr('src', "images/drawable-xhdpi/VIEWTEXT.png");
	$( ".searchDiv" ).unbind( "click" );
	$(".searchDiv").click(function(){
		showHideText();
	});

	
	$("#updateText").css("display","none");
	showHideFlag = true;
	$("#loadPage").load("main.html",function(){

		var l_length = g_videoLinks.length,i=0,str='';
		
		for(i=0;i<l_length;i++)
		{
			var videoID ="",l_imagePath = "";
			
			 videoID = g_videoLinks[i].substring((g_videoLinks[i].length-11),g_videoLinks[i].length);
			 l_imagePath = basePath+videoID+"/maxresdefault.jpg";
			if(i==1 || i==0)
			{
				l_imagePath = basePath+videoID+"/mqdefault.jpg";
			}
			
			str +='<div id="videoIcon'+i+'" class="bgWhiteTextBlack mt-4">'+
				
				  '<div id="thumbnailImg'+i+'" class="thumbnailImg" style="position:relative;">'+
					'<img id="img'+i+'" onclick="showvideo('+i+');" class="img100" src="'+l_imagePath+'">'+
					'<div id="hideVideo'+i+'" class="img100 hide-video">'+
						'<div>'+
							'<p class="hide-video-p thumbnailP multi-line-truncate" >Video Hidden <br/>from your Plüüdo</p>'+
						'</div>'+
						'<div style="margin-top:10%;">'+
						  ' <button class="undo-button" onclick="undoVideo('+i+');" type="button">UNDO</button>'+
						'</div>'+
					'</div>'+
					'</div>'+
					'<div id="thumbnailDetails'+i+'" class="thumbnailDetail">'+
					'<div class="thumbnailtext">'+
						'<p class="thumbnailP multi-line-truncate">'+g_text[i]+'</p>'+
					'</div>'+
					'<div class="controlicon" onclick="showOptionPopup('+i+');">'+					
						'<img class="controlimg" src="images/drawable-xhdpi/CONTROLSICON.png"/>'+
					'</div>'+
						'</div>'+
					'</div>';
			
		}
		
		$("#mainPageThumbnail").html(str);
		
		
		for(i=0;i<l_length;i++)
		{
			var l_height = $("#thumbnailImg"+i).height();
			$("#hideVideo"+i).css("height",l_height);
		}

	});
	
}

function showOptionPopup(p_id)
{
	g_id =p_id;
	if(savedToCluster)
	{
		$('#optionModelWithCluster').modal('show');
			
	}
	else{
			$('#optionModel').modal('show');		
	}
	
}

function showHideText()
{
	
	if(showHideFlag == true)
	{
		var l_length = g_videoLinks.length;
		for(var i=0;i<l_length;i++)
		{
			if(!hideVideArr.includes(i))
			{
				$("#thumbnailDetails"+i).css(
			 {
			 
			  "margin": "0px auto",
			  "transition": "all 2s linear",
			  "display": "block",
			  "box-shadow": "0px 0px 15px #e6e6e6",
			  "color":"black",
				"border-bottom-left-radius": "15px",
				"border-bottom-right-radius": "15px"
			});
			
				$("#img"+i).css({
					"border-radius": "0%",
					"border-top-left-radius": "15px",
					"border-top-right-radius": "15px"
				});
				
				$(".searchIcon").attr('src', "images/drawable-xhdpi/HIDETEXT.png");	
				showHideFlag =false;
				if(returnFlag)
				{
					$("#videoDescription"+g_id).css("display","block");
					$(".v-detail-p").css("visibility", "visible");

				}
			}
		}
		
	}
	else
	{
		showHideFlag =true;
		$(".img100").css({
			"border-radius": "15px"
		});
		$(".thumbnailDetail").css({"display":"none"});
		$(".searchIcon").attr('src', "images/drawable-xhdpi/VIEWTEXT.png");	
		if(returnFlag)
		{
			$("#videoDescription"+g_id).css("display","none");
			$(".v-detail-p").css("visibility", "hidden");
		}
		
		if(pageName == "cluster")
		{
			$(".show-label").css("display","none");
		}
		
	}
}

function displaySearch()
{	
	$("#loadPage").load("profileoptions.html",function(){
		pageName="search";
		$(".search-back-button").css("display","block");
		$("#footer").css("display","block");
		$("#searchContainer").css("display","block");
		$(".searchDiv").css("display","none");
		$("#videoSearchContainer").css("display","none");
		$("#searchResults").css("display", "none");
		$("#searchText").focus();
		
		$('.old-search img').on("click", function () {
			$(this).parent('div').fadeOut("slow");
		});
	
	
		$("#searchText").on("input", function (event) {
			
			$("#recentDetails").css("display", "none");
			$("#searchResults").css("display", "block");
			
			
		});
		
		

	});	
}

function clearSearchText()
{
	$("#recentDetails").css("display", "block");
	$("#searchResults").css("display", "none");
	$("#searchText").val('');
	$(".search-div img").css("display", "none");
	$("#searchText").focus();
	$('.old-search').fadeIn("slow");
	
}

function clearVideoSearchText()
{
	$("#videosearch").val('');
	$(".video-div img").css("display", "none");
	$("#searchBtn").css("background-color", "#D5DDE1")
	$("#videosearch").focus();
}


function showVideoDetails()
{
	pageName= "videoAdd";
	$(".video-details").css("display", "block");
	$(".infoOfSearch").css("display", "none");	
	
	$(".add-clustor-others-list").click(function(){
		$("#showVideoPopup").modal('hide');
		$("#videoSaved").modal('show');
		goToHome();	

	});
}
function displayAddVideo()
{
	if(loginFlag)
	{
			$("#videosearch").focus();
			
		
	/*$("#loadPage").load("profileoptions.html",function(){
		pageName="videosearch";
		$(".search-back-button").css("display","block");
		$("#footer").css("display","none");
		$(".searchDiv").css("display","none");
		$("#searchContainer").css("display","none");
		$("#videoSearchContainer").css("display","block");
		
		$("#videosearch").on("input", function (event) {
			$(".video-div img").css("display", "block");
			$("#searchBtn").css("background-color", "#00AFFF")
		});
		
		$("#videosearch").focus();
	});*/
		$("#showVideoPopup").modal('show');
		
		pageName="videosearch";
		$(".search-back-button").css("display","block");
	
		$("#searchContainer").css("display","none");
		$("#videoSearchContainer").css("display","block");
		$(".video-details").css("display", "none");
		$(".infoOfSearch").css("display", "block");	
		$("#videosearch").val("");
		$("#videosearch").on("input", function (event) {
			$(".video-div img").css("display", "block");
			$(".video-div img").attr("src","images/drawable-xhdpi/blackarrow.png");
			//$("#searchBtn").css("background-color", "#00AFFF");
			
		});
		
	}else{
		login();
	}

}


function goToHome()
{
	g_id="";
	returnFlag=false;
	populateData();

}

function searchVideo()
{
	$(".general-info").css("display", "none");
	$(".video-details").css("display", "block");
	
}


function backPage()
{
	if(pageName == "otherCluster")
	{
		pageName ="main";
		backOterDetails();	
	}
	else if(pageName == "setting")
	{
		pageName ="";
		addProfile();
	}
	else if(pageName == "changepassword" || pageName == "privacy")
	{
		showSettingPage();
	}
	else if(pageName == "removeVideo")
	{
			
	}
	else if(pageName == "otherprofile")
	{
		pageName ="main";
		backOterDetails();	
	}
	else if(pageName =="videosearch")
	{
		if ($('.general-info').css('display') == 'block') {
			populateData();	
		}
		else{
			$("#searchText").val('');
			$("#videosearch").val('');
			$(".video-details").css("display", "none");
			$(".general-info").css("display", "block");
				
		}
	}
	else if(pageName =="search")
	{
		populateData();
	}
	else if(pageName =="cluster")
	{
		
		$(".searchIcon").attr("src","images/drawable-xhdpi/prodilecorol.png");
		$(".searchDiv img").css("width","50%");
		$(".searchDiv img").css("height","auto");
		$(".searchDiv").css("top","18px");
		$( ".searchDiv" ).unbind( "click" );
		
		$("#updateText").css("display","none");
		$("#updateText").css("color","#A8BEC9");
		
		
		$( ".searchDiv" ).bind( "click", function(){
			$('#profileOptions').modal('show');
		} );

	
		if($("#editCluster").css("display") == "block")
		{
			$("#editCluster").css("display","none");
			$(".cluster-operation").css("display","block");
			$("#deleteVideoOperation").css("display","none");
			$(".cluster-details-operation").css("display","block");
			$("#mainPageThumbnail2").css("display","block");
			$("#mainPageThumbnail3").css("display","none");	
			$(".searchIcon").attr("src","images/drawable-xhdpi/VIEWTEXT.png");
			$(".searchDiv img").css("width","60%");
			$(".searchDiv img").css("height","75%");
		}
		else if($("#mainPageThumbnail2").css("display") == "none")
		{
			$("#mainPageThumbnail2").css("display","block");
			$("#mainPageThumbnail3").css("display","none");
			
			$(".cluster-operation").css("display","block");
			$("#deleteVideoOperation").css("display","none");
		
			$(".searchIcon").attr("src","images/drawable-xhdpi/VIEWTEXT.png");
			$(".searchDiv img").css("width","60%");
			$(".searchDiv img").css("height","75%");
			$(".searchDiv").css("display","block");	

		}
		else{
			pageName="";
			$("#profileContainer").css("display","block");
			$("#mainContainer").css("display","none");
		}
	}
	else if(pageName =="signup")
	{
		var l_text = $("#updateText").text();
		if(l_text == "LOGIN")
		{
			login();
		}
		else{
			
			if($("#forgotPassword").css("display") == "none" && $("#updateText").text() == "SIGNUP")
			{
					$("#loginPage1").css("display","none");
					$("#loginPage").css("display","none");
					$("#signupPage").css("display","block");
					$("#forgotPassword").css("display","none");
					$("#updateText").css("display","none");
					$("#updateText").text("LOGIN");
			}
			
			else if($("#forgotPassword").css("display") == "none")
			{
					$("#loginPage1").css("display","none");
					$("#loginPage").css("display","none");
					$("#signupPage").css("display","none");
					$("#forgotPassword").css("display","block");
					$("#updateText").css("display","none");
					$("#updateText").text("LOGIN");
			}
			else{
					$("#updateText").css("display","block");
					$("#updateText").text("SIGNUP");
					$("#loginPage1").css("display","block");
					$("#loginPage").css("display","none");
					$("#signupPage").css("display","none");
					$("#forgotPassword").css("display","none");
			}
		}
		
	}
	else if(pageName =="createuser")
	{
		signUp();
	}
	else
	{
		g_id="";
		returnFlag=false;
		populateData();
	}
}

function showvideo(p_id)
{
	g_id = p_id;
	$("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: "css/player.css",
	   id:"videoPlyer"
	}).appendTo("head");

	$("#loadPage").load("videodetail.html",function(){
		$("#header").css("display","none");
		$("#footer").css("display","none");
		$("#ctl00_ContentPlaceHolder1_FormView1_MyKusePlayer").attr("src",g_videoLinks[g_id]+"?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1");
		$("#videoPage").css("display","block");
		$("#youtubetext").css("display","block");
		$(".search-back-button").css("display","block");
		$(".popup-black").css("display","block");
		$("#mainContainer").css("display","none");
		
	});	
}

function closeVideo()
{	

	$("#ctl00_ContentPlaceHolder1_FormView1_MyKusePlayer").attr("src",'');
	$('head').find('link#videoPlyer').remove();  
	$("#videoPage").css("display","none");
	$("#mainContainer").css("display","block");
	$(".popup-black").css("display","none");
	$("#header").css("display","block");
	$("#footer").css("display","block");
	returnFlag=true;
	$("#videoIcon"+g_id).css("display","block");	

	var l_length = g_videoLinks.length,i=0,selectedVideo="",utubeheading='',mainBody="";
		
		for(i=0;i<l_length;i++)
		{
		
			var videoID ="",l_imagePath = "";
			
			videoID = g_videoLinks[i].substring((g_videoLinks[i].length-11),g_videoLinks[i].length);
			l_imagePath = basePath+videoID+"/maxresdefault.jpg";
			
			if(i==1 || i==0)
			{
				l_imagePath = basePath+videoID+"/mqdefault.jpg";
			}
			
			if(i == g_id)
			{
				selectedVideo = '<div id="videoIcon'+i+'" style="padding:0%" class="bgWhiteTextBlack">'+
				'<div id="beforeVideo'+i+'" >'+
				  '<div class="thumbnailImg">'+
					'<img id="img'+i+'" onclick="showvideo('+i+');" class="img100" src="'+l_imagePath+'">'+
					'</div>'+
					
					'<div class="thumbnailDetail">'+
					'<div class="thumbnailtext">'+
					'<p class="thumbnailP multi-line-truncate">'+g_text[i]+'</p>'+
					'</div>'+
					
						'<div class="controlicon" data-toggle="modal" data-target="#optionModel">'+					
					'<img class="controlimg" src="images/drawable-xhdpi/CONTROLSICON.png"/>'+
					'</div>'+
						'</div>'+
				'</div>'+
				'<div id="afterVideo'+i+'" style="display:none;" style="text-align:center;margin-top:2%;position: relative;">'+
							'<div style="position:fixed;z-index:1000;width:100%;top:6.8%;">'+
							'<div id="youtubetext" style="text-align:center;display:none;background-color:white;padding:1%;"><label class="youtube-text">YOUTUBE</label></div>'+
							'<div class="thumbnailImg">'+
								'<img id="imgAfter'+i+'" onclick="showvideo('+i+');" class="img100NoBorder" src="'+l_imagePath+'">'+
							'</div></div>'+
							'<div style="width:100%;text-align:center;position: relative;margin-top:250px;">'+

								'<div style="width:20%;display:inline-block;" onclick="showAllClusters();">'+
									'<p class="v-detail-p colorgrey2">SAVE</p>'+
									'<img src="images/drawable-xhdpi/SaveSmall.png" width="55%" height="100%">'+
								'</div>'+
								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">SHARE</p>'+
									'<img src="images/drawable-xhdpi/SearchSmall.png" width="55%" height="100%">'+
								'</div>'+
								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">REPORT</p>'+
									'<img src="images/drawable-xhdpi/ReportSmall.png" width="55%" height="100%">'+
								'</div>'+
								
								'<div style="width:20%;">'+
									'<img style="position: absolute;right: 25px;top: 32px;width: 12px;height: 20px;" src="images/drawable-xhdpi/NEXTVIDEOARROW.png" width="30%" height="100%">'+
								'</div>'+

							'</div>'+
							'<div style="position: relative;text-align: center;">'+
							
								'<div>'+
									'<div style="margin-top:2%;">'+
										'<label id="itemName'+i+'" style="font-family:montserratRegular;font-size:18px;margin-top:4%;color: black;" onclick="showOtherClusterDetails();">Air Purifiers</label>'+
									'</div>'+
									'<div><div style="margin-top:2%;position: relative;">'+
										'<img onclick="showOtherProfile();" style="width: 10%;" src="images/drawable-xhdpi/ProfilePic.png" >'+
										'<div id="editVideoCluster" onclick="showRemoveVideo();" style="position: absolute;right:10px;width:10%;bottom:10px;display:none;"  >'+
											'<p class="v-detail-p colorgrey2">EDIT</p>'+
											'<img src="images/drawable-xhdpi/editnobg.png" width="40%" height="100%">'+
												
											'</div>'+
										
											
									'</div>'+
								
									'<div onclick="showOtherProfile();" style="margin-top:2%;">'+
										'<label style="font-family:montserratBold;font-size:12px;font-weight:700;color: black;">DysonOfficial</label>'+
									'</div></div>'+
								'</div>'+
								'<div id="videoDescription'+i+'" style="display:none;">'+
								'<div id="itemDescription'+i+'" class="v-main-desc">'+
									'<span>The Dyson Pure Cool™ Personal Purifying Fan Technology</span>'+
								'</div>'+

								'<div id="itemDetails'+i+'" class="v-main-detail">'+
									'<span >Personally made by @paulnicklen. I have seen a  seal rest in more comfortable positions than a superb photography example.</span>'+

								'</div>'+
								'</div>'+
								'<label class="similar-video colorgrey2" id="similarVideo">SIMILAR</label>'+
							'</div>'+
						'</div>'+
				'</div>';
			}
			else
			{
				
			mainBody +='<div id="videoIcon'+i+'" class="bgWhiteTextBlack mt-4">'+
				'<div id="beforeVideo'+i+'" >'+
				  '<div class="thumbnailImg">'+
					'<img id="img'+i+'" onclick="showvideo('+i+');" class="img100" src="'+l_imagePath+'">'+
					'</div>'+
					
					'<div class="thumbnailDetail">'+
					'<div class="thumbnailtext">'+
					'<p class="thumbnailP multi-line-truncate">'+g_text[i]+'</p>'+
					'</div>'+
					
						'<div class="controlicon" data-toggle="modal" data-target="#optionModel">'+					
					'<img class="controlimg" src="images/drawable-xhdpi/CONTROLSICON.png"/>'+
					'</div>'+
						'</div>'+
				'</div>'+
				'<div id="afterVideo'+i+'" onclick="showvideo('+i+');" style="display:none;" style="text-align:center;margin-top:2%;position: relative;">'+

							'<div class="thumbnailImg">'+
								'<img id="imgAfter'+i+'" class="img100NoBorder" src="'+l_imagePath+'">'+
							'</div>'+
							'<div style="width:100%;float:left;text-align:center;position: relative;margin-top:4%;">'+

								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">SAVE</p>'+
									'<img src="images/drawable-xhdpi/SaveSmall.png" width="55%" height="100%">'+
								'</div>'+
								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">SHARE</p>'+
									'<img src="images/drawable-xhdpi/SearchSmall.png" width="55%" height="100%">'+
								'</div>'+
								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">REPORT</p>'+
									'<img src="images/drawable-xhdpi/ReportSmall.png" width="55%" height="100%">'+
								'</div>'+

								'<div style="width:20%;">'+
									'<img style="position: absolute;right: 5px;top: 32px;width: 12px;height: 20px;" src="images/drawable-xhdpi/NEXTVIDEOARROW.png" width="30%" height="100%">'+
								'</div>'+

							'</div>'+
							'<div style="position: relative;text-align: center;">'+
							
								'<div>'+
									'<div style="margin-top:2%;">'+
										'<label id="itemName'+i+'" style="font-family:montserratRegular;font-size:18px;margin-top:4%;color: black;">Air Purifiers</label>'+
									'</div>'+
									'<div style="margin-top:2%;">'+
										'<img style="width: 10%;" src="images/drawable-xhdpi/ProfilePic.png" >'+
									'</div>'+
									'<div style="margin-top:2%;">'+
										'<label style="font-family:montserratBold;font-size:12px;font-weight:700;color: black;">DysonOfficial</label>'+
									'</div>'+
								'</div>'+
								'<div id="videoDescription'+i+'" style="display:none;">'+
								'<div id="itemDescription'+i+'" class="v-main-desc">'+
									'<span>The Dyson Pure Cool™ Personal Purifying Fan Technology</span>'+
								'</div>'+

								'<div id="itemDetails'+i+'" class="v-main-detail">'+
									'<span >Personally made by @paulnicklen. I have seen a  seal rest in more comfortable positions than a superb photography example.</span>'+

								'</div>'+
								'</div>'+
								'<label class="similar-video colorgrey2" id="similarVideo">SIMILAR</label>'+
							'</div>'+
						'</div>'+
				'</div>';
			}
		}
		
		
		$("#mainPageThumbnail1").html(utubeheading+selectedVideo);
		$("#mainPageThumbnail2").html(mainBody);

		if(g_id !== null && g_id !== "")
		{
			$("#beforeVideo"+g_id).css("display","none");
			$("#afterVideo"+g_id).css("display","block");
			$("#youtubetext").css("display","block");
			$(".search-back-button").css("display","block");
		}
		
	if(pageName == "cluster")
	{
		$("#editVideoCluster").css("display","block");
	}
	else{
		$("#editVideoCluster").css("display","none");
	}
}

function addProfile()
{
	if(loginFlag)
	{
		$("#loadPage").load("addprofile.html",function(){
			$(".add-clustor-others").click(function(){
			   showClustorDetails();
			});
			$(".search-back-button").css("display","block");
			$(".searchIcon").attr("src","images/drawable-xhdpi/prodilecorol.png");
			$(".searchDiv img").css("width","50%");
			$(".searchDiv img").css("height","auto");
			$(".searchDiv").css("top","18px");
			$( ".searchDiv" ).unbind( "click" );
			$( ".searchDiv" ).bind( "click", function(){
				$('#profileOptions').modal('show');
			} );
			$("#makeClustor").on("input", function (event) {
				$(".profile-plus").attr("src", "images/drawable-xhdpi/ADD.png");
				$(".clear-profile-add").css("display","block");
			});
			
		});
	
		if(pageName =="updateVideo")
		{
			$("#updateText").css("display","none");
			setTimeout(function(){
				showClustorDetails();
				$('#videoUpdated').modal('show');
			}, 50);
	
		}
		else if(pageName =="removeVideo")
		{
			$("#updateText").css("display","none");
			setTimeout(function(){
				showClustorDetails();
				$('#videoRemoved').modal('show');
			}, 50);
	
		}
			
	}
	else{
		login();
	}
}

function clearProfileAdd()
{
	$(".profile-plus").attr("src", "images/drawable-xhdpi/profileplus.png");
	$(".clear-profile-add").css("display","none");
	$("#makeClustor").val("");
}

function showClustorDetails()
{
		$(".searchIcon").attr("src","images/drawable-xhdpi/VIEWTEXT.png");
		$(".searchDiv img").css("width","60%");
		$(".searchDiv img").css("height","75%");
		pageName="cluster";
		var l_length = g_videoLinks.length,i=0,selectedVideo="",utubeheading='',mainBody="",str="";
		
		for(i=0;i<l_length;i++)
		{
		
			var videoID ="",l_imagePath = "";
			
			videoID = g_videoLinks[i].substring((g_videoLinks[i].length-11),g_videoLinks[i].length);
			l_imagePath = basePath+videoID+"/maxresdefault.jpg";
			
			if(i==1 || i==0)
			{
				l_imagePath = basePath+videoID+"/mqdefault.jpg";
			}
			
			if(i == g_id)
			{
				selectedVideo = '<div style="text-align:center;">'+
				
									'<div class="cluster-details-operation"><div id="youtubetext" style="text-align:center;"><label class="total-video">7 VIDEOS</label></div><div >'+
									   '<label class="cluster-name" id="clusterId" >Sky Fly</label>'+
									   
									'</div>'+
								  
									'<div  class="profile-detail">'+
									   '<span id="profileDetails">A Collection of fantastic air planes, selected From the range of manu different Websites from all across the net and also you can now make a new cluster esily with the help of a new tool.</span>'+
									'</div>'+
									
									'<div  class="profile-detail extra-details" style="display:none;">'+
									   '<span id="profileDetailsExtra">#recipe #food #veg #cook #delicious</span>'+
									'</div>'+
									
									 '<div id="profileMore">'+
									  
										'<span  class="more-details" onclick="showMoreClusterData();">More...</span>'+
									'</div></div>'+
									
									'<div class="cluster-operation">'+
											'<div class="delete-operation">'+
												'<img style="position: absolute;left:12px;width:18%;font-size: 10px;" class="" onclick="showDeleteVideo();"  src="images/drawable-xhdpi/DELETECLUSTER.png">'+
												'<label class="remove-label show-label colorgrey3">REMOVE VIDEO</label>'+
											'</div>'+
											'<div class="edit-operation" >'+
											'<label class="edit-label show-label colorgrey3">EDIT</label>'+
												'<img style="position: absolute;right:12px;width:18%;" class="" onclick="editClusterInfo();" src="images/drawable-xhdpi/EDITCLUSTER.png">'+
												
											'</div>'+
									'</div>'+
									'<div id="deleteVideoOperation" style="display:none;"><div class="old-search" style="margin-top:3%;z-index:1;left: 50%;transform: translate(-50%, 0);">'+
										'<button id="removeVideo"  onclick="removeVideos();" class="btn btn-default btn-sm" style="border-radius: 30px;width: 170px; height: 40px;background-color: #A8BEC9; font-family: montserratRegular; color: white; outline: none; border-color: transparent;font-size: 12px;font-weight:700;">REMOVE VIDEOS</button>'+
										'<img class="cancel-remove" onclick="cancelSelection();" src="images/drawable-xhdpi/SEARCHCANCEL.png"> '+
										
									'</div>'+
									
									'<div style="text-align:center;margin-top:2%;">'+
											'<label class="video-title-edit" id="instruction3">SELECT VIDEOS TO REMOVE</label>'+
									'</div></div>'+
									 
									'<div id="editCluster" style="display:none;">'+
									'<div style="text-align:center;margin-top:2%;">'+
										'<label class="cluster-title-edit" id="instruction3">Edit Cluster</label>'+
										
								'</div>'+
					  
								'<div style="text-align:center;margin-top:4%;">'+
										'<label class="video-title" id="videoTitle">Cluster Name</label>'+
										
										'<div class="cluster-title-desc">'+
											'<span class="textarea none" role="textbox" contenteditable="true">The Dyson Pure Cool™ Personal Purifying Fan Technology</span>'+
										'</div>'+
										
								'</div>'+
								
									'<div style="text-align:center;margin-top:4%;">'+
										'<label class="video-title" id="videoDescription">Description</label>'+
										
										'<div class="cluster-desc">'+
											'<span class="textarea none" role="textbox" contenteditable>Personally made by @paulnicklen. I have seen a  seal rest in more comfortable positions than a superb photography example.</span>'+
											
										'</div>'+
										
								'</div>'+
								
								'<div style="text-align:center;margin-top:4%;">'+
										'<label class="video-title" id="videoHashTag">Hash Tags</label>'+
										
										'<div class="cluster-desc">'+
											'<span class="textarea none" role="textbox" contenteditable>#dyson #fan #technology</span>'+
											
										'</div>'+
										
								'</div>'+
								
								'<div id="deleteVideoOperation"><div class="old-search" style="margin-top:3%;z-index:1;left: 50%;transform: translate(-50%, 0);">'+
										'<button id="removeVideo" class="btn btn-default btn-sm" style="border-radius: 30px;width: 170px; height: 40px;background-color: #D5DDE1; font-family: montserratRegular; color: white; outline: none; border-color: transparent;font-size: 12px;font-weight:700;">DELETE THIS CLUSTER</button>'+
										'<img class="cancel-remove" src="images/drawable-xhdpi/SEARCHCANCEL.png"> '+
										
									'</div>'+
								
								'</div>'+
								
									 '</div>';
			}
			else
			{
				
			mainBody +='<div id="videoIcon'+i+'" class="bgWhiteTextBlack mt-4">'+
				'<div id="beforeVideo'+i+'" >'+
				  '<div class="thumbnailImg">'+
					'<img id="img'+i+'" onclick="showvideo('+i+');" class="img100" src="'+l_imagePath+'">'+
					'</div>'+
					
					'<div class="thumbnailDetail">'+
					'<div class="thumbnailtext">'+
					'<p class="thumbnailP multi-line-truncate">'+g_text[i]+'</p>'+
					'</div>'+
					
						'<div class="controlicon" data-toggle="modal" data-target="#optionModel">'+					
					'<img class="controlimg" src="images/drawable-xhdpi/CONTROLSICON.png"/>'+
					'</div>'+
						'</div>'+
				'</div>'+
				'<div id="afterVideo'+i+'" onclick="showvideo('+i+');" style="display:none;" style="text-align:center;margin-top:2%;position: relative;">'+

							'<div class="thumbnailImg">'+
								'<img id="imgAfter'+i+'" class="img100NoBorder" src="'+l_imagePath+'">'+
							'</div>'+
							'<div style="width:100%;float:left;text-align:center;position: relative;margin-top:4%;">'+

								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">SAVE</p>'+
									'<img src="images/drawable-xhdpi/SaveSmall.png" width="55%" height="100%">'+
								'</div>'+
								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">SHARE</p>'+
									'<img src="images/drawable-xhdpi/SearchSmall.png" width="55%" height="100%">'+
								'</div>'+
								'<div style="width:20%;display:inline-block;">'+
									'<p class="v-detail-p colorgrey2">REPORT</p>'+
									'<img src="images/drawable-xhdpi/ReportSmall.png" width="55%" height="100%">'+
								'</div>'+

								'<div style="width:20%;">'+
									'<img style="position: absolute;right: 5px;top: 32px;width: 12px;height: 20px;" src="images/drawable-xhdpi/NEXTVIDEOARROW.png" width="30%" height="100%">'+
								'</div>'+

							'</div>'+
							'<div style="position: relative;text-align: center;">'+
							
								'<div>'+
									'<div style="margin-top:2%;">'+
										'<label id="itemName'+i+'" style="font-family:montserratRegular;font-size:18px;margin-top:4%;color: black;">Air Purifiers</label>'+
									'</div>'+
									'<div style="margin-top:2%;">'+
										'<img style="width: 10%;" src="images/drawable-xhdpi/ProfilePic.png" >'+
									'</div>'+
									'<div style="margin-top:2%;">'+
										'<label style="font-family:montserratBold;font-size:12px;font-weight:700;color: black;">DysonOfficial</label>'+
									'</div>'+
								'</div>'+
								'<div id="videoDescription'+i+'" style="display:none;">'+
								'<div id="itemDescription'+i+'" class="v-main-desc">'+
									'<span>The Dyson Pure Cool™ Personal Purifying Fan Technology</span>'+
								'</div>'+

								'<div id="itemDetails'+i+'" class="v-main-detail">'+
									'<span >Personally made by @paulnicklen. I have seen a  seal rest in more comfortable positions than a superb photography example.</span>'+

								'</div>'+
								
								'</div>'+
								'<label class="similar-video colorgrey2" id="similarVideo">SIMILAR</label>'+
							'</div>'+
						'</div>'+
				'</div>';
			}
		}
		
		var j=0;
		for(i=0;i<l_length;i+=2)
		{
			var videoID1 = g_videoLinks[i].substring((g_videoLinks[i].length-11),g_videoLinks[i].length);
			
			var l_imagePath2  ="";
			var videoID2="";
			
			var l_imagePath1 = basePath+videoID1+"/maxresdefault.jpg";
			
			if(i == 0 || i==1)
			{
				l_imagePath1 = basePath+videoID1+"/mqdefault.jpg";
			}
			
			if(i == l_length-1)
			{
				if(l_length % 2 == 0)
				{
					videoID2 = g_videoLinks[i+1].substring((g_videoLinks[i+1].length-11),g_videoLinks[i+1].length);
					l_imagePath2 = basePath+videoID2+"/maxresdefault.jpg";	
				}
				
			}
			else{
			
				videoID2 = g_videoLinks[i+1].substring((g_videoLinks[i+1].length-11),g_videoLinks[i+1].length);
				l_imagePath2 = basePath+videoID2+"/maxresdefault.jpg";
			}
			
			str +='<div id="clusterVideo'+i+'" class="bgWhiteTextBlack mt-4">'+
					
			'<div class="thumbnailImg">'+
				'<img id="imgCluster'+i+'" onclick="selectVideo('+i+');" class="img50" src="'+l_imagePath1+'">';
				
			if(i == l_length-1)
			{
				if(l_length % 2 == 0)
				{
					var k= i+"1";
						str +='<img id="imgCluster'+i+1+'" onclick="selectVideo('+"'"+k+"'"+');" class="img50" src="'+l_imagePath2+'">';
				}
				
			}
			else
			{
				var k= i+"1";
				str +='<img id="imgCluster'+i+1+'" onclick="selectVideo('+"'"+k+"'"+');" class="img50" src="'+l_imagePath2+'">';
			}
				
			str +='</div>'+
			'</div>';
			
		}
		
		$("#mainPageThumbnail1").html(selectedVideo);
		$("#mainPageThumbnail2").html(mainBody);
		$("#profileMore").val("More...");
		$("#mainPageThumbnail3").html(str);
		$(".cluster-details-operation").css("display","block");
		$("#mainContainer").css("display","block");
		$("#profileContainer").css("display","none");
		
		$("#mainPageThumbnail2").css("display","block");
		$("#mainPageThumbnail3").css("display","none");
	
		$(".search-back-button").css("display","block");
		
		$( ".searchDiv" ).unbind( "click" );
		$(".searchDiv").click(function(){
			$(".show-label").css("display","block");
			showHideText();
		}); 

}

function removeVideos()
{
	$("#mainPageThumbnail2").css("display","none");
	$("#mainPageThumbnail3").css("display","block");
}

function selectVideo(p_id)
{
	$("#imgCluster"+p_id).css("border","1px solid #00AFFF");
	$("#removeVideo").css("background-color","#00AFFF");
	$(".cancel-remove").css("display","block");
	selectVideoToDlt += p_id+"~";
}

function cancelSelection()
{
	$(".cancel-remove").css("display","none");
	var l_str = selectVideoToDlt.split("~");
	for(var i=0;i<l_str.length-1;i++)
	{
		$("#imgCluster"+l_str[i]).css("border","0px solid #00AFFF");
	}
	$("#removeVideo").css("background-color","#A8BEC9");
	selectVideoToDlt="";
}

function showDeleteVideo()
{
	$(".cluster-operation").css("display","none");
	$("#deleteVideoOperation").css("display","block");
	$("#mainPageThumbnail2").css("display","none");
	$("#mainPageThumbnail3").css("display","block");
	$(".searchDiv").css("display","none");
	
}


function editClusterInfo()
{
	$("#editCluster").css("display","block");
	$(".cluster-operation").css("display","none");
	$("#deleteVideoOperation").css("display","none");
	$(".cluster-details-operation").css("display","none");
	$("#mainPageThumbnail2").css("display","none");
	$("#mainPageThumbnail3").css("display","none");
	$("#updateText").text("Update");
	$("#updateText").css("display","block");
	$("#updateText").css("bottom","-15px");
	$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEGREY.png");
	$(".searchDiv img").css("width","50%");
	$(".searchDiv img").css("height","auto");
	$( ".searchDiv" ).unbind( "click" );
	$( ".searchDiv" ).bind( "click", function(){
		$('#clusterUpdated').modal('show');
		$("#clusterUpdated").click(function(){
			backPage();
		});
	});
	
	$(".cluster-title-desc span").on("input",function(event){
		$("#updateText").css("display","block");
		$("#updateText").css("color","#00AFFF");
		$("#updateText").text("Update");
		$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEBLUE.png");
	});
	
	$(".cluster-desc span").on("input", function (event) {
		$("#updateText").css("display","block");
		$("#updateText").css("color","#00AFFF");
		$("#updateText").text("Update");
		$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEBLUE.png");
	});
}

function showMoreClusterData()
{
	if(showHideFlag)
	{
		showHideFlag =false;
		$("#profileMore span").text("Less...");
		$(".extra-details").css("display","block");
	}
	else
	{
		showHideFlag=true;
		$("#profileMore span").text("More...");
		$(".extra-details").css("display","none");
	}
	
}

function login()
{
	pageName="login";
	loginFlag = true;

	$("#loadPage").load("login.html",function(){
		$(".col100").css("height",(window.innerHeight-5)+"px");
		$("#header").css("display","none");
		$("#footer").css("display","none");
		$('body').css({"background-image":"url('images/drawable-xhdpi/Login_Screen.jpg')","background-repeat": "no-repeat",
			"background-position": "center center","background-size":"cover"
		});
		
		
	});
}

function clearEmail()
{
	$("#emailid").val('');
	$(".signup-div img").css("display", "none");
	$("#continueLogin").css("background-color", "#D5DDE1");
	$("#emailid").css("border-bottom", "0px");
}

function clearResetEmail()
{
	$("#forgotEmailid").val('');
	$(".signup-div img").css("display", "none");
	$("#resetPassword").css("background-color", "#D5DDE1");
	$("#forgotEmailid").css("border-bottom", "0px");
}

function clearUserName()
{
	$("#username").val('');
	$("#usernameCross").css("display", "none");
	$("#createUser").css("background-color", "#D5DDE1");
	$("#username").css("border-bottom", "0px");
}


function clearLoginUserName()
{
	$("#username1").val('');
	$("#usernameCross1").css("display", "none");
}

function clearExiting()
{
	$("#exitingpassword").val('');
	$("#exituserCross").css("display", "none");
}

function clearNewPass()
{
	$("#newpassword").val('');
	$("#newpasswordcross").css("display", "none");
}

function clearPassword()
{
	//$("#password").val('');
	//$("#passwordCross").css("display", "none");
	$("#createUser").css("background-color", "#D5DDE1");
	//$("#password").css("border-bottom", "0px");
	
}

function signUp()
{
	pageName="signup";
	loginFlag = true;
	
	$("#loadPage").load("signup.html",function(){
		$('body').removeAttr("style");
		$("#header").css("display","block");
		$("#footer").css("display","none");
		$(".search-back-button").css("display","block");
		$(".extra-details").css("display","block");
		$("#updateText").text("LOGIN");
		$("#updateText").unbind( "click");
		$("#updateText").bind( "click", function(){
				showLoginRelated("login1");
		});
		$("#updateText").css("display","block");
		$(".searchDiv").css("display","none");
		$("#updateText").css("bottom","8px");
		$("#signupPage").css("display","block");
		$("#loginPage").css("display","none");
		$("#emailid").val('');
		$("#emailid").on("input", function (event) {
			$(".signup-div img").css("display", "block");
			$("#continueLogin").css("background-color", "black");
			$("#emailid").css("border-bottom", "1px solid black");
			
		});
		
		$("#username").on("input", function (event) {
			$("#usernameCross").css("display", "block");
			$("#createUser").css("background-color", "black");
			$("#username").css("border-bottom", "1px solid black");
			
		});
		
		$("#password").on("input", function (event) {
			$("#passwordCross").css("display", "block");
			$("#createUser").css("background-color", "black");
			$("#password").css("border-bottom", "1px solid black");
			
		});
		
	});
}

function openLoginPage()
{
	pageName="createuser";
	$("#signupPage").css("display","none");
	$("#loginPage").css("display","block");
}

function showPassword()
{
	if(showHideFlag)
	{
		showHideFlag=false;
		$("#password").attr("type", "text");
		$("#passwordCross").attr("src","images/drawable-xhdpi/PASSWORDVIEWCLOSE.png");
	}
	else
	{
		showHideFlag=true;
		$("#password").attr("type", "password");
		$("#passwordCross").attr("src","images/drawable-xhdpi/PASSWORDVIEW.png");
	}
}

function showPassword1()
{
	if(showHideFlag)
	{
		showHideFlag=false;
		$("#password1").attr("type", "text");
		$("#passwordCross1").attr("src","images/drawable-xhdpi/PASSWORDVIEWCLOSE.png");
	}
	else
	{
		showHideFlag=true;
		$("#password1").attr("type", "password");
		$("#passwordCross1").attr("src","images/drawable-xhdpi/PASSWORDVIEW.png");
	}
}

function showAllClusters()
{
	pageName ="clusterlist";
	//$('#videoSaved').modal('hide');
	$("#makeClustor").on("input", function (event) {
			$(".profile-plus").attr("src", "images/drawable-xhdpi/ADD.png");
			$(".clear-profile-add").css("display","block");
		});
	$("#showClusterList").modal('show');
	var l_heigth = window.innerHeight;
	$(".cluster-list").css("height", (l_heigth-(l_heigth*0.20))+"px");
	
	
	$(".add-clustor-others-list").click(function(){
		$("#showClusterList").modal('hide');
		$("#optionModelWithCluster").modal('hide');
		$("#optionModel").modal('hide');
		savedToCluster=true;
		goToHome();	
	});
	
	$("#videoSaved").click(function(){
		
		$("#videoSaved").modal('hide');
	});
}

function saveInCluster()
{
	$(".cluster-list").css("display","block");	
}

function hideClusterList()
{
	$('#showClusterList').modal('hide');	
}

function recentClusterSave()
{
	$('#optionModelWithCluster').modal('hide');
	$('#videoSaved').modal('show');
}

function shareVideo()
{
	if (navigator.share) {
		  navigator.share({
			title: 'web.dev',
			text: 'Check out web.dev.',
			url: 'https://web.dev/',
		  })
			.then(() => console.log('Successful share'))
			.catch((error) => console.log('Error sharing', error));
		}
}

function showOtherClusterDetails()
{
	$("#loadPage").load("otherclusterdetails.html",function(){
		$("#footer").css("display","block");
		$("#header").css("display","block");
		pageName="otherCluster";
	});
}


function backOterDetails()
{
	$("#loadPage").load("videodetail.html",function(){
		$("#header").css("display","block");
		$("#footer").css("display","block");
		$("#ctl00_ContentPlaceHolder1_FormView1_MyKusePlayer").attr("src",g_videoLinks[g_id]+"?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1");
		$("#videoPage").css("display","none");
		$("#youtubetext").css("display","none");
		$(".search-back-button").css("display","block");
		$(".popup-black").css("display","none");
		$("#mainContainer").css("display","block");
		closeVideo();
		
	});	
}

function showOtherProfile()
{
	pageName="otherprofile";
	$("#loadPage").load("otheruserprofile.html",function(){
		$(".add-clustor-others").click(function(){
		   showOtherClusterDetails();
		});
		$(".search-back-button").css("display","block");

		$( ".searchDiv" ).css("display","none");
		
	});
}

function showRemoveVideo()
{
	pageName="updateVideo";
	$("#loadPage").load("removevideo.html",function(){
	$("#updateText").text("Update");
	$("#updateText").css("display","block");
	$("#updateText").css("bottom","-15px");
	$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEGREY.png");
	$(".searchDiv img").css("width","50%");
	$(".searchDiv img").css("height","auto");
	$(".searchDiv" ).unbind( "click" );
	$(".searchDiv" ).bind( "click", function(){
		
		addProfile();		
		
	});
	
	$(".edit-title-desc span").on("input",function(event){
		$("#updateText").css("display","block");
		$("#updateText").css("color","#00AFFF");
		$("#updateText").text("Update");
		$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEBLUE.png");
	});
	
	$(".edit-desc span").on("input", function (event) {
		$("#updateText").css("display","block");
		$("#updateText").css("color","#00AFFF");
		$("#updateText").text("Update");
		$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEBLUE.png");
	});
	
	});
}


function deleteClusterVideo()
{
	$("#videoDelete").modal('show');	
}

function showProfileOptions()
{
	$("#profileEditOptions").modal('show');	
}



function removeButton()
{
	pageName="removeVideo";
	addProfile();		
}

function showLoginRelated(p_option)
{
	if(p_option =="goback")
	{
		    $("#updateText").css("display","block");
			$("#updateText").text("SIGNUP");
			$("#loginPage1").css("display","block");
			$("#loginPage").css("display","none");
			$("#signupPage").css("display","none");
			$("#forgotPassword").css("display","none");
			$("#updateText").unbind("click");
			$("#updateText").bind("click", function(){
				showLoginRelated("login1");
			});
	}
	else if(p_option =="login1")
	{
		if($("#updateText").text() =="LOGIN")
		{
			$("#updateText").css("display","block");
			$("#updateText").text("SIGNUP");
			$("#loginPage1").css("display","block");
			$("#loginPage").css("display","none");
			$("#signupPage").css("display","none");
			$("#forgotPassword").css("display","none");
		}
		else
		{
			$("#updateText").text("LOGIN");
			$("#loginPage1").css("display","none");
			$("#loginPage").css("display","none");
			$("#signupPage").css("display","block");
			$("#forgotPassword").css("display","none");
		}
	
		$("#username1").on("input", function (event) {
			$("#usernameCross1").css("display", "block");
			$("#createUser1").css("background-color", "black");
			
			
		});
		
		$("#password1").on("input", function (event) {
			$("#passwordCross1").css("display", "block");
			$("#createUser1").css("background-color", "black");
		
		});
	}
	else if(p_option =="login")
	{
		$("#loginPage1").css("display","none");
		$("#loginPage").css("display","block");
		$("#signupPage").css("display","none");
		$("#forgotPassword").css("display","none");
		
	}else if(p_option =="signup")
	{
		$("#loginPage1").css("display","none");
		$("#loginPage").css("display","none");
		$("#signupPage").css("display","block");
		$("#forgotPassword").css("display","none");
	}
	else if(p_option =="forgotPassword")
	{
		$("#loginPage1").css("display","none");
		$("#loginPage").css("display","none");
		$("#signupPage").css("display","none");
		$("#forgotPassword").css("display","block");
		$("#updateText").css("display","none");
		//$("#updateText").text("LOGIN");
		$("#forgotEmailid").on("input", function (event) {
			$(".signup-div img").css("display", "block");
			$("#resetPassword").css("background-color", "black");
		});
	}
}

function showResetConfirm()
{
	$("#loadPage").load("resetpassword.html",function(){
		$("#footer").css("display","block");
		$("#header").css("display","block");
		$(".search-div").css("display","none");
		$("#updateText").css("display","none");
		
		pageName="resetConfirm";
	});
}


function showLogin()
{
	pageName="signup";
	loginFlag = true;
	
	$("#loadPage").load("signup.html",function(){
		$('body').removeAttr("style");
		$("#header").css("display","block");
		$("#footer").css("display","none");
		$(".search-back-button").css("display","block");
		$(".extra-details").css("display","block");
		$("#updateText").text("SIGNUP");
		$("#updateText").unbind( "click");
		$("#updateText").bind( "click", function(){
				showLoginRelated("login1");
		});
		$("#updateText").css("display","block");
		$(".searchDiv").css("display","none");
		$("#updateText").css("bottom","8px");
		$("#signupPage").css("display","none");
		$("#loginPage1").css("display","block");
		$("#emailid").val('');
		$("#emailid").on("input", function (event) {
			$(".signup-div img").css("display", "block");
			$("#continueLogin").css("background-color", "black");
			$("#emailid").css("border-bottom", "1px solid black");
			
		});
		
		$("#username").on("input", function (event) {
			$("#usernameCross").css("display", "block");
			$("#createUser").css("background-color", "black");
			$("#username").css("border-bottom", "1px solid black");
			
		});
		
		$("#password").on("input", function (event) {
			$("#passwordCross").css("display", "block");
			$("#createUser").css("background-color", "black");
			$("#password").css("border-bottom", "1px solid black");
			
		});
		
	});
}


function showPasswordHelp()
{
	$("#loadPage").load("signup.html",function(){
		$('body').removeAttr("style");
		$("#header").css("display","block");
		$("#footer").css("display","none");
		$(".search-back-button").css("display","block");
		$(".extra-details").css("display","block");
		
		$("#loginPage1").css("display","none");
		$("#loginPage").css("display","none");
		$("#signupPage").css("display","none");
		$("#forgotPassword").css("display","block");
		$("#updateText").css("display","none");
		//$("#updateText").text("LOGIN");
		$("#forgotEmailid").on("input", function (event) {
			$(".signup-div img").css("display", "block");
			$("#resetPassword").css("background-color", "black");
		});
	});
}

		
function showEditProfile()
{
	$("#loadPage").load("edituserprofile.html",function(){
		$('body').removeAttr("style");
		$("#header").css("display","block");
		$("#footer").css("display","none");
		$(".search-back-button").css("display","block");
		$("#updateText").text("Update");
		$("#updateText").css("display","block");
		$("#updateText").css("bottom","-15px");
		$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEGREY.png");
		$(".searchDiv img").css("width","50%");
		$(".searchDiv img").css("height","auto");
		$( ".searchDiv" ).unbind( "click" );
		$( ".searchDiv" ).bind( "click", function(){
			
		});
		
		$(".edit-profile-value").on("input",function(event){
			$("#updateText").css("display","block");
			$("#updateText").css("color","#00AFFF");
			$("#updateText").text("Update");
			$(".searchIcon").attr("src","images/drawable-xhdpi/UPDATEBLUE.png");
		});
		
	});
}

function editprofileOptions(p_option)
{
	if(p_option == "close")
	{
		$("#profileEditOptions").modal('hide');
	}
	else if(p_option == "removephoto")
	{
		$("#removePhoto").css('display','none');
		$("#profileEditOptions").modal('hide');
		$("#editProfileImg").attr("src","images/drawable-xhdpi/PROFILE.png");
	}
}

function  showChangePassword()
{
	pageName="changepassword";
	
	$("#loadPage").load("changepassword.html",function(){
		
		$("#header").css("display","block");
		$("#footer").css("display","none");
		$(".search-back-button").css("display","block");
		
		$(".searchDiv").css("display","none");
		$("#updateText").css("display","none");
		
		$("#exitingpassword").on("input", function (event) {
			$("#exituserCross").css("display", "block");
			$("#updatepassword").css("background-color", "black");
		
		});
		
		$("#newpassword").on("input", function (event) {
			$("#newpasswordcross").css("display", "block");
			$("#updatepassword").css("background-color", "black");
		
		});
		
		$("#retypepassword").on("input", function (event) {
			$("#retypepasseye").css("display", "block");
			$("#updatepassword").css("background-color", "black");
		
		});
	});
}

function showUpdatedModel()
{
	$('#passwordUpdated').modal('show');
}

function showRetypePassword()
{
	if(showHideFlag)
	{
		showHideFlag=false;
		$("#retypepassword").attr("type", "text");
		$("#retypepasseye").attr("src","images/drawable-xhdpi/PASSWORDVIEWCLOSE.png");
	}
	else
	{
		showHideFlag=true;
		$("#retypepassword").attr("type", "password");
		$("#retypepasseye").attr("src","images/drawable-xhdpi/PASSWORDVIEW.png");
	}
}

function showPrivacyPolicy()
{
	pageName = "privacy";
	$("#loadPage").load("privacypolicy.html",function(){
		$("#header").css("display","block");
		$("#footer").css("display","none");
		$(".search-back-button").css("display","block");
		$(".searchDiv").css("display","none");
		$("#updateText").css("display","none");
	});
}

function logoutOptions(p_option)
{
	$("#logoutOptions").modal('hide');
	 if(p_option == "homepage")
	{
		goToHome();
	}
	else if(p_option == "login")
	{
		pageName ="changepassword";
		$("#loadPage").load("signup.html",function(){
			$("#updateText").css("display","block");
			$("#updateText").css("bottom","8px");
			$("#updateText").text("LOGIN");
			showLoginRelated("login1");
			$("#updateText").unbind( "click");
			$("#updateText").bind( "click", function(){
					showLoginRelated("login1");
			});
		});
		
	}
}

function deactivateAccount()
{
	goToHome();
	$("#accDeactivated").modal('show');
}


function toggleEnbale()
{
	if(showHideFlag)
	{
		showHideFlag=false;
		//$("#retypepassword").attr("type", "text");
		$("#settingHideText").attr("src","images/drawable-xhdpi/NOTEXTVIEWACTIVE.png");
		$("#settingShowText").attr("src","images/drawable-xhdpi/TEXTVIEWINACTIVE.png");
		$("#withoutText").css("color","#637883");
		$("#withText").css("color","#D5DDE1");
	}
	else
	{
		showHideFlag=true;
		//$("#retypepassword").attr("type", "password");
		$("#settingShowText").attr("src","images/drawable-xhdpi/TEXTVIEWACTIVE.png");
		$("#settingHideText").attr("src","images/drawable-xhdpi/NOTEXTVIEWINACTIVE.png");
		$("#withoutText").css("color","#D5DDE1");
		$("#withText").css("color","#637883");
	}
}