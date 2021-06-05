import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../routes/Home';
import Detail from '../routes/Detail';
import Create from '../routes/Create';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
        </Switch>
        <Route exact path="/drama/:url" component={Detail} />
      </Router>
    </>
  );
};

export default App;
