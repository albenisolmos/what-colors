<script>
	import Button from "@/ui/Button.svelte"
	import CopyIcon from "@/icons/Copy.svelte"
	import DownloadIcon from "@/icons/Download.svelte"
	import { palette, model } from "@/stores.js"
	import { MODELS } from "@/consts.js"
	import { rgbToHex } from "@/utils.js"

	function colorToString(val, mod) {
		console.log(MODELS, mod)
		switch (mod) {
			case MODELS.HEX:
				return rgbToHex(val[0], val[1], val[2])
			case MODELS.RGB:
				return `${val[0]} ${val[1]} ${val[2]}`
			default:
				return
		}
	}

	function copy() {
		navigator.clipboard.writeText(value)
	}

	let paletteOut = $palette.map((color) => colorToString(color, $model))
	let value = JSON.stringify(paletteOut)
</script>

<div class="box-border pb-1 overflow-y-auto">
	<textarea
		id=""
		name=""
		cols="30"
		rows="10"
		class="border rounded w-full focus:border-sky-500"
	>
		{value}
	</textarea>
	<footer class="flex boxgroup">
		<Button on:click={copy} class="flex-1">
			<CopyIcon class="h-6 text-gray-700" />
			Copy
		</Button>
		<Button class="flex-1">
			<DownloadIcon class="h-6 text-gray-700" />
			Download
		</Button>
	</footer>
</div>
