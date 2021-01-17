package com.crm.model;

import java.net.URI;
import java.util.List;
import java.util.Locale;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.crm.exception.ContactNotFoundException;

@CrossOrigin
//@Configuration
@RestController
@RequestMapping("/api")
public class MainController {
	
	@Autowired
	private ContactDao contactdao;
	
	@Autowired
	private MessageSource messagesource;

	@RequestMapping(method=RequestMethod.GET,path="/helloworld1")
	public String  helloWorld()
	{
		return "Hello World From SpringREST server";
	}
	
	@GetMapping(path="/helloworld")
	public String  helloWorldByGet()
	{
		System.out.println("helloWorldByGet()");
		return "Hello World From SpringREST server";
	}
	
	@GetMapping(path="/contactbean")
	public Contact getContactBean()
	{
		Contact contact =new Contact(1,"sky","sky","sky@gmail.com");
		//contact.setId(1);
		return contact;
	}
	
	@GetMapping(path="/contact-bean/{name}")
	public Contact getPathVariable(@PathVariable String name)
	{

		Contact contact =new Contact(name,(name+"last"),(name+"@gmail.com"));
		contact.setId(1);
		return contact;
	}

	@GetMapping(path="/all-contact")
	public List<Contact> getPathVariable()
	{
		return contactdao.findAll();
	}
	
	@GetMapping(path="/all-contact/{id}")
	public Contact getPathVariable(@PathVariable int id) throws Exception
	{

		Contact contact = contactdao.findContact(id);
		
		if(contact == null)
			throw new ContactNotFoundException("Contact Not Found in the Repo");
			//throw new Exception("Contact Not Found in th Repo");
		return contact;
	}
	

	@PostMapping(path="/save-contact")
	public ResponseEntity<Object> saveContact(@Valid @RequestBody Contact c)
	{

		Contact contact = contactdao.save(c);
		System.out.println(contact);
		
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(contact.getId()).toUri();
		
		return ResponseEntity.created(location).build();
		
	}
	
	@DeleteMapping(path="/delete-contact/{id}")
	public void deleteContact(@PathVariable int id)
	{

		Contact contact = contactdao.delete(id);
		
		if(contact == null)
			throw new ContactNotFoundException("Contact Not Found in the Repo Not possible to Delete");
			//throw new Exception("Contact Not Found in th Repo");
		
	}

	@GetMapping(path="/i18n")  
	//public String helloWorldInternationalized(@RequestHeader(name="Accept-Language", required=false) Locale locale)   //no need after LocaleContextHolder.getLocale()
	public String helloWorldInternationalized()  
	{  
	//return messagesource.getMessage("good.morning.messsage", null, locale);
		return messagesource.getMessage("good.morning.messsage", null, LocaleContextHolder.getLocale());
	}  
	
	
	
}
