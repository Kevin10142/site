(function (document) {
	const activeLightboxClassName = 'lightboxWrapper--active'
	const lightbox = document.querySelector('div.lightboxWrapper')
	const lightboxClassList = lightbox.classList
	const openLightboxButton = document.querySelector('.headerWrapper > .buttonWrapper')

	openLightboxButton.addEventListener("click", (event) => {
		const isOpened = lightboxClassList.contains(activeLightboxClassName)

		if (!isOpened) {
			lightboxClassList.add(activeLightboxClassName)
		}
	})

	lightbox.addEventListener("click", (event) => {
		const isOpened = lightboxClassList.contains(activeLightboxClassName)
		let target = event.target

		if (isOpened) {
			while (target && !target.parentNode.matches('body')) {
				if (target.matches('.nav__list')) {
					return;
				}

				target = target.parentNode;
			}

			lightboxClassList.remove(activeLightboxClassName)
		}
	})
})(document)
