<script>
	import Card from "@/ui/Card.svelte"
	import { getContext } from "svelte"
	export let content

	const dialog = getContext("dialog")

	function clickHandler() {
		if (dialog) {
			dialog.setPage(content)
		}
	}
</script>

<Card on:click={clickHandler}><slot /></Card>
