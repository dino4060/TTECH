package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.SupplierBody;
import com.dino.back_end_for_TTECH.product.application.model.SupplierData;
import com.dino.back_end_for_TTECH.product.domain.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ISupplierMapper {

    SupplierData toSupplierInList(Supplier entity);

    Supplier toSupplier(SupplierBody dto);

    void toSupplier(SupplierBody dto, @MappingTarget Supplier entity);
}
