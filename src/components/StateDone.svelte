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

<div class="relative h-full w-fit mx-auto">
	<CircleButton class="absolute -left-12 top-0" on:click={resetState}>
		<ResetIcon class="h-6 text-gray-700" />
	</CircleButton>
	<img bind:this={img} src="#" alt="" class="h-full" />
</div>
