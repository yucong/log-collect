/**
 * 登录
 */

define(function (require) {
    require('md5');
    $.module("SYS.login", function () {
        return {
            init: function () {
                this.loadData();
            },
            loadData: function () {
                var is_login = $.cookie("is_login");  //判断是否登录
                if (is_login == "true") {
                    location.href = "index.html";
                }

            },
            login: function () {
                var phone = $("#username").val();
                var password = $("#password").val();
                password = $.md5(password + phone);
                $.ajax({
                    url: baseUrl + 'sys/user/login',
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        phone: phone,
                        password: password
                    }),
                    success: function (data) {
                        if (data.code == 1) {
                            $.cookie("is_login", "true", { path: "/", expires: 24 * 60 * 60 * 1000 });
                            $.cookie('u_id', data.data.userId, { path: "/", expires: 24 * 60 * 60 * 1000 });
                            $.cookie('u_name', data.data.phone, { path: "/", expires: 24 * 60 * 60 * 1000 });
                            $.cookie('u_nickName', data.data.nickName, { path: "/", expires: 24 * 60 * 60 * 1000 });
                            $.cookie('u_tokenId', data.data.tokenId, { path: "/", expires: 24 * 60 * 60 * 1000 });
                            location.href = "index.html";
                        } else {
                            $(".my_message").html(data.message);
                        }

                    },
                    error: function () {
                        $(".my_message").html("登录失败！");
                    }
                });
                return false;
  
            }
        }
    });
    SYS.login.init();
})