/*
 
 
  .
 */
package com.emrys.learnelastcicache;

import javax.persistence.*;
import java.io.Serializable;


/**
 * @author HKandie
 */
@Entity
@Table(name = "products")
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

    public Integer getProductCode() {
        return productCode;
    }

    public void setProductCode(Integer productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getUnitcost() {
        return unitcost;
    }

    public void setUnitcost(Double unitcost) {
        this.unitcost = unitcost;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public String getTaxratecode() {
        return taxratecode;
    }

    public void setTaxratecode(String taxratecode) {
        this.taxratecode = taxratecode;
    }
}
