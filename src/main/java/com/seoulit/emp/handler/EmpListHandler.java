package com.seoulit.emp.handler;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seoulit.emp.service.EmpService;

import ch.qos.logback.core.net.SyslogOutputStream;

@Controller
public class EmpListHandler {

	@Autowired
	EmpService empService;

	@CrossOrigin("*")
	@RequestMapping("/api/v1/empList")
	@ResponseBody
	public List<HashMap<String, Object>> findEmpList() {

		// System.out.println("ss");
		return empService.findEmpList();

	}

}
