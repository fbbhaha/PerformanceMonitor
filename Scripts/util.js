var readearth = {
  host: "http://192.168.2.201:9999"
};


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
      beforeSend: function() {
          var indexArray = [];
          this.layindex = layer.load(2, { shade: [0.3, '#000'] });
          if (!window.indexArray)
              window.indexArray = indexArray;
          window.indexArray.push(this.layindex);
      },
      complete: function() {
          if (window.indexArray) {
              layui.layer.close(window.indexArray[window.indexArray.length - 1]);
              window.indexArray.length = window.indexArray.length - 1;
          }
      }
  });
}