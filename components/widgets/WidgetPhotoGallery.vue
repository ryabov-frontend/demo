<template lang="pug">
  .container.blank-container
    .row
      .col-md-12
        silent-box(:gallery = "gallery")

</template>

<script>
export default {
  props: ["items"],
  data: () => ({
    gallery: []
  }),
  mounted() {
    this.items.forEach(x => {
      const item = {
        src: x.image,
        description: '',
        alt: ''
      }
      this.gallery.push(item)
    })
  }
}
</script>

<style lang="sass">

#silentbox-overlay
  z-index: 9999 !important

.silentbox-item
  width: 19% !important
  margin: 0 1% 1.5% 0 !important

  @media (max-width: 767px)
    display: block !important
    text-align: center !important
    float: none !important
    width: 100% !important

  img
    width: 100% !important
    height: 100% !important

    @media (max-width: 767px)
      width: 228px !important
      min-height: 228px !important

</style>
