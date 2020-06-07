package com.yucong.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yucong.log.common.vo.DataTableVO;
import com.yucong.log.dao.BusinessAbnormalLogDao;
import com.yucong.log.dto.ListBusinessAbnormalLogDTO;
import com.yucong.log.entity.BusinessAbnormalLog;


@Service
public class BusinessAbnormalLogService extends BaseService<BusinessAbnormalLog, BusinessAbnormalLogDao> {

	@Autowired
	private BusinessAbnormalLogDao businessAbnormalLogDao;
	
	@Override
	protected BusinessAbnormalLogDao getDao() {
		return businessAbnormalLogDao;
	}
	
	
	/**查询请求日志*/
	public DataTableVO<BusinessAbnormalLog> listAll(ListBusinessAbnormalLogDTO dto) {
		return businessAbnormalLogDao.listAll(dto);
	}


	
	
	

	
}
