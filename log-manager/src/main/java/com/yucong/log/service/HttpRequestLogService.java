package com.yucong.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.common.log.model.HttpRequestLog;
import com.yucong.log.dao.HttpRequestLogDao;
import com.yucong.log.dto.ListHttpRequestLogDTO;
import com.yucong.log.vo.common.DataTableVO;

@Service
public class HttpRequestLogService extends BaseService<HttpRequestLog, HttpRequestLogDao> {

	@Autowired
	private HttpRequestLogDao httpRequestLogDao;
	
	@Override
	protected HttpRequestLogDao getDao() {
		return httpRequestLogDao;
	}

	/**查询请求日志*/
	public DataTableVO<HttpRequestLog> listAll(ListHttpRequestLogDTO dto) {
		return httpRequestLogDao.listAll(dto);
	}
	
	
}
