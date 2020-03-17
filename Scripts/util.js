var readearth = {
  //host: "http://192.168.2.201:9999",
    host: "http://readearth2014.vicp.cc:20010/monitor",
  uId: 0
};

var tkType = {
  cpu:1,
  mem:2,
  sys:3,
  sysfile:4,
  db:5,
  conn:6
}


Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};

//获取url上的id值
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}


function initAjaxLoad() {
  $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      beforeSend: function() {
          var indexArray = [];
          this.layindex = parent.layer.load(2, { shade: [0.3, '#000'] });
          if (!window.indexArray)
              window.indexArray = indexArray;
          window.indexArray.push(this.layindex);
      },
      complete: function(res) {
          if (window.indexArray||res.code==500) {
              parent.layui.layer.close(window.indexArray[window.indexArray.length - 1]);
              window.indexArray.length = window.indexArray.length - 1;
          }else if (res.code==401){
              parent.location.href = "../../Page/User/Login.html"

          }

      }
  });
}

function setCookie(key, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = key + '=' + value + ';expires=' + oDate+ ';path='+'/';
}

function removeCookie(key) {
	setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
}
function getCookie(key) {
  var cookieArr = document.cookie.split('; ');
	for(var i = 0; i < cookieArr.length; i++) {
		var arr = cookieArr[i].split('=');
		if(arr[0] === key) {
			return arr[1];
		}
	}
	return false;
}