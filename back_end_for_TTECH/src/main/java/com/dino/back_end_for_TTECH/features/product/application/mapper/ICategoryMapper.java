package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.CategoryBody;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryData;
import com.dino.back_end_for_TTECH.features.product.domain.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ICategoryMapper {

    CategoryData toCategoryInList(Category entity);

    Category toCategory(CategoryBody dto);

    void toCategory(CategoryBody dto, @MappingTarget Category entity);
}
