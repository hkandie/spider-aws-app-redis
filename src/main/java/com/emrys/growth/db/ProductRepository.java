package com.emrys.growth.db;


import com.emrys.growth.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAll();
    List<Product> findByProductCodeIsLessThan(int less);

    Product findById(int id);
}