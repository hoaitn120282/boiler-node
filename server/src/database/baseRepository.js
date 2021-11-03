"use strict";

class baseRepository {
    constructor(req, res, options = {}) {
        this.req = req;
        this.res = res;
        this.options = options;
    }
    /**
     * Search for multiple elements in the database
     * @param {*} options
     * @returns {*|Promise.<{rows: Model[]}>}
     */
    findAll(options = {}) {
        return this.model.findAll(options);
    }

    /**
     * Handle pagination
     * @param options
     * @returns {*|Promise.<{rows: Model[]}>}
     */
    paginate(options = {}) {
        options.limit = options.limit || 30;
        options.offset = options.offset || 0;
        return this.findAll(options);
    }

    /**
     * Search for one specific element in the database by ID.
     * @param id
     * @param options
     * @returns {*|Promise.<Model>}
     */
    findById(id, options) {
        return this.model.findByPk(id, options);
    }
    /**
     * Search for one specific element in the database by attributes.
     * Example: findOne({ where: {title: 'aProject'} })
     * @param {*} options
     * @returns {*|Promise.<Model>}
     */
    findOne(options) {
        return this.model.findOne(options);
    }
    /**
     * Search for a specific element or create it if not available.
     * Example: modelName.findOrCreate({where: {username: 'xxxxx'}, defaults: {job: 'Technical Lead JavaScript'}})
     * @param {*} options
     * @returns {*|Promise.<Model>}
     */
    findOrCreate(options) {
        return this.model.findOrCreate(options);
    }
    /**
     * Get the greatest value of a specific attribute within a specific table
     * @param {*} attribute
     * @param {*} option
     * @returns {*|Promise.<Number>}
     */
    max(attribute, option) {
        return this.model.max(attribute, option);
    }
    /**
     * Get the least value of a specific attribute within a specific table
     * @param {*} attribute
     * @param {*} option
     * @returns {*|Promise.<Number>}
     */
    min(attribute, option) {
        return this.model.min(attribute, option);
    }
    /**
     * Sum the value of specific attributes
     * @param {*} attribute
     * @param {*} option
     * @returns {*|Promise.<Number>}
     */
    sum(attribute, option) {
        return this.model.sum(attribute, option);
    }
    /**
     * Search for multiple elements in the database, returns both data and total count
     * @param {*} options
     * @returns {*|Promise.<{rows: Model[]}>}
     */
    findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    /**
     * Create new record.
     * @param values
     * @param options
     * @returns {values}
     */

    create(values, options) {
        return this.model.create(values, options);
    }

    /**
     * Update the given record
     * @param values
     * @param options
     */
    update(values, options) {
        return this.model.update(values, options);
    }

    /**
     * Destroy the records.
     * @param options
     * @returns {*|Promise.<undefined>|void|Promise.<Integer>}
     */
    destroy(options) {
        if (Array.isArray(options.where)) {
            options.where = {
                $or: options.where
            };
        }
        options = Object.assign(options, this.deletableConditions);
        return this.model.destroy(options);
    }
    /**
     * Restore the records.
     * @param options
     * @returns {*|Promise.<undefined>|void|Promise.<Integer>}
     */
    restore(options) {
        if (Array.isArray(options.where)) {
            options.where = {
                $or: options.where
            };
        }
        options = Object.assign(options, this.deletableConditions);
        return this.model.restore(options);
    }
}

module.exports = baseRepository;
