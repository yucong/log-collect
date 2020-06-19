package com.java.common.log.producer;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.java.common.log.model.BusinessAbnormalLog;
import com.java.common.log.model.HttpRequestLog;

public class LogHttpProducerTest {

	public static final String BASE_URL = "http://localhost:9002/";
	
	public static void main(String[] args) throws Exception {
		 //testCollectHttpRequestLog();
		testCollectBusinessAbnormalLog();
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
		log.setRequestUrl("/test");
		
		Map<String,Object> input = new HashMap<>();
		input.put("name", "this is test");
		log.setRequestParam(input);
		
		Map<String,Object> output = new HashMap<>();
		output.put("code", 1);
		output.put("message", "操作成功");
		log.setResponseData(output);
		
		log.setUserId("1");
		LogHttpProducer.collect(BASE_URL, log);
	}
	
	public static  void testCollectBusinessAbnormalLog() throws Exception {
		
		BusinessAbnormalLog log = new BusinessAbnormalLog();
		log.setDescription("主播开了多个直播间");
		log.setEnv("test");
		log.setLevel("error");
		log.setProbableCause("创建直播间接口没有做校验");
		log.setUserId("1");
		
		LogHttpProducer.collect(BASE_URL, log);
	}
	

	

	
	
	
	
	
	
}
