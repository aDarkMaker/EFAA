import './styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from '@/views/dashboard/dashboard'
import { Help } from '@/views/dashboard/help/help'
import { News } from '@/views/dashboard/news/news'
import { Portal } from '@/views/dashboard/portal/portal'
import { Settings } from '@/views/dashboard/settings/settings'
import { SidebarProvider } from '@/views/dashboard/sidebar/context'
import { Tasks } from '@/views/dashboard/tasks/tasks'

function App () {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className='app flex w-screen h-screen overflow-auto' style={{ minWidth: '400px', minHeight: '600px' }}>
          <Routes>
            <Route path='/' element={<Dashboard />}>
              <Route index element={<Portal />} />
              <Route path='tasks' element={<Tasks />} />
              <Route path='settings' element={<Settings />} />
              <Route path='news' element={<News />} />
              <Route path='help' element={<Help />} />
            </Route>
          </Routes>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
