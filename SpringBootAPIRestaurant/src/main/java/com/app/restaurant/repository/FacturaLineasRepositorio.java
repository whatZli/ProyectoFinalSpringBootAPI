
package com.app.restaurant.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import com.app.restaurant.model.FacturaLineas;

public interface FacturaLineasRepositorio extends Repository<FacturaLineas, Integer>{
    List<FacturaLineas>findAll();
    FacturaLineas findOne(int id);
    FacturaLineas save(FacturaLineas facturaLineas);
    void delete(FacturaLineas facturaLineas);
}
