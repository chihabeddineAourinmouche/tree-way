const visualizeJSON = (originalJson, json, path, parentElement) => {
	const keyValyeList = document.createElement("ul")
	keyValyeList.classList.add("key__value__list")

	for (const key in json) {
		const keyValueItem = document.createElement("li")
		keyValueItem.classList.add("key__value__item")
		keyValyeList.appendChild(keyValueItem)

		const keyElement = document.createElement("span")
		keyElement.classList.add("key__value__element__generic", "key__element")
		if ((
			!json[key] ||
			(typeof json[key] === "object" && Object.keys(json[key]).length === 0)
		) &&
			json[key] !== 0 &&
			json[key] !== false) {
			keyElement.classList.add("empty__value__key__element")
		}
		keyElement.title = `Delete path "${[...path, key].join("->")}"`
		keyElement.textContent = `${key}`
		keyElement.addEventListener("click", () => {
			deletePath(originalJson, [...path, key])
			localStorage.setItem("state", JSON.stringify(originalJson))
			window.dispatchEvent(new CustomEvent("onReset"))
		})
		keyValueItem.appendChild(keyElement)

		if (typeof json[key] === "object") {
			const valueElement = document.createElement("span")
			valueElement.classList.add("key__value__element__generic", "value__element")
			keyValueItem.appendChild(valueElement)

		} else {
			keyValueItem.classList.add("leaf")
			const valueInput = document.createElement("input")
			valueInput.classList.add("key__value__element__generic", "value__input__element")
			valueInput.placeholder = "Enter data here"
			valueInput.value = json[key]

			!json[key] &&
				json[key] !== 0 &&
				json[key] !== false &&
				valueInput.classList.add("empty__value__element")

			valueInput.addEventListener("change", () => {
				setPathValue(
					originalJson,
					[...path, key],
					!json[key] && json[key] !== 0 && json[key] !== false
						? null
						: valueInput.value
				)
				localStorage.setItem("state", JSON.stringify(originalJson))
				if (!json[key] && json[key] !== 0 && json[key] !== false) {
					valueInput.classList.add("empty__value__element")
				} else {
					valueInput.classList.remove("empty__value__element")
				}
			})

			keyValueItem.appendChild(valueInput)
		}

		if (typeof json[key] === "object") {
			visualizeJSON(originalJson, json[key], [...path, key], keyValueItem)
		}
	}

	parentElement.appendChild(keyValyeList)
}