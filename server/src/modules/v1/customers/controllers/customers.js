import faker from "faker";
import customersRepository from "src/modules/v1/customers/repositories/customers";
import helper from "src/common/helper";
import queryFilter from "src/common/filter-query";
const controller = {};
/**
 * customer list to display customers in paginaion
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
    let customersRepos = new customersRepository();
    const queryOptions = queryFilter(req.query);
    // res.json(queryOptions);
    customersRepos
        .paginate(queryOptions)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "customers.list.success")
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
    let customersRepos = new customersRepository();
    customersRepos.findOne(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "customer.display.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
};
/**
 * customer creation to allow insert customer's information into database
 * @param {*} req 
 * @param {*} res 
 */
controller.create = (req, res) => {
    let customersRepos = new customersRepository();
    customersRepos.create(req.body)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "customer.create.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}
/**
 * customer updation to allow update customer's information via some conditions
 * Exampple here we can update customer via ID 
 * @param {*} req 
 * @param {*} res 
 */
controller.update = (req, res) => {
    const options = {
        where: { id: req.params.id }
    };
    const customerInfo = req.body;
    //Init model via respository
    let customersRepos = new customersRepository();
    //update customer's info by ID
    customersRepos.update(customerInfo, options)
        .then(() => {
            //Find the customer updated
            customersRepos.findOne(options)
                .then(data => {
                    return res.json(
                        helper.formatOutputData(data, "customer.update.success")
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
 * customer deletion to allow delete one or more customer's information via conditions
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
    let customersRepos = new customersRepository();
    customersRepos.destroy(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "customer.delete.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}

/**
 * customer deletion to allow delete one or more customer's information via conditions
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
    let customersRepos = new customersRepository();
    customersRepos.restore(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "customer.restore.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}

export default controller;
