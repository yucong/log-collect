package com.java.common.log.producer;

import java.util.HashMap;
import java.util.Map;
import java.util.TimerTask;

import com.java.util.http.HttpProxy;

public class ContentCheckLogHttpProducer {
	
    private ThreadPoolManager manager = ThreadPoolManager.getInstance();
	private static final String LOG_SAVE_URL = "/log/contentCheckLog/add";
	
	/**
	 * <p>收集内容机核日志
	 * 
	 * @param baseUrl
	 * @param log
	 */
	public void collect(String baseUrl,String result) {
		
		TimerTask task = new TimerTask() {
            
			@Override
            public void run() {
                
            	String requestUrl = baseUrl + LOG_SAVE_URL;
        		try {
        			Map<String,String> headMap = new HashMap<String, String>();
        			String msg = HttpProxy.postJson(requestUrl, result,headMap);
        			System.out.println("msg:" + msg);
        		} catch (Exception e) {
        			e.printStackTrace();
        		}
            }
        };
        manager.addTask(task);
	}
	

	
}
