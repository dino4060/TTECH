package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.SupplierBody;
import com.dino.back_end_for_TTECH.features.product.application.model.SupplierData;
import com.dino.back_end_for_TTECH.features.product.domain.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SupplierMapper {

    SupplierData toSupplierData(Supplier model);

    Supplier toSupplier(SupplierBody body);

    void toSupplier(SupplierBody body, @MappingTarget Supplier model);
}
