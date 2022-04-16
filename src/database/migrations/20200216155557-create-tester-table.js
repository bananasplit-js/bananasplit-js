/**
 *
 *  Migration: Tester
 *
 *  @description tester migration
 *
 */

exports.up = (queryInterface, DataTypes) => {
	return queryInterface.createTable('Tester', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},

		key: {
			type: DataTypes.STRING,
			allowNull: false
		},

		value: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})
}

exports.down = (queryInterface) => {
	return queryInterface.dropTable('Tester')
}
