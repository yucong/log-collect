package com.yucong.log.entity;

import com.yucong.log.common.BaseModel;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 服务器异常日志
 *
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class ServerExceptionLog extends BaseModel  {
	
	@ApiModelProperty(value = "用户ID",position = 3,example = "188")
	private String userId;

	@ApiModelProperty(value = "环境",position = 4,example = "test")
	private String env;

	@ApiModelProperty(value = "客户端版本",position = 5,example = "1.2.0")
	private String appVersion;

	@ApiModelProperty(value = "客户端类型",position = 6,example = "android")
	private String deviceType;

	@ApiModelProperty(value = "客户端IP",position = 7,example = "192.168.1.188")
	private String clientIP;

	@ApiModelProperty(value = "请求URL",position = 8,example = "/httpRequestLog/list")
	private String requestUrl;

	@ApiModelProperty(value = "请求方法",position = 9,example = "GET")
	private String method;

	@ApiModelProperty(value = "服务端IP",position = 10,example = "47.96.20.78")
	private String serverIP;

	@ApiModelProperty(value = "请求参数",position = 11)
	private String requestParam;

	@ApiModelProperty(value = "响应参数",position = 12)
    private Object responseData;

	@ApiModelProperty(value = "异常堆栈信息",position = 13)
	private String stackTrace;

	@ApiModelProperty(value = "异常消息",position = 14)
    private String errMsg;

	@ApiModelProperty(value = "异常级别",position = 15)
    private String errLevel;
    
}
