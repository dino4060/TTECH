package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.product.application.mapper.ICategoryMapper;
import com.dino.back_end_for_TTECH.product.application.model.CategoryInList;
import com.dino.back_end_for_TTECH.product.application.model.CategoryToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
import com.dino.back_end_for_TTECH.product.domain.Category;
import com.dino.back_end_for_TTECH.product.domain.repository.ICategoryRepository;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CategoryServiceImpl implements ICategoryService {

    private final ICategoryRepository categoryRepository;
    private final ICategoryMapper categoryMapper;

    // HELPERS //

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY__NOT_FOUND));
    }

    private Category saveCategory(Category category) {
        try {
            return categoryRepository.save(category);
        } catch (Exception e) {
            throw new AppException(ErrorCode.CATEGORY__SAVE_FAILED);
        }
    }


    // READ //

    @Override
    @Cacheable(value = "categories", key = "'list'")
    public List<CategoryInList> listCategories() {
        var categories = this.categoryRepository.findAll();

        return categories.stream()
                .map(categoryMapper::toCategoryInList)
                .sorted(Comparator.comparingInt(CategoryInList::position))
                .toList();
    }

    // WRITE //

    @Override
    public CategoryInList createCategory(CategoryToWrite body) {
        Category category = categoryMapper.toCategory(body);
        Category saved = saveCategory(category);
        return categoryMapper.toCategoryInList(saved);
    }

    @Override
    public CategoryInList updateCategory(long id, CategoryToWrite body) {
        Category category = getCategory(id);
        categoryMapper.toCategory(body, category);
        Category saved = saveCategory(category);
        return categoryMapper.toCategoryInList(saved);
    }

    @Override
    public void deleteCategory(long id) {
        Category category = getCategory(id);
        categoryRepository.delete(category);
    }
}
