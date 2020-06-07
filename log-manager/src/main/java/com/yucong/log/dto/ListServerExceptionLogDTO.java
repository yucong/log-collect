package com.yucong.log.dto;



import com.java.util.json.FastJsonUtil;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ListServerExceptionLogDTO extends PageInfo {

	@ApiModelProperty(value = "客户端IP")
	private String clientIP;
	
	@ApiModelProperty(value = "请求URL")
	private String requestUrl;
	
	@ApiModelProperty(value = "请求方法")
	private String method;
	
	@ApiModelProperty(value = "平台类型")
	private String platform;
	
	@ApiModelProperty(value = "服务器环境名称，如：test,prod,dev")
	private String env;
	
	@ApiModelProperty(value = "用户ID")
	private String userId;
	
	@ApiModelProperty(value = "设备类型")
	private String deviceType;
	
	
	public String toString() {
		return this.getClass().getSimpleName() + FastJsonUtil.toJson(this);
	}
}
