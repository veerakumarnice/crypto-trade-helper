define('depends', function () {

	var mapper = []

	function startForContext(ctx) {
		ctx = ctx || document
		var elements = ctx.querySelectorAll('[depends]')
		for (var i = elements.length - 1; i >= 0; i--) {
			initElement(elements[i])
		}
	}

	function initElement(element) {
		var depends = getMaster(element)
		setState.call(element, depends)
		bindForElement(element, depends)
	}
	function bindForElement(elem, depends) {
		depends.addEventListener('change', setState.bind(elem, depends))
	}

	function setState(depends) {
		if(depends.checked){
			this.removeAttribute('disabled')
		} else {
			this.setAttribute('disabled', true)
		}
	}

	function getMaster(element) {
		var depends = element.getAttribute('depends').trim().split('.')
		return document.getElementById(depends[0]).elements[depends[1]]
	}

	return {
		start : startForContext
	}
})