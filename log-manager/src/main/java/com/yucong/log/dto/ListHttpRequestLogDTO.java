package com.yucong.log.dto;


import javax.validation.constraints.NotNull;

import com.java.util.json.FastJsonUtil;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@ApiModel(description="查询请求日志模型")
public class ListHttpRequestLogDTO extends PageInfo {

	@ApiModelProperty(value = "客户端IP",position = 3)
	private String clientIP;
	
	@ApiModelProperty(value = "请求URL",position = 4)
	private String requestUrl;
	
	// 2全部，1成功，0异常，-1业务失败，-2登陆失效，-3签名失败
	@NotNull
	@ApiModelProperty(value = "状态码：2全部，1成功， 0异常，-1业务异常，-2登录失效，-3签名失败",position = 5,example = "2")
	private Integer code = 2;
	
	@ApiModelProperty(value = "请求方法",position = 6)
	private String method;
	
	@ApiModelProperty(value = "用户ID",position = 7)
	private String userId;
	
	@ApiModelProperty(value = "设备类型",position = 8)
	private String deviceType;
	
	@ApiModelProperty(value = "平台类型",position = 9)
	private String platform;
	
	@ApiModelProperty(value = "服务器环境名称，如：test,prod,dev",position = 10)
	private String env;
	
	@ApiModelProperty(value = "开始时间",position = 11)
	private String beginTime;
	
	@ApiModelProperty(value = "结束时间",position = 12)
	private String endTime;
	
	public String toString() {
		return this.getClass().getSimpleName() + FastJsonUtil.toJson(this);
	}
}
