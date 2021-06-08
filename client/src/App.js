import { Fragment, React } from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Index from './components/Index';
import Home from './components/Home'
import Form from './components/Form'
import CardDetails from './components/CardDetails'

function App() {
  /*
  <Route exact path='/ciudad/:ciudadId'
      render={({match}) => <Ciudad city={onFilter(match.params.ciudadId)} />}
  />
  */
  return (
    <Fragment>
      <Route exact path="/" component={Index} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/new" component={Form} />
      <Route exact path="/pokemon/:id" component={CardDetails} />
    </Fragment>
  );
}

export default App;
