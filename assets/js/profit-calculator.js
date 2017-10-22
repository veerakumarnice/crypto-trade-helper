define('profit_calc', ['converter'], function (converter) {
	var template = `<div data-index="{{value}}"><div class="group-header"> <input type="checkbox" name="enabler-{{value}}" checked enabler><h4>Investment {{value}}</h4></div><div class="group-body"> <label for="costprice-{{value}}">Cost Price</label><input type="number" name="costprice-{{value}}" value="0" min="0"> <label for="volume-{{value}}">Volume</label><input type="number" name="volume-{{value}}" value="0" min="0"> <label for="fee-{{value}}">Fee %</label><input type="number" name="fee-{{value}}" step="0.0001" value="0.0025" min="0" max="100"></div></div>`;
	function init(profitForm) {
		profitForm.addEventListener('input', calculateProfit)
		var enablers = profitForm.querySelectorAll('[enabler]')
		for(var i =0; i < enablers.length; i++){
			enablers[i].addEventListener('change', toggleGroupInputs)
		}
		profitForm.querySelector('[adder]').addEventListener('click', addInvestmentOptions)
		markDisabled(profitForm)
	}

	function bindEvents(div) {
		div.querySelector('[enabler]').addEventListener('change', toggleGroupInputs)
	}

	var trackIndex = 0;

	function calculateProfit(event) {
		var inputContainer = this.querySelector('[data-inputs-container]')
		var inputCounts = inputContainer.querySelectorAll('[data-index]').length
		var investedAmount = 0, coinData = [];
		var sellingInput = this.querySelector('[name="sellingprice"]')
		var sellValue = Number(sellingInput.value)
		for(var i=0; i < inputCounts; i++){
			coinData.push(getInputContainerData(inputContainer.querySelector('[data-index="'+i+'"]')))
		}
		this.querySelector('[name="profit"]').value = converter.profit(coinData, sellValue)
	}

	function toggleGroupInputs(event) {
		var container = this.closest('[data-index]')
		if(this.checked){
			container.removeAttribute('disable-body')
		} else {
			container.setAttribute('disable-body', '')
		}

		markDisabled(this.closest('form'))

	}

	function getInputContainerData(inputContainer) {
		var index = inputContainer.getAttribute('data-index');
		return {
			price : Number(inputContainer.querySelector('[name="costprice-'+index+'"]').value),
			count : Number(inputContainer.querySelector('[name="volume-'+index+'"]').value),
			fee   : Number(inputContainer.querySelector('[name="fee-'+index+'"]').value)
		}
	}

	function addInvestmentOptions(e){
		e.preventDefault()
		var node = generateInvestmentGroup()
		bindEvents(node)
		this.closest('#profit-calculator').querySelector('[data-inputs-container]').appendChild(node)
		markDisabled(this.closest('form'))
	}

	function generateInvestmentGroup(index) {
		var newIndex = index || getIndex()
		var div =  document.createElement('div')
		div.innerHTML = template.replace(/\{\{value\}\}/g, newIndex)
		return div.firstElementChild
	}

	function getIndex() {
		return ++trackIndex;
	}

	function markDisabled(formEl) {
		var checkedInputs = [];
		formEl.querySelectorAll('input[enabler]').forEach(function(input) {
			if(input.checked){
				checkedInputs.push(input)
			}
		})

		var disabledInput = formEl.querySelector('input[enabler][disabled]')
		if(checkedInputs.length > 1 && disabledInput){
			disabledInput.removeAttribute('disabled')
		} else if (checkedInputs.length === 1){
			checkedInputs[0].setAttribute('disabled', true)
		}
	}

	return {
		init : init,
		generate : generateInvestmentGroup
	}
})