package com.emrys.learnelastcicache;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author HKandie
 */
@RestController
@RequestMapping("/api")
public class ProductController {

    public static Logger logger = LogManager.getLogger();

    @Autowired
    ProductService productService;

    @RequestMapping(value = "/products", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    List<Product> index() {
        return productService.getProducts();
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> create( @RequestBody List<Product> patch) {
        productService.createProduct(patch);
        return ResponseEntity.ok("");
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    Product getProductById(@PathVariable("id") int id) {
        return productService.getProductById(id);
    }


    @RequestMapping(value = "/products/{id}", method = RequestMethod.PATCH, produces = "application/json")
    public ResponseEntity<Product> update(@PathVariable("id") int id, @RequestBody Product patch) {
        return ResponseEntity.ok(productService.updateProduct(id, patch));
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public void delete(@PathVariable("id") int id) {
        productService.deleteProductById(id);
    }

}
