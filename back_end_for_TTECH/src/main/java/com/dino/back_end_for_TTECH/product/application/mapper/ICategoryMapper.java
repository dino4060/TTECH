package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.CategoryInList;
import com.dino.back_end_for_TTECH.product.application.model.CategoryToWrite;
import com.dino.back_end_for_TTECH.product.domain.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ICategoryMapper {

    CategoryInList toCategoryInList(Category entity);

    Category toCategory(CategoryToWrite dto);

    void toCategory(CategoryToWrite dto, @MappingTarget Category entity);
}
