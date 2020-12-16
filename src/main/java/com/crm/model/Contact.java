package com.crm.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name="contact")
public class Contact {
	
	@Id
	@GeneratedValue
	public int id;
	
	@Size(min=4)
	public String firstName;
	public String lastName;
	public String email;
	
	public Contact() {
		
	}
	
	public Contact(String firstName, String lastName,String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		
		
	}
	
	public Contact(int id,String firstName, String lastName,String email) {
		this.id=id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		
		
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Contact [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + "]";
	}
	 
	
	
	

}
