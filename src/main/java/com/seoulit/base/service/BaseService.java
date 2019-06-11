package com.seoulit.base.service;

import java.util.HashMap;
import java.util.List;

public interface BaseService {

	public List<HashMap<String, Object>> findMenuList();
	public List<HashMap<String, Object>> findRatingList();
	public List<HashMap<String, Object>> findInputTypeList();
		
}
