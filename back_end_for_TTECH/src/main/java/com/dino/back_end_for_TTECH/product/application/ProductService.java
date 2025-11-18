package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.pricing.application.PriceService;
import com.dino.back_end_for_TTECH.product.application.mapper.IProductMapper;
import com.dino.back_end_for_TTECH.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.product.application.model.ProductQuery;
import com.dino.back_end_for_TTECH.product.application.model.ProductToSell;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
import com.dino.back_end_for_TTECH.product.application.service.ISupplierService;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.repository.IProductRepository;
import com.dino.back_end_for_TTECH.product.domain.specification.ProductSpecification;
import com.dino.back_end_for_TTECH.promotion.application.model.PageData;
import com.dino.back_end_for_TTECH.promotion.application.model.PageQuery;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

// NOTE: == vs equal()
// 1. == compares on stack
// if primitive types ==   -> value on stack   -> compare values
// if reference types ==   -> address on stack -> compare addresses
// 2. equal() compares on heap
// reference types equal() -> value on heap    -> compare values

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final PriceService priceService;

    private final ICategoryService categoryService;

    private final ISupplierService supplierService;

    private final IProductRepository productRepository;

    private final IProductMapper mapper;


    // HELPERS //

    public Product getProduct(Long id) {
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
        this.priceService.create(product);
    }


    // READ //

    // LIST
    // description: to integrate pagination
    public PageData<ProductData> list(PageQuery query) {
        Page<Product> page = this.productRepository.findAll(
                this.mapper.toPageable(query));

        return this.mapper.toPageData(
                page,
                (Product product) -> this.mapper.toProductData(product));
    }

    // LIST
    // description: to integrate pagination, searching
    public AppPage<ProductToSell> list(ProductQuery query, Pageable pageable) {
        var queryable = ProductSpecification.build(query);

        var page = this.productRepository.findAll(queryable, pageable);

        var products = page.getContent().stream()
                .map(this.mapper::toProductToSell).toList();

        return AppPage.from(page, products);
    }

    // WRITE //

    public ProductData createProduct(ProductToWrite body) {
        // Map to product
        Product product = mapper.toProduct(body);

        // Refer up by product
        this.referUp(product);

        // todo1: Cascade inventory

        // Cascade allPrice
        this.priceService.create(product);

        // Create product
        product.create();
        Product saved = this.save(product);
        return mapper.toProductInList(saved);
    }

    public ProductData updateProduct(long id, ProductToWrite body) {
        var product = this.getProduct(id);
        var price = product.getPrice();
        var priceBody = this.mapper.getPriceBody(body);

        // Map to product
        this.mapper.toProduct(body, product);

        // Refer up by product
        this.referUp(product);

        // Re-calculate retail allPrice
        this.priceService.recalculate(price, priceBody);

        // todo1: Update inventory

        // Update product
        product.update();
        Product saved = this.save(product);
        return this.mapper.toProductInList(saved);
    }

    public void deleteProduct(long id) {
        Product product = this.getProduct(id);

        if (product.isInBusiness())
            throw new AppException(ErrorCode.PRODUCT__IN_BUSINESS);

        this.removeProduct(product.getId());
    }
}
