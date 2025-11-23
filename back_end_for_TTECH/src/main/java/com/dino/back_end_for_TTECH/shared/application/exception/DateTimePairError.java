package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DateTimePairError extends ResponseStatusException {
    public DateTimePairError(String startField, String endField) {
        super(HttpStatus.NOT_FOUND, startField + ", " + endField + " are invalid.");
    }
}
