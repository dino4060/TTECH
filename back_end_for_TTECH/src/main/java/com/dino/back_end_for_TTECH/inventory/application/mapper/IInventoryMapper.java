package com.dino.back_end_for_TTECH.inventory.application.mapper;

import com.dino.back_end_for_TTECH.inventory.application.model.InventoryToWrite;
import com.dino.back_end_for_TTECH.inventory.domain.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IInventoryMapper {
    @Mapping(target = "stocks", ignore = true)
    void toInventory(InventoryToWrite dto, @MappingTarget Inventory entity);
}
