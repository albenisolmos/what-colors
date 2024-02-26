<script>
	import { twMerge } from 'tailwind-merge'

	const defaulClass = 'flex border border-slate-100 rounded-md'
	let clazz
	export {clazz as class}

	clazz = twMerge(defaulClass, clazz)	
</script>

<div class={clazz}>
	<slot />
</div>
