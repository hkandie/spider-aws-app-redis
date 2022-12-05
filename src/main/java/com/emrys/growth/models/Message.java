/*
 
 
  .
 */
package com.emrys.growth.models;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


/**
 * @author HKandie
 */
@Data
@Builder
public class Message{
    private List<String> message;
}
