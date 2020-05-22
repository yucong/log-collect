package com.yucong.log.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.common.log.model.SmsSendLog;
import com.yucong.log.constants.GlobalLog;
import com.yucong.log.dto.ListSmsSendLogDTO;
import com.yucong.log.service.SmsSendLogService;
import com.yucong.log.vo.common.CommonVO;
import com.yucong.log.vo.common.DataTableVO;

/**
 * 短信发送日志管理
 * 
 * @author 喻聪
 * @date   2018-09-13
 * 
 */
@RestController
@RequestMapping(value = "smsSendLog")
public class SmsSendLogController {

	@Autowired
	private SmsSendLogService smsSendLogService;
	
	/**
	 * 分页查询服务异常日志
	 *  
	 */
	@GetMapping(value="list")
	public CommonVO<DataTableVO<SmsSendLog>> listHttpRequest(@Valid  ListSmsSendLogDTO dto) {
		GlobalLog.MY_LOGGER.info("分页查询服务异常日志:" + dto);
		return new CommonVO<DataTableVO<SmsSendLog>>( smsSendLogService.listAll(dto) );
	}
}
