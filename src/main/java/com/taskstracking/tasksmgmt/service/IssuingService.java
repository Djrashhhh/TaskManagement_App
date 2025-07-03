package com.taskstracking.tasksmgmt.service;

import java.util.List;
import java.util.Optional;

import com.taskstracking.tasksmgmt.domains.Issuing;



public interface IssuingService {
    Issuing issueDevice(Issuing issuing);
    List<Issuing> getAllIssuedDevices();
    void updateIssuing(Issuing issuing);

    Issuing saveIssuing(Issuing issuing);
    Optional<Issuing> getIssuingById(Long id);
    void deleteIssuing(Long id);
}
