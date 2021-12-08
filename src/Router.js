import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Navigation/>
  
      <Routes>
        <Route path="/documentation"></Route>

        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
