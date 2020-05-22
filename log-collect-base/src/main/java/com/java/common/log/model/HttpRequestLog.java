package com.java.common.log.model;

import com.java.common.log.base.BaseModel;

/**
 * 接口请求日志
 *
 */
public class HttpRequestLog extends BaseModel {

	private long consumeTime;
	

	public long getConsumeTime() {
		return consumeTime;
	}
	public void setConsumeTime(long consumeTime) {
		this.consumeTime = consumeTime;
	}
	
	

}
