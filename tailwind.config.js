export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f1115',        // soft charcoal
        panel: '#161a22',     // elevated surfaces
        soft: '#aab0c0',      // muted text
        accent: '#e6e8ee',    // main readable text
        borderSoft: 'rgba(255,255,255,0.08)'
      },
      boxShadow: {
        glass: '0 8px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
}
