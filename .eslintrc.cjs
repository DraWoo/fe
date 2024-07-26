module.exports = {
  env: {
    node: true,
  },
  plugins: ['vue'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'Table',
          'Topbar',
          'Room',
          'Menu',
          'Breadcrumb',
          'Dialog',
          'Tippy',
          'Switch',
          'Listbox',
          'History',
          'Profile',
          'Info',
          'Guide',
          'Issue',
          'Radio',
          'Doughnut',
          'Bar',
          'Scatter',
          'Line',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: ['@', './src'],
    },
  },
}
