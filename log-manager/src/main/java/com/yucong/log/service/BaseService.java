package com.yucong.log.service;

import java.util.Date;

import com.java.common.log.base.BaseModel;
import com.yucong.log.dao.BaseDao;


public abstract class BaseService<Entity extends BaseModel,Dao extends BaseDao<Entity>> {

	protected abstract Dao getDao();
	
	/**
	 * 添加
	 * 
	 * @author 喻聪
	 * @date   2018-01-25
	 */
	public void add(Entity entity) {
		entity.setCreateTime(new Date());
		getDao().save(entity);
	}
}
