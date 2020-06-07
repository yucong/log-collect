package com.yucong.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yucong.log.common.vo.DataTableVO;
import com.yucong.log.dao.ServerExceptionLogDao;
import com.yucong.log.dto.ListServerExceptionLogDTO;
import com.yucong.log.entity.ServerExceptionLog;


@Service
public class ServerExceptionLogService extends BaseService<ServerExceptionLog, ServerExceptionLogDao>{

	@Autowired
	private ServerExceptionLogDao serverExceptionLogDao;
	
	@Override
	protected ServerExceptionLogDao getDao() {
		return serverExceptionLogDao;
	}
	
	/**查询请求日志*/
	public DataTableVO<ServerExceptionLog> listAll(ListServerExceptionLogDTO dto) {
		return serverExceptionLogDao.listAll(dto);
	}
	
	

	
}
