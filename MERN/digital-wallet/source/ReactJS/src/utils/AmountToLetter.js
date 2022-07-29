const convert = (amount) => {
	if (amount >= 1000 && amount < 1000000) {
		const first = parseInt(amount / 1000)
		if (first * 1000 < amount) {
			return `> ${first}k`
		} else {
			return `${first}k`
		}
	} else if (amount >= 1000000 && amount < 1000000000) {
		const first = parseInt(amount / 1000000)
		if (first * 1000000 < amount) {
			const second = parseInt((amount - first * 1000000) / 100000)
			return `> ${first}tr`
		} else {
			return `${first}tr`
		}
	} else if (amount >= 1000000000) {
		const first = parseInt(amount / 1000000000)
		if (first * 1000000000 < amount) {
			const second = parseInt((amount - first * 1000000000) / 100000000)
			return `> ${first}tỷ`
		} else {
			return `${first}tỷ`
		}
	}
}

export default convert
