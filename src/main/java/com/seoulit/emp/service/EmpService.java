package com.seoulit.emp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface EmpService {

	public List<HashMap<String,Object>> findEmpList();
	
	public Map<String,Object> findEmp(Map<String, Object> data);
	
	public Map<String,Object> findEmpRating(Map<String, Object> data);
	
	public List<Map<String,Object>> findEmpSearchList(String data);
	
}
