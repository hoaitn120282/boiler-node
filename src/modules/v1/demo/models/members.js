export default (sequelize, DataTypes) => {
    const Members = sequelize.define(
        "Members",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            username: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [6, 10],
                        msg: "members.name.validation.nameLenght"
                    }
                },
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                validate: { isEmail: { msg: "members.email.validate.isEmail" } }
            },
            avatar: {
                type: DataTypes.STRING,
                validate: { isUrl: { msg: "members.avatar.validate.isUrl" } }
            },
            is_active: { type: DataTypes.BOOLEAN, field: "is_active" },
            status: { type: DataTypes.BOOLEAN, field: "status" }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            tableName: "users"
        }
    );
    // createdAt: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     field: "created_at"
    // },
    // updatedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     field: "updated_at"
    // },
    // deletedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     field: "deleted_at"
    // }

    Members.associate = function(models) {
        // associations can be defined here
    };

    return Members;
};
