define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('iCheck');
    require('doctor-data');
    require('typeahead');
    require('fileinput');
    require('baidueditor');
    require('datetimepicker');
    window['ZeroClipboard'] = require('zeroclipboard');
    require('multiselect');
    require('boxer');
    require('jquery.qrcode');


    $.module("DOCTOR.doctor", function () {
        var current_show_data = [];
        var current_hospital_data = [];
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
            },
            /*初始化列表数据*/
            loadData: function (pageNumber, pageSize) {
                var that = this;
                var id = $("#search_id").val();
                var key = $("#search_key").val();
                var platform = $("#search_platform").val();
                var isForce = $("#search_isForce").val();
                SYS.Core.ajaxGet({
                    url: "appversion/fingByPage",  //请求列表数据的URL
                    data: {
                        page: pageNumber ? pageNumber : 1,
                        size: pageSize ? pageSize : 10,
                        id: id ? id : null,
                        key: key ? key : null,
                        platform: platform ? platform : null,
                        isForce: isForce ? isForce : null,
                    },
                    success: function (data) {
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list,
                        };
                        current_show_data = obj.data;
                        console.log(current_show_data)
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
                                    field: 'platform', title: '平台类型', align: 'center',
                                    formatter: function (state) {
                                        if (state == 1) {
                                            return '<span class="label label-success">安卓</span>';
                                        } else if (state == 2) {
                                            return '<span class="label label-danger">IOS</span>';
                                        }
                                        return '数据出错';
                                    }
                                },
                                { field: 'verCode', title: '版本号', align: 'center' },
                                { field: 'md5Value', title: 'md5值', align: 'center' },
                                { field: 'downloadUrl', title: '下载地址', align: 'center' },
                                { field: 'verInfo', title: '版本信息', align: 'center' },
                                {
                                    field: 'downloadUrl', title: '二维码url', align: 'center',
                                    formatter: function (downloadUrl, row, index) {
                                        console.log(index)
                                        return "<div id='code" + index + "' ></div>";
                                    }
                                },
                                {
                                    field: 'isForce', title: '强制升级', align: 'center',
                                    formatter: function (state) {
                                        if (state == 1) {
                                            return '<span class="label label-success">是</span>';
                                        } else if (state == 0) {
                                            return '<span class="label label-danger">否</span>';
                                        }
                                        return '数据出错';
                                    }
                                },
                                {
                                    field: 'state', title: '状态', align: 'center',
                                    formatter: function (state) {
                                        if (state == 1) {
                                            return '<span class="label label-success">有效</span>';
                                        } else if (state == 2) {
                                            return '<span class="label label-danger">无效</span>';
                                        }
                                        return '数据出错';
                                    }
                                },
                                { field: 'memo', title: '备注', align: 'center' },
                                {
                                    field: 'do', title: '操作', align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        html += '<a href="javascript:void(0)" onclick="DOCTOR.doctor.toEdit(' + index + ')" class="text-do-edit">备注</a>';
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
                        $(".boxer").boxer();
                        for (var i = 0; i < current_show_data.length; i++) {
                            var qrcodeUrl = current_show_data[i].downloadUrl;
                            qrcodeUrl = SYS.Tool.toUtf8(qrcodeUrl);
                            console.log(qrcodeUrl)
                            $("#code" + i).qrcode({
                                render: "canvas",
                                width: 100,
                                height: 100,
                                text: qrcodeUrl
                            });
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
                $(".boxer").boxer();
                $("#btn_add").on('click', function () {
                    that.clearData();
                    that.initFileInput();
                    that.showDiv("edit_div");
                });
                /**提交第一层form表单*/
                $('#fm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        name: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        }
                    }
                }).on('success.form.bv', function (e) { //使用此方法可以ajax
                    e.preventDefault();
                    //保存
                    that.updateMemo();
                });
                //清空验证信息(必须)
                $('#myModal').on('hide.bs.modal', function () {
                    $('#fm').bootstrapValidator('resetForm', true);
                    $("#fm input").val('');
                });

                $(".back_list").on('click', function () {
                    that.clearData();
                    that.showDiv('main_div');
                });

                $('#edit_fm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        platform: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            },
                            callback: {
                                message: '必须选择一项',
                                callback: function (value, validator) {
                                    if (value == 0) {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        },
                        verCode: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        },
                        bao: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        },
                        verInfo: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        },
                        isForce: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            },
                            callback: {
                                message: '必须选择一项',
                                callback: function (value, validator) {
                                    if (value == 0) {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        },
                    }
                }).on('success.form.bv', function (e) { //使用此方法可以ajax
                    e.preventDefault();
                    that.save();
                });
                $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-orange", radioClass: "iradio_square-orange" });
            },
            /**修改*/
            toEdit: function (index) {
                var that = this;
                var data = current_show_data[index];
                $("#c_id").val(data.id);
                $("#c_verInfo").val(data.verInfo);
                $("#c_isForce").val(data.isForce);
                $("#memo").val(data.memo);
                $('#myModal').modal('show');
            },
            //保存
            save: function () {
                var that = this;

                var platform = $("#platform").val();
                var verCode = $("#verCode").val();
                // var md5Value = $("#md5Value").val();
                var downloadUrl = $("#downloadUrl").val();
                var verInfo = $("#verInfo").val();
                var qrcodeUrl = $("#qrcodeUrl").val();
                var appUrl = $("#hid_bao").val();
                var isForce = $("#isForce").val();
                var memo = $("#c_memo").val();

                SYS.Core.ajaxGet({
                    url: "appversion/addAppVersion",
                    data: {
                        platform: platform,
                        verCode: verCode,
                        // md5Value: md5Value,
                        downloadUrl: downloadUrl,
                        verInfo: verInfo,
                        qrcodeUrl: qrcodeUrl,
                        appUrl: appUrl,
                        isForce: isForce,
                        memo: memo,
                    },
                    success: function (data) {
                        if (data.code == 1) {
                            $.messager.popup(data.message, 'success');
                            var pageNumber = +$(".page-number.active a").html();
                            var pageSize = 10;
                            that.loadData(pageNumber, pageSize);
                            that.showDiv('main_div');
                        } else {
                            $('#edit_fm').bootstrapValidator('disableSubmitButtons', false);
                            $.messager.popup(data.message, 'error');
                        }
                    }
                })
            },
            updateMemo: function () {
                var that = this;
                var id = +$("#c_id").val();
                var verInfo = $("#c_verInfo").val();
                var isForce = $("#c_isForce").val();
                var memo = $("#memo").val();
                SYS.Core.ajaxPost({
                    url: 'appversion/updateAppVersionMemo',
                    data: {
                        id: id ? id : 0,
                        verInfo: verInfo,
                        isForce: isForce,
                        memo: memo,
                    },
                    success: function (data) {
                        if (data.code == 1) {
                            $('#myModal').modal('hide');
                            $.messager.popup(data.message, 'success');
                            var pageNumber = +$(".page-number.active a").html();
                            var pageSize = 10;
                            that.loadData(pageNumber, pageSize);
                        } else {
                            $('#fm_item').bootstrapValidator('disableSubmitButtons', false);
                            $.messager.popup(data.message, 'error');
                        }
                    }
                })
            },

            initFileInput: function (initialPreview) {
                var options = {
                    img_id: 'bao',
                    typeId: "",
                    initialPreview: initialPreview,
                    hid_img_id: 'hid_bao',
                    showZoom: true
                };
                SYS.Tool.initSingleFile(options);
            },
            clearData: function () {
                $("#platform").val("")
                $("#verCode").val("")
                $("#md5Value").val("")
                $("#downloadUrl").val("")
                $("#verInfo").val("")
                $("#qrcodeUrl").val("")
                $("#isForce").val("")
                $("#c_memo").val("")

                $('#edit_fm').bootstrapValidator('resetForm', true);
            },
            showDiv: function (div) {
                var divs = ['main_div', 'edit_div', 'show_div'];
                for (var i = 0; i < divs.length; i++) {
                    $("#" + divs[i]).hide();
                }
                $("#" + div).show();
            },
        }
    });
    DOCTOR.doctor.init();
})