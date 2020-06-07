package com.yucong.log.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yucong.log.common.vo.CommonVO;
import com.yucong.log.common.vo.DataTableVO;
import com.yucong.log.constants.GlobalLog;
import com.yucong.log.dto.ListHttpRequestLogDTO;
import com.yucong.log.entity.HttpRequestLog;
import com.yucong.log.service.HttpRequestLogService;
import com.yucong.log.test.LogDirectProducer;


/**
 * 请求日志管理
 * 
 * @author 喻聪
 * @date   2018-09-13
 * 
 */
@RestController
@RequestMapping(value = "httpRequestLog")
public class HttpRequestLogController  {

	@Autowired
	private LogDirectProducer logDirectProducer;
	
	@Autowired
	private HttpRequestLogService httpRequestLogService;
	
	/**
	 * 添加日志
	 */
	@PostMapping(value="add")
	public CommonVO<Object> add(@RequestBody HttpRequestLog httpRequestLog ) {
		logDirectProducer.produceRequestLog(httpRequestLog);
		return new CommonVO<Object>();
	}
	
	
	/**
	 * 分页查询请求日志
	 */
	@GetMapping(value="list")
	public CommonVO<DataTableVO<HttpRequestLog>> list(@Valid ListHttpRequestLogDTO dto) {
		GlobalLog.MY_LOGGER.info("分页查询请求日志:" + dto);
		return new CommonVO<DataTableVO<HttpRequestLog>>( httpRequestLogService.listAll(dto) );
	}
	
	
	
	
	
	

}
