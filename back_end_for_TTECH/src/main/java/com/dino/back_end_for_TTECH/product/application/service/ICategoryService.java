package com.dino.back_end_for_TTECH.product.application.service;

import com.dino.back_end_for_TTECH.product.application.model.CategoryInList;
import com.dino.back_end_for_TTECH.product.application.model.CategoryToWrite;
import com.dino.back_end_for_TTECH.product.domain.Category;

import java.util.List;

public interface ICategoryService {
    Category getCategory(Long id);

    List<CategoryInList> listCategories();

    CategoryInList createCategory(CategoryToWrite body);

    CategoryInList updateCategory(long id, CategoryToWrite body);

    void deleteCategory(long id);
}
