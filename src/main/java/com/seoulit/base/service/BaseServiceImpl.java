package com.seoulit.base.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoulit.base.dao.BaseDao;

@Service
public class BaseServiceImpl implements BaseService{

	@Autowired
	private BaseDao baseDao;
	
	
	@Override
	public List<HashMap<String, Object>> findMenuList() {
		// TODO Auto-generated method stub
		return baseDao.selectMenu();
	}


	@Override
	public List<HashMap<String, Object>> findRatingList() {
		// TODO Auto-generated method stub
		return baseDao.selectRatingList();
	}


	@Override
	public List<HashMap<String, Object>> findInputTypeList() {
		// TODO Auto-generated method stub
		return baseDao.selectInputTypeList();
	}


}
