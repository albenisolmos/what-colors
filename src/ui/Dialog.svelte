<script>
	import { twMerge } from "tailwind-merge"
	export let content
	export let dialog
	export { clazz as class }
	let clazz

	const defaultClass =
		"w-96 aspect-video border rounded-lg shadow-md divide-y"
	const className = twMerge(defaultClass, clazz)
</script>

<dialog bind:this={dialog} {...$$restProps} class={className}>
	<slot name="header" />
	<main class="p-2 overflow-hidden">
		<svelte:component this={content}></svelte:component>
	</main>
</dialog>
