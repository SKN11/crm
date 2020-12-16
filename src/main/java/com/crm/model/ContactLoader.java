package com.crm.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ContactLoader implements CommandLineRunner {
	
	private final ContactRepository repository;
	
	@Autowired
	public ContactLoader(ContactRepository repository) {
		// TODO Auto-generated constructor stub
		this.repository = repository;
	}
	
	@Override
	public void run(String... str)
	{
		this.repository.save(new Contact("sameer","khan","skn@gmail.com"));
		//System.out.println(th);
	}

}
