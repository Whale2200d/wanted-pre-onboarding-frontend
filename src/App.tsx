import { Routes, Route } from 'react-router-dom';

import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import Todo from './page/Todo';
import PrivateRoute from './components/PrivateRoute';
import UnprivateRoute from './components/UnprivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<UnprivateRoute />}>
        <Route path="/" element={<SignIn />} />
      </Route>
      <Route element={<UnprivateRoute />}>
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<UnprivateRoute />}>
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/todo" element={<Todo />} />
      </Route>
    </Routes>
  );
}

export default App;
