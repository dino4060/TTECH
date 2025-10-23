package com.dino.back_end_for_TTECH.shared.application.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class BadRequestException extends ResponseStatusException {
    public BadRequestException(HttpStatus status, String message) {
        super(status, message);
    }
}
