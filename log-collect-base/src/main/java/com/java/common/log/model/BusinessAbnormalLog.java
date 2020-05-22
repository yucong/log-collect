package com.java.common.log.model;

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
	

}
