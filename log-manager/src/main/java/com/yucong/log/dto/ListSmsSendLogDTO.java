package com.yucong.log.dto;



import com.java.util.json.FastJsonUtil;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ListSmsSendLogDTO extends PageInfo {

	private String clientIP;
	private String requestUrl;
	private String method;
	private String userId;
	private String deviceType;
	
	
	public String toString() {
		return this.getClass().getSimpleName() + FastJsonUtil.toJson(this);
	}
}
