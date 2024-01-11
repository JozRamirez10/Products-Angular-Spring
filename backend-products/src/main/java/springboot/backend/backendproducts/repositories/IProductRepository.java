package springboot.backend.backendproducts.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import springboot.backend.backendproducts.entities.Product;

@CrossOrigin(origins = "http://localhost:4200/") // Habilita la comunicación con Angular
@RepositoryRestResource(path = "products")
    // Toda la lógica que se implementa en un @Controller es simplificado por la anotación
    // de forma que si se invoca algún método (GET, POST, etc.), gracias a la anotación, 
    // se realiza de forma automática
public interface IProductRepository extends CrudRepository<Product, Long>{

}
