const setLocalStorage = () => {
	if (!localStorage.getItem("state")) {
		localStorage.setItem("state", JSON.stringify({}))
	}
}

const exportData = () => {
	const data = localStorage.getItem("state")

	const blob = new Blob([data], { type: "application/json" })

	// CREATE A HIDDEN ANCHOR ELEMENT
	const link = document.createElement("a")
	link.style.display = "none"
	document.body.appendChild(link)

	// SET THE HREF AND DOWNLOAD ATTRIBUTES OF THE ANCHOR ELEMENT
	link.href = URL.createObjectURL(blob)
	link.download = `${new Date().toISOString().replace(/[-T:.Z]/g, "")}.json`

	// SIMULATE A CLICK TO TRIGGER THE DOWNLOAD
	link.click()

	// REMOVE THE HIDDEN ANCHOR ELEMENT
	document.body.removeChild(link)
}

const clearData = () => {
	localStorage.setItem("state", JSON.stringify({}))
}