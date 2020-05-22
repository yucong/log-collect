;
requirejs(['pnotify'], function(PNotify){
    $.messager = (function () {

        var alert = function (message, status, callback) {
            swal({
                title: '',
                text: message,
                type: status,
                confirmButtonText: '知道了',
                confirmButtonColor : '#42A5EC'
            }, function() {
                callback && callback();
            });
        };

        var confirm = function (message, callback) {
            swal({
                title: '',
                text: message,
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                confirmButtonText: "确定",
                cancelButtonText: '取消',
                confirmButtonColor: "#ec6c62"
            }, function() {
                callback && callback();
               /* $.ajax({
                    url: "do.php",
                    type: "DELETE"
                }).done(function(data) {
                    swal("操作成功!", "已成功删除数据！", "success");
                }).error(function(data) {
                    swal("OMG", "删除操作失败了!", "error");
                });*/
            });
        };

        var confirmD = function (message, callback, okText, noText) {
            swal({
                title: '',
                text: message,
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                confirmButtonText: okText,
                cancelButtonText: noText,
                confirmButtonColor: "#ec6c62"
            }, function(isConfirm) {
                callback && callback(isConfirm);
            });
        };

        var popup = function (message, status) {
            new PNotify({
                title: "提示",
                text: message,
                type: status,
                //icon: false,
                delay: 2000,
                styling: 'bootstrap3'
            });
        };

        return {
            alert: alert,
            popup: popup,
            confirm: confirm,
            confirmD: confirmD
        };

    })();

})
