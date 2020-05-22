define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');

    $.module("SYS.resource", function () {
        return {
            init: function () {
                this.loadData();
                //this.loadEvent();
            },
            loadData: function (pageNumber, pageSize) {
                var that = this;
                SYS.Core.ajaxGet({
                    url: "resource/list",
                    common: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 20
                    },
                    data: {},
                    success: function (data) {
                        console.log(data)
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list
                        };
                        $("#myTable").bootstrapTable('destroy');    //销毁table
                        $('#myTable').bootstrapTable({
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
                                {field: 'resourceDesc', title: '资源类型', align: 'center'},
                                {field: 'resourceType', title: 'type值', align: 'center'},
                                {field: 'md5', title: '文件MD5', align: 'center'},
                                {field: 'fileUrl', title: '文件地址', align: 'center'},
                                {
                                    field: 'updateTime', title: '更新时间', align: 'center',
                                    formatter: function (time) {
                                        return SYS.Tool.formatterTime(time);
                                    }
                                },
                                {
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        return '<a href="javascript:void(0)" onclick="SYS.resource.toRefresh(' + row.resourceType + ')" class="text-do-edit"><i class="fa fa-refresh"></i> 刷新</a>';
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
            toRefresh: function (type) {
                var that = this;
                $.messager.confirm("确定要刷新吗？", function () {
                    SYS.Core.ajaxPost({
                        url: "resource/publish/" + type,
                        common: {},
                        data: {},
                        success: function (data) {
                            if (data.code == 1) {
                                $.messager.popup(data.message, "success");
                            } else {
                                $.messager.popup(data.message, 'error');
                            }
                            that.loadData();
                        }
                    })
                });
            }
        }
    });
    SYS.resource.init();
})