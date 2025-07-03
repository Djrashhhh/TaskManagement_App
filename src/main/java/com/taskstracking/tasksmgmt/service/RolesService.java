package com.taskstracking.tasksmgmt.service;

import java.util.List;
import com.taskstracking.tasksmgmt.domains.Roles;

public interface RolesService {

    Roles saveRole(Roles role);

    Roles getRoleById(Long id);

    List<Roles> getAllRoles();

    Roles updateRole(Long id, Roles role);

    boolean deleteRole(Long id);
}
