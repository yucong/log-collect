;(function ($) {
    $.fn.dialog = function (options) {

        var self = this
            , $this = $(self)
            , $body = $(document.body)
            , $msgbox = $this.closest('.dialog')
            , parentDataName = 'dialog-parent'
            , arg1 = arguments[1]
            , arg2 = arguments[2]
            ;
        var create = function () {
            var msghtml
                    = ''
                    + '<div class="dialog modal fade">'
                    + '<div class="modal-dialog">'
                    + '<div class="modal-content">'
                    + '<div class="modal-header">'
                    + '<button type="button" class="close">&times;</button>'
                    + '<h4 class="modal-title"></h4>'
                    + '</div>'
                    + '<div class="modal-body"></div>'
                    + '<div class="modal-footer"></div>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                ;
            $msgbox = $(msghtml);
            $(document.body).append($msgbox);
            $msgbox.find(".modal-body").append($this);
        };

        var createButton = function (_options) {
            var buttons = (_options || options || {}).buttons || {}
                , $btnrow = $msgbox.find(".modal-footer");

            //clear old buttons
            $btnrow.empty();

            var isButtonArr = buttons.constructor == Array;

            for (var button in buttons) {
                var btnObj = buttons[button]
                    , id = ""
                    , text = ""
                    , classed = "btn-default"
                    , click = "";

                if (btnObj.constructor == Object) {
                    id = btnObj.id;
                    text = btnObj.text;
                    classed = btnObj['class'] || btnObj.classed || classed;
                    click = btnObj.click;
                }

                //Buttons should be an object, etc: { 'close': function { } }
                else if (!isButtonArr && btnObj.constructor == Function) {
                    text = button;
                    click = btnObj;
                }

                else {
                    continue;
                }

                $button = $('<button type="button" class="btn">').addClass(classed).html(text);

                id && $button.attr("id", id);
                if (click) {
                    (function (click) {
                        $button.click(function () {
                            click.call(self);
                        });
                    })(click);
                }

                $btnrow.append($button);
            }

            $btnrow.data('buttons', buttons);
        };

        var show = function () {
            // call the bootstrap modal to handle the show events (fade effects, body class and backdrop div)
            $msgbox.modal('show');
        };

        var close = function (destroy) {
            // call the bootstrap modal to handle the hide events and remove msgbox after the modal is hidden
            $msgbox.modal('hide').one('hidden.bs.modal', function () {
                if (destroy) {
                    $this.data(parentDataName).append($this);
                    $msgbox.remove();
                }
            });
        };

        if (options.constructor == Object) {
            !$this.data(parentDataName) && $this.data(parentDataName, $this.parent());

            if ($msgbox.size() < 1) {
                create();
            }
            createButton();
            $(".modal-title", $msgbox).html(options.title || "");
            $(".modal-dialog", $msgbox).addClass(options.dialogClass || "");

            $("#modal-body", $msgbox).html(options.message || "");

            $(".modal-header .close", $msgbox).click(function () {
                var closeHandler = options.onClose || close;
                closeHandler.call(self);
            });
            (options['class'] || options.classed) && $msgbox.addClass(options['class'] || options.classed);
            /*
             Passing the options, etc: backdrop, keyboard
             */
            options.autoOpen === false && (options.show = false)
            $msgbox.modal(options)
        }

        if (options == "destroy") {
            close(true);
        }

        if (options == "close") {
            close();
        }

        if (options == "open") {
            show();
        }

        if (options == "option") {
            if (arg1 == 'buttons') {
                if (arg2) {
                    createButton({buttons: arg2});
                    show();
                } else {
                    return $msgbox.find(".modal-footer").data('buttons');
                }
            }
        }

        return self;
    };

})(jQuery);

