const setPathValue = (obj, path, value) => {
	let currentObj = obj

	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i]
		if (!currentObj[key]) {
			currentObj[key] = {}
		}
		currentObj = currentObj[key]
	}

	currentObj[path[path.length - 1]] = value
}

const getPathValue = (obj, path) => {
	let currentObj = obj

	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i]
		if (!currentObj[key]) {
			currentObj[key] = {}
		}
		currentObj = currentObj[key]
	}

	return currentObj[path[path.length - 1]]
}

const deletePath = (obj, path) => {
	let currentObj = obj

	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i]

		if (!currentObj[key]) {
			currentObj[key] = {}
		}

		currentObj = currentObj[key]

		if (i === path.length - 2 && Array.isArray(currentObj)) {
			currentObj.splice(path[i + 1], 1)
			return
		}
	}

	delete currentObj[path[path.length - 1]]
}