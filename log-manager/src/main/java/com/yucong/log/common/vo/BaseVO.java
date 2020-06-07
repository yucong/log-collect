package com.yucong.log.common.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 公共基础VO
 *  
 * @author 喻聪
 * @date   2019-05-01
 */
@Data
public class BaseVO  {
	
	@ApiModelProperty(value = "状态码：1成功,0客户端异常，-1业务处理失败，-2token验证失败，-3签名认证失败，-99服务器异常",example = "1")
	protected int code = 1;
	@ApiModelProperty(value = "操作提示语",example = "操作成功")
	protected String message = "操作成功";
	
	public BaseVO() {
		super();
	}
	
	public BaseVO(String errMsg) {
		this.code = 0;
		this.message = errMsg;
	}
	
	public BaseVO(int code,String message) {
		this.code = code;
		this.message = message;
	}
	
}
