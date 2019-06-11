package com.seoulit.university.handler;

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
public class RatingSaveHandler {

	@Autowired
	UniversityService universityService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/ratingSave")
	@ResponseBody
	public int saveRating(@RequestBody Map<String,Object> data) throws JSONException{

		int result = 0;
		
		try {
			
			universityService.saveRating(data);
			
			result = 1;
			
		}catch(Exception e) {
			
			System.out.println(e.getMessage());
			result = 0;
			
		}
		
		
		return result;

	}
	
}
