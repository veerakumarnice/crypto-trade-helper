define('converter', function () {

	const SELLER_FEE 	= 0.002
	const BUYER_FEE 	= 0.0025
	function convertCoinToMoney(price, cointCount, feePercent) {
		return Number((price * cointCount * ( feePercent ? (1 + feePercent): 1)).toFixed(2))
	}

	function profitMoney(costList, sellingList) {
		return totalMoney(sellingList) - totalMoney(costList)
	}

	function totalMoney(buyingData) {
		var spentMoney = 0;
		for (var i = buyingData.length - 1; i >= 0; i--) {
			spentMoney += convertCoinToMoney(buyingData[i].price , buyingData[i].count, buyingData[i].fee)
		}
		return spentMoney
	}

	function isProfit(difference) {
		return difference > 0 ? 'Profit' : difference === 0 ? 'NO Loss No Gain': 'Loss';
	}

	function ifBoughtAt(costPrice, investment, queryCost) {
		var coins = investment / costPrice ;
		var totalCost = investment + investment * BUYER_FEE
	}

	function analyzeBuying(investment, price_list) {
		
	}

	function ifSoldAt(buyingData, sellingPrice) {
		var totalCoins = 0;
		buyingData.forEach(function (data) {
			totalCoins += data.count
		})
		return profitMoney(buyingData, [{price: sellingPrice, count: totalCoins}])
	}

	return {
		convert : convertCoinToMoney,
		profit : ifSoldAt,
		spent   : totalMoney
	}
})