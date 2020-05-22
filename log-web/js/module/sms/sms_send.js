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

    $.module("DOCTOR.sms_send", function () {
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
                    url: "smsSendLog/list",
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
                            sidePagination: 'client',
                            clickToSelect: true,
                            idField: '_id',
                            data: obj.data,
                            columns: [
                                { field: 'id', title: 'ID', align: 'center' },  
                                { field: 'description', title: '描述', align: 'center' },
                                //{ field: 'templateId', title: '模板ID', align: 'center' },
                                { field: 'receiverId', title: '接受人ID', sortable:true, align: 'center' },
                                { field: 'phone', title: '手机号', align: 'center' },
                                // { field: 'params', title: '参数', align: 'left', class: 'table-col',
                                //     formatter: function (params, row, index) {
                                //         var html = '<div id="s_attach_' + index + '" style="margin-left: 15px;"></div>';
                                //         return html;
                                //     }
                                // },
                                { field: 'content', title: '短信内容', align: 'left' },
                                { field: 'flagSend', title: '是否发送', align: 'center',
                                    formatter: function (value) {
                                        if(value == true) {
                                            return "<span class='label label-success'>是</span>";
                                        } else {
                                            return "<span class='label label-warning'>否</span>";
                                        }
                                    } 
                                },
                                {field: 'createTime', title: '发送时间', align: 'center',
                                    formatter: function (createTime) {
                                        return SYS.Tool.formatterByDaterule(createTime, "yyyy-mm-dd hh:mm:ss");
                                    }
                                },
                                

                            ],
                            onPageChange: function (number, size) {
                                that.loadData(number, size);
                            },
                            onRefreshTable: function () {   //表格右侧刷新按钮
                                that.loadData(obj.pageNumber, obj.pageSize);
                            }
                        });
                        for (var i = 0; i < current_show_data.length; i++) {
                            var response = current_show_data[i].params;
                            if (response == null) {
                                return;
                            }
                            if (response && response != '') {
                                $("#s_attach_" + i).jsonViewer(response, { collapsed: false, withQuotes: true });
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
    DOCTOR.sms_send.init();
})