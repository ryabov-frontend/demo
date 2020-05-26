<template lang="pug">
  div

    widget-header-slider(
      v-if = "data.template === 'header' && data.items !== null"
      :items = "data.items"
      :template = "template")

    widget-menu-index(
      v-if = "data.template === 'menu_index'"
      :title = "data.name.title"
      :template = "template")

    widget-guests(
      v-if = "data.template === 'next_omk'"
      :related = "related"
      :currency = "options.currency"
      :title = "data.name.title"
      :template = "template")

    widget-html(
      v-if = "data.template === 'html_block'"
      :tag = "data.name.tag"
      :title = "data.name.title"
      :content = "data.content"
      type = "html"
      :template = "template")

    widget-html(
      v-if = "data.template === 'text_block'"
      :tag = "data.name.tag"
      :title = "data.name.title"
      :content = "data.content"
      type = "text"
      :template = "template"
      :breadcrumbs = "breadcrumbs")

    widget-tripa(
      v-if = "data.template === 'tripadvisor_index_block'"
      :label = "options.trip_text"
      :link = "options.trip_link"
      :image = "options.trip_logo"
      gradient = "gradient-v"
      :template = "template")

    widget-tripa(
      v-if = "data.template === 'tripadvisor_page_block'"
      :image = "options.trip_logo"
      :label = "options.trip_text"
      :text = "data.content"
      :link = "data.button.link"
      :template = "template")

    widget-certificate(
      v-if = "data.template === 'promo_block'"
      :name = "data.name"
      :button = "data.button"
      :template = "template")

    widget-features(
      v-if = "data.template === 'feature'"
      :name = "data.name"
      :items = "data.items"
      :template = "template")

    widget-formula(
      v-if = "data.template === 'formula'"
      :name = "data.name"
      :template = "template")

    widget-blocks(
      v-if = "data.template === 'blocks'"
      :name = "data.name"
      :items = "data.items"
      :template = "template")

    widget-list(
      v-if = "data.template === 'list_dr'"
      :name = "data.name"
      :template = "template")

    widget-plan(
      v-if = "data.template === 'plan_event'"
      :name = "data.name"
      :button = "data.button"
      :template = "template")

    widget-cost(
      v-if = "data.template === 'cost'"
      :name = "data.name"
      :content = "data.content"
      :button = "data.button"
      :template = "template")

    widget-polaroid(
      v-if = "['polaroid_5', 'polaroid_3'].includes(data.template)"
      :name = "data.name"
      :items = "data.items"
      :template = "template")

    widget-rounded(
      v-if = "data.template === 'rounded_image'"
      :name = "data.name"
      :items = "data.items"
      :template = "template")

    widget-include-cost(
      v-if = "data.template === 'include_cost'"
      :name = "data.name"
      :content = "data.content"
      :template = "template")

    widget-slider-default(
      v-if = "['default', 'default_white_icons', 'tabs_slider', 'default_top_icons'].includes(data.template)"
      :name = "data.name"
      :button = "data.button"
      :items = "data.items"
      :template = "template"
      :icons = "data.template === 'default_white_icons'"
      :gray = "data.template === 'default_top_icons'"
      :wd = "data.template === 'default_top_icons'")

    widget-slider-index(
      v-if = "data.template === 'index_page'"
      :name = "data.name"
      :button = "data.button"
      :items = "data.items"
      :template = "template")

    widget-additional(
      v-if = "data.template === 'additional_services'"
      :name = "data.name"
      :button = "data.button"
      :items = "data.items"
      :mini = "true"
      :template = "template")

    widget-additional(
      v-if = "data.template === 'additional_services_2'"
      :name = "data.name"
      :button = "data.button"
      :items = "data.items"
      :mini = "false"
      :template = "template")

    widget-photo-gallery(
      v-if = "data.template === 'photo_gallery'"
      :items = "data.items"
      :template = "template")

    widget-about(
      v-if = "data.template === 'about'"
      :name = "data.name"
      :items = "data.items"
      :template = "template")

    widget-clients(
      v-if = "data.template === 'our_clients_index'"
      :name = "data.name"
      :items = "data.items"
      :template = "template")

</template>

<script>
import WidgetMenuIndex from "~/components/widgets/WidgetMenuIndex"
import WidgetGuests from "~/components/widgets/WidgetGuests"
import WidgetHtml from "~/components/widgets/WidgetHtml"
import WidgetTripa from "~/components/widgets/WidgetTripa"
import WidgetCertificate from "~/components/widgets/WidgetCertificate"
import WidgetHeaderSlider from "~/components/widgets/WidgetHeaderSlider"
import WidgetFeatures from "~/components/widgets/WidgetFeatures"
import WidgetFormula from "~/components/widgets/WidgetFormula"
import WidgetBlocks from "~/components/widgets/WidgetBlocks"
import WidgetList from "~/components/widgets/WidgetList"
import WidgetPlan from "~/components/widgets/WidgetPlan"
import WidgetCost from "~/components/widgets/WidgetCost"
import WidgetPolaroid from "~/components/widgets/WidgetPolaroid"
import WidgetRounded from "~/components/widgets/WidgetRounded"
import WidgetIncludeCost from "~/components/widgets/WidgetIncludeCost"
import WidgetSliderDefault from "~/components/widgets/WidgetSliderDefault"
import WidgetAdditional from "~/components/widgets/WidgetAdditional"
import WidgetPhotoGallery from "~/components/widgets/WidgetPhotoGallery"
import WidgetAbout from "~/components/widgets/WidgetAbout"
import WidgetSliderIndex from "~/components/widgets/WidgetSliderIndex"
import WidgetClients from "~/components/widgets/WidgetClients"

export default {
  components: {
    WidgetMenuIndex,
    WidgetGuests,
    WidgetHtml,
    WidgetTripa,
    WidgetCertificate,
    WidgetHeaderSlider,
    WidgetFeatures,
    WidgetFormula,
    WidgetBlocks,
    WidgetList,
    WidgetPlan,
    WidgetCost,
    WidgetPolaroid,
    WidgetRounded,
    WidgetIncludeCost,
    WidgetSliderDefault,
    WidgetSliderIndex,
    WidgetAdditional,
    WidgetPhotoGallery,
    WidgetAbout,
    WidgetClients
  },
  props: ["data", "options", "related", "template", "breadcrumbs"]
}
</script>
