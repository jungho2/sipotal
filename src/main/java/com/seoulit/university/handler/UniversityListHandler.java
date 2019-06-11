package com.seoulit.university.handler;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.seoulit.university.service.UniversityService;

@Controller
public class UniversityListHandler {

	@Autowired
	UniversityService universityService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/universityList")
	@ResponseBody
	public List<HashMap<String, Object>> findUniversityList() {

		return universityService.findUniversityList();

	}
	
}
