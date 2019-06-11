package com.seoulit.base.handler;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seoulit.base.service.BaseService;

@Controller
public class InputTypeListHandler {

	@Autowired
	BaseService baseService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/inputTypeList")
	@ResponseBody
	public List<HashMap<String, Object>> findMenuList() {

		return baseService.findInputTypeList();

	}
	
}
