<script>
	import { onMount, getContext } from "svelte"
	const dropdown = getContext("dropdown")
	let menu

	onMount(() => {
		dropdown.setMenu(menu)
		dropdown.listen("visible", (isVisible) => {
			if (isVisible) {
				menu.classList.remove("hidden")
			} else {
				menu.classList.add("hidden")
			}
		})
	})
</script>

<div
	bind:this={menu}
	class="hidden fixed z-10 bg-white divide-y divide-gray-100 border rounded-lg shadow w-44 dark:bg-gray-700"
>
	<ul
		class="py-2 text-sm text-gray-700 dark:text-gray-200"
		aria-labelledby="dropdownDefaultButton"
	>
		<slot />
	</ul>
</div>
