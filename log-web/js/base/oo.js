/*增加面向对象模块*/
(function($) {

    /**
     * 创建一个命名空间，创建的命名空间将会在 顶级 根命名空间下。
     * $.namespace('Ttpod.core'); // returns Ttpod.core
     * String namespace
     * Any val,给最后一级设置val
     */
    function namespace() {
        var args = arguments,
            l = args.length,
            o = window,
            v = (l > 1) ? args[l - 1] : undefined,
            i,
            j,
            p;
        if (l > 0) {
            p = (args[0]).split('.');
            for (j = 0, pl = p.length; j < pl; ++j) {
                if (j == pl - 1 && "undefined" != typeof v) {
                    o = o[p[j]] = v;
                } else {
                    o = o[p[j]] = o[p[j]] || {};
                }
            }
        }
        return o;
    }

    function Ctor() {}
    // See: http://jsperf.com/object-create-vs-new-ctor
    var _createProto = Object.__proto__ ?
        function(proto) {
            return {
                __proto__: proto,
                constructor: Ctor
            };
        } :
        function(proto) {
            Ctor.prototype = proto;
            return new Ctor();
        };


    /**    
	* 创建一个类
    $.Class() : var className = $.Class(); // returns class
    $.Class(prototypeObj) : var className = $.Class({}); // returns class
    $.Class(superClass,prototypeObj) : var className = $.Class(superClass,prototypeObj); // returns class
    $.Class(fn) : var className = $.Class(function(klass){}); // returns class  klass指向类  　
    $.Class(superClass,fn):var className = $.Class(superClass,function(klass){}); // returns class  klass指向类
    */
    function Class() {
        var length = arguments.length,
            context = arguments[length - 1];
        //创建空类
        function klass() {
            this.init && this.init.apply(this, arguments);
        }
        // 如果参数中有要继承的父类，先让klass继承父类
        if (length > 1 && $.isFunction(arguments[0])) {
            var superclass = arguments[0];
            // 指定原型
            klass.prototype = _createProto(superclass.prototype);
            // 加一个对父类原型引用的静态属性
            klass.prototype.superclass = superclass.prototype;
        }
        klass.prototype.constructor = klass;
        if ($.isFunction(context)) {
            //使用函数构造类成员
            context.call(klass.prototype, klass);
        } else if ($.isPlainObject(context)) {
            //使用对象构造类成员
            $.extend(klass.prototype, context);
        }
        return klass; //返回类
    }

    /**
     * 对象模块化
     * @param {String} name 要创建的包的名字空间
     * @param {Function|Object} context 要创建的包的包体
     *
     * $.module(String);       1    返回命名空间对象
     * $.module(Function);     1   立刻执行函数
     * $.module(String, Function); return FunReturn;
     * $.module(String, Object); 1 return Object
     * $.module(String, Any);    1 return Object
     * return Any ||	{__name__:moduleName}
     *
     * @eg1 return Ttpod.user
     * $.module('Ttpod.user');
     *
     * @eg2 return Ttpod.user
     * $.module('Ttpod.user',{
     * 	name:1,
     * 	method:function(){}
     * });
     *
     * @eg3 Ttpod.user;
     * $.module('Ttpod.user',function(){
     * 	return {
     * 		pty : {},
     * 		method : function(){}
     * 	};
     * });
     *
     * @eg4 Ttpod.user;
     * $.module('Ttpod.user',function(exports){
     *	this.say = function(){
     *
     *	}
     * });
     *
     * @eg:return {a:1,b:2,c:3,d:4}
     * $.module("Ttpod.demo",function(exports){
     *    Ttpod.demo.a = 1;
     *    this.b = 2;
     *    exports.c=3;
     *
     *    return {
     *         d:4
     *    };
     * });
     *
     * 1、一个模块只能模块化一次,重复模块化会覆盖之前的属性
     * 2、父级模块要在子级模块前定义
     * $.module(string);
     * $.module(string, function);
     * $.module(string, object);
     * $.module(function);
     * $.module("Ttpod.name",function(exports){
     *   //this、exports 是同一个对象，exports,用来向外提供模块接口。
     *   this.a = 1;
     *   exports.a = 2;
     *
     *    // 错误用法！！!，exports 仅仅是当前上下文一个引用。因此给 exports 赋值是无效的，不能用来更改模块接口
     *   exports = {
     *      foo: 'bar',
     *      doSomething: function() {};
     *   };
     *
     *   //除了给 exports 对象增加成员，还可以使用return直接向外提供接口，将重写exports。
     *   return {
     *       a:3
     *   };
     *
     * });
     *
     */
    function module() {
        var len = arguments.length,
            exports,
            name = arguments[0],
            hasName = "string" == typeof name,
            context = arguments[len - 1];

        if (len == 0 || (!hasName && !$.isFunction(name))) {
            return;
        }

        if (len == 1 && hasName) {
            return namespace(name);
        }

        if (hasName) {
            exports = {
                __name__: name
            };
            if ($.isFunction(context)) {
                namespace(name, exports);
            }
        }

        if ($.isFunction(context)) {
            context = context.call(exports, exports);
        }

        if (hasName) {

            if ("undefined" == typeof context) {
                return exports;
            }

            if ($.isPlainObject(Object) && !("__name__" in context)) {
                context.__name__ = name;
            }

            return namespace(name, context);
        }

        return context;
    }

    $.extend($, {
        Class: Class,
        namespace: namespace,
        module: module
    });

}($));
