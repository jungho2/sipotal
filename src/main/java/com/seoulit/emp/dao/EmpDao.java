package com.seoulit.emp.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmpDao {

	public List<HashMap<String,Object>> selectEmpList();
	
	public HashMap<String,Object> selectEmp(Map<String, Object> data);
	
	public List<Map<String,Object>> selectEmpSearchList(String data);
	
	public void updateEmpRating(String empCode);
	
	
}
