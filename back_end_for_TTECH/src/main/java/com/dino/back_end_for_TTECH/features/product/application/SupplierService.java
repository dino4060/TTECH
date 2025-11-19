package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.ISupplierMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.SupplierBody;
import com.dino.back_end_for_TTECH.features.product.application.model.SupplierData;
import com.dino.back_end_for_TTECH.features.product.domain.Supplier;
import com.dino.back_end_for_TTECH.features.product.domain.repository.ISupplierRepository;
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
public class SupplierService {

    private final ISupplierRepository supplierRepository;
    private final ISupplierMapper supplierMapper;

    // HELPERS //

    public Supplier get(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER__NOT_FOUND));
    }

    private Supplier saveSupplier(Supplier supplier) {
        try {
            return supplierRepository.save(supplier);
        } catch (Exception e) {
            throw new AppException(ErrorCode.SUPPLIER__SAVE_FAILED);
        }
    }

    private void removeSupplier(long id) {
        try {
            supplierRepository.deleteById(id);
        } catch (Exception e) {
            throw new AppException(ErrorCode.SUPPLIER__NOT_REMOVED);
        }
    }

    private void validateSupplier(Supplier supplier) {
        List<Supplier> suppliers = this.supplierRepository.findByName(supplier.getName());

        boolean conditionOfName =
                AppCheck.isEmpty(suppliers) ||
                        AppCheck.isEqual(suppliers.getFirst().getId(), supplier.getId());

        if (!conditionOfName) throw new AppException(ErrorCode.SUPPLIER__NAME_DUPLICATED);
    }

    // READ //

    @Cacheable(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public List<SupplierData> listSuppliers() {
        var suppliers = this.supplierRepository.findAll();

        return suppliers.stream()
                .map(supplierMapper::toSupplierInList)
                .sorted(Comparator.comparing(SupplierData::name))
                .toList();
    }

    // WRITE //

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SupplierData createSupplier(SupplierBody body) {
        Supplier supplier = supplierMapper.toSupplier(body);
        this.validateSupplier(supplier);
        Supplier saved = saveSupplier(supplier);
        return supplierMapper.toSupplierInList(saved);
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SupplierData updateSupplier(long id, SupplierBody body) {
        Supplier supplier = get(id);
        supplierMapper.toSupplier(body, supplier);
        this.validateSupplier(supplier);
        Supplier saved = saveSupplier(supplier);
        return supplierMapper.toSupplierInList(saved);
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public void deleteSupplier(long id) {
        Supplier supplier = get(id);
        this.removeSupplier(supplier.getId());
    }
}
