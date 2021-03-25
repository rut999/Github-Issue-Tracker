import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Content from './Components/Content';

function App() {


  return (
      <BrowserRouter>          
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/content" component={Content} />

            </Switch>
      </BrowserRouter>
  );
}

export default App;