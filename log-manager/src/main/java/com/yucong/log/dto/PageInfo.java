package com.yucong.log.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 
 * @author 喻聪
 */
@Data
public class PageInfo {

	
	@ApiModelProperty(value = "分页页号" ,position = 1,example = "1")
	private int page = 1;  //默认为第1页
	
	@ApiModelProperty(value = "分页条数" ,position = 2,example = "20")
	private int size = 20; //默认每页大小为20
}

