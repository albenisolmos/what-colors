import { atom } from "nanostores"
import { MODELS, STATES } from "./consts.js"

export const palette = atom([])
export const paletteLength = atom(4)
export const image = atom()
export const imagePixelData = atom()
export const model = atom(MODELS.HEX)
export const state = atom(STATES.INITIAL)

state.subscribe((st) => {
	console.log(Object.keys(STATES)[st])
})
