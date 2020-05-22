
define(function (require) {
    require('bootstrapValidator');
    require('messager');
    require('table');
    require('iCheck');
    require('doctor-data');
    require('typeahead');
    require('fileinput');
    require('baidueditor');
    window['ZeroClipboard'] = require('zeroclipboard');
    require('multiselect');
    require('boxer');
    require('datetimepicker');
    

    $.module("DOCTOR.doctor", function () {
        var current_show_data = [];
        var current_hospital_data = [];
        return {
            init: function () {
                this.loadData();
                this.loadEvent();
                this.ddd("2");
            },
            /*初始化列表数据*/
            loadData: function (pageNumber, pageSize) {
                var uid = $.cookie("u_id");
                var u_tokenId = $.cookie("u_tokenId");
                var myChart=echarts.init(document.getElementById("main"))
                var that = this;
                
                // var search_state=$("#search_state").val();
                // var searchcaseState=$("#search_caseState").val();
                // var items = $("#items").val();

                $.ajax({
                    url: baseUrl + 'everydayUserRegist/list',
                    type: "get",
                    dataType: 'json',
                    async: false,    //同步
                    data: {
                        userId: uid,
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("x-auth-token", u_tokenId);
                        request.setRequestHeader("x-user-id", uid);
                    },
                    success: function (data) { 
                        if(data.code == 1) {
                            var data = data.data;
                            var doctorNum = [];
                            var customerNum = [];
                            var date = [];
                            var length = data.length-1;//9
                            //var j = 0;
                            for(var i=length;i>-1;i--) {
                                doctorNum[length-i] = data[i].doctorNum;
                                customerNum[length-i] = data[i].customerNum;
                                date[length-i] = data[i].createDay;
                                //j ++;
                                // console.log("i" + i);
                                
                            }
                            console.log( "doctorNum :"+doctorNum);
                            var option = {
                                title: {
                                    // text: '折线图堆叠'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                // color:['blue','red','green','orange'],
                                legend: {
                                    // data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']，
                                    data: ['用户注册','医生入驻']
                                    //data：title
                                },//顶部的颜色说明
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    //data: ['周一','周二','周三','周四','周五','周六','周日']
                                    data: date
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [
                                    {
                                        name:'用户注册',
                                        type:'line',
                                        stack: '总量1',
                                        // lineStyle:{
                                        //     normal:{
                                        //         color:"orange"
                                        //     }
                                        // },//修改折线颜色
                                        data:customerNum
                                    },
                                    {
                                        name:'医生入驻',
                                        type:'line',
                                        stack: '总量2',
                                        data:doctorNum
                                    }
                                 ]
                            };
            
                            console.log(option);
                            myChart.setOption(option);
                            //根据窗口的大小变动图表 --- 重点
                            window.onresize = function(){
                                myChart.resize();
                            }
            
                        } else {
                            alert(data.message);
                        }      
                        
                    }
                });
            
                $.ajax({
                    url: baseUrl + 'MessageStatistics/list',
                    type: "get",
                    dataType: 'json',
                    async: false,    //同步
                    data: {
                        userId: uid,
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("x-auth-token", u_tokenId);
                        request.setRequestHeader("x-user-id", uid);
                    },
                    success: function (data) { 
                        console.log(data.data);
                        var dat=data.data.resultMatter
                        var datRemind=data.data.resultRemind
                        console.log(dat);
                        console.log(datRemind);
                        html="";
                        str="";
                        // var arr=["实名认证未审核列表页面","入驻医生入驻申请但未审核的医生列表","申请项目但未审核的医生列表","评价且未审核列表","追评且未审核列表","购物车未读列表","交易订单未读列表","服务订单未读列表","提交退款申请但后台未审核的列表","保险订单未读数","提现申请后台未审核列表"]
                        for(var i=0;i<dat.length;i++){
                            if(dat[i].nameNum>0){
                                html+="<li plag='"+dat[i].flag+"' data-power='"+dat[i].nameNum+"' search-key='"+dat[i].searchKey+"'><a hre='"+dat[i].menuPath+"'>"+dat[i].name+"<span style='color:red;'>("+dat[i].num+")</span></a></li>";
                            }
                        }
                        for(var i=0;i<datRemind.length;i++){
                           if(datRemind[i].nameNum>0){
                            str+="<li plag='"+datRemind[i].flag+"' data-power='"+datRemind[i].nameNum+"' search-key='"+datRemind[i].searchKey+"'><a hre='"+datRemind[i].menuPath+"'>"+datRemind[i].menuName+"<span style='color:red;'>("+datRemind[i].num+")</span></a></li>";
                           }
                        }
                        $("#pend1").html(html);
                        $("#pend2").html(str);
                        $(".pending ul li").on("click",function(){
                            var key=$(this).attr("search-key");
                            // alert(key);
                            $.cookie("key",key,{path:"/"});
                            var power=Number($(this).attr("data-power"));
                            var url=$(this).children().attr("hre")
                            // if(power>0){
                                if(window != top){
                                    top.location.href =url;
                                }
                            // }
                        });
                    }
                })

                $("#itype span").on("click",function(){
                    $(this).addClass("active").siblings().removeClass("active");
                    var itype=$(this).attr("data-id");
                    that.ddd(itype)
                    console.log(itype);
                    $("#search").on("click",function(){
                        $("#data-all").html(" ");
                        that.ddd(itype)
                    })
                })
                $("#search").on("click",function(){
                    $("#data-all").html(" ");
                    that.ddd()
                })

                
                /*
                        var html = "";
                         for( var i = 0; i < data.length; i++ ) {
                             var j = i + 1;
                             html += "<tr>";
                             html += "<td>" + j + "</td>"
                             //html += "<td>" + data[i].itemId + "</td>"
                             html += "<td>" + data[i].itemName + "</td>"
                             html += "<td>" + data[i].itemNum + "</td>"
                             html += "<td>" + data[i].numPercent + "</td>"
                             html += "<td>" + data[i].payAmt + "</td>"
                             html += "<td>" + data[i].amtPercent + "</td>"
                             
                             html += "</tr>";
                        }
                         $("#J_TbData").html(html);
                   */
           

                
            },

            ddd:function(itype){
                
                var beginTime = $("#beginTime").val();
                beginTime = beginTime.substring(0, 19);
                beginTime = beginTime.replace(/-/g, '/');
                beginTime = new Date(beginTime).getTime();
                var endTime = $("#endTime").val();
                endTime = endTime.substring(0, 19);
                endTime = endTime.replace(/-/g, '/');
                endTime = new Date(endTime).getTime();
                var itype=$("#itype span.active").attr("data-id");
                SYS.Core.ajaxGet({
                    url: "MessageStatistics/findTotal",
                    data: {
                        itype:itype,
                        beginTime:beginTime||"",
                        endTime:endTime||""
                    },
                    success: function (data) {
                        console.log(data)
                        var arr=["销售额(元)","成交订单总数","下单用户数","客单价(元)","总订单数","退款数","平台净收益(元)","用户总数(人)"]
                        var html="";
                        html+="<li><div><h5>"+arr[0]+"</h5><p>"+data.data.totalSales+"</p></div></li>"
                        html+="<li><div><h5>"+arr[1]+"</h5><p>"+data.data.finishOrder+"</p></div></li>"
                        html+="<li><div><h5>"+arr[2]+"</h5><p>"+data.data.orderUserNum+"</p></div></li>"
                        html+="<li><div><h5>"+arr[3]+"</h5><p>"+data.data.userSale+"</p></div></li>"
                        html+="<li><div><h5>"+arr[4]+"</h5><p>"+data.data.finishRate+"</p></div></li>"
                        html+="<li><div><h5>"+arr[5]+"</h5><p>"+data.data.refundRate+"</p></div></li>"
                        html+="<li><div><h5>"+arr[6]+"</h5><p>"+data.data.totalAppointSales+"</p></div></li>"
                        html+="<li><div><h5>"+arr[7]+"</h5><p>"+data.data.userTotalNum+"</p></div></li>"
                        var html2 = "";
                        for( var i = 0; i < data.data.itemTops.length; i++ ) {
                            var j = i + 1;
                            html2 += "<tr>";
                            html2 += "<td>" + j + "</td>"
                            //html += "<td>" + data[i].itemId + "</td>"
                            html2 += "<td>" + data.data.itemTops[i].itemName + "</td>"
                            html2 += "<td>" + data.data.itemTops[i].itemNum + "</td>"
                           
                            var str = data.data.itemTops[i].numPercent;
                            str = Number(str * 100).toFixed(2);
                            str += "%";
                            html2 += "<td>" + str + "</td>"
                            html2 += "<td>" + data.data.itemTops[i].payAmt + "</td>"
                            var str2 = data.data.itemTops[i].amtPercent;
                            str2 = Number(str2 * 100).toFixed(2);
                            str2 += "%";
                            html2 += "<td>" + str2 + "</td>"
                            html2 += "</tr>";
                           
                        }
                        $("#J_TbData").html("");
                        $("#J_TbData").html(html2);
                        $("#data-all").html("");
                        $("#data-all").append(html);
                    }
                });
            },
            loadEvent: function () {
                var that = this;

                $('.beginTime').datetimepicker({
                    format: 'yyyy-mm-dd hh:ii',
                    todayBtn: true,
                    language: 'zh-CN',
                    autoclose: true
                });
                $('.endTime').datetimepicker({
                    format: 'yyyy-mm-dd hh:ii',
                    todayBtn: true,
                    language: 'zh-CN',
                    autoclose: true
                });
                
                
                
                
            },

        }
        
    });
    DOCTOR.doctor.init();
})