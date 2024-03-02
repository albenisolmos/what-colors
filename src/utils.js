import kmeans from "./kmeans.js"
import { IMAGE_FILETYPES } from "./consts.js"

/**
 * Calculates the mean value of a one-dimensional dataset
 * @param {Array} data - data set
 * @return {Number} mean value of data set
 */
function mean(data) {
	return data.reduce((total, current) => (total += current), 0) / data.length
}

/**
 * Calculates the mean point of an n-dimensional dataset
 * @param {Array} data - data set
 * @return {Array} mean point of data set
 */
function meanPoint(data) {
	const theMeanPoint = []

	if (data.length != 0) {
		for (let i = 0; i < data[0].length; i++) {
			theMeanPoint.push(mean(data.map((x) => x[i])))
		}
	}

	return theMeanPoint
}

export function extractPixelData(image) {
	// Separate out RGBA groups
	const canvas = document.createElement("canvas")
	canvas.width = image.width
	canvas.height = image.height
	const ctx = canvas.getContext("2d")
	ctx.drawImage(image, 0, 0, image.width, image.height)
	const data = ctx.getImageData(0, 0, image.width, image.height).data
	let colours = new Array()

	for (let i = 0; i < data.length; i += 4) {
		colours.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
	}

	return colours
}

export async function extractColorPalette(colors, k) {
	// Cluster raw colours
	// NOTE: this implementation of kmeans algorithm has a bug i can't fix
	// so to hadle this k needs to be '2k + 2' and remove empty colors
	const clusters = kmeans(colors, k * 2 + 2, (err, res) => {
		if (err) throw new Error(err)
	})

	// Calculate palette (mean colour of each cluster)
	const colours = clusters.cluster.map((x) => meanPoint(x))
	let palette = colours.map((x) => {
		return [Math.floor(x[0]), Math.floor(x[1]), Math.floor(x[2])]
	})
	palette = palette.filter((color) => color) // remove empty elements

	/*
	const palette = clusters.centroids.map(x => [
		Math.floor(x[0]),
		Math.floor(x[1]),
		Math.floor(x[2]),
	])
	*/

	return palette
}

export function fileToImage(file) {
	return new Promise((resolve) => {
		const image = new Image()
		const reader = new FileReader()

		reader.onloadend = (event) => {
			image.src = event.target.result
			image.onload = () => {
				resolve(image)
			}
		}

		reader.readAsDataURL(file)
	})
}

export function isImage(file) {
	return file && IMAGE_FILETYPES.includes(file.type)
}

export function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

import { state, image, imagePixelData } from "@/stores.js"
import { STATES } from "@/consts.js"
export function uploadFile(file) {
	state.set(STATES.LOADING)
	fileToImage(file).then((img) => {
		image.set(img)
		imagePixelData.set(extractPixelData(img))
		state.set(STATES.DONE)
	})
}
