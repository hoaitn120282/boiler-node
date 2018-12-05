import BaseRepository from "qs-repository";
import models from "src/database/Initialize";
class MembersRepository extends BaseRepository {
    get model() {
        return models.Members;
    }
}

export default MembersRepository;
