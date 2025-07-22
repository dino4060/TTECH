package com.dino.back_end_for_TTECH.product.application.service;

import com.dino.back_end_for_TTECH.product.domain.model.CategoryProjection;
import com.dino.back_end_for_TTECH.product.domain.Category;

import java.util.List;

public interface ICategoryService {
    // READ //
    List<CategoryProjection> getList();

    List<Category> getTree();
}
