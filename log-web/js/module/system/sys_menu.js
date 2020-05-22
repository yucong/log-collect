define(function (require) {
    var doT = require('doT');
    require('treegrid');
    require('bootstrapValidator');
    require('messager');


    $.module("SYS.sys_menu", function () {
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
            },
            clear: function () {
                $("#fm #menu_name").val("");
                $("#fm #menu_path").val("");
                $("#fm #menu_sort").val("");
                $("#fm #icon_cls").val("");
                $("#fm #desc").val("");
                $("#fm #btn_name").val("");
                $("#fm #scode").val("");
                // $("#fm input[name='id']").val("");
                $("#fm input[name='parent_id']").val("");
            },
            loadData: function () {
                SYS.Core.ajaxGet({
                    url: 'permission/menu/listAll',
                    data: {},
                    success: function (data) {
                        var template = doT.template($("#tmpl_sys_menu_list").html());
                        $("#sys_menu_list").html(template(data.data));
                        $('#menu_tree').treegrid();
                        $('#menu_tree').treegrid('collapseAll');
                        // console.log($("fm input:radio").val())
                    }
                })
            },
            loadEvent: function () {
                var that = this;
                $('input[type=radio][name=itype]').on("change", function () {
                    if ($(this).val() == 1) {
                        $(".menu").show();
                        $(".button").hide();
                        $(".m_menu").show();
                        $("#scodeName").html("菜单代码")
                        $(".m_name label").html("菜单名称")
                        $(".m_name input").attr("placeholder","请输入菜单名称");
                        $(".m_order label").html("菜单顺序")
                        $(".m_btn input").attr("placeholder","请输入菜单代码");
                        $(".m_order input").attr("placeholder","请输入菜单顺序");
                        // console.log("1")
                    }
                    if ($(this).val() == 2) {
                        $(".menu").hide();
                        $(".button").show();
                        $(".m_menu").hide();
                        $("#scodeName").html("按钮代码")
                        $(".m_name label").html("按钮名称")
                        $(".m_name input").attr("placeholder","请输入按钮名称");
                        $(".m_order label").html("按钮顺序")
                        $(".m_btn input").attr("placeholder","请输入按钮ID");
                        $(".m_order input").attr("placeholder","请输入按钮顺序");
                    }
                });

                if($('input[type=radio][name=itype]:checked').val()==1){
                    $(".menu").show();
                    $(".button").hide();
                    $(".m_menu").show();
                    $("#scodeName").html("菜单代码")
                    $(".m_name label").html("菜单名称")
                    $(".m_order label").html("菜单顺序")
                }

                if($('input[type=radio][name=itype]:checked').val()==2){
                    $(".menu").hide();
                    $(".button").show();
                    $("#scodeName").html("按钮代码")
                    $(".m_menu").hide();
                    $(".m_name label").html("按钮名称")
                    $(".m_order label").html("按钮顺序")
                }
                
                $('#fm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        menuName: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        },
                        menuSort: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                },
                                regexp: {
                                    regexp: /^[1-9][0-9]*$/,
                                    message: '请输入正整数'
                                }
                            }
                        }
                    },
                    //提交后，整个页面会刷新
                    //submitHandler: function(validator, form, submitButton) {
                    //    that.saveMenu();
                    //}
                }).on('success.form.bv', function (e) { //使用此方法可以ajax
                    e.preventDefault();
                    //保存菜单
                    that.saveMenu();
                });
                //清空验证信息(必须)
                $('#myModal').on('hide.bs.modal', function () {
                    $("#fm input[name='id']").val('');
                    $("#fm input[name='parent_id']").val('');
                    $("#fm input[name='menu_name']").val('');
                    $("#fm input[name='menu_path']").val('');
                    $("#fm input[name='menu_sort']").val('');
                    $("#fm input[name='icon_cls']").val('');
                    $("#desc").val('');
                    $('#fm').bootstrapValidator('resetForm', true);
                });
            },
            editDialog: function (id) {
                //根据id获取菜单信息
                id = Number(id);
                SYS.Core.ajaxGet({
                    url: "permission/menu/detail",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data.code == 1) {
                            //填充表单
                            var menu = data.data;
                            $("#fm input[name='id']").val(menu.id);
                            if (menu.itype == 1) {
                                $("#fm input[name='itype']").eq(0)[0].checked = true;
                            }
                            if (menu.itype == 2) {
                                $("#fm input[name='itype']").eq(1)[0].checked = true;;
                            }
                            $("#fm input[name='parent_id']").val(menu.parentId);
                            $("#fm input[name='menu_name']").val(menu.menuName);
                            $("#fm input[name='menu_path']").val(menu.menuPath);
                            $("#fm input[name='menu_sort']").val(menu.menuSort);
                            $("#fm input[name='icon_cls']").val(menu.iconCls);
                            $("#fm input[name='scode']").val(menu.scode);
                            $("#desc").val(menu.memo);
                        } else {
                            $.messager.popup('加载数据失败，请稍后再试', 'error');
                        }
                    }
                });
                $('#myModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#myModal').modal('show');
            },
            saveMenu: function () {
                var that = this;
                var url = '';
                var id = $("#fm input[name='id']").val();
                console.log(id);
                if (id == '') {
                    url = 'permission/menu/add';
                } else {
                    url = 'permission/menu/update';
                }
                var parentId = $("#fm input[name='parent_id']").val();
                var itype = $("#fm input[name='itype']:checked").val();
                console.log(itype)
                var menuName = $("#fm input[name='menu_name']").val();
                var menuPath = $("#fm input[name='menu_path']").val();
                var menuSort = $("#fm input[name='menu_sort']").val();
                var iconCls = $("#fm input[name='icon_cls']").val();
                // var btnName = $("#fm input[name='btn_name']").val();
                var scode = $("#fm input[name='scode']").val();
                var memo = $("#desc").val();
                console.log(parentId);
                console.log(menuName);
                console.log(menuPath);
                console.log(menuSort);
                console.log(iconCls);
                SYS.Core.ajaxPost({
                    url: url,
                    data: {
                        id: id ? id : 0,
                        parentId: parentId ? parentId : 0,
                        menuName: menuName || '',
                        menuPath: menuPath || '',
                        menuSort: menuSort || '',
                        iconCls: iconCls || '',
                        itype: itype || '',
                        scode: scode || '',
                        memo: memo
                    },
                    success: function (data) {
                        that.clear();
                        if (data.code == 1) {
                            $('#myModal').modal('hide');
                            $.messager.popup('保存成功', 'success');
                            that.loadData();
                        } else {
                            $('#fm').bootstrapValidator('disableSubmitButtons', false);
                            $.messager.popup(data.message, 'error');
                        }
                    }
                })
            },
            addChildMenu: function (id) {
                $("#fm input[name='parent_id']").val(id); //绑定父菜单ID
                $('#myModal').modal('show');
            },
            deleteMenu: function (id) {
                var that = this;
                $.messager.confirm('确定要删除选择的菜单吗？如果存在子菜单，将一并删除？', function () {
                    SYS.Core.ajaxPost({
                        url: "permission/menu/delete",
                        common: {},
                        data: {
                            id: id
                        },
                        success: function (data) {
                            if (data.code == 1) {
                                $.messager.popup(data.message, 'success');
                                that.loadData();
                            } else {
                                $.messager.popup('删除失败，请稍后再试', 'error');
                            }
                        }
                    })
                });
            }
        }
    });
    SYS.sys_menu.init();
});