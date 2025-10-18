package com.dino.back_end_for_TTECH.shared.test.lazy;

import jakarta.persistence.*;
import lombok.Getter;

//@Entity
@Getter
public class ac {

    @Id
    Long id;

    String name;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY) // LAZY true
    @JoinColumn(name = "aa_id")
    aa aa;
}
