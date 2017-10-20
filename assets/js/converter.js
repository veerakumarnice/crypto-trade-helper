define('converter', function () {

	const SELLER_FEE 	= 0.002
	const BUYER_FEE 	= 0.0025
	function convertCoinToMoney(price, cointCount) {
		// if(!price){
		// 	throw TypeError('Price is Necessary')
		// }
		// if(!cointCount){
		// 	throw TypeError('Coint Count is Necessary')
		// }
		return price * cointCount	
	}

	function profitMoney(costList, sellingList) {
		var costPrice = totalMoney(costList)
		var sellingPrice = totalMoney(sellingList)
		var difference = sellingPrice - (costPrice + (costPrice * BUYER_FEE) )
		// console.log('total cost', costPrice + (costPrice * BUYER_FEE))
		console.log( difference , isProfit(difference))
	}

	function totalMoney(buyingData) {
		var spentMoney = 0;
		for (var i = buyingData.length - 1; i >= 0; i--) {
			spentMoney += convertCoinToMoney(buyingData[i].price , buyingData[i].count)
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

	function costPriceWithFee(buyingData) {
		var cost = totalMoney(buyingData)
		return cost + (cost * BUYER_FEE)
	}

	return {
		convert : convertCoinToMoney,
		consult : profitMoney,
		spent   : costPriceWithFee
	}
})