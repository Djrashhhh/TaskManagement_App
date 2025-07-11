package com.taskstracking.tasksmgmt.repositories;

import com.taskstracking.tasksmgmt.domains.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
}
