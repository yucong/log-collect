package com.java.common.log.producer;

import com.java.common.log.model.BusinessAbnormalLog;

public class LogHttpProducerTest2 {

	public static final String BASE_URL = "http://47.102.126.118:9002/";
	
	public static void main(String[] args) throws Exception {
		 //testCollectHttpRequestLog();
		
		long s1 = System.currentTimeMillis();
		for(int i=0;i<10;i++) {
			testCollectBusinessAbnormalLog();
		}
		long s2 = System.currentTimeMillis();
		System.out.println("耗时：" + (s2 - s1));
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
	

	

	
	
	
	
	
	
}
