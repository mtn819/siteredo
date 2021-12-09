import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Documentation from "./pages/Documentation/Documentation";
import Classification from "./pages/Classification/Classification";
import Home from "./pages/Home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Navigation/>
  
      <Routes>
        <Route path="/classification" element={<Classification />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
