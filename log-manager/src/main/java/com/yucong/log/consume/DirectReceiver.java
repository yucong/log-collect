package com.yucong.log.consume;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.yucong.log.constants.GlobalLog;
import com.yucong.log.entity.BusinessAbnormalLog;
import com.yucong.log.entity.HttpRequestLog;
import com.yucong.log.entity.ServerExceptionLog;
import com.yucong.log.service.BusinessAbnormalLogService;
import com.yucong.log.service.HttpRequestLogService;
import com.yucong.log.service.ServerExceptionLogService;
	
@Component
public class DirectReceiver {

	@Autowired
	private HttpRequestLogService httpRequestLogService;
	@Autowired
	private ServerExceptionLogService serverExceptionLogService;
	@Autowired
	private BusinessAbnormalLogService businessAbnormalLogService;
	
    @RabbitListener(queues = "request")
    public void processRequestLog(String msg) {
    	try {
			GlobalLog.MY_LOGGER.info("消费request请求消息 : " + msg);
			HttpRequestLog log = JSON.parseObject(msg, HttpRequestLog.class);
			httpRequestLogService.add(log);
		} catch (Exception e) {
			GlobalLog.MY_LOGGER.warn("消费request请求消息",e);
		}
    }
    
    @RabbitListener(queues = "exception")
    public void processExceptionLog(String msg) {
        try {
			GlobalLog.MY_LOGGER.info("消费exception服务异常消息 : " + msg);
			ServerExceptionLog log = JSON.parseObject(msg, ServerExceptionLog.class);
			serverExceptionLogService.add(log);
		} catch (Exception e) {
			GlobalLog.MY_LOGGER.warn("消费exception服务异常消息",e);
		}
    }
    
    @RabbitListener(queues = "abnormal")
    public void processAbnormal(String msg) {
        try {
			GlobalLog.MY_LOGGER.info("消费abnormal业务异常消息 : " + msg);
			BusinessAbnormalLog log = JSON.parseObject(msg, BusinessAbnormalLog.class);
			businessAbnormalLogService.add(log);
		} catch (Exception e) {
			GlobalLog.MY_LOGGER.warn("消费abnormal业务异常消息",e);
		}
    }
    


}

