<template>
  <div class="shadow rounded-md">
    <SideMenuTile
      :head="'Get Involved'"
      :subhead="'See what God can do through you.'"
    >
      <SideMenuLink
        icon="icon-Truth-Connections"
        text="Truth Connections"
        :externallink="true"
      />
    </SideMenuTile>
  </div>
</template>

<script>
import SideMenuLink from './SideMenuLink.vue'
import SideMenuTile from '~/components/sidemenu/SideMenuTile.vue'
export default {
  components: {
    SideMenuTile,
    SideMenuLink,
  },
}
</script>
