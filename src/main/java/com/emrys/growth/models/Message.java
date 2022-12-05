/*
 
 
  .
 */
package com.emrys.growth.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


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
