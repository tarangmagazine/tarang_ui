<script>
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	let mainCarousel;
	let articleCarousel;

	onMount(async () => {
		const module = await import('svelte-carousel');
		mainCarousel = module.default;
		articleCarousel = module.default;

		//const mediaQueryList = window.matchMedia('(max-width: 767px)');
		//mediaQueryList.addEventListener('change', mediaQueryHandler);

		// @ts-ignore
		function createImageElement(image) {
			let resImg = document.createElement('img');
			resImg.src = image['path'];
			resImg.classList.add('object-cover');
			resImg.style.height = '100%';
			resImg.style.width = '100%';
			resImg.style.setProperty('--initial_scale', image['init']);
			resImg.style.setProperty('--end_scale', image['end']);
			resImg.style.setProperty('--initPos', image['initPos']);
			resImg.style.setProperty('--endPos', image['endPos']);
			resImg.setAttribute('data-anim', image['anim']);
			return resImg;
		}
		// @ts-ignore
		const imgObjectList = data.images.map(createImageElement);
		let container = document.getElementById('carousel_container');
		let curr = 0;
		changeImage();
		function changeImage() {
			if (curr === data.images.length) {
				curr = 0;
			}
			const animClass = imgObjectList[curr].getAttribute('data-anim');
			// @ts-ignore
			if (container.childElementCount > 0) {
				// @ts-ignore
				imgObjectList[curr].classList.remove(animClass);
				imgObjectList[curr].removeEventListener('animationend', changeImage);
				// @ts-ignore
				container.removeChild(container.children[0]);
			}
			// @ts-ignore
			imgObjectList[curr].classList.add(animClass);
			imgObjectList[curr].addEventListener('animationend', changeImage);
			// @ts-ignore
			container.appendChild(imgObjectList[curr]);
			curr++;
		}
	});
</script>

<div id="carousel_container" class="w-full h-96 md:h-[36rem] overflow-hidden" />

<p
	class="px-4 md:px-36 pt-16 pb-24 font-serif text-3xl text-center leading-normal property"
	data-theme="light"
>
	India cannot be defined but can be experienced. Tarang deepens that experience with articles that
	are joyous, earthy and sincere.
</p>

<!--div class="card lg:card-side bg-base-100 shadow-xl">
	<figure><img src="/carousel/3.png" alt="Album" /></figure>
	<div class="card-body">
		<h2 class="card-title">New album is released!</h2>
		<p>Click the button to listen on Spotiwhy app.</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">Listen</button>
		</div>
	</div>
</div-->

<div class="flex justify-center mb-12" data-theme="light">
	<div
		class="flex flex-col md:flex-row w-3/5 md:max-w-7xl rounded-3xl shadow-lg"
		data-theme="garden"
	>
		<img
			class="m-auto w-52 h-auto my-10 md:ml-10 md:mr-20 md:w-72 md:h-96 object-cover rounded-3xl"
			src="/carousel/3.png"
			alt="kalaripayattu"
		/>
		<div class="p-6 flex flex-col justify-start">
			<div class="pt-12 md:pt-24 pb-2 font-serif text-xl leading-normal property">
				<h2>
					{data['release_date']}
				</h2>
			</div>
			<div class="pt-2 pb-2 font-serif text-4xl leading-normal property">
				<h2>{`Edition ${data['edition_id']}`}</h2>
			</div>
			<div class="pt-2 pb-2 font-serif text-3xl leading-normal property">
				<h2>{data['edition_id']}</h2>
			</div>
			<div>
				<button class="btn btn-primary">Read Now</button>
			</div>
		</div>
	</div>
</div>

<div data-theme="autumn">
	<div class="container my-24 mx-auto px-4 md:px-12">
		<div class="flex flex-wrap -mx-1 lg:-mx-4">
			<!-- Column -->
			{#each data.articles as article, ix}
				<div class="my-2 px-1 w-full md:w-1/2 lg:my-4 lg:px-12 lg:w-1/3">
					<!-- Article -->
					<article class="overflow-hidden rounded-3xl shadow-lg">
						<a href="#">
							<img
								alt="Placeholder"
								class="block h-96 w-full object-cover"
								src={data.images[ix]['path']}
							/>
						</a>

						<header class="flex items-center justify-between leading-tight p-2 md:p-4">
							<h1 class="text-lg">
								<a class="no-underline hover:underline text-black" href="#"
									>{article['attributes']['title']}</a
								>
							</h1>
							<p class="text-grey-darker text-sm">
								{`${article['attributes']['min_read']} mins read`}
							</p>
						</header>
					</article>
					<!-- END Article -->
				</div>
			{/each}
			<!-- END Column -->
		</div>
	</div>
</div>

<!--div class="grid grid-cols-3 my-24">
	{#each data.articles as article}
		<div>
			<img
				class="mx-auto my-10 h-96 w-96 rounded-3xl object-cover"
				src="/carousel/1.png"
				alt="kalaripayattu"
			/>
			<p class="font-serif text-xl mx-auto px-4 text-center">{article['attributes']['title']}</p>
			<p class="font-serif mx-auto px-4 text-center">
				{`${article['attributes']['min_read']} mins read`}
			</p>
		</div>
	{/each}
</div-->

<div class="hero min-h-screen" style="background-image: url(/carousel/3.png);">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Jayanti Kumaresh</h1>
			<p class="mb-5">
				Knowledge expands with time, there is no stopping anywhere. And the progress is in the
				attitude of the musicians. Even now, I still play because the attitude to learn and
				contribute never stops. With true humility and gratefulness to people who contribute to it,
				there will be individual growth and so there will be overall progress.
			</p>
		</div>
	</div>
</div>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row">
		<img
			src="/carousel/3.png"
			alt="Jayanti"
			class="max-w-sm rounded-lg shadow-2xl h-96 w-full object-cover"
		/>
		<div>
			<p class="py-6">
				Knowledge expands with time, there is no stopping anywhere. And the progress is in the
				attitude of the musicians. Even now, I still play because the attitude to learn and
				contribute never stops. With true humility and gratefulness to people who contribute to it,
				there will be individual growth and so there will be overall progress.
			</p>
		</div>
	</div>
</div>
