<script>
	import Button from "@/ui/Button.svelte"

	export let files
	let inputFile

	function browseImage() {
		inputFile.click()
	}
</script>

<div class="size-full flex flex-col items-center justify-center">
	<span>Drag or paste any image here or</span>
	<input
		bind:this={inputFile}
		bind:files
		accept="image/*"
		name="myFile"
		type="file"
		class="hidden"
	/>
	<Button on:click={browseImage}>Browse</Button>
</div>
