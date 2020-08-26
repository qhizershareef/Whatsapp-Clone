import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ChatScreen from './components/Chat';
import {Switch, HashRouter as Router, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import {useSelector} from 'react-redux';

function App() {
  // BEM naming convention: naming components
  // Route can be used directly with components for ex:
  // <Route path="/some" component={HomePage} /> //here homepage function returns a component

  //const [user, setUser] = useState(null); //init user=null 
  let user= null;
  user = useSelector(state => state.user);
  //the reason we need redux is to, store the userToken in store and we can use it to the lowest component from
  //the tree or to the top most, this layer acts as data link where in we could push and pull the data
  return (
     !user?(
      //  <h1>LOGIN</h1>
      //<Login setUser={setUser}/> //one approach is by passing setUser
      <Login />
     ):(
        <div className="App">
            <div className="app_body">
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Sidebar />{/* Side Bar */}
                  </Route>
                  <Route path="/chat/:chatId">
                      <Sidebar/>
                      <ChatScreen/> {/*Chat screen */} 
                  </Route>
                  <Redirect to="/" /> {/* default */}
                </Switch>
              </Router>
            </div>
        </div>
     )
  );
}

export default App;
