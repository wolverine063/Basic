import React, { useContext } from 'react'
import { UserContext } from './context/Context'

const Home = () => {
  const fruits = useContext(UserContext)
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      background: '#111', // black background
      minHeight: '100vh',
      color: '#fff'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff' }}>GameStore</h1>
        <p style={{ color: '#dcdde1' }}>Discover and buy the best games for all platforms!</p>
      </header>

      <section style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center', // vertically center if needed
        minHeight: '60vh'
      }}>
        {/* Example Game Card */}
        <div style={{
          background: '#222',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          width: '260px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0y.jpg" alt="Game 1" style={{ width: '100%', borderRadius: '8px' }} />
          <h3 style={{ margin: '1rem 0 0.5rem 0', color: '#fff' }}>Cyber Adventure</h3>
          <p style={{ color: '#dcdde1', fontSize: '0.95rem' }}>A thrilling sci-fi RPG set in a futuristic city.</p>
          <strong style={{ color: '#44bd32', fontSize: '1.1rem' }}>$39.99</strong>
          <button style={{
            marginTop: '1rem',
            background: '#273c75',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '0.5rem 1.5rem',
            cursor: 'pointer'
          }}>Buy Now</button>
        </div>

        <div style={{
          background: '#222',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          width: '260px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg" alt="Game 2" style={{ width: '100%', borderRadius: '8px' }} />
          <h3 style={{ margin: '1rem 0 0.5rem 0', color: '#fff' }}>Fantasy Quest</h3>
          <p style={{ color: '#dcdde1', fontSize: '0.95rem' }}>Embark on an epic journey through magical lands.</p>
          <strong style={{ color: '#44bd32', fontSize: '1.1rem' }}>$29.99</strong>
          <button style={{
            marginTop: '1rem',
            background: '#273c75',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '0.5rem 1.5rem',
            cursor: 'pointer'
          }}>Buy Now</button>
        </div>

        <div style={{
          background: '#222',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          width: '260px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg" alt="Game 3" style={{ width: '100%', borderRadius: '8px' }} />
          <h3 style={{ margin: '1rem 0 0.5rem 0', color: '#fff' }}>Racing Legends</h3>
          <p style={{ color: '#dcdde1', fontSize: '0.95rem' }}>Race against the best drivers in the world.</p>
          <strong style={{ color: '#44bd32', fontSize: '1.1rem' }}>$24.99</strong>
          <button style={{
            marginTop: '1rem',
            background: '#273c75',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '0.5rem 1.5rem',
            cursor: 'pointer'
          }}>Buy Now</button>
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '3rem', color: '#dcdde1' }}>
        &copy; {new Date().getFullYear()} GameStore. All rights reserved.
      </footer>
    </div>
  )
}
export default Home