<script>
	import CircleButton from "@/ui/CircleButton.svelte"
	import Dropdown from "@/ui/Dropdown.svelte"
	import DropdownTrigger from "@/ui/DropdownTrigger.svelte"
	import DropdownMenu from "@/ui/DropdownMenu.svelte"
	import DropdownItem from "@/ui/DropdownItem.svelte"
	import ExportOptions from "./ExportOptions.svelte"
	import Dialog from "@/ui/Dialog.svelte"
	import ChevronDownIcon from "@/icons/ChevronDown.svelte"
	import CloseIcon from "@/icons/Close.svelte"
	import { setContext } from "svelte"
	import { MODELS } from "@/consts"
	export let dialog
	let currentPage = ExportOptions

	setContext("dialog", {
		setPage: (_page) => {
			currentPage = _page
		},
	})

	function backPage() {
		if (currentPage == ExportOptions) {
			dialog.close()
		} else {
			currentPage = ExportOptions
		}
	}
	let value
	let item
</script>

<Dialog
	{...$$restProps}
	bind:dialog
	bind:content={currentPage}
	class="w-[40em]"
>
	<header slot="header" class="flex items-center p-2">
		<CircleButton on:click={backPage}>
			<CloseIcon class="h-5 text-gray-700" />
		</CircleButton>

		<span class="flex-1 text-md text-center">Export Palette</span>

		<Dropdown bind:value bind:item>
			<DropdownTrigger class="flex items-center w-max">
				Model:&nbsp;
				<span class="text-gray-500">{item || ""}</span>
				<ChevronDownIcon />
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownItem value={MODELS.HEX} name="Hex" default
					>Hex</DropdownItem
				>
				<DropdownItem value={MODELS.RGB} name="RGB">RGB</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</header>
</Dialog>
