package com.agri.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class DashboardController {

    @GetMapping("/farmer/stats")
    public ResponseEntity<Map<String, Object>> getFarmerStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total_products", 12);
        stats.put("total_sales", 45000);
        stats.put("pending_orders", 5);
        stats.put("average_rating", 4.8);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/buyer/stats")
    public ResponseEntity<Map<String, Object>> getBuyerStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total_orders", 8);
        stats.put("total_spent", 12000);
        stats.put("active_orders", 2);
        stats.put("saved_items", 15);
        return ResponseEntity.ok(stats);
    }
}
