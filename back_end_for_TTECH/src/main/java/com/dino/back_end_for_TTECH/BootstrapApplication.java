package com.dino.back_end_for_TTECH;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BootstrapApplication {
  public static void main(String[] args) {
    SpringApplication.run(BootstrapApplication.class, args);
  }

  @GetMapping("/public/hello")
  public String hello() {
    return "Hello Trung Nhân";
  }

}
