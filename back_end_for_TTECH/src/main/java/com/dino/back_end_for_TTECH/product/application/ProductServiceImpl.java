package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.pricing.application.service.IPriceService;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.product.application.mapper.IProductMapper;
import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
import com.dino.back_end_for_TTECH.product.application.service.IProductService;
import com.dino.back_end_for_TTECH.product.application.service.ISkuService;
import com.dino.back_end_for_TTECH.product.application.service.ISupplierService;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.repository.IProductRepository;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

// NOTE: == vs equal()
// 1. == compares on stack
// if primitive types ==   -> value on stack   -> compare values
// if reference types ==   -> address on stack -> compare addresses
// 2. equal() compares on heap
// reference types equal() -> value on heap    -> compare values

@Service
@AllArgsConstructor
@Slf4j
public class ProductServiceImpl implements IProductService {

    private final ISkuService skuService;

    private final IPriceService priceService;

    private final ICategoryService categoryService;

    private final ISupplierService supplierService;

    private final IProductRepository productRepository;

    private final IProductMapper productMapper;

    // HELPERS //

    private Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT__NOT_FOUND));
    }

    private Product saveProduct(Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new AppException(ErrorCode.PRODUCT__SAVE_FAILED);
        }
    }

    private void removeProduct(Long id) {
        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            throw new AppException(ErrorCode.PRODUCT__NOT_REMOVED);
        }
    }

    private void validateProduct(Product product) {
        // serialNumber
        List<Product> products = this.productRepository.findBySerialNumber(product.getSerialNumber());

        boolean conditionOfSerialNumber =
                AppUtils.isEmpty(products) ||
                        AppUtils.isEqual(products.getFirst().getId(), product.getId());

        if (!conditionOfSerialNumber) throw new AppException(ErrorCode.PRODUCT__SERIAL_DUPLICATED);

        // supplier
        this.supplierService.getSupplier(product.getSupplier().getId());

        // category
        this.categoryService.getCategory(product.getCategory().getId());
    }

    private void cascadeProduct(Product product) {
        this.skuService.createSkusForProduct(product);

        this.priceService.createPriceForProduct(product);
    }


    // READ //

    @Override
    public AppPage<ProductInList> listProducts(Pageable pageable) {
        Page<Product> page = this.productRepository.findWithAll(pageable);

        List<ProductInList> products = page.getContent()
                .stream()
                .map(this.productMapper::toProductInList)
                .toList();

        return AppPage.from(page, products);
    }

    // WRITE //

    @Override
    public ProductInList createProduct(ProductToWrite body) {
        Product product = productMapper.toProduct(body);

        this.cascadeProduct(product);
        this.validateProduct(product);

        Product saved = this.saveProduct(product);
        return productMapper.toProductInList(saved);
    }

    @Override
    public ProductInList updateProduct(long id, ProductToWrite body) {
        Product product = this.getProduct(id);
        productMapper.toProduct(body, product);

        this.validateProduct(product);

        Product saved = this.saveProduct(product);
        return productMapper.toProductInList(saved);
    }

    @Override
    public void deleteProduct(long id) {
        Product product = this.getProduct(id);
        this.removeProduct(product.getId());
    }
}
