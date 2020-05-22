define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('doctor-data');
    require('typeahead');


    $.module("SYS.area", function () {
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
            },
            loadData: function (pageNumber, pageSize) {
                var that = this;
                var search_nc_name = $("#search_cn_name").val();
                var search_username = $("#search_username").val();
                var s_status = $("#s_status").attr('data-id');
                SYS.Core.ajaxGet({
                    url: "log/listDiagnoseLog",
                    common: {},
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 20,
                        cn_name: search_nc_name,
                        name: search_username,
                        status: s_status || -1
                    },
                    success: function (data) {
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list
                        };
                        $("#pTable").bootstrapTable('destroy');    //销毁table
                        $('#pTable').bootstrapTable({
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
                            idField: 'id',
                            data: obj.data,
                            columns: [
                                { field: 'id', title: '诊断ID', align: 'center' },
                                { field: 'id', title: '描述', align: 'center',
                                    formatter: function (id) {
                                        return "系统定时任务错误排查诊断";
                                    }  
                                },
                                {
                                    field: 'diagnoseTime', title: '创建时间', align: 'center',
                                    formatter: function (diagnoseTime) {
                                        return SYS.Tool.formatterTime(diagnoseTime);
                                    }
                                },
                                {field: 'errorNum', title: '错误数量', align: 'center'},
                                {
                                    field: 'errorNum', title: '系统状态', align: 'center',
                                    formatter: function (errorNum) {
                                       if(errorNum == 0) {
                                          return "<span class='label label-success'>数据正常</span>";
                                       } else {
                                          return "<span class='label label-danger'>数据异常</span>";
                                       }
                                    }
                                },
                                {
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        if (row.id > 0) {
                                            html += '<a href="javascript:void(0)" onclick="SYS.area.getCityList(' + row.id + ',\'' + row.sname + '\')" class="text-do-edit">查看明细</a>';
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
                    },
                    complete: function () {
                        console.log('complete 2')
                    }
                });
            },
            getCityList: function (pid, pname,pageNumber, pageSize) {
                var that = this;
                SYS.Core.ajaxGet({
                    url: "log/listDiagnoseDetailLog",
                    common: {},
                    data: {
                        diagnoseId: pid,
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 20,
                    },
                    success: function (data) {
                        $("#divProvince").hide();
                        $("#divCity").show();
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list
                        };
                        $("#cTable").bootstrapTable('destroy');    //销毁table
                        $('#cTable').bootstrapTable({
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
                            idField: 'id',
                            data: obj.data,
                            columns: [
                                { field: 'id', title: 'ID', align: 'center' },
                                { field: 'diagnoseId', title: '诊断编号', align: 'center' },
                                { field: 'description', title: '出错说明', align: 'center' },
                                { field: 'key', title: '关键信息', align: 'center' },
                                { field: 'tableName', title: '出错库表', align: 'center' },
                                { field: 'fieldName', title: '出错字段', align: 'center' },
                                { field: 'currentData', title: '当前数据', align: 'center' },
                                { field: 'correctData', title: '正确数据', align: 'center' },
                                {
                                    field: 'diagnoseTime', title: '诊断时间', align: 'center',
                                    formatter: function (diagnoseTime) {
                                        return SYS.Tool.formatterTime(diagnoseTime);
                                    }
                                },
                                {
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        /*if (row.id > 0) {
                                            if (row.state == 1) {
                                                html += '<a href="javascript:void(0)" onclick="SYS.area.updateStatus(' + row.id + ',' + row.level + ',' + row.status + ',' + row.pid + ')" class="text-do-edit"><i class="fa fa-pencil"></i>下线</a>';
                                            } else {
                                                html += '<a href="javascript:void(0)" onclick="SYS.area.updateStatus(' + row.id + ',' + row.level + ',' + row.status + ',' + row.pid + ')" class="text-do-edit"><i class="fa fa-pencil"></i>上线</a>';
                                            }

                                        }*/
                                        return html;
                                    }
                                }
                            ],
                            onPageChange: function (number, size) {
                                that.getCityList(pid,pname,number, size);
                            },
                            onRefreshTable: function () {   //表格右侧刷新按钮
                                that.getCityList(pid, pname,obj.pageNumber, obj.pageSize);
                            }
                        });
                    },
                    complete: function () {
                        console.log('complete 2')
                    }
                });
            },

            getAreaList: function (cid, pname) {
                SYS.Core.ajax({
                    url: "area/getAreaByCid",
                    common: {},
                    data: {
                        cid: cid
                    },
                    success: function (data) {
                        $("#divCity").hide();
                        $("#divArea").show();
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list
                        };
                        $("#aTable").bootstrapTable('destroy');    //销毁table
                        $('#aTable').bootstrapTable({
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
                                { field: 'id', title: '地区ID', align: 'center' },
                                { field: 'name', title: '地区名', align: 'center' },
                                { field: 's', title: '排序号', align: 'center' },
                                {
                                    field: 'status', title: '使用状态', align: 'center',
                                    formatter: function (status) {
                                        if (status == 1) {
                                            return "<span style='color: green'>使用中</span>";
                                        } else {
                                            return "<span style='color:red'>已下线</span>";
                                        }
                                    }
                                },
                                {
                                    field: 'create_time', title: '创建时间', align: 'center',
                                    formatter: function (time) {
                                        return SYS.Tool.formatterTime(time);
                                    }
                                },
                                {
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        if (row.id > 0) {
                                            if (row.status == 1) {
                                                html += '<a href="javascript:void(0)" onclick="SYS.area.updateStatus(' + row.id + ',' + row.level + ',' + row.status + ',' + row.pid + ')" class="text-do-edit"><i class="fa fa-pencil"></i>下线</a>';
                                            } else {
                                                html += '<a href="javascript:void(0)" onclick="SYS.area.updateStatus(' + row.id + ',' + row.level + ',' + row.status + ',' + row.pid + ')" class="text-do-edit"><i class="fa fa-pencil"></i>上线</a>';
                                            }
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
                    },
                    complete: function () {
                        console.log('complete 2')
                    }
                });
            },
            updateStatus: function (id, level, currentStatus, pid) {
                var that = this;
                var status = currentStatus == 1 ? 0 : 1;
                SYS.Core.ajax({
                    url: "area/updateStatus",
                    common: {},
                    data: {
                        id: id,
                        level: level,
                        status: status
                    },
                    success: function (data) {
                        console.log(data)
                        if (data.code == 1) {
                            $.messager.popup(data.msg, "success");
                            if (level == 1) {
                                that.loadData()
                            } else if (level == 2) {
                                that.getCityList(pid, "")
                            } else if (level == 3) {
                                that.getAreaList(pid, "")
                            }
                        } else {
                            $.messager.popup(data.msg, "error");
                        }
                    }
                });
            },
            loadEvent: function () {
                var that = this;
                $("#btn_search").on('click', function () {
                    that.loadData();
                });
                $("#btn_add").on('click', function () {
                    $('#myModal').modal('show');
                });
                $("#btn_save_user_role").on('click', function () {
                    that.saveUserRole();
                })
                $("#back_list_area").on('click', function () {
                    $("#divCity").show();
                    $("#divArea").hide();
                })
                $("#back_list_city").on('click', function () {
                    $("#divProvince").show();
                    $("#divCity").hide();
                })

                var typeAheadArr = [
                    { id: "s_status", data: DOCTOR.Data.common.status }
                ];
                for (var i in typeAheadArr) {
                    var typeHead = typeAheadArr[i];
                    SYS.Tool.selectTypeahead(typeHead.id, typeHead.data);
                }
            }
        }
    });
    SYS.area.init();
})