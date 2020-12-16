package com.crm.model;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ContactDao {
	
	private static List<Contact> contactList = new ArrayList<Contact>();
	
	private static int num = 4;
	
	static {
		contactList.add(new Contact(1,"euro","euro","euro@gmail.com"));
		contactList.add(new Contact(2,"duro","duro","duro@gmail.com"));
		contactList.add(new Contact(3,"hero","hero","hero@gmail.com"));
		contactList.add(new Contact(4,"zero","zero","zero@gmail.com"));
		
	}
	
	
	public List<Contact> findAll()
	{
		return contactList;
	}
	
	
	public Contact save(Contact c)
	{
		c.setId(++num);
		contactList.add(c);
		return c;
	}
	
	public Contact delete(int id)
	{
		Iterator<Contact> itr = contactList.iterator();
		
		while(itr.hasNext())
		{
			Contact c = itr.next();
			if(id == c.getId())
			{
				itr.remove();
			return c;	 
			}
			
		}
		
		return null;
	}
	
	
	
	public Contact findContact(int id)
	{

		for(Contact c:contactList)
		{
			if(c.id==id)
				return c;
		}
		
		return null;
	}

}
