package com.seoulit.university.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.seoulit.university.service.UniversityService;

@Controller
public class ProfessorListHandler {

	@Autowired
	UniversityService universityService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/professorList")
	@ResponseBody
	public List<HashMap<String, Object>> findProfessorList(@RequestBody Map<String,Object> data) throws JSONException {

		
		
		return universityService.findProfessorList(data);

	}
	
}
