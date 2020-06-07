package com.yucong.log.dao;

import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.yucong.log.common.BaseModel;
import com.yucong.log.common.SequenceId;


public abstract class BaseDao <Entity extends BaseModel> {

	protected abstract String getCollectionName();
	
	protected abstract MongoTemplate getMongoTemplate();
	
	/**
     * 创建对象
     */
    public void save(Entity log) {
    	log.setAutoId(getNextId(log.getPlatform()));
    	getMongoTemplate().save(log,getCollectionName());
    }
    
    /**
     * 获取下一个自增ID
     */
    protected Long getNextId(String platform) {
        Query query = new Query(Criteria.where("collName").is(getCollectionName()));
        query.addCriteria(Criteria.where("deviceType").is(platform));
        Update update = new Update();
        update.inc("seqId", 1);
        FindAndModifyOptions options = new FindAndModifyOptions();
        options.upsert(true);
        options.returnNew(true);
        SequenceId seqId = getMongoTemplate().findAndModify(query, update, options, SequenceId.class);
        return seqId.getSeqId();
    }
	
}
