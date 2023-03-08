/** @type {import('tailwindcss').Config} */
config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(var(--initial_scale))' },
          '100%': { transform: 'scale(var(--end_scale))' },
        },

        move: {
          '0%': { 'object-position': 'var(--initPos)' },
          '100%': { 'object-position': 'var(--endPos)' },
        },

      },
      animation: {
        zoom: 'zoom 12s ease-in-out',
        move: 'move 5s ease-in-out',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui')
  ],
  darkMode: 'class',
  daisyui: {
    themes: ["light", "retro", "garden", "aqua", "autumn"],
  },
};

module.exports = config;