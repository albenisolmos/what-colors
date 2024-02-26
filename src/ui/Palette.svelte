<script>
	import Color from "./Color.svelte"
	import Button from "./Button.svelte"
	import ExportDialog from "@/components/ExportDialog.svelte"
	import ShareIcon from "@/icons/Share.svelte"
	import MinusIcon from "@/icons/Minus.svelte"
	import PlusIcon from "@/icons/Plus.svelte"
	import { writable } from "svelte/store"
	import { extractColorPalette } from "@/utils.js"
	import { imagePixelData, palette, paletteLength, model } from "@/stores.js"

	const MAX_PALETTE_LENGTH = 16
	let dialog

	function updatePalette(data) {
		if (!data) {
			return
		}

		extractColorPalette(data, $paletteLength)
			.then((newPalette) => {
				palette.set(newPalette)
			})
			.catch((e) => {
				console.error(e)
			})
	}

	function showExportDialog() {
		dialog.showModal()
	}

	imagePixelData.subscribe(updatePalette)
	paletteLength.subscribe(() => {
		updatePalette($imagePixelData)
	})

	let length = writable($paletteLength)

	let timer
	const waitTime = 200
	length.subscribe((len) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			paletteLength.set(len)
		}, waitTime)
	})

	function incrementLength() {
		if ($length == MAX_PALETTE_LENGTH) {
			return
		}

		length.set($length + 1)
	}

	function decrementLength() {
		if ($length == 1) {
			return
		}

		length.set($length - 1)
	}
</script>

<div class="flex flex-col items-center gap-2 w-full max-w-[35em]">
	<div class="flex items-center gap-2">
		<label for="paletteLength">Palette Length</label>
		<div class="boxgroup flex">
			<Button class="w-10 px-0" on:click={decrementLength}>
				<MinusIcon class="text-gray-700 h-6" />
			</Button>
			<input
				name="paletteLength"
				type="number"
				max="16"
				placeholder="Palette length"
				bind:value={$length}
				class="h-10 p-2 ounded border border-slate-200 focus:border-primary outline-none dark:bg-gray-950 dark:border-gray-800"
			/>
			<Button class="text-2xl w-10 px-0" on:click={incrementLength}>
				<PlusIcon class="text-gray-700 h-6" />
			</Button>
		</div>
		<Button class="px-2" on:click={showExportDialog}>
			<ShareIcon class="text-gray-700 h-6" />
		</Button>
	</div>

	<ul class="[&>*]:rounded-[1em] boxgroup w-full flex">
		{#each { length: $paletteLength } as _, i}
			<Color value={$palette[i]} model={$model} />
		{/each}
	</ul>

	<ExportDialog bind:dialog />
</div>
