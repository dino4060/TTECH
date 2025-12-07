package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ModelDuplicatedE extends ResponseStatusException {
    public ModelDuplicatedE(String model) {
        super(HttpStatus.NOT_FOUND, model + " already exists.");
    }
}
