package com.yucong.log.vo.common;

import lombok.Data;

@Data
public class ExceptionVO  {

	private int code;
	private String message;
	private int errorCode;
	private String errorMsg;

}
