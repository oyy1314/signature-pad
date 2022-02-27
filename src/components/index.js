import signature from './signature/index.vue'

const components = {
  signature
}

function install(app) {
  const keys = Object.keys(components)
  keys.forEach(name => {
    app.component(name, components[name])
  })
}

export default {
  install
}
