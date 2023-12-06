import logo from './logo.svg';
import './App.css';
import Login from './components/loginandsignup/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/loginandsignup/Signup';
import Home from './components/home/Home';
import Myprofile from './components/home/myprofile/Myprofile';
import Second_person_prof from './components/home/secondpersonprofile/Second_person_prof';
import Chat from './components/home/chats/Chat';


function App() {
  return (
    <div >
 <BrowserRouter>


<Routes>




<Route  element={<Login/>} path='/'/>


<Route element={<Signup/>}  path='/signup'/>


<Route element={<Home/>} path='/home/:id'/>

<Route element={<Myprofile/>} path='myprofile/:id'/>

<Route element={<Second_person_prof/>}  path='/secondpersonprofile/:id'/>
 
 <Route element={<Chat/>}   path='/chat'/>

</Routes>
  
    
    
    
    </BrowserRouter>

    </div>
  );
}

export default App;
