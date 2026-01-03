package com.dino.back_end_for_TTECH.shared.test.lazy;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/v1/public/test")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestLazyApi {

  // AaRepo aaRepo;
  // AbRepo abRepo;
  // AcRepo acRepo;
  //
  // @GetMapping("/lazy/find")
  // @SuppressWarnings("unused")
  // public ResponseEntity<Object> test1() {
  // System.out.println(1);
  // var aa = this.aaRepo.findById(1L); // eager
  // System.out.println(2);
  // System.out.println(3);
  // var ab = this.abRepo.findById(2L); // lazy
  // System.out.println(4);
  // System.out.println(5);
  // var ac = this.acRepo.findById(3L); // lazy
  // System.out.println(6);
  // return ResponseEntity.ok("completed");
  // }
  //
  // @GetMapping("/lazy/method")
  // public ResponseEntity<Object> test2() {
  // System.out.println(1);
  // var ab = this.abRepo.findById(2L).get();
  // System.out.println(2);
  // ab.getAa(); // lazy
  // System.out.println(3);
  // System.out.println(ab.getAa().getId()); // lazy
  // System.out.println(4);
  // System.out.println(ab.getAa().getName()); // eager
  // System.out.println(5);
  // var ac = this.acRepo.findById(3L).get();
  // System.out.println(6);
  // ac.getAa(); // lazy
  // System.out.println(7);
  // System.out.println(ac.getAa().getId()); // lazy
  // System.out.println(8);
  // System.out.println(ac.getAa().getName()); // eager
  // System.out.println(9);
  // return ResponseEntity.ok("completed");
  // }

}