import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock"

export const state = () => ({
  loadingWrapper: false,
  language: "ru-RU",
  scrollTop: 0,
  headerMenuHide: false,
  actions: {
    modal: {
      place: false
    }
  },
  cart: { items: [], cost: 0, count: 0 },
  cartShow: false,
  colors: [
    '#FFD200',
    '#E61676',
    '#940084',
    '#D4D800',
    '#E94F0A',
    '#B30949',
    '#00AFDA'
  ]
})

export const mutations = {
  initModal(state, data) {
    state.actions.modal = data
    disableBodyScroll()
  },
  closeModal(state) {
    state.actions.modal = {
      place: false
    }
    enableBodyScroll()
  },
  headerMenuHide(state, data) {
    state.headerMenuHide = data
  },
  updateCart(state, data) {
    let cart = data
    if (process.env.NODE_ENV !== 'production') {
      cart = {"items":[{"itemId":"c185de4a9f4c74ab215031e581ca3dd7","id":73,"name":"Подарочный сертификат ( 6000 р.)","slug":"/calendar/podarocnyj-sertifikat-6000-r.html","img":"/uploads/cache/placeHolder/placeHolder_85x85.png","count":"1","price":6000,"cost":6000,"dateStart":null}],"sum":6000,"cost":6000,"count":1,"deliveryPrice":0,"deliveryName":null,"discountPrice":0,"discountName":null}
    }
    if (cart && !cart.items) {
      cart.items = []
    }
    state.cart = cart
    if (process.browser) {
      localStorage.setItem('culinatyon-cart', JSON.stringify(cart))
    }
  },
  updateCartShow(state, data) {
    state.cartShow = data
  },
  scrollTop(state, data) {
    state.scrollTop = data
  },
  loadingWrapper(state, data) {
    state.loadingWrapper = data
  },
}

export const actions = {
  analytic({ commit }, data) {
    // Не удалять, уже используется в корзине
  },
  showModal({ commit }, data) {
    if (data.place === "addedcart") {
      // Товар добавлен в корзину

      if (
        data &&
        data.data &&
        data.data.response &&
        data.data.response.result
      ) {
        commit("updateCart", data.data.response.cart)
      }
    }

    commit("initModal", {
      place: data.place,
      analytic: data.analytic,
      data: data.data || {}
    })
  },
  hideModal({ commit }) {
    commit("closeModal")
  },
  headerMenuHide({ commit }, data) {
    commit("headerMenuHide", data)
  },
  scrollTop({ commit }, data) {
    commit("scrollTop", data)
  },
  updateCart({ commit }, data) {
    commit("updateCart", data)
  },
  updateCartShow({ commit }, data) {
    commit("updateCartShow", data)
  },
  async removeItemFromCart({ commit }, data) {
    const response = await this.$axios.$get(
      `/api/cart/remove?itemId=${data.product.itemId}`
    )

    // todo: разобраться с аналитикой
    // if (data.analytic) {

    //   dispatch("analytic", data.analytic)
    // }

    commit("updateCart", response.cart || response)
  },
  async updateItemFromCart({ commit }, data) {
    const response = await this.$axios.$get(
      `/api/cart/change?itemId=${data.productId}&productCount=${data.count}`
    )

    commit("updateCart", response.cart || response)
  },
  jivo({ commit }, data) {
    function insertAndExecute(id, text) {
      let domelement = document.getElementById(id)

      domelement.innerHTML = text

      // console.log("step-1", domelement, domelement.innerHTML)

      let scripts = []
      let childNodes = domelement.childNodes

      // console.log("step-2", childNodes)

      let access = true

      for (var i = 0; childNodes[i]; i++) {
        if (scripts && nodeName(childNodes[i], "noscript")) {
          let childNodes_one = childNodes[i].childNodes
          // console.log("step-3", childNodes_one)

          for (var n = 0; childNodes_one[n]; n++) {
            if (
              !nodeName(childNodes_one[n], "div") &&
              !nodeName(childNodes_one[n], "script") &&
              !nodeName(childNodes_one[n], "noscript")
            ) {
              if (access) {
                const id = Math.floor(Date.now() / 1000)
                let noscript = document.createElement("noscript")
                noscript.id = id
                domelement.appendChild(noscript)

                // console.log("step-4", noscript, childNodes_one[n].childNodes)

                insertAndExecute("scripts", childNodes_one[n].textContent)

                access = false
              }
            }
          }
        } else if (
          nodeName(childNodes[i], "script") &&
          (!childNodes[i].type ||
            childNodes[i].type.toLowerCase() === "text/javascript")
        ) {
          scripts.push(
            childNodes[i].parentNode
              ? childNodes[i].parentNode.removeChild(childNodes[i])
              : childNodes[i]
          )
        }
      }

      for (let script in scripts) {
        evalScript(scripts[script])
      }
    }

    function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase()
    }

    function evalScript(elem) {
      data = elem.text || elem.textContent || elem.innerHTML || ""

      var head =
          document.getElementsByTagName("head")[0] || document.documentElement,
        script = document.createElement("script")
      script.type = "text/javascript"
      script.appendChild(document.createTextNode(data))
      head.insertBefore(script, head.firstChild)
      head.removeChild(script)

      if (elem.parentNode) {
        elem.parentNode.removeChild(elem)
      }
    }

    insertAndExecute("scripts", data)
  }
}
