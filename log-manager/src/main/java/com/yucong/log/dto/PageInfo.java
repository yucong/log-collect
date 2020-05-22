package com.yucong.log.dto;

import lombok.Data;

/**
 * 
 * @author 喻聪
 */
@Data
public class PageInfo {

	private int page = 1;  //默认为第1页
	private int size = 20; //默认每页大小为20
}

