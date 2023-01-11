module.exports = (sequelize, dataTypes) => {
    let alias = 'Hotel';

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        spot: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Service: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.BIGINT,
            allowNull: false
        },

        created_at: dataTypes.TIMESTAMP,

        updated_at: dataTypes.TIMESTAMP
    };
    let config = {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',

    }

    const Hotel = sequelize.define(alias, cols, config);

    Hotel.associate = function (models) {
    // conection with ticket db
        Ticket.belongsToMany(models.Hotel, {
            as: 'Hotels',
            through: 'Hotels_tickets',
            foreignKey: 'ticket_id',
            other: 'Hotel_id',
        })
    //conection with package db
    Hotel.hasMany(models.Package, {
        as: "packages",
        foreignKey: "hotel_id"
    })
    }

    return Ticket
};