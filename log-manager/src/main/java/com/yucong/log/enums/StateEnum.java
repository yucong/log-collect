package com.yucong.log.enums;

public enum StateEnum {

	VALID(1,"有效"),
	INVALID(2,"无效");

	
	private int code;
	private String name;
	
	StateEnum(int code,String name) {
		this.code = code;
		this.name = name;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
