package com.dino.back_end_for_TTECH.features.file.application;

import com.dino.back_end_for_TTECH.features.file.application.service.IFileService;
import com.dino.back_end_for_TTECH.features.file.application.model.UploadRes;
import com.dino.back_end_for_TTECH.features.file.application.provider.IFileProvider;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FileServiceImpl implements IFileService {

    IFileProvider fileProvider;

    // COMMAND //

    // upload //
    @Override
    public UploadRes upload(MultipartFile file, String folder) {
        return this.fileProvider.upload(file, folder);
    }
}
