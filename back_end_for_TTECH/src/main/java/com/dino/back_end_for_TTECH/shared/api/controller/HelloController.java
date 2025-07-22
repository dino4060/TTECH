package com.dino.back_end_for_TTECH.shared.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping
    public String hello() {
        return "Hello Dino 😍";
    }
}
