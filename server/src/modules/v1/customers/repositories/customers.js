import BaseRepository from "src/database/baseRepository";
import models from "src/database/Initialize";
class CustomersRepository extends BaseRepository {
    get model() {
        return models.Customers;
    }
}

export default CustomersRepository;
