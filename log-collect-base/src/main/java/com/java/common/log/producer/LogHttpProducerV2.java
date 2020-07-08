package com.java.common.log.producer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.TimerTask;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.java.common.log.model.BusinessAbnormalLog;
import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.ServerExceptionLog;
import com.java.util.http.HttpProxy;
import com.java.util.json.FastJsonUtil;
import com.java.util.sign.SignUtil;

public class LogHttpProducerV2 {
	
	//日志记录操作延时
    private final int OPERATE_DELAY_TIME = 10;

    //异步操作记录日志的线程池
    private ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(10);
	
	private static final String ADD_REQUEST_LOG_URL = "/log/httpRequestLog/add";
	private static final String ADD_EXCEPTION_LOG_URL = "/log/serverExceptionLog/add";
	private static final String ADD_ABNORMAL_LOG_URL = "/log/businessAbnormalLog/add";
	
	/**
	 * 收集http请求日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public void collect(String baseUrl,HttpRequestLog log) {
		
		TimerTask task = new TimerTask() {
            
			@Override
            public void run() {
                
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
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	/**
	 * 收集服务器异常日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public void collect(String baseUrl,ServerExceptionLog log) {
		
		TimerTask task = new TimerTask() {
            
			@Override
            public void run() {
            	
				String requestUrl = baseUrl + ADD_EXCEPTION_LOG_URL;
				try {
					Map<String,String> headMap = new HashMap<String, String>();
					headMap.put("sign", SignUtil.createSign(log,SignUtil.APP_KEY ));
					String msg = HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);
					System.out.println("msg:" + msg);
				} catch (IOException e) {
					e.printStackTrace();
				}
				
            }
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	
	/**
	 * 收集业务异常日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public void collect(String baseUrl,BusinessAbnormalLog log) {
		
		TimerTask task = new TimerTask() {
            
			@Override
            public void run() {
            	
				String requestUrl = baseUrl + ADD_ABNORMAL_LOG_URL;
				try {
					Map<String,String> headMap = new HashMap<String, String>();
					headMap.put("sign", SignUtil.createSign(log,SignUtil.APP_KEY ));
					String msg = HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);
					System.out.println("msg:" + msg);
				} catch (IOException e) {
					e.printStackTrace();
				}
				
            }
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	
}
