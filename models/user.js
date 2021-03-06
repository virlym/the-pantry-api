const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                is: /[a-zA-Z0-9]+$/g,
                len: [4,24]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                is: /[a-zA-Z0-9]+$/g,
                len: [6,24]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:
            {
                isEmail: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                is: /[a-zA-Z0-9]+$/g,
                len: [2]
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate:
            {
                is: /[0-9]+$/g,
                len: [10,11]
            }
        },
        isOwner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: false
    });

    User.associate = function (models) {
        User.hasMany(models.Order, {
            foreignKey: {
                name: "baker_id",
            }
        });
        User.hasMany(models.Order, {
            foreignKey: {
                name: "buyer_id",
            }
        });
        User.hasMany(models.PreMade, {
            foreignKey: {
                name: "baker_id",
            }
        });
        User.hasMany(models.Inventory, {
            foreignKey: {
                name: "baker_id",
            }
        });
        User.hasMany(models.Pricing, {
            foreignKey: {
                name: "baker_id",
            }
        });
        User.hasMany(models.Revenue, {
            foreignKey: {
                name: "baker_id",
            }
        });
        User.hasMany(models.InvChanges, {
            foreignKey: {
                name: "baker_id",
            }
        });
    };

    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};