<template>
  <footer class="hidden sm:block bg-secondary">
    <div class="container mx-auto px-8 py-4">
      <div class="grid grid-cols-6 text-warm-gray-50">
        <div class="col-span-2 p-2">
          <h4 class="head">PHYSICAL AND MAILING ADDRESS:</h4>
          <p class="">
            <span>Tampa Campus:</span><br />
            5201 N. Armenia Ave. Tampa, FL 33603
          </p>
          <p class="mb-2">
            <span>P:</span> 813-354-1135<br />
            <span>E:</span> inquiries@revealingtruth.org
          </p>
          <h4 class="head">Connect with Us</h4>
          <div class="flex space-x-4">
            <svg class="icon">
              <use xlink:href="/images/icons/sprite.svg#icon-facebook"></use>
            </svg>
            <svg class="icon">
              <use xlink:href="/images/icons/sprite.svg#icon-instagram"></use>
            </svg>
            <svg class="icon">
              <use xlink:href="/images/icons/sprite.svg#icon-youTube"></use>
            </svg>
          </div>
        </div>
        <div class="col-span-3 p-2">
          <h4 class="head">Revealing Truth Ministries</h4>
          <p class="">
            We are Revealing Truth Ministries - Where lives are changed, communities are
            impacted and Christ is put on display through the Simple Truth of God’s Word.
          </p>
        </div>
        <div class="p-2">
          <h4 class="head">Upcoming Events</h4>
          <a
            href="https://revealingtruthdepartments.churchcenter.com/registrations"
            class="btn btn-white"
            rel="noopener noreferrer"
            target="_blank"
            >Events</a
          >
        </div>
      </div>
    </div>
    <div class="bg-secondaryDark">
      <div class="container mx-auto p-4">
        <div class="text-center pb-2">
          <!-- <nuxt-link to="/" class="flex items-center text-white">
						<svg class="h-6 w-6 mr-2 fill-current">
							<use xlink:href="/images/icons/sprite.svg#icon-logo"></use>
						</svg>
						<div class="uppercase font-bold mr-4">
							Revealing Truth Ministries
						</div>
					</nuxt-link> -->
          <p class="text-sm text-center text-secondaryLight">
            Revealing Truth Ministries Christian Center | RTM Nation | Embracing Legacy |
            Copyright All Rights Reserved © 2022
          </p>
        </div>

        <div
          class="flex uppercase text-xs divide-x text-secondaryLight divide-secondaryLight justify-center"
        >
          <nuxt-link
            class="px-2 hover:text-accent"
            v-for="(link, index) in navigationLinks"
            :key="index"
            :to="link.destination"
            >{{ link.name }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
	height: 1.5rem;
	width: 1.5rem;
	--tw-fill-opacity: 1;
  fill: rgba(250, 250, 250, var(--tw-fill-opacity));

	&:hover{
		--tw-fill-opacity: 1;
  fill: rgba(217, 224, 33, var(--tw-fill-opacity));
	}
}

.head {
	font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
	text-transform: uppercase;
	font-weight: 700;
	 margin-bottom: 0.5rem;

}

p {
	font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
	letter-spacing: 0.025em;
	font-light;


  span {
    font-weight: 700;
  }
}
</style>
