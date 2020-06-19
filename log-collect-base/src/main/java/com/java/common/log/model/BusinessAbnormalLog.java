package com.java.common.log.model;

/**
 * 业务异常日志
 * 
 * @time
 */
public class BusinessAbnormalLog  {
	
	// 用户ID
	private String userId;
	// 问题描述
	private String description;
	// 可能原因
	private String probableCause;
	// 环境
	private String env;
	// 级别
	private String level;

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getProbableCause() {
		return probableCause;
	}
	public void setProbableCause(String probableCause) {
		this.probableCause = probableCause;
	}
	public String getEnv() {
		return env;
	}
	public void setEnv(String env) {
		this.env = env;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	
	

	

}
