package com.emrys.learnelastcicache;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ProductService {
    public static Logger logger = LogManager.getLogger();
    @Autowired
    ProductDao productDao;

    public Product updateProduct(int id, @RequestBody Product patch) {
        DateTime start = new DateTime();
        logger.info("ID: " + id);
        Product patched = productDao.findById(id, false);
        patched.setProductName(patch.getProductName());
        patched.setRetailPrice(patch.getRetailPrice());
        Product n = productDao.save(patched);
        DateTime end = new DateTime();
        Duration duration = new Duration(start, end);
        logger.info("Took By ID: " + duration.getMillis());
        productDao.invalidateProducts();
        return n;
    }

    public void createProduct( List<Product> patch) {
        DateTime start = new DateTime();
        patch.stream().forEach((k)->{
            logger.info("Took By ID: " + k);
            Product n = productDao.save(k);
            DateTime end = new DateTime();
            Duration duration = new Duration(start, end);
            logger.info("Took By ID: " + duration.getMillis());
            productDao.invalidateProducts();
        });
    }

    public List<Product> getProducts() {
        DateTime start = new DateTime();
        List<Product> products = productDao.findAll();
        DateTime end = new DateTime();
        Duration duration = new Duration(start, end);
        logger.info("Took: " + duration.getMillis());
        return products;
    }

    public Product getProductById(int id) {
        DateTime start = new DateTime();
        logger.info("ID: " + id);
        Product product = productDao.findById(id, true);
        DateTime end = new DateTime();
        Duration duration = new Duration(start, end);
        logger.info("Took By ID: " + duration.getMillis());
        return product;
    }

    public void deleteProductById(int id) {
        DateTime start = new DateTime();
        logger.info("ID: " + id);
        Product toDelete = productDao.findById(id, false);
        productDao.delete(toDelete.getProductCode());
        DateTime end = new DateTime();
        Duration duration = new Duration(start, end);
        logger.info("Delete By ID: " + duration.getMillis());
        productDao.invalidateProducts();
    }
}
