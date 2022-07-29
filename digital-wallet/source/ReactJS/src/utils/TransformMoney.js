const transformMoney = (money) => {
	const result = money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
	return result
}

export default transformMoney
