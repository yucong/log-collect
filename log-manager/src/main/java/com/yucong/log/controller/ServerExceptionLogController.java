package com.yucong.log.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.common.log.model.HttpRequestLog;
import com.java.common.log.model.ServerExceptionLog;
import com.yucong.log.constants.GlobalLog;
import com.yucong.log.dto.ListServerExceptionLogDTO;
import com.yucong.log.service.ServerExceptionLogService;
import com.yucong.log.test.LogDirectProducer;
import com.yucong.log.vo.common.CommonVO;
import com.yucong.log.vo.common.DataTableVO;

/**
 * 服务异常日志管理
 * 
 * @author 喻聪
 * @date   2018-09-13
 * 
 */
@RestController
@RequestMapping(value = "serverExceptionLog")
public class ServerExceptionLogController  {

	
	@Autowired
	private LogDirectProducer logDirectProducer;
	
	@Autowired
	private ServerExceptionLogService serverExceptionLogService;
	
	
	/**
	 * 添加日志
	 */
	@PostMapping(value="add")
	public CommonVO<Object> add(@RequestBody HttpRequestLog httpRequestLog ) {
		logDirectProducer.produceRequestLog(httpRequestLog);
		return new CommonVO<Object>();
	}
	
	/**
	 * 分页查询服务异常日志
	 *  
	 */
	@GetMapping(value="list")
	public CommonVO<DataTableVO<ServerExceptionLog>> listHttpRequest(@Valid ListServerExceptionLogDTO dto) {
		GlobalLog.MY_LOGGER.info("分页查询服务异常日志:" + dto);
		return new CommonVO<DataTableVO<ServerExceptionLog>>( serverExceptionLogService.listAll(dto) );
	}
	

}
