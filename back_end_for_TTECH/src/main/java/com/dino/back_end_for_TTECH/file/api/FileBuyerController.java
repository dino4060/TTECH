package com.dino.back_end_for_TTECH.file.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
public class FileBuyerController {

    // PublicProductBuyerController //
    @RestController
    @RequestMapping("/api/v1/public/files")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PublicFileBuyerController {

        // COMMAND //

        // upload //

    }

}
