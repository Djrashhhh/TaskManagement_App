package com.taskstracking.tasksmgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;


@SpringBootApplication
@EnableWebMvc
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class,LiquibaseAutoConfiguration.class})
public class TaskManagementAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementAppApplication.class, args);

		System.out.println("Task Management Application is running...");
	}

}
