package com.taskstracking.tasksmgmt.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.taskstracking.tasksmgmt.domains.Issuing;
import com.taskstracking.tasksmgmt.repositories.IssuingRepository;
import com.taskstracking.tasksmgmt.service.IssuingService;

@Service
public class IssuingServiceImpl implements IssuingService {

    @Autowired
    private IssuingRepository issuingRepository;

    @Override
    public Issuing issueDevice(Issuing issuing) {
        return issuingRepository.save(issuing);
    }

    @Override
    public List<Issuing> getAllIssuedDevices() {
        return issuingRepository.findAll();
    }

    @Override
    public void updateIssuing(Issuing issuing) {
        issuingRepository.save(issuing);
    }

    @Override
    public Optional<Issuing> getIssuingById(Long id) {
        return issuingRepository.findById(id);
    }

    @Override
    public Issuing saveIssuing(Issuing issuing) {
        return issuingRepository.save(issuing);
    }

    @Override
    public void deleteIssuing(Long id) {
        issuingRepository.deleteById(id);
    }
}
