package com.yucong.log.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class LoginDTO extends PageInfo {

	private String phone;
	private String password;
	
}
