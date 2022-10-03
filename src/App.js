import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import './App.css';
import Cabecera from './components/Cabecera';
import MiApi from './components/MiApi';


function App() {

  return (
    <div className="App">

      <MiApi></MiApi>

    </div>
  );
}

export default App;
