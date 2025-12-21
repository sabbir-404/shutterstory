import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Category from './pages/Category'
import Album from './pages/Album'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter basename="/shutterstory">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:category" element={<Category />} />
        <Route path="/gallery/:category/:slug" element={<Album />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
