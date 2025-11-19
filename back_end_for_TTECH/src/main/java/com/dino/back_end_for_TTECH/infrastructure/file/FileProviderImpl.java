package com.dino.back_end_for_TTECH.infrastructure.file;

import com.dino.back_end_for_TTECH.infrastructure.common.Env;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.features.file.application.model.UploadRes;
import com.dino.back_end_for_TTECH.features.file.application.provider.IFileProvider;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FileProviderImpl implements IFileProvider {

    Env env;

    List<String> allowedExtensions = Arrays.asList("pdf", "jpg", "jpeg", "png", "doc", "docx");

    // COMMAND //

    // upload //
    @Override
    public UploadRes upload(MultipartFile file, String folder) {
        // validate
        this.validateFile(file);
        // create a directory if not exist
        this.createDirectory(folder);
        // store file
        String fileName = this.storeFile(file, folder);

        return UploadRes.builder()
                .isUploaded(true)
                .fileName(fileName)
                .uploadedAt(Instant.now())
                .build();
    }

    // FILE//
    private void validateFile(MultipartFile file) {
        // check not empty
        if (file == null || file.isEmpty())
            throw new AppException(ErrorCode.FILE__EMPTY);

        // check in extensions
        boolean isInExt = allowedExtensions
                .stream()
                .anyMatch(e -> Objects.requireNonNull(file.getOriginalFilename()).toLowerCase().endsWith("." + e));
        if (!isInExt)
            throw new AppException(ErrorCode.FILE__OUT_EXTENSIONS);
        // todo: check other cases more
    }

    private String storeFile(MultipartFile file, String folder) {
        // create a filename
        String fileName = System.currentTimeMillis()
                + "-"
                + Objects.requireNonNull(file.getOriginalFilename())
                        .toLowerCase()
                        .replace(" ", "-")
                        .replace("_", "-")
                        .replaceAll("[^a-zA-Z0-9-.]", "x") // not az AZ 09 -
                        .replaceAll("[^\\p{ASCII}]", "x") // not ASCII

        ;
        // create a file uri/path
        URI uri;
        try {
            uri = new URI(this.env.FILE_LOCATION + "/" + folder + "/" + fileName);
        } catch (URISyntaxException e) {
            throw new AppException(ErrorCode.FILE__CREATE_PATH);
        }
        final Path path = Paths.get(uri);
        // stream the file
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new AppException(ErrorCode.FILE__STREAM);
        }
        return fileName;
    }

    // DIRECTORY//
    private void createDirectory(String folder) {
        // create a folder Uri (a link to folder which has the protocol "file:///"
        URI uri;
        try {
            uri = new URI(this.env.FILE_LOCATION + "/" + folder);
        } catch (URISyntaxException e) {
            throw new AppException(ErrorCode.FILE__CREATE_FOLDER);
        }
        // create a folder Path (use uri)
        Path path = Paths.get(uri);
        // create Directory
        File tempDir = new File(path.toString());
        if (!tempDir.isDirectory()) {
            try {
                Files.createDirectory(tempDir.toPath());
                log.info("SSHOP MEDIA: CREATE NEW DIRECTORY SUCCESSFULLY, PATH = {}", tempDir.toPath());
            } catch (IOException e) {
                throw new AppException(ErrorCode.FILE__CREATE_DIRECTORY);
            }
        } else
            log.info("SSHOP MEDIA: THE DIRECTORY ALREADY EXISTS");
    }
}
