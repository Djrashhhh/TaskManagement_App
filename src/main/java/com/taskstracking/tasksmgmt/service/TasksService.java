package com.taskstracking.tasksmgmt.service;

import java.util.List;
import com.taskstracking.tasksmgmt.domains.Tasks;

public interface TasksService {

    Tasks saveTask(Tasks task);

    Tasks getTaskById(Long id);

    List<Tasks> getAllTasks();

    void deleteTask(Long id);

    Tasks updateTask(Long id, Tasks task);

}
