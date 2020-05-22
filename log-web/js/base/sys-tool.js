$.module('SYS.Tool', function () {
    return {
        preview: function (src) {
            $('#preview').show();
            $('#preview img').attr('src', val);
        },
        formatterDate: function (time) {
            if (isNaN(time)) {
                return null;
            }
            var date = new Date(time);
            var month = (date.getMonth() + 1) < 10 ? 0 + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
            var day = date.getDate() < 10 ? 0 + date.getDate().toString() : date.getDate();
            var hours = date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours();
            var minutes = date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds();
            var format = date.getFullYear() + "-" + month + "-" + day;
            return format;
        },
        formatterTime: function (time) {
            if (isNaN(time)) {
                return null;
            }
            var date = new Date(time);
            var month = (date.getMonth() + 1) < 10 ? 0 + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
            var day = date.getDate() < 10 ? 0 + date.getDate().toString() : date.getDate();
            var hours = date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours();
            var minutes = date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds();
            var format = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            return format;
        },
        formatterByDaterule: function (time, rule) {
            if (isNaN(time)) {
                return null;
            }
            if (time == null) {
                return "-";
            }
            var date = new Date(time);
            var month = (date.getMonth() + 1) < 10 ? 0 + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
            var day = date.getDate() < 10 ? 0 + date.getDate().toString() : date.getDate();
            var hours = date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours();
            var minutes = date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds();
            var format = '';
            if ("yyyy-mm-dd hh:mm:ss" == rule) {
                format = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            } else if ("yyyy-mm-dd hh:mm" == rule) {
                format = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes;
            } else if ("yyyy-mm-dd" == rule) {
                format = date.getFullYear() + "-" + month + "-" + day;
            } else if ('hh:mm' == rule) {
                format = hours + ":" + minutes;
            } else if ('mm-dd hh:mm' == rule) {
                format = month + "-" + day + " " + hours + ":" + minutes;
            }
            return format;
        },
        formatNumber: function (s) {
            var s = s.toString();
            var l = s.split("").reverse();
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("");

        },
        dateToTime: function (dateStr) {
            if (dateStr == '') {
                return 0;
            }
            var str = dateStr.replace(/-/g, "/");
            var date = new Date(str);
            return date.getTime();
        },
        getSecondsWithtime: function (begin_time, end_time) {
            if (!(begin_time > 0 && end_time > 0)) {
                return '-';
            }
            if (begin_time > end_time) {
                return '-';
            }
            if (begin_time == end_time) {
                return 0;
            }
            var time = (end_time - begin_time) / 1000;
            return time.toFixed(3);
        },
        getUrlParam: function (key) {
            var itemarr = [], urlstr = window.location.href.split("?");
            if (urlstr[1]) {
                var item = urlstr[1].split("&"), rst = {};
                for (var i = 0; i < item.length; i++) {
                    itemarr = item[i].split("=");
                    rst[itemarr[0]] = itemarr[1];
                }
            } else {
                return null;
            }
            if (key) {
                return rst[key];
            } else {
                return rst;
            }
        },
        cutStrLength: function (pStr, pLen) {
            if (!pStr) {
                return '-';
            }
            var content = pStr;
            if (!pLen) {
                pLen = 20;
            }
            if (typeof pStr == 'undefined') {
                return '';
            }
            var len = pStr.length;
            if (len > pLen) {
                pStr = pStr.substr(0, pLen).concat(" ... ");
            }
            return '<span title="' + content + '">' + pStr + '</span>';
        },
        isEmpty: function (value, trim) {
            return value === undefined || value === null || value.length === 0 || (trim && $.trim(value) === '');
        },
        isNumber: function (value) {
            return /(0|^[1-9]\d*$)/.test(value);
        },
        initSingleImg: function (options) {
            var defaultOptions = {
                img_id: '',
                typeId: 4000,
                uploadUrl: baseUrl + 'picture/upload',
                initialPreview: [],
                hid_img_id: '',
                showZoom: true  //是否显示图片详情
            };
            var self = $.extend({}, defaultOptions, options);
            $("#" + self.img_id).fileinput('refresh', {
                uploadUrl: self.uploadUrl + '/' + self.typeId,
                showCaption: false,
                showUploadedThumbs: false,
                showRemove: false,
                showClose: false,
                initialPreview: self.initialPreview,
                dropZoneEnabled: false,
                browseClass: 'btn btn-main',
                allowedFileExtensions: ['jpg', 'png', 'gif'],
                maxFileSize: 10240,
                allowedFileTypes: ['image'],
                fileActionSettings: {
                    showRemove: false,
                    showUpload: false,
                    showZoom: self.showZoom
                }
            }).on('fileuploaded', function (event, data, previewId, index) {
                var data = data.response;
                $("#" + self.hid_img_id + '').val(data.data.path);
            }).on('filecleared', function () {
                $("#" + self.hid_img_id).val('');
            });
        },
        initSingleFile: function (options) {
            var defaultOptions = {
                img_id: '',
                typeId: 4000,
                uploadUrl: baseUrl + 'appversion/upload',
                initialPreview: [],
                hid_img_id: '',
                showZoom: true  //是否显示图片详情
            };
            var self = $.extend({}, defaultOptions, options);
            $("#" + self.img_id).fileinput('refresh', {
                uploadUrl: self.uploadUrl,
                showCaption: false,
                showUploadedThumbs: false,
                showRemove: false,
                showClose: false,
                initialPreview: self.initialPreview,
                dropZoneEnabled: false,
                browseClass: 'btn btn-main',
                allowedFileExtensions: ['apk', 'ipa'],
                maxFileSize: 0,
                // allowedFileTypes: ['image'],
                fileActionSettings: {
                    showRemove: false,
                    showUpload: false,
                    showZoom: self.showZoom
                }
            }).on('fileuploaded', function (event, data, previewId, index) {
                var data = data.response;
                console.log(data)
                $("#" + self.hid_img_id + '').val(data.data.data.appUrl);
            }).on('filecleared', function () {
                $("#" + self.hid_img_id).val('');
            });
        },
        initMultipleFileinput: function (options) {
            var defaultOptions = {
                img_id: '',
                typeId: 5000,
                uploadUrl: baseUrl + 'picture/upload',
                initialPreview: [],
                initialPreviewConfig: [],
                img_name: '',
                deleteUrl: '',
                showZoom: true  //是否显示图片详情
            };
            var self = $.extend({}, defaultOptions, options);
            var $fileinput = $("#" + self.img_id);
            $fileinput.fileinput('refresh', {
                uploadUrl: self.uploadUrl + '/' + self.typeId,
                multipleSettings: {
                    name: self.img_name,
                    deleteUrl: self.deleteUrl
                },
                showCaption: false,
                showRemove: false,
                showClose: false,
                dropZoneEnabled: false,
                overwriteInitial: false,
                initialPreview: self.initialPreview,
                initialPreviewConfig: self.initialPreviewConfig,
                browseClass: 'btn btn-main',
                allowedFileExtensions: ['jpg', 'png', 'gif'],
                maxFileSize: 10240,
                allowedFileTypes: ['image'],
                fileActionSettings: {
                    showDrag: false,
                    showUpload: true,
                    showZoom: self.showZoom
                }
            }).on('fileuploaded', function (event, data, previewId, index) {
            }).on('fileuploaded', function (event, data, previewId, index) {
            });
        },
        initDaterangSearch: function (field_id, begin_time_id, end_time_id) {
            var daterangeoptionSet = {
                startDate: moment(),
                endDate: moment().subtract('days', -1),
                maxDate: moment().subtract('days', -1),
                opens: 'right',
                format: 'YYYY-MM-DD',
                applyClass: 'btn-main',
                ranges: {
                    '不使用时间查询': [moment(), moment().subtract('days', -1)],
                    '今天': [moment(), moment()],
                    '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    '最近7天': [moment().subtract('days', 6), moment()],
                    '最近30天': [moment().subtract('days', 29), moment()],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '上个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                locale: {
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '起始',
                    toLabel: '截止',
                    weekLabel: 'W',
                    customRangeLabel: '自定义范围',
                }
            };
            $('#' + field_id + ' span').html('未选择时间范围');
            var cb = function (start, end, label) {
                if (label !== '不使用时间查询') {
                    $("#" + begin_time_id).val(start.format('YYYY-MM-DD'));
                    $("#" + end_time_id).val(end.format('YYYY-MM-DD'));
                    $('#' + field_id + ' span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                } else {
                    $("#" + begin_time_id).val('');
                    $("#" + end_time_id).val('');
                    $('#' + field_id + ' span').html('未选择时间范围');
                }
            };
            $('#' + field_id).daterangepicker(daterangeoptionSet, cb).on('apply.daterangepicker', function (ev, picker) {
                if (picker.chosenLabel !== '不使用时间查询') {
                    $("#" + begin_time_id).val(picker.startDate.format('YYYY-MM-DD'));
                    $("#" + end_time_id).val(picker.endDate.format('YYYY-MM-DD'));
                } else {
                    $("#" + begin_time_id).val('');
                    $("#" + end_time_id).val('');
                }
            });
        },
        /**
         * 时间范围选择插件（支持选择将来时间，支持选择时分）
         * @param field_id
         * @param begin_time_id
         * @param end_time_id
         */
        initDaterangSearchWithHHmm: function (field_id, begin_time_id, end_time_id) {
            var daterangeoptionSet = {
                startDate: moment(),
                endDate: moment(),
                opens: 'right',
                format: 'YYYY-MM-DD HH:mm',
                timePicker: true,
                timePicker12Hour: false,
                timePickerIncrement: 1,
                applyClass: 'btn-main',
                ranges: {
                    '不使用时间查询': [moment(), moment()],
                    '今天': [moment().hour(0).minute(0), moment().hour(23).minute(59)],
                    '昨天': [moment().subtract('days', 1).hour(0).minute(0), moment().subtract('days', 1).hour(23).minute(59)],
                    '最近7天': [moment().subtract('days', 6).hour(0).minute(0), moment().hour(23).minute(59)],
                    '最近30天': [moment().subtract('days', 29).hour(0).minute(0), moment().hour(23).minute(59)],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '上个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                locale: {
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '起始',
                    toLabel: '截止',
                    weekLabel: 'W',
                    customRangeLabel: '自定义范围',
                }
            };
            $('#' + field_id + ' span').html('未选择时间范围');
            var cb = function (start, end, label) {
                if (label !== '不使用时间查询') {
                    $("#" + begin_time_id).val(start.format('YYYY-MM-DD HH:mm'));
                    $("#" + end_time_id).val(end.format('YYYY-MM-DD HH:mm'));
                    $('#' + field_id + ' span').html(start.format('YYYY-MM-DD HH:mm') + ' - ' + end.format('YYYY-MM-DD HH:mm'));
                } else {
                    $("#" + begin_time_id).val('');
                    $("#" + end_time_id).val('');
                    $('#' + field_id + ' span').html('未选择时间范围');
                }
            };
            $('#' + field_id).daterangepicker(daterangeoptionSet, cb).on('apply.daterangepicker', function (ev, picker) {
                if (picker.chosenLabel !== '不使用时间查询') {
                    $("#" + begin_time_id).val(picker.startDate.format('YYYY-MM-DD HH:mm'));
                    $("#" + end_time_id).val(picker.endDate.format('YYYY-MM-DD HH:mm'));
                } else {
                    $("#" + begin_time_id).val('');
                    $("#" + end_time_id).val('');
                }
            });
        },
        formatterList: function (list, rule) {
            var that = this;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                for (var n = 0; n < rule.length; n++) {
                    var field = rule[n];
                    var value = item[field.key];

                    if (value == 0) {
                        value = String(value);
                    }

                    if (typeof (value) != 'undefined' && value != null && value != '') {
                        if ("string" == field.type) {
                            if (field.length) {
                                if (value.length >= field.length) {
                                    item[field.key] = value.substr(0, field.length);
                                }
                            } else if (field.format) {
                                if (field.format[value]) {
                                    item[field.key] = field.format[value]
                                } else {
                                    item[field.key] = field.def;
                                }
                            } else {
                                item[field.key] = value;
                            }
                        } else if ("time" == field.type) {
                            item[field.key] = (value == 0 ? "" : that.formatterTime(value));
                        } else if ("date" == field.type) {
                            item[field.key] = (value == 0 ? "" : that.formatterDate(value));
                        }
                    } else {
                        item[field.key] = field.def;
                    }
                }

            }
            return list;
        },
        selectTypeahead: function (id, data) {
            var $this = $('#' + id);

            $this.typeahead('destroy');
            $this.typeahead({
                delay: 0,
                items: 25, //查询时要显示的条目的最大值,数据类型是 number,默认值是 8
                showHintOnFocus: true,
                source: function (query, process) {
                    var results = [];
                    for (var i in data) {
                        results.push(data[i]);
                    }
                    process(results);
                },
                matcher: function (query) {
                    return true;
                },
                updater: function (value) {
                    for (var i in data) {
                        var svalue = data[i];
                        if (value == svalue) {
                            $this.attr("data-id", i);
                            $this.attr("data-value", svalue);
                            return value;
                        }
                    }
                    return ""
                }
            });

            $this.on('blur', function () {
                $this.parent().find("ul").hide();
            })
        },
        getUserImg: function (img) {
            var src = img ? img : 'http://img.zsmy.cn/resources/user.png';
            return "<img src='" + src + "' style='width:30px;height:30px;border-radius:50%;' />";
        },
        getNickname: function (nickname) {
            if (nickname) {
                nickname = nickname.substr(0, 10)
            }
            return nickname
        },
        getCommissionRole: function (val) {
            switch (val) {
                case 1:
                    return "<span class='tag-red'>公司</span>";
                case 2:
                    return "<span class='tag-blue'>BD</span>";
                case 3:
                    return "<span class='tag-orange'>机构</span>";
                case 4:
                    return "<span class='tag-green'>机构员工</span>";
                case "":
                    return "<span class=''>会员</span>";
            }
        },
        toUtf8: function (str) {
            var out, i, len, c;
            out = "";
            if (str != null) {
                len = str.length;
            }
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
        getDoctorImg: function (img) {
            var src = img ? img : 'http://img.zsmy.cn/resources/inquiry_doctor.png';
            return "<img src='" + src + "' style='width:40px;height:40px;border-radius:50%;' />";
        },
        formatStar: function (star) {
            var total_star = 5;
            var html = '';
            if (star >= 0 && star <= total_star) {
                for (var i = 1; i <= star; i++) {
                    html += '<i class="fa fa-star" style="color: #E50112;"></i>';
                }
                for (var j = total_star; j >= star + 1; j--) {
                    html += '<i class="fa fa-star" style="color: #D8D8D8;"></i>';
                }
            } else {
                html = star;
            }
            return html;
        },
        initModal: function (title, content) {
            var modal = '';
            modal += '<div id="tool_view_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
            modal += '  <div class="modal-dialog">';
            modal += '      <div class="modal-content">';
            modal += '          <div class="modal-header">';
            modal += '              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
            modal += '              <h4 class="modal-title"><b>' + title + '</b></h4>';
            modal += '          </div>';
            modal += '          <form class="form-horizontal" role="form">';
            modal += '          <div class="modal-body">';
            modal += content;
            modal += '          </div>';
            modal += '          </form>';
            modal += '      </div>';
            modal += '  </div>';
            modal += '</div>';
            return modal;
        },
        initEvent: function () {
            $('#tool_view_modal').on('hide.bs.modal', function () {
                $("#tool_view_modal").remove();
            });
        },
        getButton: function () {
            var array = JSON.parse(localStorage.getItem("button"));
            console.log(array);
            for (var i = 0; i < array.length; i++) {
                $("." + array[i]).show();
            }
        },
        // getButton:function(){
        //     var arr=JSON.parse(localStorage.getItem())
        // }

        /**
         * 用户详情
         * @param id
         */
        showUserById: function (id) {
            var that = this;

            SYS.Core.ajax({
                url: 'user/getUserById',
                common: {},
                data: { _id: id },
                success: function (data) {
                    if (data.code == 1) {
                        var user_info = data.data;
                        var content = '';

                        if (user_info) {
                            var img = user_info.img;

                            if (img == null) {
                                img = 'http://img.zsmy.cn/resources/user.png';
                            }

                            content += '<div class="col-sm-12">';
                            content += '    <label class="col-sm-4"></label>';
                            content += '    <div class="col-sm-4">';
                            content += '         <img alt="image" class="img-circle m-t-xs img-responsive" style="width: 90px; height: 90px; margin: 5px 20px;" src="' + img + '">';
                            content += '    </div>';
                            content += '</div>';

                            content += '<div class="col-sm-12">';
                            content += '    <label class="col-sm-5 text-right">昵称:</label>';
                            content += '    <div class="col-sm-4">';
                            content += user_info.nickname + "&nbsp;(" + user_info._id + ")";
                            content += '        <input type="hidden" id="fans_member_id" name="fans_member_id" value="{{= it._id}}"/>';
                            content += '    </div>';
                            content += '</div>';

                            content += '<div class="col-sm-12">';
                            content += '    <label class="col-sm-5 text-right">性别:</label>';
                            content += '    <div class="col-sm-4">';
                            content += user_info.sex == 0 ? "保密" : user_info.sex == 1 ? "男" : user_info.sex == 2 ? "女" : "未知";
                            content += '    </div>';
                            content += '</div>';

                            content += ' <div class="col-sm-12">';
                            content += '    <label class="col-sm-5 text-right">手机号:</label>';
                            content += '    <div class="col-sm-4">';
                            content += user_info.phone == null ? "暂无" : user_info.phone;
                            content += '    </div>';
                            content += '</div>';

                            content += '<div class="col-sm-12">';
                            content += '     <label class="col-sm-5 text-right">用户平台:</label>';
                            content += '    <div class="col-sm-4">';
                            content += user_info.platform == 1 ? "医生平台" : "会员平台";
                            content += '    </div>';
                            content += '</div>';

                            content += '<div class="col-sm-12">';
                            content += '    <label class="col-sm-5 text-right">注册时间:</label>';
                            content += '    <div class="col-sm-4">';
                            content += that.formatterTime(user_info.register_time);
                            content += '    </div>';
                            content += '</div>';

                            content += ' <div class="col-sm-12">';
                            content += '    <label class="col-sm-5 text-right">APP第一次登录时间:</label>';
                            content += '    <div class="col-sm-4">';
                            content += that.formatterTime(user_info.first_login_app_time);
                            content += '    </div>';
                            content += '</div>';

                            content += '<div>&nbsp;</div>';
                        }


                        var $memberModal = $(that.initModal('用户详情', content));
                        $(document.body).append($memberModal);
                        $memberModal.modal('show');
                        that.initEvent();
                    }
                }
            })
        }
    };
});