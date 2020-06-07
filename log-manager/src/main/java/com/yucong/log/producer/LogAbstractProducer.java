package com.yucong.log.producer;

import com.yucong.log.entity.HttpRequestLog;
import com.yucong.log.entity.ServerExceptionLog;

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
