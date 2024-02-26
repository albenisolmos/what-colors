<script>
	import { twMerge } from "tailwind-merge"
	let _this
	export { _this as this }

	const defaultClass =
		"rainbow relative flex justify-center items-center gap-1 min-w-6 h-10 px-4 border rounded-md shadow-gray shadow-sm bg-white dark:bg-zinc-700"

	let finalClass = twMerge(defaultClass, $$props.class)
</script>

<button bind:this={_this} class={finalClass} on:click><slot /></button>
