package com.yucong.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.common.log.model.SmsSendLog;
import com.yucong.log.dao.SmsSendLogDao;
import com.yucong.log.dto.ListSmsSendLogDTO;
import com.yucong.log.vo.common.DataTableVO;


@Service
public class SmsSendLogService extends BaseService<SmsSendLog, SmsSendLogDao> {

	@Autowired
	private SmsSendLogDao smsSendLogDao;
	
	@Override
	protected SmsSendLogDao getDao() {
		return smsSendLogDao;
	}
	
	/**查询请求日志*/
	public DataTableVO<SmsSendLog> listAll(ListSmsSendLogDTO dto) {
		return smsSendLogDao.listAll(dto);
	}
	
}
