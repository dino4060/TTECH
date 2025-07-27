package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.SupplierInList;
import com.dino.back_end_for_TTECH.product.application.model.SupplierToWrite;
import com.dino.back_end_for_TTECH.product.domain.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ISupplierMapper {

    SupplierInList toSupplierInList(Supplier entity);

    Supplier toSupplier(SupplierToWrite dto);

    void toSupplier(SupplierToWrite dto, @MappingTarget Supplier entity);
}
