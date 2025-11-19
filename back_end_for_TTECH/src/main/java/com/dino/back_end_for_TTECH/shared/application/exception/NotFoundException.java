package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotFoundException extends ResponseStatusException {
    public NotFoundException(String object) {
        super(HttpStatus.NOT_FOUND, object + " not found.");
    }
}
