define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('doctor-data');
    require('typeahead');
    require('fileinput');
    require('baidueditor');
    window['ZeroClipboard'] = require('zeroclipboard');
    require('multiselect');

    require('json-viewer');

    $.module("DOCTOR.hospital", function () {
        var search_aggregate_status = -1;
        var current_show_data = [];
        var ueditor;
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
            },
            /*初始化列表数据*/
            loadData: function (pageNumber, pageSize) {
                var that = this;
                var requestUrl = $("#s_request").val();
                var clientIP = $("#s_ip").val();
                var code = $("#search_state").val();
                var userId = +$("#search_userId").val();
                var deviceType = $("#search_deviceType").val();
                var method = $("#search_method").val();
                SYS.Core.ajaxGet({
                    url: "log/listHttpRequest",
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 10,
                        clientIP: clientIP,
                        requestUrl: requestUrl,
                        code: code,
                        method: method,
                        userId: userId ? userId : null,
                        deviceType: deviceType,
                    },
                    success: function (data) {
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list,
                        };
                        current_show_data = obj.data;
                        $("#myTable").bootstrapTable('destroy');    //销毁table
                        
                        //文档说明：
                        

                        $('#myTable').bootstrapTable({               //重新生成table
                            striped: true,      //默认false，使表格带有条纹
                            singleSelect: true, //保留
                            showColumns: true,  //默认false，是否显示内容下拉框
                            showToggle: true,   //默认false，是否显示切换视图（table/card）按钮
                            pagination: true,   //默认false，设置为 true 会在表格底部显示分页条。
                            pageNumber: obj.pageNumber, //默认1，如果设置了分页，首页页码。
                            pageSize: obj.pageSize,     //默认10，如果设置了分页，页面数据条数。
                            totalRows: obj.totalRows,
                            pageList: [8, 15, 20, 50, 100, 200], //默认[10, 25, 50, 100, All] 如果设置了分页，设置可供选择的页面数据条数。设置为 All 或者 Unlimited，则显示所有记录。
                            sidePagination: 'server', //默认'client',设置在哪里进行分页，可选值为 'client' 或者 'server'。设置 'server'时，必须设置服务器数据地址（url）或者重写ajax方法
                            clickToSelect: true,      //保留
                            idField: '_id',           //默认undefined，指定主键列。
                            data: obj.data,           //默认[],加载json格式的数据。
                            search: false,             //默认false,是否启用搜索框。
                            searchOnEnterKey: true,   //默认false,设置为 true时，按回车触发搜索方法，否则自动触发搜索方法。
                            strictSearch: true,
                            showHeader: true,
                            columns: [
                                { field: 'id', title: 'ID', align: 'center' },
                                { field: 'requestUrl', title: '请求URL', align: 'center' },
                                { field: 'serverIP', title: '服务器IP', align: 'center' },
                                { field: 'method', title: '请求方式', align: 'center' },
                                { field: 'clientIP', title: '请求IP', align: 'center' },
                                { field: 'userId', title: '用户ID', align: 'center' },
                                { field: 'deviceType', title: '设备类型', align: 'center' },
                                { field: 'appVersion', title: 'app版本', align: 'center' },
                                {
                                    field: 'requestParam', title: '必须参数', align: 'left', class: 'table-col',
                                    formatter: function (requestParam, row, index) {
                                        var html = '<div id="attach_' + index + '" style="margin-left: 15px;"></div>';
                                        return html;
                                    }
                                },
                                {
                                    field: 'requestTime', title: '请求时间2', align: 'center',
                                    formatter: function (createTime) {
                                        return SYS.Tool.formatterByDaterule(createTime, "yyyy-mm-dd hh:mm:ss");
                                    }
                                },

								
                                { field: 'consumeTime', title: '耗时', align: 'center',
                                    formatter: function (consumeTime) {
                                        if(consumeTime > 3000) {
                                            return "<span class='label label-danger'>" + consumeTime  + "</span>";
                                        } else {
                                            return "<span class='label label-success'>" + consumeTime  + "</span>";
                                        }
                                    }
                                },

                                {
                                    field: 'responseData', title: '响应数据', align: 'left', class: 'table-col',
                                    formatter: function (responseData, row, index) {
                                        var html = '<div id="s_attach_' + index + '" style="margin-left: 15px;"></div>';
                                        return html;
                                    }
                                },

                                {
                                    field: 'responseData', title: '状态', align: 'center', class: 'table-col',
                                    formatter: function (response) {
                                        var html = '';
                                        var result = '';
                                        if (response) {
                                            var code = response.code;
                                            if(code == 1) {
                                                result = "成功";
                                            } else if(code == -1) {
                                                result = "业务失败";
                                            } else if(code == 0) {
                                                result = "客户端异常";
                                            } else if(code == -2) {
                                                result = "登陆失效";
                                            } else if(code == -3) {
                                                result = "签名失败";
                                            } else if(code == -99) {
                                                result = "服务器异常";
                                            } else {
                                                result = "404";
                                            }
                                            html = response.code == 1 ? "<span class='label label-success'>成功</span>" : "<span class='label label-danger'>" + result +"</span>";
                                        } else {
                                            html = "<span class='label label-danger'>404</span>";
                                        }
                                        return html;
                                    }
                                },

                            ],
                            onPageChange: function (number, size) {
                                that.loadData(number, size);
                                //console.log("number:" + number + ",size:" + size);
                            },
                            onRefreshTable: function () {   //表格右侧刷新按钮
                                that.loadData(obj.pageNumber, obj.pageSize);
                            }
                        });
                        for (var i = 0; i < current_show_data.length; i++) {
                            function getQueryObject(url) {
                                if (url != null) {
                                    var search = url.substring(url.lastIndexOf("?") + 1);
                                }
                                var obj = {};
                                var reg = /([^?&=]+)=([^?&=]*)/g;
                                if (search) {
                                    search.replace(reg, function (rs, $1, $2) {
                                        var name = decodeURIComponent($1);
                                        var val = decodeURIComponent($2);
                                        val = String(val);
                                        obj[name] = val;
                                        return rs;
                                    });
                                }

                                return obj;
                            }
                            if (current_show_data[i].method == 'GET') {
                                var request = current_show_data[i].requestParam;
                                var object = getQueryObject(request);
                                object = JSON.stringify(object);
                                if (object && object != '') {
                                    $("#attach_" + i).jsonViewer(JSON.parse(object), { collapsed: false, withQuotes: true });
                                }
                            }
                            if (current_show_data[i].method == 'POST') {
                                var request = current_show_data[i].requestParam;
                                if (request && request != '') {
                                    $("#attach_" + i).jsonViewer(JSON.parse(request), { collapsed: false, withQuotes: true });
                                }
                            }
                        }

                        for (var i = 0; i < current_show_data.length; i++) {
                            var response = current_show_data[i].responseData;
                            if (response == null) {
                                //do nothing
                            } else if (response && response != '') {
                                $("#s_attach_" + i).jsonViewer(response, { collapsed: true, withQuotes: true });
                            }
                        }

                    }
                });
            },
            loadEvent: function () {
                var that = this;
                $("#search-toolbar").on('click', "#btn_search", function () {
                    that.loadData();
                }).on("keydown ", "input", function (e) {
                    if (e.keyCode == 13) {
                        that.loadData();
                    }
                });
                $("body").on("change", ".dropdown-menu li input", function () {
                    for (var i = 0; i < current_show_data.length; i++) {
                        function getQueryObject(url) {
                            if (url) {
                                var search = url.substring(url.lastIndexOf("?") + 1);
                            }
                            var search = url.substring(url.lastIndexOf("?") + 1);
                            var obj = {};
                            var reg = /([^?&=]+)=([^?&=]*)/g;
                            search.replace(reg, function (rs, $1, $2) {
                                var name = decodeURIComponent($1);
                                var val = decodeURIComponent($2);
                                val = String(val);
                                obj[name] = val;
                                return rs;
                            });
                            return obj;
                        }
                        if (current_show_data[i].method == 'GET') {
                            var request = current_show_data[i].requestParam;
                            var object = getQueryObject(request);
                            object = JSON.stringify(object);
                            if (object && object != '') {
                                $("#attach_" + i).jsonViewer(JSON.parse(object), { collapsed: false, withQuotes: true });
                            }
                        }
                        if (current_show_data[i].method == 'POST') {
                            var request = current_show_data[i].requestParam;
                            if (request && request != '') {
                                $("#attach_" + i).jsonViewer(JSON.parse(request), { collapsed: false, withQuotes: true });
                            }
                        }
                    }
                    for (var i = 0; i < current_show_data.length; i++) {
                        var response = current_show_data[i].responseData;
                        if (response && response != '') {
                            $("#s_attach_" + i).jsonViewer(response, { collapsed: true, withQuotes: true });
                        }
                    }
                })
            },
        }
    });
    DOCTOR.hospital.init();
})