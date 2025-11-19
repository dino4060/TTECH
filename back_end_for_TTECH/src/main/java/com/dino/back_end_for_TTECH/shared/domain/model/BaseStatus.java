package com.dino.back_end_for_TTECH.shared.domain.model;

public interface BaseStatus<S extends Enum<S>> {
    String getStatus();

    default boolean isStatus(S status) {
        return this.getStatus().equals(status.name());
    }
}
