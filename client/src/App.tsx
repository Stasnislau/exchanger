import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainPage, LoginPage, ErrorPage } from './pages'

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
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
