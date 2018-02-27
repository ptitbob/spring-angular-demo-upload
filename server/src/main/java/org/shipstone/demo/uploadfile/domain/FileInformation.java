package org.shipstone.demo.uploadfile.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author François Robert
 */
@Data @NoArgsConstructor @AllArgsConstructor
public class FileInformation {

  private String filename;

  private long size;

}
