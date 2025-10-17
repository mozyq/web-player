import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './App.css'
import mzq from './mzq.json'

function App() {

  useGSAP(() => {
    console.log(gsap)

  })

  const { master, tiles } = mzq[0]
  return <main>
    <div className='player'>
      <div className="mzq">
        {tiles.map((tile, index) => (
          <img key={index} src={tile} alt={`tile-${index}`} />
        ))}
      </div>
      <img className='master' src={master} alt="master" />
    </div>
  </main>
}

export default App
