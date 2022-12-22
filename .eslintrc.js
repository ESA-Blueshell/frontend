module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/base',
    'plugin:vuetify/base'
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off'
      }
    }
  ]
}
