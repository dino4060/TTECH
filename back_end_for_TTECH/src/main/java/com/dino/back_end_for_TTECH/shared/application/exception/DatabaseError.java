package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DatabaseError extends ResponseStatusException {
    public DatabaseError(String model) {
        super(HttpStatus.BAD_REQUEST, "Failed to write " + model.toLowerCase() + ".");
    }
}
