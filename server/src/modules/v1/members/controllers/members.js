import faker from "faker";
import membersRepository from "src/modules/v1/members/repositories/members";
import helper from "src/common/helper";
import queryFilter from "src/common/filter-query";
const controller = {};
/**
 * Member list to display members in paginaion
 * 
 * Serach options: URL?search[field_name]=text
 * Search options for relationship: URL?search[model_name.field_name]=text
 * For example: URL?search[company_name]=gts
 *
 * Filter option: URL?filter[field_name1]=example&filter[field_name2]=123456789
 * Filter option with relationship: URL?filter[model_name1.field_name1]=example&filter[model_name2.field_name2]=123456789
 * For example: URL?filter[company_name]=GTS Vietnam
 *
 * Sort option: URL?sort=[{"field":"field_name","direction":"desc"}]
 * Sort option with relationship: URL?sort=[{"field":"model_name.field_name","direction":"desc"}]
 * For example: URL?sort=[{"field":"company_name","direction":"desc"}]
 *
 * Paginate option: URL?page=number_of_page and default limit is 30 record
 * For example: URL?page=5
 * @param {*} req 
 * @param {*} res 
 */
controller.index = (req, res) => {
    let membersRepos = new membersRepository();
    const queryOptions = queryFilter(req.query);
    membersRepos
        .paginate(queryOptions)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "users.list.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
controller.show = (req, res) => {
    const options = {
        where: { id: req.params.id }
    };
    let membersRepos = new membersRepository();
    membersRepos.findOne(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "user.display.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
};
/**
 * Member creation to allow insert member's information into database
 * @param {*} req 
 * @param {*} res 
 */
controller.create = (req, res) => {
    let membersRepos = new membersRepository();
    membersRepos.create(req.body)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "user.create.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}
/**
 * Member updation to allow update member's information via some conditions
 * Exampple here we can update member via ID 
 * @param {*} req 
 * @param {*} res 
 */
controller.update = (req, res) => {
    const options = {
        where: { id: req.params.id }
    };
    const memberInfo = req.body;
    //Init model via respository
    let membersRepos = new membersRepository();
    //update member's info by ID
    membersRepos.update(memberInfo, options)
        .then(() => {
            //Find the user updated
            membersRepos.findOne(options)
                .then(data => {
                    return res.json(
                        helper.formatOutputData(data, "user.update.success")
                    );
                })
                .catch(err => {
                    return res.status(400).json(helper.displayErrorMessage(err));
                });
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}
/**
 * memebrs deletion to allow delete one or more member's information via conditions
 * @param {*} req 
 * @param {*} res 
 */
controller.delete = (req, res) => {
    /**
     * Set where options to query delete
     * You can be added more conditions for example: where: [{ id: 1 }, { name: 'Henry Tran' }] into 'where' options is array value.
     * 
     */
    res.json({
        data: req.query
    });
    const options = {
        where: { id: req.params.id },
    };
    let membersRepos = new membersRepository();
    membersRepos.destroy(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "member.delete.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}

/**
 * member deletion to allow restore one or more member's information via conditions
 * @param {*} req 
 * @param {*} res 
 */
controller.restore = (req, res) => {
    /**
     * Set where options to query restore
     * You can be added more conditions for example: where: [{ id: 1 }, { name: 'Henry Tran' }] into 'where' options is array value.
     * 
     */
    const options = {
        where: { id: req.params.id },
    };
    let membersRepos = new membersRepository();
    membersRepos.restore(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "member.restore.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}

export default controller;
