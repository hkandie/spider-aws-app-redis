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
    private Double unitCost;
    @Column(name = "prodrprice")
    private Double retailPrice;
    @Column(name = "taxratecode")
    private String taxRateCode;

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

    public Double getUnitCost() {
        return unitCost;
    }

    public void setUnitCost(Double unitCost) {
        this.unitCost = unitCost;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public String getTaxRateCode() {
        return taxRateCode;
    }

    public void setTaxRateCode(String taxRateCode) {
        this.taxRateCode = taxRateCode;
    }
}
