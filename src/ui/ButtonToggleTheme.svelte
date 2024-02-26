<script>
	import { onMount } from 'svelte'

	let button
	let darkIcon
	let lightIcon
	const THEMES = {
		LIGHT: 'light',
		DARK: 'dark',
	}

	function clickHandler() {
		// toggle icons inside button
		const element = document.documentElement;
		element.classList.toggle("dark");

		const isDark = element.classList.contains("dark");
		localStorage.setItem("theme", isDark ? THEMES.DARK : THEMES.LIGHT);

		if (isDark) {
			lightIcon.classList.toggle('hidden');
			darkIcon.classList.toggle('hidden');
		} else {
			darkIcon.classList.toggle('hidden');
			lightIcon.classList.toggle('hidden');
		}
	}

	function getTheme() {
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme')
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return THEMES.DARK
		}

		return THEMES.LIGHT
	}

	onMount(() => {
		if (!($$slots['icon-light'] && $$slots['icon-dark'])) {
			throw Error('ButtonToggleTheme needs two named slots')
		}

		lightIcon = button.children[0]
		darkIcon = button.children[1]

		lightIcon.classList.add('hidden')
		darkIcon.classList.add('hidden')

		if (getTheme() == THEMES.DARK) {
			document.documentElement.classList.add('dark');
			lightIcon.classList.toggle('hidden');
		} else {
			document.documentElement.classList.remove('dark')
			darkIcon.classList.toggle('hidden');
		}
	})
</script>

<button on:click={clickHandler} bind:this={button} class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
	<slot name='icon-light'/>
	<slot name='icon-dark'/>
</button>
