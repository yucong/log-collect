package com.yucong.log.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.ServerExceptionLog;
import com.java.common.log.producer.LogHttpProducer;


/**
 * 业务异常日志管理
 * 
 * @author 喻聪
 * @date   2018-09-13
 * 
 */
@RestController
@RequestMapping(value = "test")
public class TestLogController {

	private static final String baseUrl = "http://localhost:9002";
	
	@GetMapping(value="addExceptioinLog")
	public JSONObject produceExceptionLog() {
		
		ServerExceptionLog log = new ServerExceptionLog();
		log.setAppVersion("1.0");
		log.setClientIP("192.168.0.4");
		log.setCreateTime(new Date());
		log.setDeviceType("web");
		log.setEnv("test");
		log.setErrMsg("测试异常");
		log.setMethod("GET");
		log.setRequestUrl("/test");
		Map<String,Object> map = new HashMap<>();
		map.put("code", 1);
		map.put("message", "操作成功");
		log.setResponseData(map);
		log.setStackTrace("this is error msg!");
		log.setUserId("1");
		
		// logDirectProducer.produceExceptionLog(log);
		LogHttpProducer.collect(baseUrl, log);
		String result = "{\"code\":1,\"message\":\"操作成功\"}";
		return JSON.parseObject(result);
	}
	
	
	@GetMapping(value="produceRequestLog")
	public JSONObject produceRequestLog() {
		
		HttpRequestLog log = new HttpRequestLog();
		log.setAppVersion("1.0");
		log.setClientIP("192.168.0.4");
		log.setConsumeTime(580);
		log.setCreateTime(new Date());
		log.setDeviceType("web");
		log.setEnv("test");
		log.setMethod("POST");
		log.setRequestParam("{\"name\":\"zhangsan\"}");
		log.setRequestUrl("/test");
		Map<String,Object> map = new HashMap<>();
		map.put("code", 1);
		map.put("message", "操作成功");
		log.setResponseData(map);
		log.setUserId("1");
		
		// logDirectProducer.produceRequestLog(log);
		LogHttpProducer.collect(baseUrl, log);
		String result = "{\"code\":1,\"message\":\"操作成功\"}";
		return JSON.parseObject(result);
	}
	
	
	
	
	
	

}
