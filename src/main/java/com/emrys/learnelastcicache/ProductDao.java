package com.emrys.learnelastcicache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDao {
    @Autowired
    ProductRepository productRepository;

    @Cacheable("products")
    public List<Product> findAll() {

        return productRepository.findByProductCodeIsLessThan(10);
    }

    @Cacheable(value = "product", key = "#productCode", condition = "#notcached==true")
    public Product findById(int productCode, boolean notcached) {
        return productRepository.findById(productCode);
    }

    @CacheEvict(value = "products")
    public void invalidateProducts() {
    }

    @CachePut(value = "product", key = "#product.productCode")
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "product", key = "#productCode")
    public void delete(int productCode) {
        productRepository.deleteById(productCode);
    }
}
