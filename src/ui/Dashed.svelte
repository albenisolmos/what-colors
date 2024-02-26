<script>
	import { twMerge } from "tailwind-merge"
	import { onMount } from "svelte"
	export { clazz as class }
	export let stroke

	const defaultClass = "relative"
	let clazz
	let svg
	let rect
	let x = "0"
	let y = "0"
	let width = "100%"
	let height = "100%"
	let radious = "30"

	onMount(() => {
		function outputsize() {
			if (!svg) {
				return
			}
			const svgStyles = getComputedStyle(svg)
			const svgWidth = svg.width.baseVal.value
			const svgHeight = svg.height.baseVal.value
			const strokeWidth = parseInt(
				svg.getAttribute("stroke-width") ?? svgStyles.strokeWidth ?? 0,
				10,
			)

			if (svgWidth < 1 || svgHeight < 1) {
				return
			}

			x = strokeWidth / 2
			y = strokeWidth / 2
			width = svgWidth - strokeWidth
			height = svgHeight - strokeWidth
			radious = parseInt(svgStyles.borderRadius, 10)
			svg.removeAttribute("opacity")
		}

		new ResizeObserver(outputsize).observe(svg)
	})
</script>

<div class={twMerge(defaultClass, clazz)}>
	<svg
		bind:this={svg}
		opacity="0"
		class="[fill:inherit] [stroke:inherit] [stroke-dasharray:inherit] [stroke-dashoffset:inherit] [stroke-linecap:inherit] [stroke-width:inherit] [border-radius:inherit]"
		width="100%"
		height="100%"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			bind:this={rect}
			{x}
			{y}
			{width}
			{height}
			ry={radious}
			rx={radious}
			fill="none"
			{stroke}
		/>
	</svg>

	<div class="absolute left-0 top-0 size-full">
		<slot />
	</div>
</div>
