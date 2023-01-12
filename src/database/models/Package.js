module.exports = (sequelize, dataTypes) => {
    let alias = 'Package';

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        fly_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
        },
        hotel_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
        },

        price: {
            type: dataTypes.BIGINT,
            allowNull: false
        },

        created_at: {
            type: dataTypes.DATE
        },

        updated_at: {
            type: dataTypes.DATE
        }
    };
    let config = {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',

    }

    const Package = sequelize.define(alias, cols, config);

    Package.associate = function (models) {
        //conection with ticket db
        Package.belongsToMany(models.Ticket, {
            as: 'tickets',
            through: 'package_tickests',
            foreignKey: 'package_id',
            otherKey: 'ticket_id',
        })

        //conection with fly db
        Package.belongsTo(models.Fly, {
            as: "flys",
            foreignKey: "fly_id"
        })
        
        //conection with hotel db
        Package.belongsTo(models.Hotel, {
            as: "hotels",
            foreignKey: "hotel_id"
        })
    }

    return Package
};