/**
 *
 *  Utils: Generator
 *
 *  @module providers/core/utils/generator
 *
 *  @description extends generator with functionallities
 *
 */

/*
 *
 *	Extends generator with extra functionallities and changes the default behaviour
 *
 *	@param { Function } generator
 *	@param { boolean | null } adapter
 *
 *	@returns { void }
 *
 */
module.exports = (generator, adapter = null) => {
	// New generator with extra properties and functionallities
	const enhancedGenerator = (defaultValue, adapt = false) => {
		// Resourced generated by default generator
		const resource = generator(defaultValue)

		// If adapt was provided, then changes keys
		if (adapter && adapt) {
			// Iterate over each adapter key
			Object.entries(adapter).forEach(([key, newKey]) => {
				// Calculate new key and new value
				if (typeof newKey === 'function') {
					;[newKey, resource[key]] = newKey(key, resource[key])
				}

				// Process by newKey
				if (typeof newKey === 'string' && newKey !== key) {
					// Replace current key in the resource generated by the new one
					resource[newKey] = resource[key]
					delete resource[key]
				} else if (typeof newKey === 'boolean' && newKey === false) {
					// Key and value must be deleted
					delete resource[key]
				}
			})
		}

		return resource
	}

	/**
	 *
	 *	Amount method
	 *
	 *	@param { amount } number
	 *	@param { object } data
	 *	@param { boolean } adapt
	 *
	 *	@returns { object | [] }
	 *
	 */
	enhancedGenerator.amount = function (amount, data = {}, adapt = false) {
		const registries = []

		for (let i = 1; i <= amount; ++i) {
			registries.push(this(data, adapt))
		}

		return registries
	}

	// Property which defines if generator has an adapter
	enhancedGenerator.hasAdapter = adapter !== null

	// Returns the new extra power generator
	return enhancedGenerator
}
