(function (document) {
	const nav = 'nav.tabs'
	const listSelector = `${nav} > ul.tabs__list`
	const listItem = 'li.list__item'
	const itemSelector = `${listSelector} > ${listItem}`

	function handleClick(tab) {
		const tabs = document.querySelectorAll(itemSelector);
		const clickedTabIndex = Array.from(tabs).indexOf(tab)

		const mainContents = document.querySelectorAll('.mainWrapper > .mainWrapper__content')
		const activeMainClassName = 'mainWrapper__content--active'
		const activeTabClassName = 'list__item--active'
		const isActive = tab.classList.contains(activeTabClassName)

		if (!isActive) {
			for (let i = 0, l = tabs.length; i < l; ++i) {
				tabs[i].classList.remove(activeTabClassName)
				mainContents[i].classList.remove(activeMainClassName)
			}

			tabs[clickedTabIndex].classList.add(activeTabClassName)
			mainContents[clickedTabIndex].classList.add(activeMainClassName)
		}
	}
	const tabsList = document.querySelector(listSelector)


	tabsList.addEventListener("click", (event) => {
		for (let target = event.target; !target.parentNode.matches(nav); target = target.parentNode) {
			if (target.matches(listItem)) {
				handleClick(target);

				break;
			}
		}
	})
})(document)
