//当body标签添加cache属性时，查找version值作为版本号，如果没有version属性，则缓存版本十二小时
var appConfig = {
    cache: document.body.hasAttribute('cache'),
    version: document.body.hasAttribute('cache') && document.body.hasAttribute('version') ? document.body.getAttribute('version') : Math.floor(new Date().getTime() / (1000 * 60 * 60 * 12))
};
// 路径定义
require.config({
    urlArgs: 'v=' + (appConfig.cache ? appConfig.version : (new Date()).getTime()),
    baseUrl: '/js/',
    waitSeconds: 0,
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ["jquery"]
        },
        'oo': {
            deps: ['jquery']
        },
        'doT': {
            deps: ['jquery', 'oo'],
            exports: '$'
        },
        'jquery.cookie': {
            deps: ['jquery'],
            exports: 'cookie'
        },
        'qrcode': {
            deps: ['jquery'],
            exports: 'qrcode'
        },
        'jquery.ztree': {
            deps: ['jquery']
        },
        'jquery.lazyload': {
            deps: ['jquery']
        },
        'bootstrapValidator': {
            deps: ['bootstrap']
        },
        'treegrid': {
            deps: ['jquery']
        },
        'summernote': {
            deps: ['jquery', 'bootstrap', 'summernote-zh-CN']
        },
        'table': {
            deps: ['jquery', 'bootstrap']
        },
        'select': {
            deps: ['jquery', 'bootstrap']
        },
        'multiselect': {
            deps: ['jquery', 'bootstrap']
        },
        'fileinput': {
            deps: ['jquery', 'bootstrap']
        },
        'iCheck': {
            deps: ['jquery']
        },
        'sweetalert': {
            deps: ['jquery', 'bootstrap']
        },
        'pnotify': {
            deps: ['jquery', 'bootstrap']
        },
        'messager': {
            deps: ['jquery', 'bootstrap', 'sweetalert']
        },
        'jqueryui': {
            deps: ['jquery', 'bootstrap']
        },
        'jqueryui.core': {
            deps: ['jquery']
        },
        'jqueryui.widget': {
            deps: ['jquery']
        },
        'jqueryui.mouse': {
            deps: ['jquery', 'jqueryui.widget']
        },
        'jqueryui.sortable': {
            deps: ['jquery', 'jqueryui.core', 'jqueryui.mouse', 'jqueryui.widget']
        },
        'highcharts': {
            deps: ['jquery']
        },
        'clockpicker': {
            deps: ['jquery', 'bootstrap']
        },
        'pagination': {
            deps: ['jquery', 'bootstrap']
        },
        'datetimepicker': {
            deps: ['jquery', 'bootstrap']
        },
        'borain-timeChoice': {
            deps: ['jquery',],
            exports: 'borain-timeChoice'
        },
        'tagsinput': {
            deps: ['jquery', 'bootstrap']
        },
        'moment': {
            deps: ['jquery', 'bootstrap']
        },
        'daterangepicker': {
            deps: ['jquery', 'bootstrap', 'moment']
        },
        'baidueditor': {
            deps: ['jquery', 'baidueditor_config']
        },
        'pace': {
            deps: ['jquery']
        },
        'posfixed': {
            deps: ['jquery']
        },
        'netease_im': {
            deps: ['jquery']
        },
        'common': {
            deps: ["oo", "jquery.lazyload", "bootstrap"],
            exports: ""
        },
        'sys-tool': {
            deps: ['oo'],
            exports: ''
        },
        'bootstrap-suggest': {
            deps: ["jquery", "bootstrap"]
        },
        'boxer': {
            deps: ["jquery"]
        },
        'smooth': {
            deps: ["jquery"]
        },
        'md5': {
            deps: ["jquery"],
            exports: 'md5'
        },
        'XLSX': {
            exports: 'XLSX'
        },
        'tool': {

        },
        'base_url':{
            
        }
    },
    paths: {
        'jquery': 'base/jquery.min',
        'bootstrap': 'base/bootstrap.min',
        'oo': 'base/oo',
        'doT': 'plugins/doT/doT',
        'jquery.cookie': 'plugins/jquery/jquery.cookie',
        'jquery.ztree': 'plugins/jquery/jquery.ztree.all-3.5.min',
        'jquery.lazyload': 'plugins/jquery/jquery.lazyload',
        'bootstrapValidator': 'plugins/validator/bootstrapValidator.min',
        'treegrid': 'plugins/jquery/jquery.treegrid.min',
        'summernote': 'plugins/summernote/summernote.min',
        'summernote-zh-CN': 'plugins/summernote/summernote-zh-CN',
        'table': 'plugins/table/bootstrap-table',
        'select': 'plugins/select/bootstrap-select.min',
        'multiselect': 'plugins/select/bootstrap-multiselect',
        'fileinput': 'plugins/fileinput/fileinput',
        'iCheck': 'plugins/icheck/icheck.min',
        'sweetalert': 'plugins/alert/sweetalert.min',
        'pnotify': 'plugins/alert/pnotify',
        'messager': 'plugins/alert/messager',
        'jqueryui': 'plugins/jquery-ui/jquery-ui-1.10.4.min',
        'jqueryui.core': 'plugins/jquery-ui/jquery.ui.core.min',
        'jqueryui.mouse': 'plugins/jquery-ui/jquery.ui.mouse.min',
        'jqueryui.widget': 'plugins/jquery-ui/jquery.ui.widget.min',
        'jqueryui.sortable': 'plugins/jquery-ui/jquery.ui.sortable.min',
        'highcharts': 'plugins/highcharts/highcharts',
        'clockpicker': 'plugins/clockpicker/bootstrap-clockpicker.min',
        'pagination': 'plugins/pagination/jquery.twbsPagination.min',
        'datetimepicker': 'plugins/date/bootstrap-datetimepicker.min',
        'borain-timeChoice': 'plugins/borain-timeChoice/borain-timeChoice',
        'moment': 'plugins/date/moment',
        'daterangepicker': 'plugins/date/daterangepicker',
        'baidueditor_config': 'plugins/ueditor/ueditor.config',
        'baidueditor': 'plugins/ueditor/ueditor.all',
        'zeroclipboard': 'plugins/ueditor/third-party/zeroclipboard/ZeroClipboard.min',
        'pace': 'plugins/pace/pace.min',
        'typeahead': 'plugins/typeahead/bootstrap3-typeahead.min',
        'tagsinput': 'plugins/tagsinput/bootstrap-tagsinput.min',
        'posfixed': 'plugins/posfixed/posfixed',
        'netease_im': 'plugins/netease/NIM_Web_NIM_v3.6.0',
        'common': 'base/common',
		'base_url': 'base/base_url',
        'sys-tool': 'base/sys-tool',
        'doctor-data': 'base/doctor-data',
        'doctor-select': 'base/doctor-select',
        'bootstrap-suggest': 'plugins/suggest/bootstrap-suggest.min',
        'json-viewer': 'plugins/json-viewer/jquery.json-viewer',
        'boxer': 'plugins/boxer/jquery.fs.boxer.min',
        'smooth': 'plugins/boxer/smoothproducts.min',
        'md5': 'plugins/md5/md5',
        'XLSX': 'plugins/xlsx/xlsx.full.min',
        'jquery.qrcode': 'plugins/helloweba_qrcode/jquery.qrcode.min',
    }
});

require(['oo', 'doT', 'jquery.cookie', 'pace', 'common','base_url','sys-tool'], function () {
    var pageJs = $('body').data('js'),
        pageJsPrefix = '';
    if (pageJs && pageJs.length) {
        var arr = pageJs.split(' ');
        for (var i = 0; i < arr.length; i++) {
            arr[i] = pageJsPrefix + arr[i] + '.js';
        }
        require([arr.join(',')], function () {
        });
    }
});

