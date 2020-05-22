package com.java.common.log.producer;

import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.ServerExceptionLog;

public abstract class  LogAbstractProducer {
	
	/**
	 * 生产请求日志 
	 */
	public abstract void produceRequestLog(HttpRequestLog log);
	
	/**
	 * 生产服务异常日志 
	 */
	public abstract void produceExceptionLog(ServerExceptionLog log);
	
	
}
