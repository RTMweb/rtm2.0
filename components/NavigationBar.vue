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

<script setup>
const scrolledNav = ref(null);
const mobile = ref(false);
const mobileNav = ref(false);
const windowWidth = ref(null);

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

onMounted(() => {
  const checkScreen = () => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value <= 1050) {
      mobile.value = true;
      return;
    }
    mobile.value = false;
    mobileNav.value = false;
    return;
  };

  const updateScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      scrolledNav.value = true;
      return;
    }
    scrolledNav.value = false;
  };

  window.addEventListener("scroll", updateScroll);

  window.addEventListener("resize", checkScreen);
  checkScreen();
});
</script>

<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <nuxt-link :to="{ name: 'index' }" class="branding">
        <svg class="logo">
          <use :xlink:href="'/images/icons/sprite.svg#icon-logo'"></use>
        </svg>

        <div class="text-blue-gray-50 text-4xl font-black ml-2">RTM</div>
      </nuxt-link>

      <ul v-show="!mobile" class="navigation text-blue-gray-50">
        <li v-for="(link, index) in navigationLinks" :key="index">
          <a :href="link.destination" v-if="link.external">{{ link.name }}</a>
          <nuxt-link :to="link.destination" class="link" v-else>{{
            link.name
          }}</nuxt-link>
        </li>
      </ul>
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>
      <transition name="mobile-nav">
        <div v-show="mobileNav" class="dropdown-nav">
          <button class="" @click="toggleMobileNav">Close</button>
          <button class="" href="/">Watch Now</button>

          <div class="">
            <div v-for="(link, index) in navigationLinks" :key="index">
              <a :href="link.destination" v-if="link.external">{{ link.name }}</a>
              <nuxt-link :to="link.destination" class="link" v-else>{{
                link.name
              }}</nuxt-link>
            </div>
          </div>

          <div>
            <h2>Connect</h2>
            <div class="flex space-x-2">
              <svg class="w-6 h-6">
                <use xlink:href="/images/icons/sprite.svg#icon-facebook"></use>
              </svg>
              <svg class="w-6 h-6">
                <use xlink:href="/images/icons/sprite.svg#icon-youTube"></use>
              </svg>
              <svg class="w-6 h-6">
                <use xlink:href="/images/icons/sprite.svg#icon-instagram"></use>
              </svg>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  --tw-bg-opacity: 1;
  background-color: rgba(77, 77, 77, var(--tw-bg-opacity));
  z-index: 40;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;

  nav {
    position: relative;
    display: flex;
    padding: 1rem;
    margin-left: auto;
    margin-right: auto;
    transition: 0.5s ease all;
    width: 90%;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .link {
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      list-style: none;
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 1rem;
      margin-left: 1rem;
    }

    .link {
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: #d9e021;
        //  @apply text-accent border-accent;
      }

      &.router-link-active {
        color: #d9e021;
        // @apply text-accent border-accent;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      .logo {
        fill: #fff;
        height: 3rem;
        width: 3rem;
        fill: #fff;
      }
    }

    .navigation {
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1 1 0%;
      -webkit-flex: 1 1 0%;
      flex: 1 1 0%;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      -webkit-justify-content: flex-end;
      justify-content: flex-end;
    }

    .icon {
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      display: flex;
      position: absolute;
      top: 0px;
      height: 100%;
      right: 24px;

      i {
        cursor: pointer;
        color: #fff;
        font-size: 20px;
        transition: 0.8s ease all;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      -webkit-flex-direction: column;
      flex-direction: column;
      position: fixed;
      top: 0px;
      right: 0px;
      height: 100%;
      width: 100%;
      max-width: 24rem;
      background-color: #fff;
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(100%);
    }
    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}
.scrolled-nav {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  nav {
    padding: 8px 0;

    .branding {
      align-items: center;

      .image {
        height: 2.5rem;
        width: 2.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>
