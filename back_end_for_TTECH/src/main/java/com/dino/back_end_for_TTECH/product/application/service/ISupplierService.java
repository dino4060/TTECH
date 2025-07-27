package com.dino.back_end_for_TTECH.product.application.service;

import com.dino.back_end_for_TTECH.product.application.model.SupplierInList;
import com.dino.back_end_for_TTECH.product.application.model.SupplierToWrite;

import java.util.List;

public interface ISupplierService {
    // READ //
    List<SupplierInList> listSuppliers();

    // WRITE //
    SupplierInList createSupplier(SupplierToWrite body);

    SupplierInList updateSupplier(long id, SupplierToWrite body);

    void deleteSupplier(long id);
}
