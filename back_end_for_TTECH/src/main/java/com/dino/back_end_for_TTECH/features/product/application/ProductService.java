package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.IProductMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductFull;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductQuery;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.product.domain.Stock;
import com.dino.back_end_for_TTECH.features.product.domain.model.Status;
import com.dino.back_end_for_TTECH.features.product.domain.repository.IProductRepository;
import com.dino.back_end_for_TTECH.shared.application.exception.DatabaseException;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundException;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCheck;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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

    private final StockService stockService;

    private final CategoryService categoryService;

    private final SupplierService supplierService;

    private final IProductRepository productRepository;

    private final IProductMapper mapper;


    // DOMAIN //

    public Product get(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product"));
    }

    private Product save(Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new DatabaseException("Failed to save the product.");
        }
    }

    private void remove(Long id) {
        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            throw new DatabaseException("Failed to delete the product.");
        }
    }

    private void linkParents(Product product) {
        var sid = product.getSupplier().getId();
        product.setSupplier(this.supplierService.get(sid));
        var cid = product.getCategory().getId();
        product.setCategory(this.categoryService.get(cid));
    }

    private void linkChildren(Product product) {
        this.priceService.linkCreate(product);
        this.stockService.linkCreate(product);
    }

    private void linkChildren(ProductBody writeProduct, Product product) {
        this.priceService.linkUpdate(writeProduct, product);
        this.stockService.linkUpdate(writeProduct, product);
    }

    private boolean hasParents(Product product) {
        return !product.getCartLines().isEmpty()
                || !product.getOrderLines().isEmpty()
                || !product.getSaleUnits().isEmpty()
                || !product.getVoucherUnits().isEmpty();
    }

    private void genStatus(Product product, Stock stock) {
        Status status = null;

        boolean isInit = AppCheck.isBlank(product.getStatus());
        if (isInit) status = Status.LIVE;

        boolean isOutstock = stock.getAvailable() <= 0;
        if (isOutstock) status = Status.OUTSTOCK;

        boolean isRestock = stock.getAvailable() > 0 && product.isStatus(Status.OUTSTOCK);
        if (isRestock) status = Status.LIVE;

        boolean isSet = status != null;
        if (isSet) product.writeStatus(status);
    }


    // READ //

    public PageData<ProductData> list(PageQuery query) {
        Page<Product> page = this.productRepository.findAll(
                this.mapper.toPageable(query));

        return this.mapper.toPageData(
                page,
                (Product p) -> this.mapper.toProductData(p));
    }

    public PageData<ProductFull> list(ProductQuery query) {
        var page = this.productRepository.findAll(
                this.mapper.toQueryable(query),
                this.mapper.toPageable(query));

        return this.mapper.toPageData(
                page,
                (Product p) -> this.mapper.toProductFull(p));
    }

    // WRITE //

    public ProductData create(ProductBody body) {
        // Prepare product
        Product product = mapper.toProduct(body);
        this.linkParents(product);
        this.linkChildren(product);
        this.genStatus(product, product.getStock());

        // Create product
        Product saved = this.save(product);
        return mapper.toProductData(saved);
    }

    public ProductData update(long id, ProductBody body) {
        // Prepare product
        var product = this.get(id);
        this.mapper.toProduct(body, product);
        this.linkParents(product);
        this.linkChildren(body, product);
        this.genStatus(product, product.getStock());

        // Update product
        Product saved = this.save(product);
        return this.mapper.toProductData(saved);
    }

    public void delete(long id) {
        Product product = this.get(id);
        if (!this.hasParents(product))
            throw new DatabaseException("Failed to delete the product.");

        this.remove(id);
    }
}
