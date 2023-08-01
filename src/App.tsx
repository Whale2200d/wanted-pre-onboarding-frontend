import { Routes, Route } from 'react-router-dom';

import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import Todo from './page/Todo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
