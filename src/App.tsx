import { Routes, Route } from 'react-router-dom';

import Signup from './page/Signup';
import Signin from './page/Signin';
import Todo from './page/Todo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
