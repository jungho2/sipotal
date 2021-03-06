package com.seoulit.emp.handler;

import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seoulit.emp.service.EmpService;

@Controller
public class EmpSearchRatingHandler {

	@Autowired
	EmpService empService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/empSearchRating")
	@ResponseBody
	public Map<String, Object> findEmpRating(@RequestBody Map<String,Object> data) throws JSONException {
		
		
		return empService.findEmpRating(data);
		
		

	}
	
}
