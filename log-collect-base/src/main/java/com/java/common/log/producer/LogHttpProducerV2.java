package com.java.common.log.producer;

import java.util.HashMap;
import java.util.Map;
import java.util.TimerTask;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.java.common.log.model.BusinessAbnormalLog;
import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.LiveCallbackLog;
import com.java.common.log.model.ServerExceptionLog;
import com.java.util.http.HttpProxy;
import com.java.util.json.FastJsonUtil;
import com.java.util.sign.SignUtil;

/**
 * <p>优化升级：日志服务器宕机，可能会导致线程中队列里面的任务堆积，占用系统内存，需要模拟Hystrix的熔断来避免此情况的发生</p>
 * 
 * 1 5分钟超时次数达到100次，将不再生产日志
 * 2 5分钟后，恢复生产日志
 *
 */
public class LogHttpProducerV2 {
	
	//日志记录操作延时
    private final int OPERATE_DELAY_TIME = 10;

    //异步操作记录日志的线程池
    private ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(5);
	
	private static final String ADD_REQUEST_LOG_URL = "/log/httpRequestLog/add";
	private static final String ADD_EXCEPTION_LOG_URL = "/log/serverExceptionLog/add";
	private static final String ADD_ABNORMAL_LOG_URL = "/log/businessAbnormalLog/add";
	private static final String ADD_LIVE_CALLBACK_LOG_URL = "/log/liveCallbackLog/add";
	
	
	private int num;
	
	/**
	 * <p>收集http请求日志
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
        			HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);

        		} catch (Exception e) {
        			e.printStackTrace();
        			num++;
        		}
            }
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	/**
	 * <p>收集服务器异常日志
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
					HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);

				} catch (Exception e) {
					e.printStackTrace();
					num++;
				}
				
            }
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	
	/**
	 * <p>收集业务异常日志
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
					HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);

				} catch (Exception e) {
					e.printStackTrace();
					num++;
				}
				
            }
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	/**
	 * <p>收集直播回调日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public void collect(String baseUrl,LiveCallbackLog log) {
		
		TimerTask task = new TimerTask() {
            
			@Override
            public void run() {
            	
				String requestUrl = baseUrl + ADD_LIVE_CALLBACK_LOG_URL;
				try {
					Map<String,String> headMap = new HashMap<String, String>();
					headMap.put("sign", SignUtil.createSign(log,SignUtil.APP_KEY ));
					HttpProxy.postJson(requestUrl, FastJsonUtil.toJson(log),headMap);

				} catch (Exception e) {
					e.printStackTrace();
					num++;
				}
				
            }
        };
		executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
	}
	
	
	public int getNum() {
		return num;
	}
	
	
}
