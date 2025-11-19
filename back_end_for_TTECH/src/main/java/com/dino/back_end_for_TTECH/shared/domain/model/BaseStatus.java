package com.dino.back_end_for_TTECH.shared.domain.model;

public interface BaseStatus<S extends Enum<S>> {
    String getStatus();

    void setStatus(String status);

    default boolean isStatus(S status) {
        return this.getStatus().equals(status.name());
    }

    default void writeStatus(S status) {
        this.setStatus(status.name());
    }
}
