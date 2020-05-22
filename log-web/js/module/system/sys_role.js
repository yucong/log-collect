define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('jquery.ztree');
    

    $.module("SYS.sys_role", function () {
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
            },
            loadData: function (pageNumber, pageSize) {
                var that = this;
                var search_role_name = $("#search_role_name").val();
                SYS.Core.ajaxGet({
                    url: "permission/role/list",
                    data: {
                        role_name: search_role_name
                    },
                    success: function (data) {
                        var obj = {
                            'pageNumber': data.data.page.current_page,
                            'pageSize': data.data.page.page_size,
                            'totalRows': data.data.page.all_count,
                            'data': data.data.list
                        };
                        $("#myTable").bootstrapTable('destroy'); //销毁table
                        $('#myTable').bootstrapTable({
                            striped: true, //使表格带有条纹
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
                                //{field: 'checked', checkbox: true} ,
                                {
                                    field: 'roleName',
                                    title: '角色名称',
                                    align: 'center'
                                },
                                {
                                    field: 'roleDesc',
                                    title: '角色描述',
                                    align: 'center'
                                },
                                {
                                    field: 'createTime',
                                    title: '创建时间',
                                    align: 'center',
                                    formatter: function (time) {
                                        return SYS.Tool.formatterTime(time);
                                    }
                                },
                                {
                                    field: 'do',
                                    title: '操作',
                                    align: 'center',
                                    formatter: function (value, row, index) {
                                        var html = '';
                                        if (row.id > 0) {
                                            html = '<a href="javascript:void(0)" onclick="SYS.sys_role.toEdit(' + row.id + ',\'' + row.roleName + '\',\'' + row.roleDesc + '\')" class="text-do-edit"><i class="fa fa-pencil"></i> 编辑</a>';
                                            html += '<span class="text-explode"> | </span>';
                                            html += '<a href="javascript:void(0)" onclick="SYS.sys_role.toRemove(' + row.id + ')" class="text-do-remove"><i class="fa fa-trash"></i> 删除</a>';
                                        }
                                        else if(row.id==-1){
                                            html = '<a href="javascript:void(0)" onclick="SYS.sys_role.toEdit(' + row.id + ',\'' + row.roleName + '\',\'' + row.roleDesc + '\')" class="text-do-edit"><i class="fa fa-pencil"></i> 编辑</a>';
                                        }
                                        return html;
                                    }
                                }
                            ],
                            onPageChange: function (number, size) {
                                that.loadData(number, size);
                            },
                            onRefreshTable: function () { //表格右侧刷新按钮
                                that.loadData(obj.pageNumber, obj.pageSize);
                            }
                        });
                    }
                });
            },
            loadEvent: function () {
                var that = this;
                $("#btn_search").on('click', function () {
                    that.loadData();
                });
                $("#btn_add").on('click', function () {
                    that.editRole(0);
                    $('#myModal').modal('show');
                });

                $('#fm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        role_name: {
                            validators: {
                                notEmpty: {
                                    message: '此项必填'
                                }
                            }
                        }
                    }
                }).on('success.form.bv', function (e) { //使用此方法可以ajax
                    e.preventDefault();
                    //保存角色
                    that.saveRole();
                });
                //清空验证信息(必须)
                $('#myModal').on('hide.bs.modal', function () {
                    $("#fm input[name='_id']").val('');
                    $("#fm input[name='role_name']").val('');
                    $("#fm textarea[name='role_desc']").val('');
                    $("#tree").html('');
                    $('#fm').bootstrapValidator('resetForm', true);
                });
            },
            toEdit: function (id, role_name, role_desc) {
                var that = this;
                $("#fm input[name='_id']").val(id);
                $("#fm input[name='role_name']").val(role_name);
                $("#fm textarea[name='role_desc']").val(role_desc);
                that.editRole(id);
                $('#myModal').modal('show');
            },
            toRemove: function (id) {
                var that = this;
                $.messager.confirm("确定要删除吗？", function () {
                    SYS.Core.ajaxPost({
                        url: "permission/role/delete",
                        data: {
                            id: id
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
            editRole: function (id) {
                //加载可选择的菜单
                SYS.Core.ajaxGet({
                    url: 'permission/menu/listRoleMenu',
                    data: {
                        roleId: id
                    },
                    success: function (data) {
                        var setting = {
                            check: {
                                enable: true
                            },
                            view: {
                                showLine: true
                            },
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: "id",
                                    pIdKey: "pId",
                                    rootPId: ""
                                }
                            },
                            callback: {
                                beforeClick: function (treeId, treeNode) {
                                    var zTree = $.fn.zTree.getZTreeObj("tree");
                                    if (treeNode.isParent) {
                                        zTree.expandNode(treeNode);
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        };

                        var menus = data.data;
                        var zNodes = [];
                        if (menus.length > 0) {
                            for (var i = 0; i < menus.length; i++) {
                                var menu = menus[i];
                                var zNode = {};
                                zNode.id = menu.id;
                                zNode.pId = menu.parentId;
                                zNode.name = menu.menuName;
                                zNode.open = true;
                                zNode.checked = menu.checked;
                                zNodes.push(zNode);
                                //二级菜单
                                if (menu.children && menu.children.length > 0) {
                                    for (var j = 0; j < menu.children.length; j++) {
                                        var childrenMenu = menu.children[j];
                                        var zNode = {};
                                        zNode.id = childrenMenu.id;
                                        zNode.pId = menu.id;
                                        zNode.name = childrenMenu.menuName;
                                        zNode.open = true;
                                        zNode.checked = childrenMenu.checked;
                                        zNodes.push(zNode);
                                        //三级菜单
                                        if (childrenMenu.children && childrenMenu.children.length > 0) {
                                            for (var n = 0; n < childrenMenu.children.length; n++) {
                                                var c = childrenMenu.children[n];
                                                var z = {};
                                                z.id = c.id;
                                                z.pId = childrenMenu.id;
                                                z.name = c.menuName;
                                                z.open = true;
                                                z.checked = c.checked;
                                                zNodes.push(z);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $.fn.zTree.init($("#tree"), setting, zNodes);
                    }
                });
            },
            saveRole: function () {
                var that = this;
                var id = $("#fm input[name='_id']").val();
                var role_name = $("#fm input[name='role_name']").val();
                var role_desc = $("#fm textarea[name='role_desc']").val();
                var treeObj = $.fn.zTree.getZTreeObj("tree");
                var nodes = treeObj.getCheckedNodes(true);

                var menuIds = [];
                for (var i = 0; i < nodes.length; i++) {
                    var sel_id = nodes[i].id;
                    menuIds.push(sel_id);
                }
                var url = '';
                if (id == '') {
                    url = 'permission/role/addRoleAndMenu';
                } else {
                    url = 'permission/role/updateRoleAndMenu';
                }
                SYS.Core.ajaxPost({
                    url: url,
                    data: {
                        menuIds: menuIds,
                        roleCode: "string",
                        roleDesc: role_desc,
                        roleId: +id || 0,
                        roleName: role_name
                    },
                    success: function (data) {
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
            }
        }
    });
    SYS.sys_role.init();
})