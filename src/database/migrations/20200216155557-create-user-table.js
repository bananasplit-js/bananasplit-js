/**
 * 
 *  Migration: Users
 *  @description migration for users table
 * 
 */


export function up ( queryInterface, DataTypes ) {

    return queryInterface.createTable( 'Users', {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: new DataTypes.STRING(30),
            allowNull: false
        },

        lastname: {
            type: new DataTypes.STRING(30),
            allowNull: false
        },

        email: {
            type: new DataTypes.STRING(50),
            allowNull: false
        },

        password: {
            type: new DataTypes.STRING(50),
            allowNull: false
        },

        
        /* Timestamps */
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: DataTypes.literal( 'CURRENT_TIMESTAMP' ),
            allowNull: false

        },

        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
            allowNull: false

        }
        
    })

}


export function down ( queryInterface, Sequelize ) {
    return queryInterface.dropTable( 'Users' )
}

