export default (sequelize, DataTypes) => {
    const Customers = sequelize.define(
        "Customers",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            company_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            vat_number: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: true,
                validate: {
                    len: {
                        args: [10, 15],
                        msg: "customers.vat.validation.nameLenght"
                    }
                },
            },
            phone_number: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: true,
                validate: {
                    len: {
                        args: [10, 15],
                        msg: "customers.phone.validation.nameLenght"
                    }
                },
            },
            website: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zip_code: DataTypes.STRING,
            country_id: DataTypes.INTEGER,
            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            currency_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            language_default: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            tableName: "customers"
        }
    );

    Customers.associate = function (models) {
        // associations can be defined here
    };

    return Customers;
};