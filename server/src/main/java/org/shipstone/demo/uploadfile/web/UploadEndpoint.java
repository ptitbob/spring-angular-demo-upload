package org.shipstone.demo.uploadfile.web;

import org.shipstone.demo.uploadfile.domain.FileInformation;
import org.shipstone.demo.uploadfile.web.exception.UploadFileException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author François Robert
 */
@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200/")
public class UploadEndpoint {

  @GetMapping
  public String ping() {
    return "ping";
  }

  @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public ResponseEntity<FileInformation> uploadFile(
      @RequestParam("data") MultipartFile multipartFile
  ) throws UploadFileException {
    if (multipartFile == null || multipartFile.isEmpty()) {
      throw new UploadFileException();
    }
    return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
  }

}
