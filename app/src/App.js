
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import Title from './components/js/Title.js';
import AppController from './components/js/AppController.js';

function App() {

  return (
    <div className="App">
      <Title />
      <AppController />
    </div>
  );
}

export default App;
