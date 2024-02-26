<script>
	import Button from "./Button.svelte"
	import { onMount, getContext } from "svelte"
	const dropdown = getContext("dropdown")
	let self

	function clickHandler() {
		if (dropdown) {
			dropdown.setVisible(!dropdown.isVisible())
		}
	}

	onMount(() => {
		if (dropdown) {
			dropdown.setTrigger(self)
		}
	})
</script>

<div bind:this={self}>
	<Button {$$props} on:click={clickHandler}>
		<slot />
	</Button>
</div>
