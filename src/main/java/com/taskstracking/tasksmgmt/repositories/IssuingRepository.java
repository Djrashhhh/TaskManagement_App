package com.taskstracking.tasksmgmt.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.taskstracking.tasksmgmt.domains.Issuing;

@Repository
public interface IssuingRepository extends JpaRepository<Issuing, Long> {
}
