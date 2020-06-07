package com.yucong.log.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.yucong.log.common.vo.DataTableVO;
import com.yucong.log.dto.ListBusinessAbnormalLogDTO;
import com.yucong.log.entity.BusinessAbnormalLog;

@Component
public class BusinessAbnormalLogDao extends BaseDao<BusinessAbnormalLog> {
	
	private static final String COLLECTION_NAME = "businessAbnormalLog";
	
	@Autowired
    private MongoTemplate mongoTemplate;
	
	@Override
	protected MongoTemplate  getMongoTemplate() {
		return mongoTemplate;
	}
	
	@Override
	protected String getCollectionName() {
		return COLLECTION_NAME;
	}

    
    /**
     * 查询所有日志:模糊查询，分页，排序
     * 
     * @date 2018-03-09
     */
	public DataTableVO<BusinessAbnormalLog> listAll(ListBusinessAbnormalLogDTO dto) {
    	
    	int currentPage = dto.getPage();
        int size = dto.getSize();
        int skip = (currentPage - 1) * size;
        
    	Query query = new Query();
     	query.skip(skip);
     	query.limit(dto.getSize());
     	query.with(new Sort(Direction.DESC,"createTime") );
    	
    	Query queryAll = new Query();
    	/*if(!StringUtil.isEmpty(dto.getIp())) {
    		query.addCriteria(Criteria.where("clientIP").regex("^.*" + dto.getUrl() + ".*$"));
    		queryAll.addCriteria(Criteria.where("clientIP").regex("^.*" + dto.getUrl() + ".*$")); 
    	}
    	if(!StringUtil.isEmpty(dto.getUrl())) {
    		query.addCriteria(Criteria.where("requestUrl").regex("^.*" + dto.getUrl() + ".*$"));
    		queryAll.addCriteria(Criteria.where("requestUrl").regex("^.*" + dto.getUrl() + ".*$"));
    	}
    	if(!StringUtil.isEmpty(dto.getMethod())) {
    		query.addCriteria(Criteria.where("method").is(dto.getMethod()));
    		queryAll.addCriteria(Criteria.where("method").is(dto.getMethod()));
    	}
    	if(dto.getCode() != null && dto.getCode() > -1) {
    		query.addCriteria(Criteria.where("responseData.code").is(dto.getCode()));
    		queryAll.addCriteria(Criteria.where("responseData.code").is(dto.getCode()));
    	}*/
    	
    	int allCount = new Long(mongoTemplate.count(queryAll, COLLECTION_NAME)).intValue();//获取所有的count
        int allPage = allCount % size == 0 ? allCount / size : allCount / size + 1;
        List<BusinessAbnormalLog> list = mongoTemplate.find(query, BusinessAbnormalLog.class,COLLECTION_NAME);
    	return new DataTableVO<BusinessAbnormalLog>(size, allCount, allPage, currentPage, list);
    }
   
    
}
