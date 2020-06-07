package com.yucong.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yucong.log.common.vo.DataTableVO;
import com.yucong.log.dao.HttpRequestLogDao;
import com.yucong.log.dto.ListHttpRequestLogDTO;
import com.yucong.log.entity.HttpRequestLog;

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
