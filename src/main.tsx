import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Board from './Board'
import { CardsProvider } from './context/CardsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* PROVEES el Context, esto actua como server: guarda list, addList, toggleTask */}
    <CardsProvider>
      {/* Ahora Board puede consumirlo, usa useCards para conectarse al servidor */}
      <Board />
    </CardsProvider>
  </StrictMode>
)
