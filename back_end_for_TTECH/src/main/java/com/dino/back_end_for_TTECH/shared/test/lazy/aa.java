package com.dino.back_end_for_TTECH.shared.test.lazy;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;

//@Entity
@Getter
public class aa {

    @Id
    Long id;

    String name;

    @OneToOne(mappedBy = "aa", fetch = FetchType.LAZY) // LAZY false
    ab ab;

    @OneToOne(mappedBy = "aa", fetch = FetchType.LAZY) // LAZY false
    ac ac;
}
