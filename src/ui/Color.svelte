<script>
	import CopyIcon from "@/icons/Copy.svelte"
	import { onMount } from "svelte"
	import { MODELS } from "../consts.js"
	import { rgbToHex } from "@/utils.js"

	export let value
	export let model = MODELS.HEX

	let rendered = false
	let button

	onMount(() => {
		rendered = true
	})

	const colorByModel = (mod, val) => {
		if (!val) {
			return "rgb(241 245 249)"
		}

		switch (mod) {
			case MODELS.HEX:
				return rgbToHex(val[0], val[1], val[2])
			case MODELS.RGB:
				return `rgb(${val[0]},${val[1]},${val[2]})`
			default:
				return
		}
	}

	function colorToString(val, mod) {
		switch (mod) {
			case MODELS.HEX:
				return val
			case MODELS.RGB:
				return `${val[0]} ${val[1]} ${val[2]}`
			default:
				return
		}
	}

	$: if (rendered && value) {
		button.style.backgroundColor = colorByModel(model, value)
	}

	function clickHandler() {
		navigator.clipboard.writeText(colorToString(value, model))
	}
</script>

<button
	id="color"
	class="group relative bg-slate-100 border border-slate-300 w-full h-16"
	bind:this={button}
	on:click={clickHandler}
>
	<CopyIcon
		class="text-black [mix-blend-mode:difference] size-8 p-1 rounded invisible opacity-0 bg-white/2 group-hover:visible group-hover:opacity-100 transition-opacity absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
	/>
</button>
