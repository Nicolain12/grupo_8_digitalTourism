module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        surname: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        admin: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100)
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
    
    const User = sequelize.define(alias, cols, config);

    
    User.associate = function (models) {
    //conection with ticket db 
        User.hasMany(models.Ticket, {
            as: "tickets",
            foreignKey: "user_id"
        })
    }
    return User
};