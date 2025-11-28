package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.ProductMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductFull;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductQuery;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.product.domain.Stock;
import com.dino.back_end_for_TTECH.features.product.domain.model.Status;
import com.dino.back_end_for_TTECH.features.product.domain.repository.ProductRepository;
import com.dino.back_end_for_TTECH.features.promotion.domain.SaleUnit;
import com.dino.back_end_for_TTECH.shared.application.exception.BadRequestException;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundError;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCheck;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;

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

    private final SeriesService supplierService;

    private final ProductRepository productRepository;

    private final ProductMapper mapper;


    // DOMAIN //

    public Product get(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundError("Product"));
    }

    private void linkParents(Product product) {
        var sid = product.getSeries().getId();
        product.setSeries(this.supplierService.get(sid));

        var cid = product.getCategory().getId();
        product.setCategory(this.categoryService.get(cid));
    }

    private void linkCreateChildren(ProductBody body, Product product) {
        var price = product.getPrice();
        price.setProduct(product);
        this.priceService.create(body.price(), price);

        var stock = product.getStock();
        stock.setProduct(product);
        this.stockService.create(body.stock(), stock);
    }

    private void linkUpdateChildren(ProductBody body, Product product) {
        this.priceService.recalculate(body.price(), product.getPrice());
        this.stockService.restock(body.stock(), product.getStock());
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

        boolean isRestock = stock.getAvailable() > 0 && (
                product.hasStatus(null) || product.hasStatus(Status.OUTSTOCK));
        if (isRestock) status = Status.LIVE;

        boolean isSet = status != null;
        if (isSet) product.setStatus(status);
    }


    // READ //

    public PageData<ProductFull> list(ProductQuery query) {
        var page = this.productRepository.findAll(
                this.mapper.toQueryable(query),
                this.mapper.toPageable(query));

        return this.mapper.toPageData(
                page, (Product p) -> this.mapper.toProductFull(p));
    }

    // WRITE //

    public ProductData create(ProductBody body) {
        // Prepare product
        Product product = mapper.toProduct(body);
        this.linkParents(product);
        this.linkCreateChildren(body, product);
        this.genStatus(product, product.getStock());

        // Create product
        Product saved = productRepository.save(product);
        return mapper.toProductData(saved);
    }

    public ProductData update(long id, ProductBody body) {
        // Prepare product
        var product = this.get(id);
        this.mapper.toProduct(body, product);
        this.linkParents(product);
        this.linkUpdateChildren(body, product);
        this.genStatus(product, product.getStock());

        // Update product
        Product saved = productRepository.save(product);
        return this.mapper.toProductData(saved);
    }

    public void delete(long id) {
        Product product = this.get(id);
        if (!this.hasParents(product))
            throw new BadRequestException("The product is on sale");

        this.productRepository.delete(product);
    }

    @Transactional
    public void applySaleUnit(SaleUnit unit) {
        // turn off all old sale units
        unit.getProduct().getSaleUnits().forEach(u -> {
            u.setOn(u.equals(unit));
        });

        // apply the new sale unit
        var price = unit.getProduct().getPrice();
        price.setMainPrice(unit.getDealPrice());
        price.setSidePrice(price.getRetailPrice());
        price.setDealPercent(unit.getDealPercent());

        this.productRepository.save(unit.getProduct());
    }

    @Transactional
    public void revertRetailPrice(Product product) {
        var price = product.getPrice();
        price.setMainPrice(price.getRetailPrice());
        price.setSidePrice(0);
        price.setDealPercent(0);

        this.productRepository.save(product);
    }


    @Transactional
    public void cancelSaleUnit(SaleUnit unit) {
        if (!unit.isOn()) return;

        Product product = unit.getProduct();

        var ONGOING = com.dino.back_end_for_TTECH.features.promotion.domain.model.Status.ONGOING;
        SaleUnit nextUnit = product.getSaleUnits().stream()
                .filter(u -> !u.getId().equals(unit.getId()))
                // sale is in ONGOING
                .filter(u -> u.getSale().hasStatus(ONGOING))
                //  limit is unlimited or available
                .filter(u -> (u.getTotalLimit() == 0) || ((u.getTotalLimit() - u.getUsedCount()) > 0))
                // Get newest
                .max(Comparator.comparing(SaleUnit::getCreatedAt))
                .orElse(null);


        // apply next sale unit or revert to original price
        if (nextUnit != null){
            var sale = nextUnit.getSale();
            applySaleUnit(nextUnit);
        }
        else this.revertRetailPrice(product);
    }

    @Transactional
    public void cancelSaleUnit(Product product) {

        var ONGOING = com.dino.back_end_for_TTECH.features.promotion.domain.model.Status.ONGOING;
        SaleUnit nextUnit = product.getSaleUnits().stream()
                // .filter(u -> !u.getId().equals(unit.getId()))
                // sale is in ONGOING
                .filter(u -> u.getSale().hasStatus(ONGOING))
                //  limit is unlimited or available
                .filter(u -> (u.getTotalLimit() == 0) || ((u.getTotalLimit() - u.getUsedCount()) > 0))
                // Get newest
                .max(Comparator.comparing(SaleUnit::getCreatedAt))
                .orElse(null);


        // apply next sale unit or revert to original price
        if (nextUnit != null){
            var sale = nextUnit.getSale();
            applySaleUnit(nextUnit);
        }
        else this.revertRetailPrice(product);
    }
}
