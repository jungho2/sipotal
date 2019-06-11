package com.seoulit.university.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoulit.emp.dao.EmpDao;
import com.seoulit.university.dao.UniversityDao;

@Service
public class UniversityServiceImpl implements UniversityService{

	@Autowired
	private UniversityDao universityDao;
	
	@Autowired
	private EmpDao empDao;
	
	
	@Override
	public List<HashMap<String, Object>> findUniversityList() {
		// TODO Auto-generated method stub
		return universityDao.selectUniversityList();
	}


	@Override
	public List<HashMap<String, Object>> findProfessorList(Map<String,Object> data) {
		// TODO Auto-generated method stub
		
		String uniCode = data.get("uniCode").toString();
		
		return universityDao.selectProfessorList(uniCode);
	}


	@Override
	public void saveRating(Map<String, Object> data) {
		// TODO Auto-generated method stub
		
		
		@SuppressWarnings("unchecked")
		List<Object> list =(List<Object>)data.get("ratingList");
		
		
		for(Object rating : list) {
			@SuppressWarnings("unchecked")
			Map<String,Object> map=(Map<String,Object>)rating;
			
			map.put("empCode", data.get("empCode"));
			map.put("empName", data.get("empName"));
			map.put("gisuS", data.get("gisuS"));
			
			universityDao.insertRating(map);
			
		}
		
		empDao.updateEmpRating(data.get("empCode").toString());
		
		
		
	}




}
