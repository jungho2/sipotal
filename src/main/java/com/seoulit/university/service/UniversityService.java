package com.seoulit.university.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface UniversityService {

	public List<HashMap<String, Object>> findUniversityList();
	public List<HashMap<String, Object>> findProfessorList(Map<String,Object> data);
	public void saveRating(Map<String,Object> data);
		
}
