define('profit_calc', ['converter'], function (converter) {
	function init(profitForm) {
		profitForm.addEventListener('input', calculateProfit)
	}

	function calculateProfit(event) {
		var inputContainer = this.querySelector('[data-input-count]')
		var inputCounts = Number(inputContainer.getAttribute('data-input-count'))
		var investedAmount = 0, coinData = [];
		var sellingInput = this.querySelector('[name="sellingprice"]')
		var sellValue = Number(sellingInput.value)
		for(var i=0; i < inputCounts; i++){
			coinData.push(getInputContainerData(inputContainer.querySelector('[data-index="'+i+'"]')))
		}
		this.querySelector('[name="profit"]').value = converter.profit(coinData, sellValue)
	}

	function getInputContainerData(inputContainer) {
		var index = inputContainer.getAttribute('data-index');
		return {
			price : Number(inputContainer.querySelector('[name="costprice-'+index+'"]').value),
			count : Number(inputContainer.querySelector('[name="volume-'+index+'"]').value),
			fee   : Number(inputContainer.querySelector('[name="fee-'+index+'"]').value)
		}
	}

	return {
		init : init
	}
})