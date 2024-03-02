<script>
	import { twMerge } from "tailwind-merge"
	export { clazz as class }
	let clazz
	const defaultClass =
		"size-10 flex justify-center items-center bg-white border rounded-full rainbow"
</script>

<button on:click {...$$props} class={twMerge(defaultClass, clazz)}>
	<slot />
</button>
