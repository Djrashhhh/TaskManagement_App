package com.taskstracking.tasksmgmt.service;
import java.util.List;

import com.taskstracking.tasksmgmt.domains.Inventory;

public interface InventoryService {
    Inventory addDevice(Inventory inventory);

    Inventory updateDevice(Long id, Inventory inventory);

    void deleteDevice(Long id);

    List<Inventory> getAllDevices();

    Inventory getInventoryById(Long id); // Add this method
}
