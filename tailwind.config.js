export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0B',
        panel: '#121212',
        accent: '#E5E5E5',
        muted: '#9CA3AF'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui'],
        display: ['Playfair Display', 'serif']
      }
    }
  },
  plugins: []
}
