package com.agri.controller;

import com.agri.model.Order;
import com.agri.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService service;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return service.placeOrder(order);
    }

    @GetMapping("/buyer")
    public ResponseEntity<Map<String, Object>> getBuyerOrders() {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> orders = new ArrayList<>();
        
        Map<String, Object> o1 = new HashMap<>();
        o1.put("id", 101);
        o1.put("farmer_name", "Green Valley Farms");
        o1.put("products_count", 3);
        o1.put("total", 850);
        o1.put("created_at", "2024-03-25T10:00:00Z");
        o1.put("status", "delivered");
        
        Map<String, Object> o2 = new HashMap<>();
        o2.put("id", 102);
        o2.put("farmer_name", "Organic Veggies Ltd");
        o2.put("products_count", 1);
        o2.put("total", 240);
        o2.put("created_at", "2024-03-28T14:30:00Z");
        o2.put("status", "pending");
        
        orders.add(o1);
        orders.add(o2);
        
        response.put("orders", orders);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/farmer")
    public ResponseEntity<Map<String, Object>> getFarmerOrders() {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> orders = new ArrayList<>();
        
        Map<String, Object> o1 = new HashMap<>();
        o1.put("id", 201);
        o1.put("buyer_name", "Alice Smith");
        o1.put("quantity", 5);
        o1.put("total", 1200);
        o1.put("created_at", "2024-03-29T09:15:00Z");
        o1.put("status", "pending");
        
        orders.add(o1);
        
        response.put("orders", orders);
        return ResponseEntity.ok(response);
    }
}
