package com.yucong.log.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yucong.log.common.vo.BaseVO;
import com.yucong.log.common.vo.CommonVO;
import com.yucong.log.common.vo.DataTableVO;
import com.yucong.log.constants.GlobalLog;
import com.yucong.log.dto.ListServerExceptionLogDTO;
import com.yucong.log.entity.ServerExceptionLog;
import com.yucong.log.service.ServerExceptionLogService;
import com.yucong.log.test.LogDirectProducer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * 服务异常日志管理
 * 
 * @author 喻聪
 * @date   2018-09-13
 * 
 */
@RestController
@RequestMapping(value = "serverExceptionLog")
@Api(tags = "服务异常日志管理")
public class ServerExceptionLogController  {

	
	@Autowired
	private LogDirectProducer logDirectProducer;
	
	@Autowired
	private ServerExceptionLogService serverExceptionLogService;
	
	
	/**
	 * 添加日志
	 */
	@PostMapping(value="add")
	@ApiOperation(value="添加日志", notes="添加服务异常日志")
	public BaseVO add(@RequestBody ServerExceptionLog  log ) {
		logDirectProducer.produceExceptionLog(log);
		return new BaseVO();
	}
	
	/**
	 * 分页查询服务异常日志
	 *  
	 */
	@GetMapping(value="list")
	@ApiOperation(value="查询日志", notes="多条件搜索查询日志")
	public CommonVO<DataTableVO<ServerExceptionLog>> listHttpRequest(@Valid ListServerExceptionLogDTO dto) {
		GlobalLog.MY_LOGGER.info("分页查询服务异常日志:" + dto);
		return new CommonVO<DataTableVO<ServerExceptionLog>>( serverExceptionLogService.listAll(dto) );
	}
	

}
