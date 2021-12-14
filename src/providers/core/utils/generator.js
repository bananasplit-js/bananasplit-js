/**
 * 
 *  Utils: Generator
 *  @module providers/core/utils/generator
 *  
 *  @description extends generator with functionallities
 * 
 */
export default
	/*
	 *	Extend generator with functionallities
	 *
	 */
	(generator) => {
		generator.amount = function (amount, data={}) {
			const registries = []

			for ( let i = 1 ; i <= amount ; ++i ) {
				registries.push(this(data))
			}

			return registries
		}

		return generator
	}

;
