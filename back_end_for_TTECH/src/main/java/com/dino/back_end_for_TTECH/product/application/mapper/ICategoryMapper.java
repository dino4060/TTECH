package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.*;
import com.dino.back_end_for_TTECH.product.domain.Category;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.model.ProductItemView;
import com.dino.back_end_for_TTECH.product.domain.model.ProductProjection;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ICategoryMapper {

    CategoryInList toCategoryInList(Category entity);

    Category toCategory(CategoryToWrite dto);

    void toCategory(CategoryToWrite dto, @MappingTarget Category entity);
}
