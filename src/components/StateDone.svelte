<script>
	import CircleButton from "@/ui/CircleButton.svelte"
	import ResetIcon from "@/icons/Reset.svelte"
	import { onMount } from "svelte"
	import { state, image } from "@/stores.js"
	import { STATES } from "@/consts.js"

	let img

	function resetState() {
		state.set(STATES.INITIAL)
	}

	onMount(() => {
		img.src = $image.src
	})
</script>

<div class="size-full flex justify-center gap-2">
	<CircleButton on:click={resetState} class="p-none">
		<ResetIcon class="h-6 text-gray-700" />
	</CircleButton>
	<img bind:this={img} src="#" alt="" class="h-full" />
</div>
