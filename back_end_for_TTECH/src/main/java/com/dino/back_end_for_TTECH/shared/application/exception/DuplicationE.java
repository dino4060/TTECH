package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DuplicationE extends ResponseStatusException {
    public DuplicationE(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
