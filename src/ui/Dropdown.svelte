<script>
	import { setContext } from "svelte"
	import { atom } from "nanostores"

	const offset = 8
	let menu
	let trigger
	export let value
	export let item

	const states = {
		visible: atom(false),
		value: atom(),
	}

	states.value.subscribe((val) => {
		value = val
	})

	function placeMenu() {
		const target = trigger
		const popover = menu

		const targetRect = target.getBoundingClientRect()
		const popoverRect = popover.getBoundingClientRect()

		const top = targetRect.top + targetRect.height + offset
		const left =
			targetRect.left + targetRect.width / 2 - popoverRect.width / 2

		popover.style.top = `${top}px`
		popover.style.left = `${left}px`
	}

	setContext("dropdown", {
		listen: (key, cb) => {
			if (states[key]) {
				states[key].subscribe(cb)
			}
		},
		setItem: (_item) => {
			item = _item
		},
		setMenu: (_menu) => {
			menu = _menu
		},
		setTrigger: (_trigger) => {
			trigger = _trigger
		},
		setValue: (value) => {
			states.value.set(value)
		},
		setVisible: (value) => {
			states.visible.set(value)
			if (value == true) {
				console.log("menu", value)
				placeMenu()
			}
		},
		isVisible: () => {
			return states.visible.get()
		},
	})
</script>

<slot />
