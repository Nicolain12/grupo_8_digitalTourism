module.exports = (sequelize, dataTypes) => {
    let alias = 'Ticket';

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        user_id: {
            type: dataTypes.BIGINT(10),
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

    const Ticket = sequelize.define(alias, cols, config);

    Ticket.associate = function (models) {

        // Conection with users db
        Ticket.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        })
        
        // Conection with flys db
        Ticket.belongsToMany(models.Fly, {
            as: 'flys',
            through: 'flys_tickets',
            foreignKey: 'ticket_id',
            other: 'fly_id',
        })

        // Conection with hotels db
        Ticket.belongsToMany(models.Hotel, {
            as: 'Hotels',
            through: 'Hotels_tickets',
            foreignKey: 'ticket_id',
            other: 'Hotel_id',
        })

        // Conection with packages db
        Ticket.belongsToMany(models.Package, {
            as: 'Packages',
            through: 'Packages_tickets',
            foreignKey: 'ticket_id',
            other: 'Package_id',
        })

    }

    return Ticket
};