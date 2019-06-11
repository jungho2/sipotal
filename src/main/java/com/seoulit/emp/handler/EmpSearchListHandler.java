package com.seoulit.emp.handler;

import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seoulit.emp.service.EmpService;

@Controller
public class EmpSearchListHandler {

	@Autowired
	EmpService empService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/empSearchList")
	@ResponseBody
	public List<Map<String, Object>> findEmp(@RequestParam("proCode") String data) throws JSONException {
				
		return empService.findEmpSearchList(data);
			

	}
	
}
