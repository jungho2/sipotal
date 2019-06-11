package com.seoulit.university.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UniversityDao {

	public List<HashMap<String,Object>> selectUniversityList();
	public List<HashMap<String,Object>> selectProfessorList(String uniCode);
	public void insertRating(Map<String,Object> rating);
	
}
