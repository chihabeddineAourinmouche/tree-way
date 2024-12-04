// GET HTML ELEMENTSS
const body = document.body
const [editor, nav] = ["editor", "nav"].map(id => document.getElementById(id))

// STATE
if (!localStorage.getItem("state")) {
	localStorage.setItem("state", JSON.stringify({}))
}
state = JSON.parse(localStorage.getItem("state"))

// COMPONENT INITIALIZAION
visualizeJSON(state, state, [], editor)
navBarButtons(nav)

// WINDOW EVENTS
window.addEventListener("onReset", () => {
	editor.innerHTML = null
	state = JSON.parse(localStorage.getItem("state"))
	visualizeJSON(state, state, [], editor)
})