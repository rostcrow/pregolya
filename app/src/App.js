
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import Title from './components/js/Title.js';
import AppControl from './components/js/AppControl.js';

function App() {

  return (
    <div className="App">
      <Title />
      <AppControl />
    </div>
  );
}

export default App;
