package com.yucong.log;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.yucong.log.constants.Env;
import com.yucong.log.constants.LogConstants;

@Configuration
@AutoConfigureAfter(Env.class)
public class RabbitConfig {

	@Bean
    DirectExchange exchange() {
        return new DirectExchange(LogConstants.Routing.EXCHANGE);
    }
	
	@Bean
    Queue requestLogQueue() {
		return new Queue(LogConstants.Routing.REQUEST, false);
    }
	
	@Bean
    Queue exceptionLogQueue() {
        return new Queue(LogConstants.Routing.EXCEPTION, false);
    }
	
	@Bean
    Queue abnormalLogQueue() {
        return new Queue(LogConstants.Routing.ABNORMAL, false);
    }
	
	@Bean
    Queue smsLogQueue() {
        return new Queue(LogConstants.Routing.SMS, false);
    }

	@Bean
    Binding bindingRequestLogQueue(Queue requestLogQueue, DirectExchange exchange) {
        return BindingBuilder.bind(requestLogQueue)
                             .to(exchange)
                             .with(requestLogQueue.getName());
    }

    @Bean
    Binding bindingExceptionLogQueue(Queue exceptionLogQueue, DirectExchange exchange) {
        return BindingBuilder.bind(exceptionLogQueue)
                             .to(exchange)
                             .with(exceptionLogQueue.getName());
    }
    
    
	@Bean
    Binding bindingAbnormalLogQueue(Queue abnormalLogQueue, DirectExchange exchange) {
        return BindingBuilder.bind(abnormalLogQueue)
                             .to(exchange)
                             .with(abnormalLogQueue.getName());
    }
    
    @Bean
    Binding bindingSmsLogQueue(Queue smsLogQueue, DirectExchange exchange) {
        return BindingBuilder.bind(smsLogQueue)
                             .to(exchange)
                             .with(smsLogQueue.getName());
    }
	
}