$.dialog = (function () {

    var alert = function (title, message, status, callback) {
        var icon = '';
        var btn = '';
        if (status == 'info') {
            icon = '<i class="fa fa-info-circle" style=" color: #4887AD; font-size:45px; margin-right:10px;"></i>';
            btn = 'btn-info';
        } else if (status == 'success') {
            icon = '<i class="fa fa-check-circle" style=" color: #468847; font-size:45px; margin-right:10px;"></i>';
            btn = 'btn-success';
        } else if (status == 'warn') {
            icon = '<i class="fa fa-warning" style=" color: #CB9853; font-size:45px; margin-right:10px;"></i>';
            btn = 'btn-warning';
        } else if (status == 'error') {
            icon = '<i class="fa fa-times-circle" style=" color: #B94A48; font-size:45px; margin-right:10px;"></i>';
            btn = 'btn-danger';
        } else {
            btn = 'btn-default';
        }
        btn = 'btn-main';

        if (arguments.length < 2) {
            message = title || "";
            title = "&nbsp;"
        }

        $('<div style="height: 50px;"><div style="float: left;">' + icon + '</div> <div style="display: inline-block; float: left; line-height: 50px;">' + message + '</div></div>').dialog({
            title: title
            // override destroy methods;
            , onClose: function () {
                $(this).dialog("destroy");
            }
            , buttons: [{
                text: '知道了'
                , classed: btn || "btn-success"
                , click: function () {
                    $(this).dialog("destroy");
                    callback && callback();
                }
            }]
        });
    };

    var confirm = function (title, message, callback) {

        $('<div style="height: 50px;"><div style="float: left;"><i class="fa fa-question-circle" style="color: #4887AD; font-size:45px; margin-right: 10px;"></i></div> <div style="display: inline-block; float: left; line-height: 50px;">' + message + '</div></div>').dialog({
            title: title
            // override destroy methods;
            , onClose: function () {
                $(this).dialog("destroy");
            }
            , buttons: [{
                text: '确定'
                , classed: "btn-main"
                , click: function () {
                    $(this).dialog("destroy");
                    callback && callback();
                }
            },
                {
                    text: '取消'
                    , classed: "btn-default"
                    , click: function () {
                    $(this).dialog("destroy");
                }
                }]
        });
    };

    /*
     * popup message
     */
    var msghtml
            = ''
            + '<div class="dialog modal fade msg-popup">'
            + '<div class="modal-dialog modal-sm" style="margin-top: 5px">'
            + '<div class="modal-content">'
            + '<div id="alert-block-id" class="alert-block">'
            + '<div class="modal-body">'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
        ;

    var $msgbox;

    var popup = function (message, status) {
        if (!$msgbox) {
            $msgbox = $(msghtml);
            $('body').append($msgbox);
        }

        var icon = '';
        var alert_class = '';
        if (status == 'success') {
            icon = 'fa fa-check-circle';
            alert_class = 'alert-success';
        } else if (status == 'warn') {
            icon = 'fa fa-warning';
            alert_class = 'alert-warning';
        } else if (status == 'error') {
            icon = 'fa fa-times-circle';
            alert_class = 'alert-danger';
        } else {
            icon = 'fa fa-info-circle';
            alert_class = 'alert-info';
        }

        $msgbox.find("#alert-block-id").removeClass();
        $msgbox.find("#alert-block-id").addClass('alert-block');
        $msgbox.find(".alert-block").addClass(alert_class);
        $msgbox.find(".modal-body").addClass('popup-body');
        $msgbox.find(".modal-body").html('<span style="font-size: 18px; margin-right: 10px;"><i class="' + icon + '"></i></span>' + message);
        $msgbox.modal({show: true, backdrop: false});

        setTimeout(function () {
            $msgbox.modal('hide');
        }, 2000);
    };

    return {
        alert: alert,
        popup: popup,
        confirm: confirm
    };

})();
/*
 $.dialog.alert("提示", "信息内容","info");
 $.dialog.alert("提示", "信息内容","success");
 $.dialog.alert("提示", "信息内容","warn");
 $.dialog.alert("提示", "信息内容","error");

 $.dialog.alert("提示", "信息内容","success", function () {
 console.log('abcd')
 });

 $.dialog.confirm("提示", "确定要删除吗？", function() {
 $.dialog.alert("提示", '删除成功',"info");
 });

 $.dialog.popup("保存成功");
 */
