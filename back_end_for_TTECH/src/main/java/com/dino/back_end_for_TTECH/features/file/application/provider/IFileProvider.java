package com.dino.back_end_for_TTECH.file.application.provider;

import com.dino.back_end_for_TTECH.file.application.model.UploadRes;
import org.springframework.web.multipart.MultipartFile;

public interface IFileProvider {

    // COMMAND //

    UploadRes upload(MultipartFile file, String folder);
}
