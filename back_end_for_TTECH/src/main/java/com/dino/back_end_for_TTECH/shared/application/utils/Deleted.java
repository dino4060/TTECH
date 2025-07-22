package com.dino.back_end_for_TTECH.shared.application.utils;

public record Deleted(Boolean isDeleted, int count) {

    public static Deleted success(int count) {
        return new Deleted(true, count);
    }
    
    public static Deleted success() {
        return new Deleted(true, 1);
    }

    public static Deleted failure() {
        return new Deleted(false, 0);
    }
}
