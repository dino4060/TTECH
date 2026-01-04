package com.dino.back_end_for_TTECH.features.promotion.domain;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "sale_units")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sale_units SET is_deleted = true WHERE unit_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaleUnit extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sale_lines_seq")
  @SequenceGenerator(name = "sale_lines_seq", allocationSize = 1)
  @Column(name = "unit_id")
  Long id;

  boolean isOn;

  int dealPrice;

  int dealPercent;

  int totalLimit;

  int usedCount = 0;

  String levelType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sale_id", updatable = false, nullable = false)
  Sale sale;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", updatable = false, nullable = false)
  Product product;
}
