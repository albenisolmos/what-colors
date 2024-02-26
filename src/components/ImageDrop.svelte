<script>
	import twColors from "tailwindcss/colors"
	import { state } from "@/stores.js"
	import { uploadFile } from "@/utils.js"
	import { STATES } from "@/consts.js"

	import Dashed from "@/ui/Dashed.svelte"
	import StateInitial from "./StateInitial.svelte"
	import StateLoading from "./StateLoading.svelte"
	import StateDone from "./StateDone.svelte"

	let files
	let colorDashed = twColors.slate[300]

	$: if ($state == STATES.DONE) {
		colorDashed = "transparent"
	} else {
		colorDashed = twColors.slate[300]
	}

	$: if ($state == STATES.INITIAL) {
		files = undefined
	}

	$: if (files && files.length > 0) {
		uploadFile(files[0])
	}

	state.subscribe((newState) => {
		if (newState == STATES.DRAGGING) {
			colorDashed = twColors.slate[900]
		} else {
			colorDashed = twColors.slate[300]
		}
	})
</script>

<Dashed
	stroke={colorDashed}
	class="[stroke-dasharray:20_40] [stroke-linecap:round] stroke-slate-300 dark:stroke-zinc-700 stroke-[0.3em] rounded-[2em] flex justify-center items-center w-full max-w-[55em] aspect-video"
>
	{#if $state == STATES.INITIAL}
		<StateInitial bind:files />
	{:else if $state == STATES.LOADING}
		<StateLoading />
	{:else if $state == STATES.DONE}
		<StateDone />
	{/if}
</Dashed>
