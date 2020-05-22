$.module('DOCTOR.Select', function () {
    return {
        /**
         * 用户列表插件
         * 使用方法：
         *  $("#bind_user").on('click', function () {
                DOCTOR.Select.showUser(this);
            });
         */
        showAllUser: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_user_id" type="text" class="form-control" placeholder="用户ID">';
            search += '<input id="tool_s_nickname" type="text" class="form-control" placeholder="用户昵称">';
            search += '</div>';
            var $userModal = $(that.initModal('用户列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showUserData(1, 10, obj.id, -1); // 调用显示用户列表页面
            that.showUserEvent(obj.id, -1);
        },
        showUser: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_user_id" type="text" class="form-control" placeholder="用户ID">';
            search += '<input id="tool_s_nickname" type="text" class="form-control" placeholder="用户昵称">';
            search += '</div>';
            var $userModal = $(that.initModal('用户列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showUserData(1, 10, obj.id, 2); // 调用显示用户列表页面
            that.showUserEvent(obj.id, 2);
        },
        showUserDoctor: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_user_id" type="text" class="form-control" placeholder="用户ID">';
            search += '<input id="tool_s_nickname" type="text" class="form-control" placeholder="用户昵称">';
            search += '</div>';
            var $userModal = $(that.initModal('医生列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showUserData(1, 10, obj.id, 1); // 调用显示用户列表页面
            that.showUserEvent(obj.id, 1);
        },
        /**
         * 商品规格选择插件
         * @param obj
         */
        showProductSpec: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_name" type="text" class="form-control" placeholder="规格名称">';
            search += '</div>';
            var $productSpecModal = $(that.initModal('商品规格列表', search));
            $(document.body).append($productSpecModal);
            $productSpecModal.modal('show');
            that.showProductSpecData(1, 10, obj.id);
            that.showProductSpecEvent(obj.id);
        },
        /**
         * 商品选择插件
         * @param obj
         */
        showProduct: function (obj, free_trial) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_product_id" type="text" class="form-control" placeholder="商品ID">';
            search += '<input id="tool_s_product_name" type="text" class="form-control" placeholder="商品名称">';
            search += '<input id="tool_s_product_tag_name" type="text" class="form-control" placeholder="标签名称">';
            search += '</div>';
            var $userModal = $(that.initModal('商品列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showProductData(1, 5, obj.id, free_trial);
            that.showProductEvent(obj.id);
        },
        /**
         * SKU规格选择插件
         * @param obj
         */
        showSkuSpec: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_product_spec_name" type="text" class="form-control" placeholder="规格名称">';
            search += '<input id="tool_s_skuspec_value" type="text" class="form-control" placeholder="规格值">';
            search += '</div>';
            var $userModal = $(that.initModal('SKU规格列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showSkuSpecData(1, 10, obj.id);
            that.showSkuSpecEvent(obj.id);
            that.showProductSpecTypeahead("tool_s_product_spec_name");
        },
        /**
         * 资讯选择插件
         * @param obj
         */
        showArticle: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_article_id" type="text" class="form-control" placeholder="资讯ID">';
            search += '<input id="tool_s_article_title" type="text" class="form-control" placeholder="资讯标题">';
            search += '</div>';
            var $userModal = $(that.initModal('资讯列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showArticleData(1, 5, obj.id);
            that.showArticleEvent(obj.id);
        },
        /**
         * 带参二维码选择插件
         * @param obj
         */
        showWxScene: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<select id="tool_s_scene_app_id" class="form-control">';
            search += '<option value="zsmy">掌尚名医</option>';
            search += '</select>';
            search += '<input id="tool_s_scene_title" type="text" class="form-control" placeholder="标题">';
            search += '</div>';
            var $wxSceneModal = $(that.initModal('带参二维码列表', search));
            $(document.body).append($wxSceneModal);
            $wxSceneModal.modal('show');
            that.showWxSceneData(1, 5, obj.id);
            that.showWxSceneEvent(obj.id);
        },

        /**
         * 医美问题附件选择插件
         * @param obj
         */
        showAiAttach: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<select id="tool_s_type" class="form-control">';
            search += ' <option value="-1">全部类型</option>';
            search += ' <option value="1">图片组</option>';
            search += ' <option value="2">公开课</option>';
            search += ' <option value="3">地里位置</option>';
            search += ' <option value="4">视频</option>';
            search += ' <option value="5">百科</option>';
            search += ' <option value="6">商品页</option>';
            search += '</select>';
            search += '</div>';
            search += '<div class="form-group">';
            search += '<input id="tool_s_name" type="text" class="form-control" placeholder="名称">';
            search += '</div>';
            var $aiAttachModal = $(that.initModal('医美问题附件列表', search));
            $(document.body).append($aiAttachModal);
            $aiAttachModal.modal('show');
            that.showAiAttachData(1, 10, obj.id);
            that.showAiAttachEvent(obj.id);
        },
        /**
         * 医美标准问题选择插件
         * @param obj
         */
        showStandardReq: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_id" type="text" class="form-control" placeholder="问题ID">';
            search += '<input id="tool_s_project" type="text" class="form-control" placeholder="项目">';
            search += '<input id="tool_s_standard_req" type="text" class="form-control" placeholder="问题">';
            search += '</div>';
            var $standarReqModal = $(that.initModal('医美标准问题列表', search));
            $(document.body).append($standarReqModal);
            $standarReqModal.modal('show');
            that.showStandardReqData(1, 10, obj.id);
            that.showStandardReqEvent(obj.id);
        },
        /**
         * 医美项目百科选择插件
         * @param obj
         */
        showProjectBaike: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_id" type="text" class="form-control" placeholder="百科ID">';
            search += '<input id="tool_s_project" type="text" class="form-control" placeholder="项目">';
            search += '</div>';
            var $projectBaikeModal = $(that.initModal('医美项目百科列表', search));
            $(document.body).append($projectBaikeModal);
            $projectBaikeModal.modal('show');
            that.showProjectBaikeData(1, 10, obj.id);
            that.showProjectBaikeEvent(obj.id);
        },
        /**
         * 陪同人选择插件
         * @param obj
         */
        showAccompany: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_name" type="text" class="form-control" placeholder="陪同人姓名">';
            search += '<input id="tool_s_phone" type="text" class="form-control" placeholder="陪同人手机号">';
            search += '</div>';
            var $accompanyModal = $(that.initModal('陪同人列表', search));
            $(document.body).append($accompanyModal);
            $accompanyModal.modal('show');
            that.showAccompanyData(1, 10, obj.id);
            that.showAccompanyEvent(obj.id);
        },

        showUserData: function (pageNumber, pageSize, fieldId, platform) {
            var that = this;
            that.showLoading(true);
            var search_id = $("#tool_s_user_id").val();
            var search_name = $("#tool_s_nickname").val();
            if (typeof(search_name) == "undefined") {
                search_name = '';
            }
            SYS.Core.ajax({
                url: "user/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10
                },
                data: {
                    _id: search_id || 0,
                    nickname: search_name,
                    sex: -1,
                    saas: -1,
                    platform: platform || -1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'img', title: '头像', align: 'center',
                                formatter: function (img) {
                                    return SYS.Tool.getUserImg(img);
                                }
                            },
                            {field: 'nickname', title: '昵称', align: 'center',
                                formatter: function (val) {
                                    return decodeURI(val);
                                }
                            },
                            {field: 'phone', title: '手机号', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.nickname ? row.nickname.replace(/[\r\n]/g, "") : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showUserData(number, size, fieldId, platform);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showUserData(obj.pageNumber, obj.pageSize, fieldId, platform);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },

        showUserEvent: function (fieldId, platform) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showUserData(1, 10, fieldId, platform);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showUserData(1, 10, fieldId, platform);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showProductSpecData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var search_name = $("#tool_s_name").val();
            if (typeof(search_name) == "undefined") {
                search_name = '';
            }
            SYS.Core.ajax({
                url: "productSpec/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5
                },
                data: {
                    name: search_name
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'category_name', title: '商品分类', align: 'center',
                                formatter: function (val, row, index) {
                                    if(row.category_info){
                                        return row.category_info.name;
                                    }
                                    return '-';
                                }
                            },
                            {field: 'name', title: '规格名称', align: 'center'},
                            {field: 'value', title: '规格清单', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.name ? encodeURI(row.name.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showProductSpecData(number, size, fieldId);
                        },
                        onRefreshTable: function () {
                            that.showProductSpecData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showProductSpecEvent: function (fieldId) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showProductSpecData(1, 10, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showProductSpecData(1, 10, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showProductData: function (pageNumber, pageSize, fieldId, free_trial) {
            var that = this;
            that.showLoading(true);
            var search_id = $("#tool_s_product_id").val();
            var search_name = $("#tool_s_product_name").val();
            var tag_name = $("#tool_s_product_tag_name").val();
            if (typeof(search_name) == "undefined") {
                search_name = '';
            }
            SYS.Core.ajax({
                url: "product/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5,
                    order: "create_time:-1"
                },
                data: {
                    _id: search_id || 0,
                    goodsname: search_name,
                    tag_name: tag_name,
                    free_trial: free_trial || -1,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'img', title: '商品头图', align: 'center',
                                formatter: function (val) {
                                    if(val && val != '') {
                                        return "<img src='" + val + "' style='width:100px; height:50px;' />";
                                    }
                                    return '-';
                                }
                            },
                            {field: 'goodsname', title: '商品名称', align: 'center'},
                            {
                                field: 'auth_tags', title: '认证标签', align: 'center',
                                formatter:function (val,row) {
                                    var result = "";
                                    if (val != null) {
                                        result += '<span class="tag-blue">' +val +'</span>';
                                    }
                                    if (row.free_trial == 1) {
                                        result += '<span class="tag-green">免费体验</span>';
                                    }

                                    return result;
                                }
                            },
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.goodsname ? encodeURI(row.goodsname.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showProductData(number, size, fieldId, free_trial);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showProductData(obj.pageNumber, obj.pageSize, fieldId, free_trial);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },

        showProductEvent: function (fieldId) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showProductData(1, 5, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showProductData(1, 5, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showSkuSpecData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var search_product_spec_id = $("#tool_s_product_spec_name").attr('data-id');
            var search_value = $("#tool_s_skuspec_value").val();
            if (typeof(search_value) == "undefined") {
                search_value = '';
            }
            SYS.Core.ajax({
                url: "skuSpec/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5
                },
                data: {
                    product_spec_id: search_product_spec_id || -1,
                    value: search_value
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'product_spec_info', title: '商品规格', align: 'center',
                                formatter: function (val, row, index) {
                                    if(row.product_spec_info){
                                        return row.product_spec_info.name;
                                    }
                                    return '-';
                                }
                            },
                            {field: 'value', title: '商品规格值', align: 'center'},
                            {field: 'vis_order', title: '顺序号', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var show_value = row.value;
                                    var content = show_value ? encodeURI(show_value.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showSkuSpecData(number, size, fieldId);
                        },
                        onRefreshTable: function () {
                            that.showSkuSpecData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showSkuSpecEvent: function (fieldId) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showSkuSpecData(1, 10, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showSkuSpecData(1, 10, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },
        showProductSpecTypeahead: function (id) {
            var sel_data = {};
            $('#' + id).typeahead("destroy");
            $('#' + id).typeahead({
                delay: 500,
                matcher: function () {
                    return true
                },
                source: function (query, process) {
                    query = query.trim()
                    var parameter = {
                        name: query
                    };
                    $.ajax({
                        url: "/productSpec/list",
                        type: "post",
                        data: {
                            parameters: JSON.stringify({
                                common: {},
                                data: parameter
                            })
                        },
                        success: function (res) {
                            var res = JSON.parse(res);
                            var code = res.code;
                            if (code == 1) {
                                var list = res.data.list;
                                var newRes = [];
                                for (var i in list) {
                                    var spec = list[i];
                                    newRes.push(spec.name);
                                    sel_data[spec._id] = spec.name;
                                }
                                process(newRes);
                            }
                        }
                    });
                },
                matcher: function (query) {
                    return true;
                },
                updater: function (value) {
                    for (var i in sel_data) {
                        var svalue = sel_data[i];
                        if(value==svalue){
                            $('#' + id).attr("data-id", i);
                            $('#' + id).attr("data-value", svalue);
                            return value;
                        }
                    }
                    return ""
                }
            });
        },
        showArticleData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var search_id = $("#tool_s_article_id").val();
            var search_title = $("#tool_s_article_title").val();
            if (typeof(search_title) == "undefined") {
                search_title = '';
            }
            SYS.Core.ajax({
                url: "article/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5,
                    order: 'sort_number:-1,create_time:-1'
                },
                data: {
                    _id: search_id || -1,
                    title: search_title,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'thumb_img', title: '缩略图', align: 'center',
                                formatter: function (val) {
                                    if(val && val != '') {
                                        return "<img src='" + val + "' style='width:100px; height:50px;' />";
                                    }
                                    return '-';
                                }
                            },
                            {field: 'title', title: '文章标题', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.title ? encodeURI(row.title.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showArticleData(number, size, fieldId);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showArticleData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },

        showArticleEvent: function (fieldId) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showArticleData(1, 5, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showArticleData(1, 5, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showWxSceneData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var search_app_id = $("#tool_s_scene_app_id").val();
            var search_title = $("#tool_s_scene_title").val();
            if (typeof(search_title) == "undefined") {
                search_title = '';
            }
            SYS.Core.ajax({
                url: "wxScene/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5
                },
                data: {
                    app_id: search_app_id,
                    title: search_title,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'app_id', title: '所属公众号', align: 'center'},
                            {field: 'title', title: '标题', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.title ? encodeURI(row.title.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showWxSceneData(number, size, fieldId);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showWxSceneData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },

        showWxSceneEvent: function (fieldId) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showWxSceneData(1, 5, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showWxSceneData(1, 5, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showAiAttachData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var search_type = $("#tool_s_type").val();
            var search_name = $("#tool_s_name").val();
            if (typeof(search_name) == "undefined") {
                search_name = '';
            }
            SYS.Core.ajax({
                url: "aiAttach/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10
                },
                data: {
                    type_id: search_type || -1,
                    type_name: search_name
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: 'id',
                        data: obj.data,
                        columns: [
                            {field: 'id', title: 'ID', align: 'center'},
                            {field: 'type_id', title: '分类', align: 'center',
                                formatter: function (val) {
                                    if(val == 1) {
                                        return '图片组';
                                    } else if(val == 2) {
                                        return '公开课';
                                    } else if(val == 3) {
                                        return '地里位置';
                                    } else if(val == 4) {
                                        return '视频';
                                    } else if(val == 5) {
                                        return '百科';
                                    } else if(val == 6) {
                                        return '商品页';
                                    }
                                    return "-";
                                }
                            },
                            {field: 'type_name', title: '名称', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.type_name ? encodeURI(row.type_name.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row.id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showAiAttachData(number, size, fieldId);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showAiAttachData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showAiAttachEvent: function (fieldId) {
            var that = this;
            // 对用户添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showAiAttachData(1, 10, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showAiAttachData(1, 10, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showStandardReqData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var id = $("#tool_s_id").val();
            var project = $("#tool_s_project").val();
            var standard_req = $("#tool_s_standard_req").val();

            SYS.Core.ajax({
                url: "aiStanderReq/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10
                },
                data: {
                    id: id || -1,
                    project: project,
                    standard_req: standard_req
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: 'id',
                        data: obj.data,
                        columns: [
                            {field: 'id', title: '问题ID', align: 'center'},
                            {field: 'part', title: '部位', align: 'center',
                                formatter: function (val, row) {
                                    return row.top_part + ' > ' + row.part;
                                }
                            },
                            {field: 'project', title: '项目', align: 'center'},
                            {field: 'category', title: '分类', align: 'center'},
                            {field: 'standard_req', title: '问题', align: 'center'},
                            {field: 'standard_answer', title: '答案', align: 'center',
                                formatter: function (val) {
                                    return SYS.Tool.cutStrLength(val);
                                }
                            },
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.standard_req ? encodeURI(row.standard_req.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row.id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showStandardReqData(number, size, fieldId);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showStandardReqData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showStandardReqEvent: function (fieldId) {
            var that = this;
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showStandardReqData(1, 10, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showStandardReqData(1, 10, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        showProjectBaikeData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var id = $("#tool_s_id").val();
            var project = $("#tool_s_project").val();

            SYS.Core.ajax({
                url: "aiProjectBaike/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10
                },
                data: {
                    _id: id || -1,
                    project: project
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: '百科ID', align: 'center'},
                            {field: 'project', title: '项目', align: 'center'},
                            {field: 'summary', title: '概念', align: 'center',
                                formatter: function (val) {
                                    return SYS.Tool.cutStrLength(val);
                                }
                            },
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.project ? encodeURI(row.project.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showProjectBaikeData(number, size, fieldId);
                        },
                        onRefreshTable: function () {
                            that.showProjectBaikeData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showProjectBaikeEvent: function (fieldId) {
            var that = this;
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showProjectBaikeData(1, 10, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showProjectBaikeData(1, 10, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },
        /**
         * 陪同人
         * @param pageNumber
         * @param pageSize
         * @param fieldId
         */
        showAccompanyData: function (pageNumber, pageSize, fieldId) {
            var that = this;
            that.showLoading(true);
            var name = $("#tool_s_name").val();
            var phone = $("#tool_s_phone").val();

            SYS.Core.ajax({
                url: "accompany/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10
                },
                data: {
                    name: name,
                    phone: phone,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: 'id',
                        data: obj.data,
                        columns: [
                            {field: 'id', title: 'ID', align: 'center'},
                            {field: 'name', title: '姓名', align: 'center'},
                            {field: 'phone', title: '手机号', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var content = row.name ? encodeURI(row.name.replace(/[\r\n]/g, "")) : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row.id + ',\'' + content + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showAccompanyData(number, size, fieldId);
                        },
                        onRefreshTable: function () {
                            that.showAccompanyData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showAccompanyEvent: function (fieldId) {
            var that = this;
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showAccompanyData(1, 10, fieldId);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showAccompanyData(1, 10, fieldId);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        /**
         * 机构管理
         * @param obj
         */
        showAgencies: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_id" type="text" class="form-control" placeholder="ID">';
            search += '<input id="tool_s_agencies_name" type="text" class="form-control" placeholder="机构名称">';
            search += '</div>';
            var $agenciesModal = $(that.initModal('机构列表', search));
            $(document.body).append($agenciesModal);
            $agenciesModal.modal('show');
            that.showAgenciesData(1, 10, obj.id, 1); // 调用显示机构列表页面
            that.showAgenciesEvent(obj.id, 1);
        },
        showAgenciesData: function (pageNumber, pageSize, fieldId, platform) {
            var that = this;
            that.showLoading(true);
            var s_id = $("#tool_s_id").val();
            var s_agencies_name = $("#tool_s_agencies_name").val();

            if (typeof(s_doctor_name) == "undefined") {
                s_doctor_name = '';
            }
            if (typeof(s_project_name) == "undefined") {
                s_project_name = '';
            }
            if (typeof(s_agencies_name) == "undefined") {
                s_agencies_name = '';
            }

            SYS.Core.ajax({
                url: "agencies/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10,
                    order:"rank: -1"
                },
                data: {
                    _id: s_id || 0,
                    agencies_name: s_agencies_name,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [5, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'agencies_name', title: '机构名称', align: 'center'},
                            {field: 'address', title: '机构地址', align: 'center'},
                            {field: 'telphone', title: '机构电话', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var agencies_name = row.agencies_name ? row.agencies_name.replace(/[\r\n]/g, "") : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + agencies_name + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showAgenciesData(number, size, fieldId, platform);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showAgenciesData(obj.pageNumber, obj.pageSize, fieldId, platform);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showAgenciesEvent: function (fieldId, platform) {
            var that = this;
            // 对机构添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showAgenciesData(1, 5, fieldId, platform);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showAgenciesData(1, 5, fieldId, platform);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },
        /**
         * 机构医生
         * @param obj
         */
        showAgenciesDoctor: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_id" type="text" class="form-control" placeholder="ID">';
            search += '<input id="tool_s_doctor_name" type="text" class="form-control" placeholder="医生名称">';
            search += '</div>';
            var $agenciesModal = $(that.initModal('列表', search));
            $(document.body).append($agenciesModal);
            $agenciesModal.modal('show');
            that.showAgenciesDoctorData(1, 5, obj.id); // 调用显示机构医生列表页面
            that.showAgenciesDoctorEvent(obj.id);
        },
        showAgenciesDoctorData: function (pageNumber, pageSize, fieldId, platform) {
            var that = this;
            that.showLoading(true);
            var s_id = $("#tool_s_id").val();
            var s_doctor_name = $("#tool_s_doctor_name").val();

            if (typeof(s_doctor_name) == "undefined") {
                s_doctor_name = '';
            }

            SYS.Core.ajax({
                url: "agencies_doctor/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5,
                    order: "create_time:-1"
                },
                data: {
                    _id: s_id || 0,
                    doctor_name: s_doctor_name,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [5, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {
                                field: 'doctor_name',
                                title: '医生信息',
                                align: 'center',
                                formatter: function (val, row) {
                                    var cover = row.cover;
                                    if (val && val != '') {
                                        return "<img src='" + cover + "' style='width:100px; height:50px;' /> <br />" + val;
                                    }
                                    return val;
                                }
                            },
                            {
                                field: 'agencies_id',
                                title: '机构信息',
                                align: 'center',
                                formatter: function (val, row) {
                                    var agencies_info = row.agencies_info;
                                    if (agencies_info != null) {
                                        return "<img src='" + agencies_info.cover + "' style='width:100px; height:50px;' /> <br />" + agencies_info.agencies_name + "<br />(" + agencies_info._id + ")";
                                    }
                                    return val;
                                }
                            },
                            {field: 'professor', title: '职称', align: 'center'},
                            {field: 'position', title: '职位', align: 'center'},
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var doctor_name = row.doctor_name ? row.doctor_name.replace(/[\r\n]/g, "") : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + doctor_name + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showAgenciesDoctorData(number, size, fieldId);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showAgenciesDoctorData(obj.pageNumber, obj.pageSize, fieldId);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showAgenciesDoctorEvent: function (fieldId) {
            var that = this;
            // 对机构添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showAgenciesDoctorData(1, 5);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showAgenciesDoctorData(1, 5);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },
        /**
         * Banner管理
         * @param obj
         */
        showBanner: function (obj, position_type) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_id" type="text" class="form-control" placeholder="ID">';
            search += '<input id="tool_s_title" type="text" class="form-control" placeholder="推荐位名称">';
            search += '</div>';
            var $bannerModal = $(that.initModal('Banner列表', search));
            $(document.body).append($bannerModal);
            $bannerModal.modal('show');
            that.showBannerData( obj.id, position_type, 1, 5); // 调用显示机构列表页面
            that.showBannerEvent(obj.id, position_type);
        },
        showBannerData: function (fieldId, position_type, pageNumber, pageSize) {
            var that = this;
            that.showLoading(true);
            var tool_s_id = $("#tool_s_id").val();
            var tool_s_title = $("#tool_s_title").val();

            if (typeof(tool_s_id) == "undefined") {
                tool_s_id = '';
            }
            if (typeof(tool_s_title) == "undefined") {
                tool_s_title = '';
            }

            SYS.Core.ajax({
                url: "banner/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5
                },
                data: {
                    _id: tool_s_id || -1,
                    title: tool_s_title,
                    position_type: position_type || -1,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [5, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'img', title: '图片', align: 'center',
                                formatter: function (val) {
                                    if(val && val != '') {
                                        return "<img src='" + val + "' style='width:100px; height:50px;' />";
                                    }
                                    return '-';
                                }
                            },
                            {field: 'title', title: '标题', align: 'center'},
                            {field: 'position_type', title: '位置类型', align: 'center',
                                formatter: function (val) {
                                    if(val == 1) {
                                        return "<span class='tag-orange'>C端首页</span>";
                                    } else if(val == 2) {
                                        return "<span class='tag-blue'>C端资讯页</span>";
                                    } else if(val == 3) {
                                        return "<span class='tag-green'>D端首页</span>";
                                    } else if(val == 4) {
                                        return "<span class='tag-red'>D端资讯页</span>";
                                    } else if(val == 5) {
                                        return "<span class='tag-blueviolet'>C端启动页</span>";
                                    } else if(val == 6) {
                                        return "<span class='tag-mediumblue'>D端启动页</span>";
                                    } else if(val == 7) {
                                        return "<span class='tag-blue'>H5商城</span>";
                                    }
                                    return '-';
                                }
                            },
                            {field: 'ref_type', title: '业务类型', align: 'center',
                                formatter: function (val) {
                                    if(val == 1) {
                                        return "资讯详细";
                                    } else if(val == 2) {
                                        return "商品详细";
                                    } else if(val == 3) {
                                        return "自定义内容";
                                    }
                                    return '-';
                                }
                            },
                            {field: 'ref_id', title: '实际业务', align: 'center',
                                formatter: function (val, row) {
                                    var html = '('+val+')';
                                    if(row.ref_type == 1 && row.article) {
                                        html += SYS.Tool.cutStrLength(row.article.title, 10);
                                    } else if(row.ref_type == 2 && row.product) {
                                        html += SYS.Tool.cutStrLength(row.product.goodsname, 10);
                                    }
                                    return html;
                                }
                            },
                            {field: 'create_time', title: '创建时间', align: 'center',
                                formatter: function (time) {
                                    return SYS.Tool.formatterTime(time);
                                }
                            },
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var title = row.title ? row.title.replace(/[\r\n]/g, "") : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + title + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showBannerData(fieldId, position_type, number, size);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showBannerData(fieldId, position_type, obj.pageNumber, obj.pageSize);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showBannerEvent: function (fieldId, position_type) {
            var that = this;
            // 对机构添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showBannerData(fieldId, position_type, 1, 5);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showBannerData(fieldId, position_type, 1, 5);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },
        /**
         * 项目科普
         * @param obj
         */
        showProjectScience: function (obj) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_id" type="text" class="form-control" placeholder="ID">';
            search += '<input id="tool_s_title" type="text" class="form-control" placeholder="项目名称">';
            search += '</div>';
            var $bannerModal = $(that.initModal('项目科普列表', search));
            $(document.body).append($bannerModal);
            $bannerModal.modal('show');
            that.showProjectScienceData( obj.id, 1, 5); // 调用显示机构列表页面
            that.showProjectScienceEvent(obj.id);
        },
        showProjectScienceData: function (fieldId, pageNumber, pageSize) {
            var that = this;
            that.showLoading(true);
            var tool_s_id = $("#tool_s_id").val();
            var tool_s_title = $("#tool_s_title").val();

            if (typeof(tool_s_id) == "undefined") {
                tool_s_id = '';
            }
            if (typeof(tool_s_title) == "undefined") {
                tool_s_title = '';
            }

            SYS.Core.ajax({
                url: "product_science/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 5
                },
                data: {
                    _id: tool_s_id || -1,
                    project_name: tool_s_title,
                    status: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [5, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {field: '_id', title: 'ID', align: 'center'},
                            {field: 'project_name', title: '项目名称', align: 'center'},
                            {field: 'remark', title: '项目描述', align: 'center'},
                            {
                                field: 'status', title: '状态', align: 'center',
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
                                    return SYS.Tool.formatterTime(time);//对时间进行格式化
                                }
                            },
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var title = row.project_name ? row.project_name.replace(/[\r\n]/g, "") : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + title + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showProjectScienceData(fieldId, number, size);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showProjectScienceData(fieldId, obj.pageNumber, obj.pageSize);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showProjectScienceEvent: function (fieldId, position_type) {
            var that = this;
            // 对机构添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showProjectScienceData(fieldId, 1, 5);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showProjectScienceData(fieldId, 1, 5);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        /**
         * 分销商
         * @param obj
         */
        showDistributionUser: function (obj, commission_role) {
            var that = this;
            var search = '';
            search += '<div class="form-group">';
            search += '<input id="tool_s_user_id" type="text" class="form-control" placeholder="分销商ID">';
            search += '<input id="tool_s_nickname" type="text" class="form-control" placeholder="分销商昵称">';
            search += '</div>';
            var $userModal = $(that.initModal('分销商列表', search));
            $(document.body).append($userModal);
            $userModal.modal('show');
            that.showDistributionUserData(obj.id, commission_role,  1, 10); // 调用显示用户列表页面
            that.showDistributionUserEvent(obj.id, commission_role, 2);
        },
        showDistributionUserData: function (fieldId, commission_role, pageNumber, pageSize) {
            var that = this;
            that.showLoading(true);

            var s_uid = $("#tool_s_user_id").val();
            var s_nickname = $("#tool_s_nickname").val();

            if (typeof(s_uid) == "undefined") {
                s_uid = '';
            }
            if (typeof(s_nickname) == "undefined") {
                s_nickname = '';
            }

            SYS.Core.ajax({
                url: "user/gds/list",
                common: {
                    page: pageNumber ? pageNumber : 1,
                    size: pageSize ? pageSize : 10
                },
                data: {
                    _id:  s_uid || -1,
                    nickname: s_nickname,
                    commission_role_plugin: commission_role || 4,
                    from_uid: -1,
                    verify_type: 1
                },
                success: function (data) {
                    var obj = {
                        'pageNumber': data.data.page.current_page,
                        'pageSize': data.data.page.page_size,
                        'totalRows': data.data.page.all_count,
                        'data': data.data.list
                    };
                    $("#tool_table").bootstrapTable('destroy');    //销毁table
                    $('#tool_table').bootstrapTable({
                        striped: true,
                        singleSelect: true,
                        pagination: true,
                        paginationDetail: false,
                        pageNumber: obj.pageNumber,
                        pageSize: obj.pageSize,
                        totalRows: obj.totalRows,
                        pageList: [10, 50, 100, 200],
                        sidePagination: 'server',
                        clickToSelect: true,
                        idField: '_id',
                        data: obj.data,
                        columns: [
                            {
                                field: '_id', title: '分销商信息', align: 'center',
                                formatter:function (val, row) {
                                    var nickname = row.nickname;
                                    var img = row.img;
                                    if (val > 0) {
                                        return SYS.Tool.getUserImg(img) + "<br />" + decodeURI(nickname) + "<br />" + (val ? "(" + val + ")" : "");
                                    } else {
                                        return val;
                                    }
                                }
                            },
                            {
                                field: 'commission_role', title: '分拥角色', align: 'center',
                                formatter:function (val, row) {
                                    if (val == 1) {
                                        return "<span class='tag-red'>公司</span>";
                                    } else if (val == 2) {
                                        return "<span class='tag-blue'>BD</span>";
                                    } else if (val == 3) {
                                        return "<span class='tag-orange'>机构</span>";
                                    } else if (val == 4) {
                                        return "<span class='tag-green'>机构员工</span>";
                                    } else {
                                        return "<span class=''>会员</span>";
                                    }
                                }
                            },
                            {
                                field: 'name', title: '姓名', align: 'center',
                                formatter:function (val) {
                                    return val;
                                }
                            },
                            {
                                field: 'phone', title: '手机号', align: 'center',
                                formatter:function (val) {
                                    return val;
                                }
                            },
                            {
                                field: 'do', title: '操作', align: 'center',
                                formatter: function (value, row, index) {
                                    var title = row.nickname ? row.nickname.replace(/[\r\n]/g, "") : '-';
                                    return '<a href="javascript:void(0)" onclick="DOCTOR.Select.toAdd(' + row._id + ',\'' + title + '\',\'' + fieldId + '\')" class="text-do-add"><i class="fa fa-plus glyphicon_size"></i></a>';
                                }
                            }
                        ],
                        onPageChange: function (number, size) {
                            that.showDistributionUserData(fieldId, commission_role, number, size);
                        },
                        onRefreshTable: function () {   //表格右侧刷新按钮
                            that.showDistributionUserData(fieldId, commission_role, obj.pageNumber, obj.pageSize);
                        }
                    });
                    that.showLoading(false);
                }
            });
        },
        showDistributionUserEvent: function (fieldId,commission_role) {
            var that = this;
            // 对机构添加Enter键支持
            var $stb = $("#search-toolbar-common");
            $stb.on("click", "#tool_btn_search", function () {
                that.showDistributionUserData(fieldId,commission_role,  1, 10);
            }).on("keydown", "input", function (e) {
                if (e.keyCode == 13) {
                    that.showDistributionUserData(fieldId,commission_role,  1, 10);
                }
            }).on('click', "#tool_btn_remove", function () {
                $("#" + fieldId).val('');
                $("#" + fieldId).removeAttr('data-id');
                $("#tool_modal").modal('hide');
            });
            that.initEvent();
        },

        toAdd: function (id, content, field) {
            $("#" + field).val(decodeURI(content));
            $("#" + field).attr("data-id", id);
            $("#tool_modal").modal('hide');
        },
        initModal: function (title, search) {
            var modal = '';
            modal += '<div id="tool_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
            modal += '  <div class="modal-dialog modal-lg">';
            modal += '      <div class="modal-content">';
            modal += '          <div class="modal-header">';
            modal += '              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
            modal += '              <h4 class="modal-title">' + title + '</h4>';
            modal += '          </div>';
            modal += '          <div class="modal-body">';
            modal += '              <div class="spiner-example" id="tool_loading">';
            modal += '                  <div class="sk-spinner sk-spinner-wave">';
            modal += '                      <div class="sk-rect1"></div>';
            modal += '                      <div class="sk-rect2"></div>';
            modal += '                      <div class="sk-rect3"></div>';
            modal += '                      <div class="sk-rect4"></div>';
            modal += '                      <div class="sk-rect5"></div>';
            modal += '                  </div>';
            modal += '              </div>';
            modal += '              <div class="row" id="tool_detail" style="display: none;">';
            modal += '                  <div id="search-toolbar-common" class="search-toolbar">';
            modal += '                      <div class="form-inline" role="form">';
            modal += search;
            modal += '                          <div class="form-group">';
            modal += '                              <button id="tool_btn_search" type="button" class="btn btn-search" ><i class="fa fa-search"> </i> 搜索</button>';
            modal += '                              <button id="tool_btn_remove" type="button" class="btn btn-white" ><i class="fa fa-remove"> </i> 取消</button>';
            modal += '                          </div>';
            modal += '                      </div>';
            modal += '                  </div>';
            modal += '                  <div style="margin-top: 10px;"></div>';
            modal += '                  <table id="tool_table" data-click-to-select="true"></table>';
            modal += '              </div>';
            modal += '          </div>';
            modal += '      </div>';
            modal += '  </div>';
            modal += '</div>';
            return modal;
        },
        initEvent: function () {
            $('#tool_modal').on('hide.bs.modal', function () {
                $("#tool_modal").remove();
            });
        },
        showLoading: function (isShow) {
            if (isShow) {
                $("#tool_loading").show();
                $("#tool_detail").hide();
            } else {
                $("#tool_loading").hide();
                $("#tool_detail").show();
            }

        }
    }
});