package com.java.common.log.producer;

import java.util.Date;

import com.java.common.log.model.BusinessAbnormalLog;
import com.java.common.log.model.ServerExceptionLog;

public class LogHttpProducerTest2 {

	//public static final String BASE_URL = "http://47.102.126.118:9002";
	public static final String BASE_URL = "http://localhost:9002";
	
	public static void main(String[] args) throws Exception {
		 //testCollectHttpRequestLog();
		
		/*long s1 = System.currentTimeMillis();
		for(int i=0;i<3;i++) {
			testCollectBusinessAbnormalLog();
		}
		long s2 = System.currentTimeMillis();
		System.out.println("耗时：" + (s2 - s1));*/
		
		testCollectServerExceptionLog();
	}
	
	
	
	
	public static  void testCollectBusinessAbnormalLog() throws Exception {
		
		BusinessAbnormalLog log = new BusinessAbnormalLog();
		log.setDescription("测试");
		log.setEnv("test");
		log.setLevel("error");
		log.setProbableCause("仅用于测试");
		log.setUserId("1");
		
		LogHttpProducerV2 producer = new LogHttpProducerV2();
		producer.collect(BASE_URL, log);
	}
	
	
	public static  void testCollectServerExceptionLog() throws Exception {
		
		ServerExceptionLog log = new ServerExceptionLog();
		log.setAppVersion("1.2.3");
		log.setClientIP("127.0.0.1");
		log.setCreateTime(new Date());
		log.setDeviceType("postman");
		log.setEnv("test");
		log.setErrLevel("warn");
		log.setErrMsg("测试异常");
		log.setMethod("POST");
		log.setPlatform("test");
		log.setRequestUrl("test/test");
		log.setServerIP("0.0.0.0");
		log.setStackTrace("异常堆栈信息");
		log.setUserId("111");
		LogHttpProducerV2 producer = new LogHttpProducerV2();
		producer.collect(BASE_URL, log);
	}
	

	

	
	
	
	
	
	
}
