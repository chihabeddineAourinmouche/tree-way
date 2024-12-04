const navBarButtons = (parent) => {
	const stateImportInputLabel = document.createElement("label")
	stateImportInputLabel.classList.add("nav__button", "state__import__input__label")
	stateImportInputLabel.textContent = "Import"

	const importStateInput = document.createElement("input")
	importStateInput.type = "file"
	importStateInput.hidden = true
	stateImportInputLabel.appendChild(importStateInput)
	importStateInput.addEventListener("input", () => {
		let file = importStateInput.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				let fileContent = e.target.result;
				const backupJsonData = localStorage.getItem("state") || {}
				try {
					localStorage.setItem("state", JSON.stringify(JSON.parse(fileContent)))
					window.dispatchEvent(new CustomEvent("onReset"))
				} catch (err) {
					localStorage.setItem("state", backupJsonData)
					fileContent = undefined
					file = undefined
					importStateInput.value = null
				}
			}
			reader.readAsText(file);
		} else { close() }
	});

	const exportStateButton = document.createElement("span")
	exportStateButton.classList.add("nav__button", "state__export__button")
	exportStateButton.textContent = "Export"

	exportStateButton.addEventListener("click", () => {
		exportData()
	})

	parent.appendChild(exportStateButton)
	parent.appendChild(stateImportInputLabel)
}