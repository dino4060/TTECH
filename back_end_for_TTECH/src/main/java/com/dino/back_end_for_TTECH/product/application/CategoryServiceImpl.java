package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
import com.dino.back_end_for_TTECH.product.domain.Category;
import com.dino.back_end_for_TTECH.product.domain.model.CategoryProjection;
import com.dino.back_end_for_TTECH.product.domain.repository.ICategoryRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryServiceImpl implements ICategoryService {

    ICategoryRepository categoryRepository;

    // READ //
    @Override
    public List<CategoryProjection> getList() {
        List<CategoryProjection> categories = this.categoryRepository.findAllProjectedBy(
                Sort.by(Sort.Direction.ASC, "position"),
                CategoryProjection.class);
        return categories;
    }

    @Override
    public List<Category> getTree() {
        List<Category> categories = this.categoryRepository.findWithChildrenByLevel(1);

        sortChildrenRecursively(categories);

        return categories;
    }

    private void sortChildrenRecursively(List<Category> categories) {
        if (CollectionUtils.isEmpty(categories))
            return;

        categories.sort(Comparator.comparingInt(c ->
                c.getPosition() == null ? Integer.MAX_VALUE : c.getPosition()));

        for (Category category : categories)
            sortChildrenRecursively(category.getChildCategories());
    }
}
