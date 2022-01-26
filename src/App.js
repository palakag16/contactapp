import React from 'react'
import Loginpage from './Loginpage';
import { Switch, Route } from 'react-router-dom';
import Contactpage from './Contactpage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'><Loginpage /></Route>
        <Route exact path='/contact'> <Contactpage/></Route>
      </Switch>
    </div>
  )
}

export default App
