package com.equipo7.ben10api.service;

import com.equipo7.ben10api.model.Transformation;
import com.equipo7.ben10api.repository.TransformationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransformationService {
    private final TransformationRepository transformationRepository;

    public TransformationService(TransformationRepository transformationRepository) {
        this.transformationRepository = transformationRepository;
    }

    public List<Transformation> getTransformationsByUser(Long userId) {
        return transformationRepository.findByUserId(userId);
    }

    public Transformation createTransformation(Transformation transformation) {
        return transformationRepository.save(transformation);
    }

    public void deleteTransformation(Long id) {
        transformationRepository.deleteById(id);
    }
}