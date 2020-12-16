package com.crm.model;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.crm.exception.ContactNotFoundException;


@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	

	
	@ExceptionHandler(Exception.class) //override method of ResponseEntityExceptionHandler class  
	public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request)  
	{  
		
		ErrorFlowManagement errorFlowMgt= new ErrorFlowManagement(new Date().toString(), ex.getMessage(), request.getDescription(false));
		
		//returning exception structure and specific status   
		return new ResponseEntity(errorFlowMgt, HttpStatus.INTERNAL_SERVER_ERROR);
		//return new ResponseEntity<ErrorFlowManagement>(errorFlowMgt, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@ExceptionHandler(ContactNotFoundException.class)  
	//override method of ResponseEntityExceptionHandler class  
	public final ResponseEntity<Object> handleUserNotFoundExceptions(ContactNotFoundException ex, WebRequest request)  
	{  
	//creating exception response structure  
		ErrorFlowManagement errorFlowMgt= new ErrorFlowManagement(new Date().toString(), ex.getMessage(), request.getDescription(false));  
	//returning exception structure and Not Found status   
	return new ResponseEntity(errorFlowMgt, HttpStatus.NOT_FOUND);  
	}  
	
	
	
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,HttpHeaders head)
	{
		System.out.println("Handling @Valid in Exception Handler");
		
		ErrorFlowManagement errorFlowMgt= new ErrorFlowManagement(new Date().toString(), "Validation Failed", ex.getBindingResult().toString());
		return new ResponseEntity(errorFlowMgt, HttpStatus.BAD_REQUEST);  
		
	}
	
	   
}
