import { Routes, Route } from 'react-router-dom';
import Register from './Page/Register';
import Login from './Page/Login';

import { Home } from './Page/Home';
import './index.css';
import ChangePass from './Page/ChangePass';
import { DefaultRoute } from './Route/DefaultRoute';
import { UserRoute } from './Route/UserRoute';

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<UserRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/change-pass" element={<ChangePass />} />
      </Route>
    </Routes>
  );
}

export default App;
