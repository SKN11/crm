package com.crm.model;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

//import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
//@EnableSwagger2
public class SwaggerCofig {
	
	@Bean
	public Docket api()
	{
		return new Docket(DocumentationType.SWAGGER_2);
	}

	
	//Docket: A builder that is intended to be the primary interface
	//into the swagger-Spring MVC Framework. Docket provides sensible defaults and convenience methods for configuration.
}
