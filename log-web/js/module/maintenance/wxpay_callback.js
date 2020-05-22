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
                var orderNo = $("#s_order_no").val();
            
                SYS.Core.ajaxGet({
                    url: "log/listWxpayCallBack",
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 10,
                        orderNo: orderNo,
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
                        $('#myTable').bootstrapTable({               //重新生成table
                            striped: true,      //使表格带有条纹
                            singleSelect: true,
                            showColumns: true,
                            showToggle: true,
                            pagination: true,
                            pageNumber: obj.pageNumber,
                            pageSize: obj.pageSize,
                            totalRows: obj.totalRows,
                            pageList: [8, 15, 20, 50, 100, 200],
                            sidePagination: 'server',
                            clickToSelect: true,
                            idField: '_id',
                            data: obj.data,
                            columns: [
                                { field: 'id', title: 'ID', align: 'center' },                               
                                {
                                    field: 'notifiyData', title: '订单编号', align: 'center', class: 'table-col',
                                    formatter: function (notifiyData) {
                                       
                                        return notifiyData.out_trade_no;
                                    }
                                },
                                {
                                    field: 'notifiyData', title: '交易编号', align: 'center', class: 'table-col',
                                    formatter: function (notifiyData) {
                                       
                                        return notifiyData.transaction_id;
                                    }
                                },
                                {
                                    field: 'notifiyData', title: '交易状态', align: 'center', class: 'table-col',
                                    formatter: function (notifiyData) {
                                       
                                        return notifiyData.result_code;
                                    }
                                },
                                {
                                    field: 'notifiyData', title: '交易金额', align: 'center', class: 'table-col',
                                    formatter: function (notifiyData) {
                                        var num = notifiyData.total_fee;
                                        var result = Math.round(num*100)/10000;
                                        if(result%1==0){
                                            result = result + '.00'
                                        }
                                        return result;
                                    }
                                },
                                
                                {
                                    field: 'notifiyData', title: '回调时间', align: 'center', class: 'table-col',
                                    formatter: function (notifiyData) {
                                       
                                        return notifiyData.time_end;
                                    }
                                },
                                {
                                    field: 'authFlag', title: '签名认证', align: 'center', class: 'table-col',
                                    formatter: function (authFlag) {
                                       
                                        return authFlag;
                                    }
                                },
                                



                                //{ field: 'requestUrl', title: '请求URL', align: 'center' },
                                //{ field: 'serverIP', title: '服务器IP', align: 'center' },
                                //{ field: 'method', title: '请求方式', align: 'center' },
                                //{ field: 'clientIP', title: '请求IP', align: 'center' },
                                // { field: 'userId', title: '用户ID', align: 'center' },
                                //{ field: 'deviceType', title: '设备类型', align: 'center' },
                                // {
                                //     field: 'requestParam', title: '必须参数', align: 'left', class: 'table-col',
                                //     formatter: function (requestParam, row, index) {
                                //         var html = '<div id="attach_' + index + '" style="margin-left: 15px;"></div>';
                                //         return html;
                                //     }
                                // },
                                // {
                                //     field: 'requestTime', title: '请求时间', align: 'center',
                                //     formatter: function (createTime) {
                                //         return SYS.Tool.formatterByDaterule(createTime, "yyyy-mm-dd hh:mm:ss");
                                //     }
                                // },
                                // {
                                //     field: 'responseData', title: '响应数据', align: 'left', class: 'table-col',
                                //     formatter: function (responseData, row, index) {
                                //         var html = '<div id="s_attach_' + index + '" style="margin-left: 15px;"></div>';
                                //         return html;
                                //     }
                                // },

                                // {
                                //     field: 'responseData', title: '状态', align: 'center', class: 'table-col',
                                //     formatter: function (response) {
                                //         var html = '';
                                //         if (response) {
                                //             html = response.code == 1 ? '<span class="label label-success">成功</span>' : '<span class="label label-danger">失败</span>';
                                //         }
                                //         return html;
                                //     }
                                // },

                            ],
                            onPageChange: function (number, size) {
                                that.loadData(number, size);
                            },
                            onRefreshTable: function () {   //表格右侧刷新按钮
                                that.loadData(obj.pageNumber, obj.pageSize);
                            }
                        });
                        for (var i = 0; i < current_show_data.length; i++) {
                            function getQueryObject(url) {
                                console.log(url.lastIndexOf("?"))
                                if (url.lastIndexOf("?")) {
                                    var search = url.substring(url.lastIndexOf("?") + 1);
                                }

                                // var search = url.substring(url.lastIndexOf("?") + 1);
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
                                // if (request == null) {
                                //     return;
                                // }
                                var object = getQueryObject(request);
                                object = JSON.stringify(object);
                                if (object && object != '') {
                                    $("#attach_" + i).jsonViewer(JSON.parse(object), { collapsed: false, withQuotes: true });
                                }
                            }
                            if (current_show_data[i].method == 'POST') {
                                var request = current_show_data[i].requestParam;
                                // if (request == null) {
                                //     return;
                                // }
                                if (request && request != '') {
                                    $("#attach_" + i).jsonViewer(JSON.parse(request), { collapsed: false, withQuotes: true });
                                }
                            }
                        }

                        for (var i = 0; i < current_show_data.length; i++) {
                            var response = current_show_data[i].responseData;
                            if (response == null) {
                                return;
                            }
                            if (response && response != '') {
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