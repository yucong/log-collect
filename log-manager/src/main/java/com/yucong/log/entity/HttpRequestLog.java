package com.yucong.log.entity;

import com.yucong.log.common.BaseModel;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 接口请求日志
 *
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class HttpRequestLog extends BaseModel {
	
	@ApiModelProperty(value = "用户ID",position = 5,example = "188")
	private String userId;
	
	@ApiModelProperty(value = "环境",position = 6,example = "test")
	private String env;
	
	@ApiModelProperty(value = "客户端版本", position = 7,example = "1.2.0")
	private String appVersion;
	
	@ApiModelProperty(value = "客户端类型",position = 8,example = "android")
	private String deviceType;
	
	@ApiModelProperty(value = "客户端IP",position = 9,example= "192.168.1.188")
	private String clientIP;
	
	@ApiModelProperty(value = "客户端请求URL",position = 10,example = "/httpRequestLog/list")
	private String requestUrl;
	
	@ApiModelProperty(value = "客户端方法",position = 11,example = "GET")
	private String method;
	
	@ApiModelProperty(value = "服务器ID",position = 12,example = "47.96.20.78")
	private String serverIP;
	
	@ApiModelProperty(value = "接口请求参数",position = 13)
	private String requestParam;
	
	@ApiModelProperty(value = "接口响应参数",position = 14)
    private Object responseData;

	@ApiModelProperty(value = "接口耗时",position = 15,example = "60")
 	private long consumeTime;

}
