package com.seoulit.emp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoulit.base.dao.BaseDao;
import com.seoulit.emp.dao.EmpDao;

@Service
public class EmpServiceImpl implements EmpService {


	@Autowired
	private EmpDao empDao;
	
	@Autowired
	private BaseDao baseDao;
	
	public List<HashMap<String,Object>> findEmpList() {
		// TODO Auto-generated method stub
		return empDao.selectEmpList();

	}

	@Override
	public HashMap<String, Object> findEmp(Map<String, Object> data) {
		// TODO Auto-generated method stub
		
		HashMap<String, Object> userInfo = new HashMap<>();
					
		
		if(empDao.selectEmp(data) != null) {
			
						
			if(empDao.selectEmp(data).get("EMP_CODE").equals(data.get("pw"))) {
				
				
				
				
				
				HashMap<String, Object> user = empDao.selectEmp(data);
				
				userInfo.put("userInfo", user);
				
				String positonCode = baseDao.selectPosition(user.get("POSITION").toString());
				
				String deptCode = baseDao.selectDept(user.get("DEPT_NAME").toString());
				
				Map<String,Object> param = new HashMap<>();
				
				param.put("positionCode",positonCode);
				param.put("deptCode",deptCode);
				
				
				List<HashMap<String, Object>> auth = baseDao.selectAuth(param);
				
				
				userInfo.put("auth", auth);
				
				userInfo.put("result", "1");
			
			} else {
				
				userInfo.put("result", "0");
				
			}
			
		} else {
			userInfo.put("result", "0");
		}
		
		return userInfo;
		
	}

	@Override
	public List<Map<String, Object>> findEmpSearchList(String data) {
		// TODO Auto-generated method stub
		return empDao.selectEmpSearchList(data);
	}

	@Override
	public Map<String, Object> findEmpRating(Map<String, Object> data) {
		// TODO Auto-generated method stub
		
		Map<String,Object> info = new HashMap<>();
		
		
		HashMap<String, Object> user = empDao.selectEmp(data);
		
		List<HashMap<String, Object>> rating = baseDao.selectRatingList();
		List<HashMap<String, Object>> input = baseDao.selectInputTypeList();
		
		
		info.put("user",user);
		info.put("ratingList",rating);
		info.put("inputList",input);
		
		
		return info;
	}
	
}
