import { extractColorPalette } from "@/utils.js"

function updatePalette(data, k) {
	if (!data) {
		return
	}

	return extractColorPalette(data, k)
}

addEventListener("message", (event) => {
	const { data, k } = event.data
	updatePalette(data, k)
		.then((palette) => {
			postMessage(palette)
		})
		.catch((err) => {
			console.error(err)
		})
})
