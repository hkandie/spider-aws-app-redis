package com.emrys.growth.web;


import com.emrys.growth.config.CloudConfig;
import com.emrys.growth.models.Message;
import com.emrys.growth.models.Product;
import com.emrys.growth.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @Autowired
    CloudConfig configuration;

    @RequestMapping(value = "/endpoint", method = RequestMethod.GET,
            produces = "application/json")
    @PreAuthorize("hasAuthority('SCOPE_api://products:read')")
    public ResponseEntity<Message> retrieveLimits() {
        return ResponseEntity.ok(Message.builder().message(configuration.getMessage()).build());
    }

    @RequestMapping(value = "/products", method = RequestMethod.GET,
            produces = "application/json")
    @PreAuthorize("hasAuthority('SCOPE_api://products:read')")
    public ResponseEntity<List<Product>> index() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> create(@RequestBody List<Product> patch) {
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
