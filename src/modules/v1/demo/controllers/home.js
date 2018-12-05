import faker from "faker";
import membersRepository from "src/modules/v1/demo/repositories/members";
import helper from "src/common/helper";
import queryFilter from "src/common/filter-query";
const controller = {};

controller.index = (req, res) => {
    let membersRepos = new membersRepository();
    const queryOptions = queryFilter(req.query);
    membersRepos
        .paginate(queryOptions)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "users.query.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
};

export default controller;
