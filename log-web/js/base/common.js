window.__uri = function (uri) {
    return uri;
};
window.global = {};


$.module('SYS.Config', function () {
    var root = '/web/';
    return {
        mode: "develop",
        dataRoot: "/",
        main: root,
        version: "20170405",
        title: '管理系统',
        desc: '响应式、美观',
    };
});
/**
 核心部分
 **/

$.module('SYS.Core', function () {
    return {
        /**
         * Helper function to parse the user agent.  Sets the following
         * .os.webkit
         * .os.android
         * .os.ipad
         * .os.iphone
         * .os.webos
         * .os.touchpad
         * .os.blackberry
         * .os.opera
         * .os.fennec
         * @api private
         */
        os: (function () {
            var os = {},
                userAgent = navigator.userAgent,
                type = "";
            os.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false;
            os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
            os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
            os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
            os.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
            os.touchpad = os.webos && userAgent.match(/TouchPad/) ? true : false;
            os.ios = os.ipad || os.iphone;
            os.blackberry = userAgent.match(/BlackBerry/) || userAgent.match(/PlayBook/) ? true : false;
            os.opera = userAgent.match(/Opera Mobi/) ? true : false;
            os.fennec = userAgent.match(/fennec/i) ? true : false;
            os.desktop = !(os.ios || os.android || os.blackberry || os.opera || os.fennec);

            for (var key in os) {
                if (os[key]) {
                    type += key + ",";
                }
            }
            if (os.android || os.ipad || os.iphone || os.blackberry) {
                os.mobile = true;
            }
            SYS.Core.os = os;
            os.type = type;
            return os;
        }()),

        /** post方式：json格式提交 **/
        ajaxPost: function (param) {
            var that = this;
            var uid = $.cookie("u_id");
            var u_tokenId = $.cookie("u_tokenId");
            var requestUrl = (param.baseUrl ? param.baseUrl : baseUrl) + param.url;
            $.ajax({
                url: requestUrl,
                type: "post",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(
                    param.data
                ),
                beforeSend: function (request) {
                    request.setRequestHeader("x-auth-token", u_tokenId);
                    request.setRequestHeader("x-user-id", uid);
                    request.setRequestHeader("deviceType", "web");
                    request.setRequestHeader("App-Version", "1.0.0");
                },
                success: function (data) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                    if (data.code == -2) { //未登录-2，，
                        console.log("tonken验证失败，返回登录界面，msg:" + data.msg);
                        $.cookie('is_login', '', { path: "/", expires: 7 });
                        $.cookie('u_id', '', { path: "/", expires: 7 });
                        $.cookie('u_name', '', { path: "/", expires: 7 });
                        $.cookie('m_id', '', { path: "/", expires: 7 });
                        location.href = "/html/login.html";
                    } else if (data.code == -1) { //参数不合法-1
                        console.log("没有权限访问，返回登录界面，msg:" + data.msg);
                        $.cookie('is_login', '', { path: "/", expires: 7 });
                        $.cookie('u_id', '', { path: "/", expires: 7 });
                        $.cookie('u_name', '', { path: "/", expires: 7 });
                        $.cookie('m_id', '', { path: "/", expires: 7 });
                        location.href = "/html/login.html";
                    } else {
                        param.success(data);
                    }
                },
                error: function () {
                    console.log("error");
                },
                complete: function () {
                    that.closeLoading();
                }
            });
        },
        /** get方式：表单提交 */
        ajaxGet: function (param) {
            var that = this;
            var common = param.common;
            var uid = $.cookie("u_id");
            var u_tokenId = $.cookie("u_tokenId");
            var requestUrl = (param.baseUrl ? param.baseUrl : baseUrl) + param.url;
            $.ajax({
                url: requestUrl,
                type: "get",
                dataType: 'json',
                data: param.data,
                beforeSend: function (request) {
                    request.setRequestHeader("x-auth-token", u_tokenId);
                    request.setRequestHeader("x-user-id", uid);
                    request.setRequestHeader("deviceType", "web");

                    request.setRequestHeader("X-Auth-Token", u_tokenId);
                    request.setRequestHeader("X-User-Id", uid);
                    request.setRequestHeader("Device-Type", "web");
                    request.setRequestHeader("App-Version", "1.0.0");
                },
                success: function (data) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                    if (data.code == -2) { //未登录-2，，
                        console.log("tonken验证失败，返回登录界面，msg:" + data.msg);
                        $.cookie('is_login', '', { path: "/", expires: 7 });
                        $.cookie('u_id', '', { path: "/", expires: 7 });
                        $.cookie('u_name', '', { path: "/", expires: 7 });
                        $.cookie('m_id', '', { path: "/", expires: 7 });
                        location.href = "/html/login.html";
                    } else if (data.code == -1) { //参数不合法-1
                        console.log("没有权限访问，返回登录界面，msg:" + data.msg);
                        $.cookie('is_login', '', { path: "/", expires: 7 });
                        $.cookie('u_id', '', { path: "/", expires: 7 });
                        $.cookie('u_name', '', { path: "/", expires: 7 });
                        $.cookie('m_id', '', { path: "/", expires: 7 });
                        location.href = "/html/login.html";
                    } else {
                        param.success(data);
                    }
                },
                error: function () {
                    console.log("error");
                },
                complete: function () {
                    that.closeLoading();
                }
            });
        },
        /** get方式：表单提交 */
        ajaxGet: function (param) {
            var that = this;
            var common = param.common;
            var uid = $.cookie("u_id");
            var u_tokenId = $.cookie("u_tokenId");
            var requestUrl = (param.baseUrl ? param.baseUrl : baseUrl) + param.url;
            $.ajax({
                url: requestUrl,
                type: "get",
                dataType: 'json',
                data: param.data,
                beforeSend: function (request) {
                    request.setRequestHeader("X-Auth-Token", u_tokenId);
                    request.setRequestHeader("X-User-Id", uid);
                    request.setRequestHeader("Device-Type", "web");
                    request.setRequestHeader("App-Version", "1.0.0");//App-Version abc
                },
                success: function (data) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                    console.log(data);
                    if (data.code == -2) { //未登录-2，，
                        console.log("tonken验证失败，返回登录界面，msg:" + data.msg);
                        $.cookie('is_login', '', { path: "/", expires: 7 });
                        $.cookie('u_id', '', { path: "/", expires: 7 });
                        $.cookie('u_name', '', { path: "/", expires: 7 });
                        $.cookie('m_id', '', { path: "/", expires: 7 });
                        location.href = "/html/login.html";
                    } else if (data.code == -1) { //参数不合法-1
                        $.cookie('is_login', '', { path: "/", expires: 7 });
                        $.cookie('u_id', '', { path: "/", expires: 7 });
                        $.cookie('u_name', '', { path: "/", expires: 7 });
                        $.cookie('m_id', '', { path: "/", expires: 7 });
                        console.log("没有权限访问，返回登录界面，msg:" + data.msg);
                        location.href = "/html/login.html";
                    } else {
                        param.success(data);
                    }
                },
                error: function () {
                    console.log("ajaxGet is error");
                },
                complete: function () {
                    that.closeLoading();
                }
            });
        },
        /** ajax跨域访问，使用 jsonp  **/
        ajaxJsoup: function (param) {
            var that = this;
            var common = param.common;
            $.ajax({
                url: that.getDomain() + param.url,

                dataType: 'jsonp',
                data: {
                    parameters: JSON.stringify({
                        common: common,
                        data: param.data
                    })
                },
                jsonp: 'callback',
                jsonpCallback: "success_jsonpCallback",
                success: function (data) {
                    param.success(data);
                }
            });
        },
        ajaxAsync: function (param) {
            // var accessToken = $.cookie("u_id") + "_" + $.cookie("tokenId");
            // var currentMenu = window.location.href;
            var uid = $.cookie("u_id");
            var u_tokenId = $.cookie("u_tokenId");
            $.ajax({
                url: baseUrl + param.url,
                type: "post",
                dataType: 'json',
                async: false, //同步
                data: JSON.stringify(
                    param.data
                ),
                beforeSend: function (request) {
                    // request.setRequestHeader("AccessToken", accessToken);
                    // request.setRequestHeader("CurrentMenu", currentMenu);
                    request.setRequestHeader("x-auth-token", u_tokenId);
                    request.setRequestHeader("x-user-id", uid);
                },
                success: function (data) {
                    param.success(data);
                }
            });
        },
        ajaxGetAsync: function (param) {
            var uid = $.cookie("u_id");
            var u_tokenId = $.cookie("u_tokenId");
            $.ajax({
                url: baseUrl + param.url,
                type: "get",
                dataType: 'json',
                async: false, //同步
                data: param.data,
                beforeSend: function (request) {
                    request.setRequestHeader("x-auth-token", u_tokenId);
                    request.setRequestHeader("x-user-id", uid);
                },
                success: function (data) {
                    param.success(data);
                }
            });
        },
        checkLogin: function () {
            /* var is_login = $.cookie("is_login");  //判断是否登录
             if (is_login != "true") {
                 location.href = "../../login.html";
             }*/
        },
        logout: function () {
            alert("logout...");
            location.href = "../../login.html";
        },
        /*showMenuHead: function () {
            var url = window.location.href;
            if(url.indexOf('?') > -1) {
                url = url.substr(0, url.indexOf('?'));
            }
            if (url.indexOf('platform_user_detail.html') >  -1) {
                return;
            }
            var items = url.split('#');
            if(items && items.length == 2) {
                var menu_id = items[1];
                if(menu_id){
                    $.ajax({
                        url: '/sys/showMenuHead',
                        type: "post",
                        dataType: 'json',
                        data: {
                            parameters: JSON.stringify({
                                common: {},
                                data: {_id: menu_id}
                            })
                        },
                        success: function (data) {
                            if(data.code == 1){
                                var location = data.data.location;
                                $(".wrapper-content .ibox-title h5").prepend(location + ' | ');

                                if(data.data.help && data.data.help.length > 0) {
                                    var help = data.data.help;
                                    help = help.replace(new RegExp("\n","g"), '<br/>');
                                    var html = '';
                                    html += '<div class="pull-right" style="margin-right: 10px;">';
                                    html += '<div class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-question-circle"> 帮助</i></div>';
                                    html += '<ul class="dropdown-menu dropdown-menu-user" style="margin: 21px 0; padding:10px; line-height: 30px; max-width: 300px; ">';
                                    html += '帮助说明:<br/>';
                                    html += help;
                                    html += '</ul>';
                                    html += '</div>'
                                    $(".wrapper-content .ibox-title").append('<div class="ibox-tools">' + html + '</div>');
                                }
                            }
                        }
                    });
                }
            }
        },*/
        closeLoading: function () {
            $(".table-loading").remove();
        },

        /**
         * 加载动画
         * 
         *   SYS.Core.loading('open');  // 显示
         *   SYS.Core.loading('close'); // 隐藏
         *  
         * @param {any} options 
         */
        loading: function (options) {
            var opts = $.extend({
                op: 'open'
            }, {
                    op: options
                });
            if (opts.op === 'open') {
                var loading = '' +
                    '<div class="body-loading">' +
                    '   <div class="sk-spinner sk-spinner-three-bounce">' +
                    '       <div class="sk-bounce1"></div>' +
                    '       <div class="sk-bounce2"></div>' +
                    '       <div class="sk-bounce3"></div>' +
                    '   </div>' +
                    '</div>';

                $('body').before(loading);
            } else if (opts.op === 'close') {
                $(".body-loading").remove();
            }
        },

        /**
         * 日期函数
         *      加载日期函数，可以同时处理一个或多少日期
         * 
         *  方式一:
         *  SYS.Core.loadDate({
         *      endDate: '2017-02-02',       // 结束时间必须小于今天
         *      el: '#startDate1',
         *      value: '2017-02-02',
         *      callback: function(item, items){
         *         $(this).datetimepicker("setStartDate", '2017-01-03'); // 动态设置开始时间
         *      }
         *  });
         * 
         *  方式二:
         *  SYS.Core.loadDate({
         *      endDate: '2017-02-02',       // 结束时间必须小于今天
         *      el: ['#startDate1', '#endDate1'],
         *      value: [last7day, '2017-02-02'],
         *      callback: [
         *          function(item, items){
         *              $(this).datetimepicker("setEndDate", $("#endDate1").val())
         *          },
         *          function(item, items){
         *              $(this).datetimepicker("setStartDate", $("#startDate1").val())
         *          }
         *      ]
         *  });
         * @param {any} options 
         */
        loadDate: function (options) {
            var toString = Object.prototype.toString,
                opts = $.extend({
                    el: '.date',
                    value: '',
                    language: 'zh-CN', // 显示中文
                    format: 'yyyy-mm-dd', // 显示格式
                    minView: "year", // 设置只显示到月份
                    // endDate: now,        // 日期的结束时间
                    initialDate: new Date(), // 初始化当前日期
                    autoclose: true, // 选中自动关闭
                    todayBtn: true, // 显示今日按钮
                    // hide: function(ev){},
                    callback: function (item, items) { }
                }, options);

            var els = toString.call(opts.el) === '[object Array]' ? opts.el : [opts.el],
                funs = toString.call(opts.callback) === '[object Array]' ? opts.callback : [opts.callback],
                vals = toString.call(opts.value) === '[object Array]' ? opts.value : [opts.value];
            // hides = toString.call(opts.hide) === '[object Array]' ? opts.hide: [opts.hide];

            $(els).each(function (index, element) {
                if (vals.length > index && vals[index]) {
                    $(element).val(vals[index]);
                }

                $(element).datetimepicker(opts)
                // .on('changeDate', function(ev) { 
                //     hides[index] && hides[index](ev);
                // });
                if (funs.length > index) {
                    $(element).click(function () {
                        funs[index] && funs[index].call(this, element, els);
                    });
                }
            });

        },

        /**
         * 下拉列表
         * 
         *  SYS.Core.loadMultiselect({
         *      el: '#categorys',
         *      fieldLabel: 'name',
         *      fieldValue: 'id',
         *      data: data,
         *      callback: function(selectedValues){
         *          console.log(selectedValues);
         *      }
         *  });
         * 
         * @param {any} options 
         */
        loadMultiselect: function (options) {
            var toString = Object.prototype.toString,
                opts = $.extend({
                    maxHeight: 300,
                    el: '.multiselect',
                    fieldLabel: 'text',
                    fieldValue: 'value',
                    values: [],
                    data: [],
                    callback: function (item, items) { }
                }, options);

            var list = $(opts.data).map(function (index, element) {
                return {
                    label: element[opts.fieldLabel],
                    value: element[opts.fieldValue]
                };
            });

            $(opts.el).multiselect({
                maxHeight: opts.maxHeight,
                onDropdownHidden: function (option, checked, select) {

                    var vals = $(opts.el).val();
                    opts.callback && opts.callback.call(this, vals);
                }
            });
            $(opts.el).multiselect('dataprovider', list);
            if (opts.values.length) $(opts.el).multiselect('select', opts.values, true);

        },
        loadEvent: function () {
            var that = this;
            //表格增加等待层
            $("table:not('.noloading')").each(function () {
                var loading = '' +
                    '<div class="spiner-example table-loading">' +
                    '   <div class="sk-spinner sk-spinner-three-bounce">' +
                    '       <div class="sk-bounce1"></div>' +
                    '       <div class="sk-bounce2"></div>' +
                    '       <div class="sk-bounce3"></div>' +
                    '   </div>' +
                    '</div>';
                $(this).before(loading);
            });

            //点击搜索框，表格显示加载中
            $("#btn_search").on('click', function () {
                $("#myTable").bootstrapTable('showLoading');
            });

            $('.popover-toggle').popover();
            //加载页面菜单导航
            //that.showMenuHead(); //不太明白代码用途，故被注释

            //延迟加载图片
            //图片代码：<img class="lazy" data-original="img/1.jpg" />
            //div背景图<div class="lazy lazy-bg" data-original="img/1.jpg"></div>
            $("div.lazy,img.lazy").lazyload({
                threshold: 200,
                effect: "fadeIn", //使用淡入特效
                failure_limit: 10
            });
        },
        // getDomain: function () {
        //     var that = this;
        //     var domain = '';
        //     that.ajaxAsync({
        //         url: 'picture/upload',
        //         common: {},
        //         data: {},
        //         success: function (data) {
        //             if (data.code == 1) {
        //                 domain = data.data.api_domain + "/";
        //             }
        //         }
        //     });
        //     return domain;
        // },
        getMDomain: function () {
            var that = this;
            var domain = '';
            that.ajaxAsync({
                url: 'sys/getConfig',
                common: {},
                data: {},
                success: function (data) {
                    if (data.code == 1) {
                        domain = data.data.m_domain + "/";
                    }
                }
            });
            return domain;
        },
        EncryptX: function (param) {
            var key = CryptoJS.enc.Utf8.parse($.cookie(param.key));
            var srcs = CryptoJS.enc.Utf8.parse(param.word);

            var encrypted = CryptoJS.AES.encrypt(srcs, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        },
        // buttonControl: function (element) {
        //     $("#btn_export").hide();
        //     localStorage.setItem("DO", JSON.stringify(data.data));
        // }
    };
});
SYS.Core.loadEvent();