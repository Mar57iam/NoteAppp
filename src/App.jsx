import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthContext from './Context/AuthContext';
import ModalContext from './Context/ModalContext';
import NoteContex from './Context/NoteContex';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const router = createHashRouter(
    [
      {
        path: '',
        element: <Layout />,
        children: [
          { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
          { path: '/', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
    ],

  );

  return (
    <AuthContext>
      <ModalContext>
        <NoteContex>
          <RouterProvider router={router} />
        </NoteContex>
      </ModalContext>
    </AuthContext>
  );
}

export default App;
