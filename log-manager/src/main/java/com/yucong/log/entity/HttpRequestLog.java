package com.yucong.log.entity;

import com.yucong.log.common.BaseModel;

/**
 * 接口请求日志
 *
 */
public class HttpRequestLog extends BaseModel {
	
	// 用户ID
	private String userId;
	// 环境
	private String env;
	// 客户端版本
	private String appVersion;
	// 客户端类型
	private String deviceType;
	// 客户端IP
	private String clientIP;
	// 客户端请求URL
	private String requestUrl;
	// 客户端方法
	private String method;
	// 服务器ID
	private String serverIP;
	// 接口请求参数
	private String requestParam;
	// 接口响应参数
    private Object responseData;
    // 接口耗时
 	private long consumeTime;
	
	public long getConsumeTime() {
		return consumeTime;
	}
	public void setConsumeTime(long consumeTime) {
		this.consumeTime = consumeTime;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getEnv() {
		return env;
	}
	public void setEnv(String env) {
		this.env = env;
	}
	public String getAppVersion() {
		return appVersion;
	}
	public void setAppVersion(String appVersion) {
		this.appVersion = appVersion;
	}
	public String getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
	public String getClientIP() {
		return clientIP;
	}
	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}
	public String getRequestUrl() {
		return requestUrl;
	}
	public void setRequestUrl(String requestUrl) {
		this.requestUrl = requestUrl;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getServerIP() {
		return serverIP;
	}
	public void setServerIP(String serverIP) {
		this.serverIP = serverIP;
	}
	public String getRequestParam() {
		return requestParam;
	}
	public void setRequestParam(String requestParam) {
		this.requestParam = requestParam;
	}
	public Object getResponseData() {
		return responseData;
	}
	public void setResponseData(Object responseData) {
		this.responseData = responseData;
	}
	
	

}
