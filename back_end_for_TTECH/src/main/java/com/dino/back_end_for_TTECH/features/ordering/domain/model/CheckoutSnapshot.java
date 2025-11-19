package com.dino.back_end_for_TTECH.features.ordering.domain.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CheckoutSnapshot {

    // NESTED OBJECTS //

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Summary {
        int itemsPrice;
        int savings; // allDiscount voucher + shipping voucher
        int shippingFee;
        int total;   // main allPrice - allDiscount voucher + final shipping fee.

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class DiscountVoucher {
        int totalVoucher;
        int sellerVoucher;
        int platformVoucher;

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ShippingFee {
        int finalFee;
        int initialFee;
        int sellerShippingVoucher;
        int platformShippingVoucher;

    }

    // DEFAULT VALUES //

    private static final int DEFAULT_SELLER_DISCOUNT_VOUCHER = 0;
    private static final int DEFAULT_PLATFORM_DISCOUNT_VOUCHER = 0;
    private static final int DEFAULT_INITIAL_SHIPPING_FEE = 36000;
    private static final int DEFAULT_SELLER_SHIPPING_VOUCHER = 0;
    private static final int DEFAULT_PLATFORM_SHIPPING_VOUCHER = 36000;

    // PROPS //

    Summary summary;
    DiscountVoucher discountVoucher;
    ShippingFee shippingFee;

    // FACTORY METHODS //

    public static CheckoutSnapshot createEmpty() {
        return CheckoutSnapshot.builder()
                .summary(new Summary())
                .discountVoucher(new DiscountVoucher())
                .shippingFee(new ShippingFee())
                .build();
    }

    // FACTORY METHODS //

    public static CheckoutSnapshot createSnapshot(int totalMainPrice) {
        // 1. calculate units
        int shopDiscountVoucher = DEFAULT_SELLER_DISCOUNT_VOUCHER;
        int platformDiscountVoucher = DEFAULT_PLATFORM_DISCOUNT_VOUCHER;

        int initialShippingFee = DEFAULT_INITIAL_SHIPPING_FEE;
        int shopShippingVoucher = DEFAULT_SELLER_SHIPPING_VOUCHER;
        int platformShippingVoucher = DEFAULT_PLATFORM_SHIPPING_VOUCHER;

        // 2. calculate totals
        int totalDiscountVoucher = shopDiscountVoucher + platformDiscountVoucher;
        int totalShippingVoucher = shopShippingVoucher + platformShippingVoucher;
        int totalSavings = totalDiscountVoucher + totalShippingVoucher;
        int finalShippingFee = Math.max(0, initialShippingFee - totalShippingVoucher);
        int finalTotal = Math.max(0, totalMainPrice - totalDiscountVoucher + finalShippingFee);

        // 2. map to dto
        CheckoutSnapshot.Summary summary = new CheckoutSnapshot.Summary(
                totalMainPrice, totalSavings, finalShippingFee, finalTotal);
        CheckoutSnapshot.DiscountVoucher discountVoucher = new CheckoutSnapshot.DiscountVoucher(
                totalDiscountVoucher, shopDiscountVoucher, platformDiscountVoucher);
        CheckoutSnapshot.ShippingFee shippingFee = new CheckoutSnapshot.ShippingFee(
                finalShippingFee, initialShippingFee, shopShippingVoucher, platformShippingVoucher);
        return new CheckoutSnapshot(summary, discountVoucher, shippingFee);
    }

    // INSTANCE METHODS //

    // Note: DDD domain model method
    // “Behavior that is tightly coupled to the data structure
    // and meaning of a domain object should reside within that domain object.”

    public void accumulateFrom(CheckoutSnapshot other) {
        if (other == null) return;

        if (other.getSummary() != null) {
            // if (this.summary == null) this.summary = new Summary();
            this.summary.setItemsPrice(this.summary.getItemsPrice() + other.getSummary().getItemsPrice());
            this.summary.setSavings(this.summary.getSavings() + other.getSummary().getSavings());
            this.summary.setShippingFee(this.summary.getShippingFee() + other.getSummary().getShippingFee());
            this.summary.setTotal(this.summary.getTotal() + other.getSummary().getTotal());
        }

        if (other.getDiscountVoucher() != null) {
            // if (this.discountVoucher == null) this.discountVoucher = new DiscountVoucher();
            this.discountVoucher.setTotalVoucher(this.discountVoucher.getTotalVoucher() + other.getDiscountVoucher().getTotalVoucher());
            this.discountVoucher.setSellerVoucher(this.discountVoucher.getSellerVoucher() + other.getDiscountVoucher().getSellerVoucher());
            this.discountVoucher.setPlatformVoucher(this.discountVoucher.getPlatformVoucher() + other.getDiscountVoucher().getPlatformVoucher());
        }

        if (other.getShippingFee() != null) {
            // if (this.shippingFee == null) this.shippingFee = new ShippingFee();
            this.shippingFee.setFinalFee(this.shippingFee.getFinalFee() + other.getShippingFee().getFinalFee());
            this.shippingFee.setInitialFee(this.shippingFee.getInitialFee() + other.getShippingFee().getInitialFee());
            this.shippingFee.setSellerShippingVoucher(this.shippingFee.getSellerShippingVoucher() + other.getShippingFee().getSellerShippingVoucher());
            this.shippingFee.setPlatformShippingVoucher(this.shippingFee.getPlatformShippingVoucher() + other.getShippingFee().getPlatformShippingVoucher());
        }
    }
}
