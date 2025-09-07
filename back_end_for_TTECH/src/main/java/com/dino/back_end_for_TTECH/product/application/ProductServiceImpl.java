package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.inventory.application.service.IInventoryService;
import com.dino.back_end_for_TTECH.pricing.application.service.IPriceService;
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

    private final IInventoryService inventoryService;

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

    private Product save(Product product) {
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

    private void referUp(Product product) {
        product.setSupplier(
                this.supplierService.getSupplier(
                        product.getSupplier().getId()));

        product.setCategory(
                this.categoryService.getCategory(
                        product.getCategory().getId()));
    }

    private void buildBy(Product product) {
        this.skuService.createList(product);

        this.priceService.create(product);
    }


    // READ //

    @Override
    public AppPage<ProductInList> listProducts(Pageable pageable) {
        Page<Product> page = this.productRepository.findAll(pageable);

        List<ProductInList> products = page.getContent()
                .stream()
                .map(this.productMapper::toProductInList)
                .toList();

        return AppPage.from(page, products);
    }

    // WRITE //

    @Override
    public ProductInList createProduct(ProductToWrite body) {
        // Map to product
        Product product = productMapper.toProduct(body);

        // Refer up by product
        this.referUp(product);

        // Cascade skus
        this.skuService.createList(product);

        // Cascade price
        this.priceService.create(product);

        // Create product
        product.create();
        Product saved = this.save(product);
        return productMapper.toProductInList(saved);
    }

    @Override
    public ProductInList updateProduct(long id, ProductToWrite body) {
        var product = this.getProduct(id);
        var skus = product.getSkus();
        var skuBodies = body.skus();
        var price = product.getPrice();
        var priceBody = this.productMapper.getPriceBody(body);

        // Map to product
        this.productMapper.toProduct(body, product);

        // Refer up by product
        this.referUp(product);

        // Re-calculate retail price
        this.priceService.recalculate(price, priceBody);

        // Update skus
        this.skuService.updateList(skus, skuBodies);

        // Update product
        product.update();
        Product saved = this.save(product);
        return productMapper.toProductInList(saved);
    }

    @Override
    public void deleteProduct(long id) {
        Product product = this.getProduct(id);

        if (product.isInBusiness())
            throw new AppException(ErrorCode.PRODUCT__IN_BUSINESS);

        this.removeProduct(product.getId());
    }
}
