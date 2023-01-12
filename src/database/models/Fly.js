module.exports = (sequelize, dataTypes) => {
    let alias = 'Fly';

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        airlines: {
            type: dataTypes.STRING,
            allowNull: false
        },

        departure: {
            type: dataTypes.STRING,
            allowNull: false
        },

        reach: {
            type: dataTypes.STRING,
            allowNull: false
        },

        description: {
            type: dataTypes.STRING,
            allowNull: false
        },

        departure_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },

        return_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },

        departure_hour: {
            type: dataTypes.TIME,
            allowNull: false
        },

        return_hour: {
            type: dataTypes.TIME,
            allowNull: false
        },

        cabin: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        price: {
            type: dataTypes.BIGINT,
            allowNull: false
        },

        created_at:{ 
            type: dataTypes.DATE
        },

        updated_at:{ 
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

    const Fly = sequelize.define(alias, cols, config);

    Fly.associate = function (models) {
        //conection with ticket db
        Fly.belongsToMany(models.Ticket, {
            as: 'tickets',
            through: 'flys_tickets',
            foreignKey: 'fly_id',
            otherKey: 'ticket_id',
        })
        //conection with package db
        Fly.hasMany(models.Package, {
            as: "packages",
            foreignKey: "fly_id"
        })

    }

    return Fly
};