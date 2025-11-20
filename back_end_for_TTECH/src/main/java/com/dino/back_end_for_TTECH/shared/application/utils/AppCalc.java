package com.dino.back_end_for_TTECH.shared.application.utils;

public class AppCalc {
    public static int partOfPercent(int percent, int total) {
        return total * (percent / 100);
    }

    public static int percentOfPart(int part, int total) {
        return (1 - part / total) * 100;
    }
}
