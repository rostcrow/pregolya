
// IMPORT
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// React Sigma
import "@react-sigma/core/lib/react-sigma.min.css";

// My components
import Title from './components/js/Title.js';
import AppControl from './components/js/AppControl.js';

// CSS
import './App.css';

// CODE
// Root App component
function App() {

  return (
    <div className="App">
      <Title />
      <AppControl />
    </div>
  );
}

export default App;
