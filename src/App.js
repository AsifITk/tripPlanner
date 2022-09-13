
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Components/Pages/Form";
import Example from "./Components/Pages/SignInPage";
import Signup from "./Components/Pages/Signup";
import Alltrips from "./Components/Pages/Alltrips";
import Tripdetails from "./Components/Pages/Tripdetails";
import SeedUsers from "./Components/Pages/SeedUsers";
import { useRef, useState } from "react";
function App() {
  let userId = useRef();
  let [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Example userId={userId.current} setUser={setUser} />}
          />
          <Route
            path="/seedUsers"
            element={<SeedUsers />}
          />
          <Route
            path="/:id"
            element={
              <Alltrips userId={userId.current} user={user} setUser={setUser} />
            }
          />
          <Route
            path="/plan"
            element={<Form userId={userId.current} user={user} />}
          />
          <Route path="signup" element={<Signup />} />
          <Route path="/:user/alltrips/:id" element={<Tripdetails user={user} />} />
          <Route path="tripdetails" element={<Tripdetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
