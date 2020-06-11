package com.java.common.log.constant;

/**
 * 常量参数
 */
public interface LogConstants {

	
	
	interface Platform {
		String APP = "app";//APP服务
		String WX_MINI = "mini";//微信小程序
		String ADMIN = "admin";//管理后台
		String PERMISSION = "permission";//权限管理
		String OFFICAL = "offical";//官网API
		String TASK = "task"; //定时任务
	}
	
	interface DeviceType {
		String ANDROID = "android";//安卓
		String IOS = "ios";//苹果
		String WEB = "web";//网页
		String UNKONW = "unkonw";//未知
	}
	
	interface Level {
		String WARN = "warn";
		String ERROR = "error";
		String INFO = "info";
	}
	
	interface Routing {
		String EXCHANGE = "log-exchange";
		String REQUEST = "request";
		String EXCEPTION = "exception";
		String ABNORMAL = "abnormal";
		String CALLBACK = "callback";
		String SMS = "sms";
		String TEST_QUEUE_SUFFIX = "_test"; //测试队列后缀
	}
	
	
	
}
