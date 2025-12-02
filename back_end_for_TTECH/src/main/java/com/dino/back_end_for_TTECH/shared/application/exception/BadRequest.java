package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class BadRequest extends ResponseStatusException {
    public BadRequest(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
