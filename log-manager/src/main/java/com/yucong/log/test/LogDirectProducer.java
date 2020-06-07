package com.yucong.log.test;


import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.yucong.log.constants.LogConstants;
import com.yucong.log.entity.BusinessAbnormalLog;
import com.yucong.log.entity.HttpRequestLog;
import com.yucong.log.entity.ServerExceptionLog;
import com.yucong.log.producer.LogAbstractProducer;

@Component
public class LogDirectProducer extends LogAbstractProducer {

	@Autowired
	private RabbitTemplate rabbitTemplate;
	
	@Override
	public void produceRequestLog(HttpRequestLog log) {
		log.setPlatform(LogConstants.Platform.PERMISSION);
		rabbitTemplate.convertAndSend(LogConstants.Routing.EXCHANGE, LogConstants.Routing.REQUEST, JSON.toJSONString(log) );
	}
	
	@Override
	public void produceExceptionLog(ServerExceptionLog log) {
		log.setPlatform(LogConstants.Platform.PERMISSION);
		rabbitTemplate.convertAndSend(LogConstants.Routing.EXCHANGE, LogConstants.Routing.EXCEPTION, JSON.toJSONString(log));
	}

	public void produceAbnormalLog(BusinessAbnormalLog log) {
		log.setPlatform(LogConstants.Platform.PERMISSION);
		rabbitTemplate.convertAndSend(LogConstants.Routing.EXCHANGE, LogConstants.Routing.ABNORMAL, JSON.toJSONString(log));
	}
	

	
}

