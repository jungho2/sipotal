package com.seoulit;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication
@MapperScan(basePackages="com.seoulit.**.dao")
public class SeoulitApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeoulitApplication.class, args);
	}

}
