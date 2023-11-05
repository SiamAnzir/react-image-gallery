import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageGallery from "./Pages/ImageGallery/ImageGallery.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageGallery/>
    </>
  )
}

export default App
