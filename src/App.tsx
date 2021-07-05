import { BrowserRouter, Route, Switch /* pra ter só uma pagina ao mesmo tempo */ } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import {AuthContextProvider} from "./contexts/AuthContexts";
import { Room } from "./pages/Room";

function App() {

  return (
      <BrowserRouter>  
        <AuthContextProvider>
          <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" exact component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          </Switch>
          </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;