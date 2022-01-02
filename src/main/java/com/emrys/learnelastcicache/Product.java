/*
 
 
  .
 */
package com.emrys.learnelastcicache;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


/**
 * @author HKandie
 */
@Entity
@Table(name = "products")
@Getter
@Setter
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "productcode")
    private Integer productCode;
    @Basic(optional = false)
    @Column(name = "productname")
    private String productName;
    @Column(name = "unitcost")
    private Double unitcost;
    @Column(name = "prodrprice")
    private Double retailPrice;
    @Column(name = "taxratecode")
    private String taxratecode;

    public Product() {
    }

}
