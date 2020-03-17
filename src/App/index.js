import React from 'react';
import './style.scss';
import {Switch, Route} from "react-router-dom";

import Posts from "./Pages/Posts"
import ViewPost from "./Pages/ViewPost"

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Posts} />
      <Route path="/view-post/:id" component={ViewPost} />
    </Switch>

  );
}

export default App;
