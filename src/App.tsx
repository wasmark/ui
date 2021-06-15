import React, { FC, ReactElement } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/home';

const App: FC = (): ReactElement => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
