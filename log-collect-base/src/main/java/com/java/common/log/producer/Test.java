package com.java.common.log.producer;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.java.common.log.model.HttpRequestLog;
import com.java.util.http.HttpProxy;
import com.java.util.json.FastJsonUtil;

public class Test {

	
	public static void main(String[] args) throws Exception {
		testPostJson();
	}
	
	
	public static  void testGet() throws Exception {
		String url = "http://file.zsmy.cn/test/area/20170809105223236.json";

		String msg = HttpProxy.get4String(url);
		System.err.println(msg);
	}
	
	
	public static  void testPostJson() throws Exception {
		String url = "http://localhost:9002/log/httpRequestLog/add";
		
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
		String msg = HttpProxy.postJson(url, FastJsonUtil.toJson(log));
		System.out.println(msg);
	}
	

	

	
	
	
	
	
	
}
