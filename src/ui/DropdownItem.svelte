<script>
	import { getContext } from "svelte"
	const dropdown = getContext("dropdown")

	let _default
	export let name
	export let value
	export { _default as default }

	if (_default) {
		if (dropdown) {
			dropdown.setValue(value)
			dropdown.setItem(name)
		}
	}

	function clickHandler() {
		if (dropdown) {
			dropdown.setVisible(false)
			dropdown.setValue(value)
			dropdown.setItem(name)
		}
	}
</script>

<li
	class="block w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
>
	<button
		on:click={clickHandler}
		class="px-4 py-2 text-left size-full active:bg-primary"
	>
		<slot />
	</button>
</li>
