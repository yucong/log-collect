package com.java.common.log.model;

public class LiveCallbackLog  {

	private Integer liveId;
	
	private Integer liveUserId;
	
	private Integer flagPlay;
	
	private Integer errorCode;
	
	private String hander;
	
	private Object callback;

	public Integer getLiveId() {
		return liveId;
	}
	public void setLiveId(Integer liveId) {
		this.liveId = liveId;
	}
	public Integer getLiveUserId() {
		return liveUserId;
	}
	public void setLiveUserId(Integer liveUserId) {
		this.liveUserId = liveUserId;
	}
	public Integer getFlagPlay() {
		return flagPlay;
	}
	public void setFlagPlay(Integer flagPlay) {
		this.flagPlay = flagPlay;
	}
	public Integer getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}
	public String getHander() {
		return hander;
	}
	public void setHander(String hander) {
		this.hander = hander;
	}
	public Object getCallback() {
		return callback;
	}
	public void setCallback(Object callback) {
		this.callback = callback;
	}
	
	
	
}
