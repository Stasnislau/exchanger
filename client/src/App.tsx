import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom"
import { MainPage, LoginPage, ErrorPage } from './pages'
import HighOrderComponent from "./components/hoc"
import { Context } from "./main"
import { useContext, JSX } from "react"

const availableRoutes = [
  {
    path: '/',
    component: MainPage,
    requiresAuth: true,
  },
  {
    path: '/login',
    component: LoginPage,
    requiresAuth: false
  }
]

function App() {
  const store = useContext(Context);
  addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth / 100}px`);
  }
  );

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

    return store.state.isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <HighOrderComponent>
          <Routes>
            {availableRoutes.map(({ path, component: Component, requiresAuth }) =>
              requiresAuth ? (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              ) : (
                <Route key={path} path={path} element={<Component />} />
              )
            )}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </HighOrderComponent>
      </div>
    </BrowserRouter>
  );

}

export default App
