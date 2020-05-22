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
                var method = $("#search_method").val();
                var userId = +$("#search_userId").val();
                var deviceType = $("#search_deviceType").val();
                var errLevel = $("#search_errLevel").val();
                
                SYS.Core.ajaxGet({
                    url: "log/listServerException",
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 10,
                        clientIP: clientIP,
                        requestUrl: requestUrl,
                        code: code,
                        method: method,
                        userId: userId ? userId : null,
                        deviceType: deviceType,
                        errLevel: errLevel
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
                                { field: 'requestUrl', title: '请求地址', align: 'center' },
                                { field: 'serverIP', title: '服务器IP', align: 'center' },
                                { field: 'method', title: '请求方式', align: 'center' },
                                { field: 'clientIP', title: '请求IP', align: 'center' },
                                { field: 'userId', title: '用户ID', align: 'center' },
                                { field: 'deviceType', title: '设备类型', align: 'center' },
                                { field: 'errLevel', title: '错误级别', align: 'center' },
                                {
                                    field: 'errMsg', title: '错误信息', align: 'left',
                                    formatter: function (errMsg) {
                                        return '<p style="color:red" id="errMsg_h">' + errMsg + '</P>';
                                    }
                                },
                                {
                                    field: 'requestTime', title: '请求时间', align: 'center',
                                    formatter: function (createTime) {
                                        return SYS.Tool.formatterByDaterule(createTime, "yyyy-mm-dd hh:mm:ss");
                                    }
                                },
                                {
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        if (row.id > 0) {
                                            html += '<a href="javascript:void(0)" onclick="DOCTOR.hospital.toEdit(' + index + ')" class="text-do-edit">查看</a>  ';
                                        }
                                        return html;
                                    }
                                }
                            ],
                            onPageChange: function (number, size) {
                                that.loadData(number, size);
                            },
                            onRefreshTable: function () {   //表格右侧刷新按钮
                                that.loadData(obj.pageNumber, obj.pageSize);
                            }
                        });
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
                $("body").on("click", "#errMsg_h", function () {
                    var data = $(this).html();
                    $("#data").val(data);
                    $('#myModal').modal('show');
                })
            },
            toEdit: function (index) {
                var data = current_show_data[index];
                $("#data").val(data.stackTrace);
                $('#myModal').modal('show');
            }
        }
    });
    DOCTOR.hospital.init();
})