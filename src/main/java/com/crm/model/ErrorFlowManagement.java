package com.crm.model;

public class ErrorFlowManagement {

	
	private String timestamp;
	
	private String message;
	
	private String detail;
	
	

	

	public String getTimestamp() {
		return timestamp;
	}





	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}





	public String getMessage() {
		return message;
	}





	public void setMessage(String message) {
		this.message = message;
	}





	public String getDetail() {
		return detail;
	}





	public void setDetail(String detail) {
		this.detail = detail;
	}





	public ErrorFlowManagement(String timestamp, String message, String detail) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.detail = detail;
	}





	@Override
	public String toString() {
		return "ErrorFlowManagement..."+System.lineSeparator()
		+"timestamp=" + timestamp +System.lineSeparator()
		+ ", message=" + message +System.lineSeparator()+
		", detail=" + detail+System.lineSeparator();
	}
	
	
	
	
}
