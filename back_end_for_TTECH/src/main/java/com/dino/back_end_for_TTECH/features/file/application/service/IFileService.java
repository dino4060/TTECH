package com.dino.back_end_for_TTECH.features.file.application.service;

import com.dino.back_end_for_TTECH.features.file.application.model.UploadRes;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

    // COMMAND //

    UploadRes upload(MultipartFile file, String folder);

}
