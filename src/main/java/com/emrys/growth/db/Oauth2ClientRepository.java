package com.emrys.growth.db;

import com.emrys.growth.models.Oauth2Client;
import com.emrys.growth.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Oauth2ClientRepository extends JpaRepository<Oauth2Client, Integer> {
    List<Oauth2Client> findAll();

    Oauth2Client findById(String id);
}
