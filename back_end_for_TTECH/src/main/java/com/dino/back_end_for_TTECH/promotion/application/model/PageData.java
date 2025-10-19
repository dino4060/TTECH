package com.dino.back_end_for_TTECH.promotion.application.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageData<T> {
    private int totalPages;
    private int totalItems;
    private int page;
    private int size;
    private List<T> items = new ArrayList<>();
}
