package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class BadRequestE extends ResponseStatusException {
    public BadRequestE(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
