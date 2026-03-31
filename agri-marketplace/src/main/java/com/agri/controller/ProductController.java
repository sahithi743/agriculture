package com.agri.controller;

import com.agri.model.Product;
import com.agri.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService service;

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return service.addProduct(product);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProducts() {
        Map<String, Object> response = new HashMap<>();
        response.put("products", service.getAllProducts());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/my-products")
    public ResponseEntity<Map<String, Object>> getMyProducts() {
        Map<String, Object> response = new HashMap<>();
        // In a real app we would filter by farmer ID from the token. 
        // Here we just return all products so the mock UI shows them.
        response.put("products", service.getAllProducts());
        return ResponseEntity.ok(response);
    }
}
