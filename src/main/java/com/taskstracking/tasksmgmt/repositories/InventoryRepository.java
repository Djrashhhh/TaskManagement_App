package com.taskstracking.tasksmgmt.repositories;

import com.taskstracking.tasksmgmt.domains.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
