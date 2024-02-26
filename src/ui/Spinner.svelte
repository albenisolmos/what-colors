<div class="loader border-[3px] border-slate-300 border-b-sky-700"></div>

<style>
	@media (prefers-color-scheme: dark) {
		.loader {
			--color-spinner: white;
		}
	}

	.loader {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
