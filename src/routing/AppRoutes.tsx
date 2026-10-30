import type { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HotelsPage } from '../accommodation/HotelsPage'
import { CodeOfConductPage } from '../conduct/CodeOfConductPage'
import { FoodPage } from '../food/FoodPage'
import { HomePage } from '../home/HomePage'
import { LocationPage } from '../location/LocationPage'
import { SchedulePage } from '../schedule/SchedulePage'
import { SpeakersPage } from '../speakers/SpeakersPage'
import { appRoutes, type RouteId } from './routes'

const routeElements: Record<RouteId, ReactElement> = {
  home: <HomePage />,
  location: <LocationPage />,
  hotels: <HotelsPage />,
  food: <FoodPage />,
  codeOfConduct: <CodeOfConductPage />,
  speakers: <SpeakersPage />,
  schedule: <SchedulePage />,
}

export function AppRoutes() {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={routeElements[route.id]}
        />
      ))}
    </Routes>
  )
}
