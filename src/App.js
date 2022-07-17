import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  return (
   <BrowserRouter>
      <Route path ="/login" component={Login}/>
      <Route path ="/signup" component={Signup}/>
  
   </BrowserRouter>
  );
}

export default App;
