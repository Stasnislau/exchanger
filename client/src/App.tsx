import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainPage, LoginPage } from './pages'

const availableRoutes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/login',
    component: LoginPage
  }
]

function App() {

  addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Routes >
          {availableRoutes.map(({ path, component }) => (
            <Route key={path} path={path} Component={component} />
          ))}
          <Route path="*" element={<h1 className="flex justify-center text-7xl text-red-500">404</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
