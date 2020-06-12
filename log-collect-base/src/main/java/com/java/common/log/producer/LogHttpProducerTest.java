package com.java.common.log.producer;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.java.common.log.model.HttpRequestLog;

public class LogHttpProducerTest {

	public static final String BASE_URL = "http://47.102.117.241:9002/";
	
	public static void main(String[] args) throws Exception {
		
		for(int i=0;i<10;i++) {
			testCollectHttpRequestLog();
		}
	}
	
	
	public static  void testCollectHttpRequestLog() throws Exception {
		HttpRequestLog log = new HttpRequestLog();
		log.setAppVersion("1.0");
		log.setClientIP("192.168.0.4");
		log.setConsumeTime(580);
		log.setCreateTime(new Date());
		log.setDeviceType("web");
		log.setEnv("test");
		log.setMethod("POST");
		log.setRequestParam("{\"name\":\"this is test\"}");
		log.setRequestUrl("/test");
		Map<String,Object> map = new HashMap<>();
		map.put("code", 1);
		map.put("message", "操作成功");
		log.setResponseData(map);
		log.setUserId("1");
		LogHttpProducer.collect(BASE_URL, log);
	}
	

	

	
	
	
	
	
	
}
