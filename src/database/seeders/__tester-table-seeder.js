/**
 *
 *  Seeder: Tester
 *
 *  @description seeds the tester table
 *
 */

exports.up = (queryInterface) => {
	const tester = { key: 'foo', value: 'bar' }
	return queryInterface.bulkInsert('Tester', [tester], {})
}

exports.down = (queryInterface) => {
	return queryInterface.bulkDelete('Tester', null, {})
}
