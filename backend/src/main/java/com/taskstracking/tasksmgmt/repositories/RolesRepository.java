package com.taskstracking.tasksmgmt.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskstracking.tasksmgmt.domains.Roles;


@Repository
public interface RolesRepository extends JpaRepository <com.taskstracking.tasksmgmt.domains.Roles, Long> {
    @SuppressWarnings("unchecked")
    Roles save(Roles role);
}
