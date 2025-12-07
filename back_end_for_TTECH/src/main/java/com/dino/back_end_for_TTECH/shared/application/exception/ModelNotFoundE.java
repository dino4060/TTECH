package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ModelNotFoundE extends ResponseStatusException {
    public ModelNotFoundE(String model) {
        super(HttpStatus.NOT_FOUND, "Not found " + model + ".");
    }
}
