package com.crm.model;

import java.util.Locale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;


@SpringBootApplication
public class ReactAndSpringApplication {

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SpringApplication.run(ReactAndSpringApplication.class, args);

	}

	@Bean
	public LocaleResolver localeResolver()
	{
		//SessionLocaleResolver localeResolver = new SessionLocaleResolver();
		AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
		localeResolver.setDefaultLocale(Locale.US);
		return localeResolver;
	}
	
	//put logging.level.org.springframework=info  
	//spring.messages.basename=messages   in properties file in plcae of below mwthod
//	@Bean  
//	public ResourceBundleMessageSource messageSource()  
//	{  
//	ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();  
//	messageSource.setBasename("messages");  
//	return messageSource;  
//	}  
	
	
	
}
