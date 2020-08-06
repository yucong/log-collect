define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('doctor-data');
    require('typeahead');
    require('fileinput');
    window['ZeroClipboard'] = require('zeroclipboard');
    require('multiselect');
    require('json-viewer');

    $.module("Log.businessAbnormal", function () {
        var search_aggregate_status = -1;
        var current_show_data = [];
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
            },
            /*初始化列表数据*/
            loadData: function (pageNumber, pageSize) {
                var that = this;
                var env = $("#search_env").val();
                var userId = +$("#search_userId").val();
                var level = $("#search_level").val();
                
                SYS.Core.ajaxGet({
                    url: "businessAbnormalLog/list",
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 10,
                        env: env,
                        userId: userId ? userId : null,
                        level: level
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
                                { field: 'autoId', title: 'ID', align: 'center' },
                                { field: 'userId', title: '用户ID', align: 'center' },
                                { field: 'env', title: '环境', align: 'center' },
                                { field: 'description', title: '业务描述', align: 'center' },
                                { field: 'probableCause', title: '异常描述', align: 'center' },
                                { field: 'level', title: '错误级别', align: 'center',
                                    formatter: function (level) {
                                        if(level == 'error') {
                                            return  "<span class='label label-danger'>error</span>";
                                        } else if(level == 'warn') {
                                            return  "<span class='label label-primary'>warn</span>";
                                        } else {
                                            return "-";
                                        }
                                    }
                                },
                                {
                                    field: 'createTime', title: '发生时间', align: 'center',
                                    formatter: function (createTime) {
                                        return SYS.Tool.formatterByDaterule(createTime, "yyyy-mm-dd hh:mm:ss");
                                    }
                                }
                                /*{
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        if (row.id > 0) {
                                            html += '<a href="javascript:void(0)" onclick="Log.businessAbnormal.toEdit(' + index + ')" class="text-do-edit">查看</a>  ';
                                        }
                                        return html;
                                    }
                                }*/
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
                $("#data").val(data.probableCause);
                $('#myModal').modal('show');
            }
        }
    });
    Log.businessAbnormal.init();
})