<script>
	import Button from "@/ui/Button.svelte"
	export let content
</script>

<textarea name="content" cols="30" rows="10">
	{content}
</textarea>
<div>
	<Button>Copy</Button>
	<Button>Download</Button>
</div>
