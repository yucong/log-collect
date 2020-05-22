package com.yucong.log.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.common.log.model.BusinessAbnormalLog;
import com.yucong.log.constants.GlobalLog;
import com.yucong.log.dto.ListBusinessAbnormalLogDTO;
import com.yucong.log.service.BusinessAbnormalLogService;
import com.yucong.log.vo.common.CommonVO;
import com.yucong.log.vo.common.DataTableVO;



/**
 * 业务异常日志管理
 * 
 * @author 喻聪
 * @date   2018-09-13
 * 
 */
@RestController
@RequestMapping(value = "businessAbnormalLog")
public class BusinessAbnormalLogController  {

	@Autowired
	private BusinessAbnormalLogService businessAbnormalLogService;
	
	/**
	 * 分页查询业务异常日志
	 *  
	 */
	@GetMapping(value="list")
	public CommonVO<DataTableVO<BusinessAbnormalLog>> list(@Valid  ListBusinessAbnormalLogDTO dto) {
		GlobalLog.MY_LOGGER.info("分页查询业务异常日志:" + dto);
		return new CommonVO<DataTableVO<BusinessAbnormalLog>>( businessAbnormalLogService.listAll(dto) );
	}
	
	
	

}
