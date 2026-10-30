import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { appRoutes } from './routes'

export function AppRoutes() {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={route.id === 'home' ? <HomePage /> : <PlaceholderPage route={route} />}
        />
      ))}
    </Routes>
  )
}
