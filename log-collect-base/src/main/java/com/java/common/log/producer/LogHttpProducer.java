package com.java.common.log.producer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.ServerExceptionLog;
import com.java.util.http.HttpProxy;
import com.java.util.json.FastJsonUtil;
import com.java.util.sign.SignUtil;

public class LogHttpProducer {

	private static final String ADD_REQUEST_LOG_URL = "/log/httpRequestLog/add";
	private static final String ADD_EXCEPTION_LOG_URL = "/log/serverExceptionLog/add";
	
	/**
	 * 收集http请求日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public static void collect(String baseUrl,HttpRequestLog log) {
		String requestUrl = baseUrl + ADD_REQUEST_LOG_URL;
		try {
			Map<String,String> headMap = new HashMap<String, String>();
			headMap.put("sign", SignUtil.createSign(log,SignUtil.APP_KEY ));
			String msg = HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);
			System.out.println("msg:" + msg);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 收集服务器异常日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public static void collect(String baseUrl,ServerExceptionLog log) {
		String requestUrl = baseUrl + ADD_EXCEPTION_LOG_URL;
		try {
			String msg = HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log));
			System.out.println("msg:" + msg);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
}
