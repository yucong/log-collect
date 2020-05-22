package com.java.common.log.model;

import java.util.Date;

import com.java.common.log.base.BaseModel;

/**
 * 服务器异常日志
 *
 */
public class ServerExceptionLog extends BaseModel  {
	
    private String stackTrace;
    private String errMsg;
    private String errLevel;
    
    public ServerExceptionLog() {
    	super.setCreateTime(new Date());
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
