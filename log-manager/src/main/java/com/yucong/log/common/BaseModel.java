package com.yucong.log.common;

import java.util.Date;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class BaseModel {

	@ApiModelProperty(value = "主键ID",position = 1,example = "3478374837483")
	private String id;
	
	@ApiModelProperty(value = "记录ID",position = 2,example = "1")
	private Long autoId;

	@ApiModelProperty(value = "创建时间",position = 3,example = "1970-01-01 12:25:00")
	private Date createTime;
	
	@ApiModelProperty(value = "平台",position = 4,example = "后台")
	private String platform;

	
}
