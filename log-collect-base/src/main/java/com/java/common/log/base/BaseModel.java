package com.java.common.log.base;

import java.util.Date;

public class BaseModel {

	// 主键ID
	private String id;
	// 记录ID  
	private Long autoId;
	// 创建时间
	private Date createTime;
	// 平台
	private String platform;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Long getAutoId() {
		return autoId;
	}
	public void setAutoId(Long autoId) {
		this.autoId = autoId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	
	

	
}
