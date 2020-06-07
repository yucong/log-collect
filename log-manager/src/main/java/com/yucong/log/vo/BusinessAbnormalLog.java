package com.yucong.log.vo;

import java.io.Serializable;
import java.util.Date;

import com.java.common.log.base.BaseModel;
import com.java.common.log.constant.LogConstants;

/**
 * 业务异常日志
 * 
 * @time
 */
public class BusinessAbnormalLog extends BaseModel implements Serializable {
	
	private static final long serialVersionUID = -5193243310536711416L;
	
	// 用户ID
	private String userId;
	// 平台
	private String platform;
	// 环境
	private String env;
	// 客户端版本
	private String appVersion;
	// 客户端类型
	private String deviceType;
	// 客户端IP
	private String clientIP;
	// 请求URL
	private String requestUrl;
	// 请求方法
	private String method;
	// 服务端IP
	private String serverIP;
	// 请求参数
	private String requestParam;
	// 响应参数
    private Object responseData;
    
	private String stackTrace;
    private String errMsg;
    private String errLevel;
	
	// 业务描述
	private String businessDesc;
	// 错误描述
	private String errorDesc;
	// 错误级别
	private String errorLevel;
	// 可能原因
	private String probableCause;


	public BusinessAbnormalLog() {
		super.setCreateTime(new Date());
		this.errorLevel = LogConstants.Level.WARN;
	}
	public BusinessAbnormalLog(String platform) {
		this();
		this.setPlatform(platform);
	}
	public BusinessAbnormalLog(String platform, String businessDesc, String errorDesc) {
		this(platform);
		this.businessDesc = businessDesc;
		this.errorDesc = errorDesc;
	}
	public BusinessAbnormalLog(String platform, String businessDesc, String errorDesc, String probableCause) {
		this(platform, businessDesc, errorDesc);
		this.probableCause = probableCause;
	}
	
	public String getBusinessDesc() {
		return businessDesc;
	}
	public void setBusinessDesc(String businessDesc) {
		this.businessDesc = businessDesc;
	}
	public String getErrorDesc() {
		return errorDesc;
	}
	public void setErrorDesc(String errorDesc) {
		this.errorDesc = errorDesc;
	}
	public String getProbableCause() {
		return probableCause;
	}
	public void setProbableCause(String probableCause) {
		this.probableCause = probableCause;
	}
	public String getErrorLevel() {
		return errorLevel;
	}
	public void setErrorLevel(String errorLevel) {
		this.errorLevel = errorLevel;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
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
	public String getStackTrace() {
		return stackTrace;
	}
	public void setStackTrace(String stackTrace) {
		this.stackTrace = stackTrace;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	public String getErrLevel() {
		return errLevel;
	}
	public void setErrLevel(String errLevel) {
		this.errLevel = errLevel;
	}
	

}
