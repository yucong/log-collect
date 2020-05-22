package com.yucong.log.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.yucong.log.constants.Env;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;



/**
 * 
 * 成功运行项目后，可通过swagger管理界面查看API接口：
 * http://localhost:9002/log/swagger-ui.html
 *
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
 

	@Bean
	public Docket api() {
		if(Env.isProduct) {
			return new Docket(DocumentationType.SWAGGER_2)
					.apiInfo(apiInfo())
					.select()
	                .apis(RequestHandlerSelectors.basePackage("comm"))//controller路径
					.paths(PathSelectors.any())
					.build();
		} else {
			return new Docket(DocumentationType.SWAGGER_2)
					.apiInfo(apiInfoTest())
					.select()
	                .apis(RequestHandlerSelectors.basePackage("com.yucong.log.controller"))//controller路径
					.paths(PathSelectors.any())
					.build();
		}
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().build();
	}

	private ApiInfo apiInfoTest() {
		return new ApiInfoBuilder()
				.title("日志系统接口(BM LOG API)")
				.description("官网：http://192.168.0.11:8080/web_official/")
				.version("1.0")
				.build();
	}



	
}
