package com.yucong.log.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ListMyMenuDTO {

	@NotNull(message = "用户ID必填")
	private Integer userId;
}
