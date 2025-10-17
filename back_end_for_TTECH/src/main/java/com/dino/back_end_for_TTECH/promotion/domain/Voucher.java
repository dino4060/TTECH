package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.*;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;

@Entity
@Table(name = "vouchers")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE vouchers SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@DiscriminatorValue("VOUCHER")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "promotion_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PROTECTED)
public abstract class Voucher extends Campaign {

    int validityDays;

    String discountType;

    int discountValue;

    int minSpend;

    int totalLimit;

    int clientLimit;

    int usedCount;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Map<Long, Integer> clientCount;

    String applyType;

    @OneToMany(mappedBy = "voucher", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<VoucherLine> lines;

    private boolean isWithinTotalLimit() {
        if (this.totalLimit == -1 || this.usedCount == -1)
            return true;

        return this.usedCount < this.totalLimit;
    }

    private boolean isWithinBuyerLimit(CurrentUser currentUser) {
        if (this.clientLimit == -1 || CollectionUtils.isEmpty(this.clientCount))
            return true;

        return this.clientCount.get(currentUser.id()) < this.clientLimit;
//        long count = this.usedBuyerIds.stream()
//                .filter(id -> id.equals(currentUser.id()))
//                .count();
//        return count < this.buyerLimit;
    }

    public boolean canApply(@Nullable CurrentUser currentUser) {
        if (!this.isWithinTotalLimit())
            return false;

        if (currentUser != null && !this.isWithinBuyerLimit(currentUser))
            return false;

        return super.isActive();
    }
}