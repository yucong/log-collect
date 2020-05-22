package com.java.common.log.model;

import java.util.Date;
import java.util.Map;

import com.java.common.log.base.BaseModel;

/**
 * 发送记录日志
 */
public class SmsSendLog extends BaseModel {
	
	private String phone;
	private String templateId;
	private Map<String,Object> params ;
	private String content;
	private Boolean flagSend; 
	private String result;
    
    public SmsSendLog() {
    	super.setCreateTime(new Date());
    }
    
    public SmsSendLog(String phone,String templateId,Map<String,Object> params) {
    	this(phone, templateId, params, false);
    }
    
    public SmsSendLog(String phone,String templateId,Map<String,Object> params,boolean flagSend) {
    	this();
    	this.phone = phone;
    	this.templateId = templateId;
    	this.params = params;
    	this.flagSend = flagSend;
    }
    
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getTemplateId() {
		return templateId;
	}
	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Boolean getFlagSend() {
		return flagSend;
	}
	public void setFlagSend(Boolean flagSend) {
		this.flagSend = flagSend;
	}
	public Map<String, Object> getParams() {
		return params;
	}
	public void setParams(Map<String, Object> params) {
		this.params = params;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
	

}

