package com.equipo7.ben10api.controller;

import com.equipo7.ben10api.dto.TransformationDTO;
import com.equipo7.ben10api.service.TransformationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transformations")
public class TransformationController {
    private final TransformationService transformationService;

    public TransformationController(TransformationService transformationService) {
        this.transformationService = transformationService;
    }

    @PostMapping("/alien/{alienId}")
    public ResponseEntity<TransformationDTO> createTransformation(@PathVariable Long alienId) {
        TransformationDTO transformation = transformationService.createTransformation(alienId);
        return ResponseEntity.ok(transformation);
    }

    @PostMapping("/stop")
    public ResponseEntity<TransformationDTO> stopTransformation() {
        TransformationDTO transformation = transformationService.stopActiveTransformation();
        return ResponseEntity.ok(transformation);
    }


//    @GetMapping("/active")
//    public ResponseEntity<TransformationDTO> getActiveTransformation() {
//        TransformationDTO transformation = transformationService.getActiveTransformation();
//        return ResponseEntity.ok(transformation);
//    }
@GetMapping("/active")
public ResponseEntity<?> getActiveTransformation() {
    TransformationDTO transformation = transformationService.getActiveTransformation();

    if (transformation == null) {
        // Opción A: Devolver 200 OK con un mensaje en el body
        return ResponseEntity.ok().body("{\"message\": \"No active transformation found.\"}");

        // Opción B: Devolver 204 No Content (descomenta esta línea si prefieres)
        // return ResponseEntity.noContent().build();
    }

    return ResponseEntity.ok(transformation);
}


}
