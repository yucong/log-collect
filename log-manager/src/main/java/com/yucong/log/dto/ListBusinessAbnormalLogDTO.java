package com.yucong.log.dto;


import com.java.util.json.FastJsonUtil;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@ApiModel(description="查询异常日志模型")
public class ListBusinessAbnormalLogDTO extends PageInfo {

	@ApiModelProperty(value = "客户端IP")
	private String clientIP;
	
	@ApiModelProperty(value = "请求URL")
	private String requestUrl;
	
	@ApiModelProperty(value = "请求的方法，如：POST")
	private String method;
	@ApiModelProperty(value = "用户ID")
	private String userId;
	@ApiModelProperty(value = "设备类型")
	private String deviceType;
	
	public String toString() {
		return this.getClass().getSimpleName() + FastJsonUtil.toJson(this);
	}
}
