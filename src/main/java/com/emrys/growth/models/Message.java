/*
 
 
  .
 */
package com.emrys.growth.models;

import lombok.Builder;
import lombok.Data;


/**
 * @author HKandie
 */
@Data
@Builder
public class Message{
    String username;
    String password;
    String challenge;
}
