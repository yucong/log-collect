define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('doctor-data');
    require('typeahead');
    //require('fileinput');
    //require('baidueditor');
    window['ZeroClipboard'] = require('zeroclipboard');
    require('multiselect');

    //require('json-viewer');

    $.module("Task.task", function () {
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
                    url: "task/quartz/getJobs",
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 10,
                        orderNo: orderNo,
                    },
                    success: function (data) {
                        var obj = {
                            'pageNumber': 1,
                            'pageSize': 20,
                            'totalRows': 20,
                            'data': data.data,
                        };
                        current_show_data = obj.data;
                        $("#myTable").bootstrapTable('destroy');    //销毁table
                        $('#myTable').bootstrapTable({               //重新生成table
                            striped: true,      //使表格带有条纹
                            singleSelect: true,
                            showColumns: true,
                            showToggle: true,
                            pagination: false,
                            sidePagination: 'server',
                            clickToSelect: true,
                            idField: '_id',
                            data: obj.data,
                            columns: [
                                {title: '序号',align: 'center',
                                    formatter: function (value, row, index) {
                                        return index+1; 						
                                    }
                                },
                                { field: 'jobName', title: '任务名称', align: 'center' },
                                { field: 'jobDescription', title: '任务描述', align: 'center' },                               
                                //{ field: 'jobGroupName', title: '任务组', align: 'center' },
                                //{ field: 'triggerName', title: '触发器名称', align: 'center' },                               
                                //{ field: 'triggerGroupName', title: '触发器组', align: 'center' },
                                { field: 'cronExpression', title: '触发规则', align: 'center' },
                                { field: 'triggerDescription', title: '触发描述', align: 'center' },
                                //{ field: 'lastFireTime', title: '最后运行时间', align: 'center' },
                                { field: 'nextFireTime', title: '下次运行时间', align: 'center' },
                                { field: 'triggerState', title: '状态', align: 'center',
                                    formatter: function(value,row) {
                                        var result = '';
                                        var state = row.triggerState;
                                        if(state == 'NORMAL') {     
                                            result = "<span class='label label-success'>" + value + "</span>";
                                        } else if(state == 'PAUSED') {
                                            result = "<span class='label label-danger'>" + value +"</span>";
                                        } else {
                                            result = value;
                                        }
                                        return result;
                                    }
                            
                                },
                                {field: 'do', title: '操作', align: 'left',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        var state = row.triggerState;
                                        if(state == 'NORMAL') {
                                            html += '<a href="javascript:void(0)" onclick="Task.task.pause(' + index + ')" class="text-do-edit">暂停</a> | ';
                                            html += '<a href="javascript:void(0)" onclick="Task.task.remove(' + index + ')" class="text-do-edit">移除</a>';
                                        } else if(state == 'PAUSED') {
                                            html += '<a href="javascript:void(0)" onclick="Task.task.resume(' + index + ')" class="text-do-edit">恢复</a> | ';
                                            html += '<a href="javascript:void(0)" onclick="Task.task.remove(' + index + ')" class="text-do-edit">移除</a> | ';
                                            html += '<a href="javascript:void(0)" onclick="Task.task.toEdit(' + index + ')" class="text-do-edit">编辑</a>';
                                        } else {
                                            html += '<a href="javascript:void(0)" onclick="Task.task.resume(' + index + ')" class="text-do-edit">恢复</a> | ';
                                            html += '<a href="javascript:void(0)" onclick="Task.task.remove(' + index + ')" class="text-do-edit">移除</a>';
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
                        for (var i = 0; i < current_show_data.length; i++) {
                            function getQueryObject(url) {
                                console.log(url.lastIndexOf("?"))
                                if (url.lastIndexOf("?")) {
                                    var search = url.substring(url.lastIndexOf("?") + 1);
                                }

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

                $(".btn-add").on("click", function () {
                    $('#myModal').modal('show');
                    that.initJobCodeData("jobName",null);

                });


                /**提交第一层form表单*/
                $('#fm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        jobName: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                               
                            }
                        },
                        jobGroupName: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                               
                            }
                        },
                        triggerName: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                               
                            }
                        },
                        triggerGroupName: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                },
                                
                            }
                        },
                        cron: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        },
                        cronDesc: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        },
                    }
                }).on('success.form.bv', function (e) { //使用此方法可以ajax
                    e.preventDefault();
                    //保存
                    that.save();

                });

                $("#cancel").on("click",function() {
                    that.hideDialog();
                });


            },

            /**暂停 */
            pause: function(index) {
                var item = current_show_data[index];
                var that = this;
                $.messager.confirm("确定要暂停吗？", function () {
                    SYS.Core.ajaxPost({
                        url: "task/quartz/pauseJob",
                        data: {
                            triggerName: item.triggerName,
                            triggerGroupName: item.triggerGroupName
                        },
                        success: function (data) {
                            if (data.code == 1) {
                                $.messager.popup(data.message, "success");
                                that.loadData();
                            } else {
                                $.messager.popup(data.message, 'error');
                            }
                        }
                    })
                });
            },

            /**恢复 */
            resume: function(index) {
                var item = current_show_data[index];
                var that = this;
                $.messager.confirm("确定要恢复吗？", function () {
                    SYS.Core.ajaxPost({
                        url: "task/quartz/resumeJob",
                        data: {
                            triggerName: item.triggerName,
                            triggerGroupName: item.triggerGroupName
                        },
                        success: function (data) {
                            if (data.code == 1) {
                                $.messager.popup(data.message, "success");
                                that.loadData();
                            } else {
                                $.messager.popup(data.message, 'error');
                            }
                        }
                    })
                });
            },

            /**移除*/
            remove: function(index) {
                var item = current_show_data[index];
                var that = this;
                $.messager.confirm("确定要移除吗？", function () {
                    SYS.Core.ajaxPost({
                        url: "task/quartz/removeJob",
                        data: {
                            jobName: item.jobName,
                            jobGroupName: item.jobGroupName,
                            triggerName: item.triggerName,
                            triggerGroupName: item.triggerGroupName
                        },
                        success: function (data) {
                            if (data.code == 1) {
                                $.messager.popup(data.message, "success");
                                that.loadData();
                            } else {
                                $.messager.popup(data.message, 'error');
                            }
                        }
                    })
                });
            },

            /**编辑*/
            toEdit: function(index) {
                var item = current_show_data[index]; 
                $('#myModal').modal('show');
                this.initJobCodeData("jobName",item.jobName);
                $("#code").val(item.jobName);

                $("#jobGroupName").val(item.jobGroupName);
                $("#triggerName").val(item.triggerName);
                $("#triggerGroupName").val(item.triggerGroupName);
                $("#cron").val(item.cronExpression);
                $("#cronDesc").val(item.triggerDescription);
               
                $("#jobName").attr("disabled","disabled");
                $("#jobGroupName").attr("disabled","disabled");
                $("#triggerName").attr("disabled","disabled");
                $("#triggerGroupName").attr("disabled","disabled");
            },

            /**新增任务 */
            save:function() {

                var that = this; 
                var jobName = $("#jobName").val().trim();
                var jobGroupName = $("#jobGroupName").val().trim();
                var triggerName = $("#triggerName").val().trim();
                var triggerGroupName = $("#triggerGroupName").val().trim();
                var cron = $("#cron").val().trim();
                var cronDesc = $("#cronDesc").val().trim();
                var code = $("#code").val().trim();
                var url = code == '' ? 'task/quartz/addJob' : 'task/quartz/modifyJob';
                SYS.Core.ajaxPost({
                    url: url,
                    data: {
                        jobName: jobName,
                        jobGroupName: jobGroupName,
                        triggerName: triggerName,
                        triggerGroupName: triggerGroupName,
                        cron: cron,
                        cronDesc: cronDesc
                    },
                    success: function (data) {
                        if (data.code == 1) {
                            that.hideDialog();
                            $.messager.popup(data.message, 'success');
                            that.loadData();
                        } else {
                            $('#fm').bootstrapValidator('disableSubmitButtons', false);
                            $.messager.popup(data.message, 'error');
                        }
                    }
                })

            },

            hideDialog:function() {
                //alert("隐藏");
                $('#myModal').modal('hide');
                $('#fm').bootstrapValidator('resetForm', true);
                $("#jobGroupName").val("DEFAULT");
                $("#triggerGroupName").val("DEFAULT");
                $("#code").val("");
                $("#jobName").removeAttr("disabled");
                $("#jobGroupName").removeAttr("disabled");
                $("#triggerName").removeAttr("disabled");
                $("#triggerGroupName").removeAttr("disabled");
            },

            getJobCodes: function (callback) {
                SYS.Core.ajaxGet({
                    url: 'task/quartz/getJobCodes',
                    success: function (data) {
                        if (data.code == 1) {
                            callback && callback(data.data);
                        }
                    }
                })
            },

            initJobCodeData: function (id, code) {
                var that = this;
                that.getJobCodes(function (data) {
                    $('#' + id).html('<option value="">请选择</option>');
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var p = data[i];
                            if (code && code == p.code) {
                                $('#' + id).append('<option value="' + p.code + '" selected>' + p.description + '</option>');
                            } else {
                                $('#' + id).append('<option value="' + p.code + '">' + p.description + '</option>');
                            }
                        }
                    }
                });
            },

        }
    });
    Task.task.init();
})