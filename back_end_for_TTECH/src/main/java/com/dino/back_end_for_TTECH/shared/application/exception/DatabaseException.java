package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DatabaseException extends ResponseStatusException {
    public DatabaseException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
