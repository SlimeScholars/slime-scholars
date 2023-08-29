export const getSortedItems = (items) => {
	const newItems = [...items]

	// Sort items
	// Priority 1: Non-backgrounds
	// Priority 2: Alphabetical order
	newItems.sort((a, b) => {
		if (a.isBg === b.isBg) {
			return a.itemName.localeCompare(b.itemName)
		} else {
			return a.isBg ? 1 : -1
		}
	})

	return newItems
}

export const getSortedSlimes = (slimes) => {
	const newSlimes = [...slimes]

	// Sort the user's slimes
	newSlimes.sort((a, b) => {
		// Sort by rarity first
		const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Uncommon', 'Common']
		const rarityComparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)

		if (rarityComparison !== 0) {
			return rarityComparison
		} else {
			// If rarity is the same, sort by baseProduction + bonusProduction
			const aTotalProduction = a.baseProduction + a.bonusProduction
			const bTotalProduction = b.baseProduction + b.bonusProduction
			return bTotalProduction - aTotalProduction // Sort in descending order
		}
	})

	return newSlimes
}