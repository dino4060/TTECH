package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.ICategoryMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryData;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryBody;
import com.dino.back_end_for_TTECH.features.product.domain.Category;
import com.dino.back_end_for_TTECH.features.product.domain.repository.ICategoryRepository;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheKey;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheValue;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCheck;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CategoryService {

    private final ICategoryRepository categoryRepository;
    private final ICategoryMapper categoryMapper;

    // HELPERS //

    public Category get(Long id) {
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

    private void removeCategory(long id) {
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            throw new AppException(ErrorCode.CATEGORY__NOT_REMOVED);
        }
    }

    private void validateCategory(Category category) {
        List<Category> categories = this.categoryRepository.findByName(category.getName());

        boolean conditionOfName =
                AppCheck.isEmpty(categories) ||
                        AppCheck.isEqual(categories.getFirst().getId(), category.getId());

        if (!conditionOfName) throw new AppException(ErrorCode.CATEGORY__NAME_DUPLICATED);
    }


    // READ //

    @Cacheable(value = CacheValue.CATEGORIES, key = CacheKey.LIST)
    public List<CategoryData> listCategories() {
        var categories = this.categoryRepository.findAll();

        return categories.stream()
                .map(categoryMapper::toCategoryInList)
                .sorted(Comparator.comparingInt(CategoryData::position))
                .toList();
    }

    // WRITE //

    @CacheEvict(value = CacheValue.CATEGORIES, key = CacheKey.LIST)
    public CategoryData createCategory(CategoryBody body) {
        Category category = categoryMapper.toCategory(body);
        this.validateCategory(category);
        Category saved = saveCategory(category);
        return categoryMapper.toCategoryInList(saved);
    }

    @CacheEvict(value = CacheValue.CATEGORIES, key = CacheKey.LIST)
    public CategoryData updateCategory(long id, CategoryBody body) {
        Category category = get(id);
        categoryMapper.toCategory(body, category);
        this.validateCategory(category);
        Category saved = saveCategory(category);
        return categoryMapper.toCategoryInList(saved);
    }

    @CacheEvict(value = CacheValue.CATEGORIES, key = CacheKey.LIST)
    public void deleteCategory(long id) {
        Category category = get(id);
        this.removeCategory(category.getId());
    }
}
