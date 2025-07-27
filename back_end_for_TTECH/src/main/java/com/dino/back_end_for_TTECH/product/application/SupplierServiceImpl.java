package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.product.application.mapper.ISupplierMapper;
import com.dino.back_end_for_TTECH.product.application.model.SupplierInList;
import com.dino.back_end_for_TTECH.product.application.model.SupplierToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ISupplierService;
import com.dino.back_end_for_TTECH.product.domain.Supplier;
import com.dino.back_end_for_TTECH.product.domain.repository.ISupplierRepository;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheKey;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheValue;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
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
public class SupplierServiceImpl implements ISupplierService {

    private final ISupplierRepository supplierRepository;
    private final ISupplierMapper supplierMapper;

    // HELPERS //

    private Supplier getSupplier(Long id) {
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
            throw new AppException(ErrorCode.SUPPLIER__REMOVE_FAILED);
        }
    }

    private void validateSupplier(Supplier supplier) {
        List<Supplier> suppliers = this.supplierRepository.findByName(supplier.getName());
        
        boolean conditionOfName =
                AppUtils.isEmpty(suppliers)||
                        AppUtils.isEqual(suppliers.getFirst().getId(), supplier.getId());

        if (!conditionOfName) throw new AppException(ErrorCode.SUPPLIER__NAME_EXITED);
    }

    // READ //

    @Override
    @Cacheable(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public List<SupplierInList> listSuppliers() {
        var suppliers = this.supplierRepository.findAll();

        return suppliers.stream()
                .map(supplierMapper::toSupplierInList)
                .sorted(Comparator.comparing(SupplierInList::name))
                .toList();
    }

    // WRITE //

    @Override
    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SupplierInList createSupplier(SupplierToWrite body) {
        Supplier supplier = supplierMapper.toSupplier(body);
        this.validateSupplier(supplier);
        Supplier saved = saveSupplier(supplier);
        return supplierMapper.toSupplierInList(saved);
    }

    @Override
    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SupplierInList updateSupplier(long id, SupplierToWrite body) {
        Supplier supplier = getSupplier(id);
        supplierMapper.toSupplier(body, supplier);
        this.validateSupplier(supplier);
        Supplier saved = saveSupplier(supplier);
        return supplierMapper.toSupplierInList(saved);
    }

    @Override
    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public void deleteSupplier(long id) {
        Supplier supplier = getSupplier(id);
        this.removeSupplier(supplier.getId());
    }
}
