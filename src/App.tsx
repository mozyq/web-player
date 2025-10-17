import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import mzq from './mzq.json'

function App() {
  const [ready, setReady] = useState(false)

  const loadingRef = useRef<HTMLDivElement>(null)
  const mzqRef = useRef<HTMLDivElement>(null)
  const masterRef = useRef<HTMLImageElement>(null)
  const imgRefs = useRef<HTMLImageElement[]>([])

  useLayoutEffect(() => {
    Promise.all(
      imgRefs.current.map(img => {
        return new Promise<void>((resolve) => {
          if (img.complete) return resolve()
          console.log('loading image', img.src)
          img.onload = () => resolve()
        })
      })
    ).then(() => {
      setReady(true)
    })
  }, [])

  const DURATION = 3

  useGSAP(() => {
    if (!ready) return
    console.log('animate')
    const tl = gsap.timeline({})
    tl.to(loadingRef.current, { opacity: 0, duration: 1 })
    tl.to(mzqRef.current, { scale: 1 / 15, duration: DURATION })
    tl.fromTo(masterRef.current,
      { opacity: 0, scale: 15 },
      { opacity: .5, scale: 1, duration: DURATION },
      '<'
    )
    tl.to(masterRef.current, { opacity: 1, duration: 2 })
    return () => tl.kill()
  }, [ready])

  const { master, tiles } = mzq[0]

  return <main>
    <div className="loading" ref={loadingRef}>Loading...</div>
    <div className='player'>
      <div className="mzq" ref={mzqRef}>
        {tiles.map((tile, index) => (
          <img
            ref={el => {
              if (el) imgRefs.current[index] = el
            }}
            className='tile'
            key={index}
            src={tile} alt={`tile-${index}`} />
        ))}
      </div>
      <img
        ref={masterRef}
        className='master'
        src={master} alt="master" />
    </div>
  </main>
}

export default App
