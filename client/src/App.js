import { Route, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import Form from "./Views/Form/Form";
import NavBar from "./Components/NavBar/NavBar";

//solo seteo las rutas e importo los componentes ppales
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}

      <Route exact path="/" render = { ()=>
      <Landing/>}
      />
      <Route path = "/home" render={()=>
      <Home/>
      }/>
      <Route path="/detail/:id" render ={()=>
      <Detail/>
      }/>
      <Route path="/form" render={()=>
      <Form/>
      }/>
      
    </div>
  );
}

export default App;

