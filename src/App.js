import { Routes, Route } from 'react-router-dom';
import Register from './Page/Register';
import Login from './Page/Login';

import { Home } from './Page/Home';
import './index.css';
import ChangePass from './Page/ChangePass';
import { DefaultLayout } from './Route/DefaultLayout';
import { UserLayout } from './Route/UserLayout';

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/change-pass" element={<ChangePass />} />
      </Route>
    </Routes>
  );
}

export default App;
