import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import Topbar from './components/Topbar/Topbar.js';
import GraphCanvas from './components/GraphCanvas/GraphCanvas.js';

function App() {

  return (
    <div className="App">
      <Topbar />
      <GraphCanvas />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
      <script src="./plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js"></script>
    </div>

  );
}

export default App;
