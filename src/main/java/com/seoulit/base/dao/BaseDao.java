package com.seoulit.base.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BaseDao {

	public List<HashMap<String,Object>> selectMenu();
	
	public List<HashMap<String,Object>> selectRatingList();
	
	public List<HashMap<String,Object>> selectInputTypeList();

	public String selectPosition(String position);

	public String selectDept(String deptName);
	
	public List<HashMap<String,Object>> selectAuth(Map<String,Object> param);
	
}
