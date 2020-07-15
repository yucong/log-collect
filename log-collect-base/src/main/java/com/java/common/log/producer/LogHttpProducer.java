package com.java.common.log.producer;

import java.util.HashMap;
import java.util.Map;

import com.java.common.log.model.BusinessAbnormalLog;
import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.ServerExceptionLog;
import com.java.util.http.HttpProxy;
import com.java.util.json.FastJsonUtil;
import com.java.util.sign.SignUtil;

public class LogHttpProducer {

	private static final String ADD_REQUEST_LOG_URL = "/log/httpRequestLog/add";
	private static final String ADD_EXCEPTION_LOG_URL = "/log/serverExceptionLog/add";
	private static final String ADD_ABNORMAL_LOG_URL = "/log/businessAbnormalLog/add";
	
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
		} catch (Exception e) {
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
			Map<String,String> headMap = new HashMap<String, String>();
			headMap.put("sign", SignUtil.createSign(log,SignUtil.APP_KEY ));
			String msg = HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);
			System.out.println("msg:" + msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 收集业务异常日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public static void collect(String baseUrl,BusinessAbnormalLog log) {
		String requestUrl = baseUrl + ADD_ABNORMAL_LOG_URL;
		try {
			Map<String,String> headMap = new HashMap<String, String>();
			headMap.put("sign", SignUtil.createSign(log,SignUtil.APP_KEY ));
			String msg = HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);
			System.out.println("msg:" + msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
}
