import './App.css';
import AllRoutes from './Routes/routes';
import Header from './components/Header';
import RightSideBar from './components/RightSideBar';
import SideBar from './components/SideBar';

function App() {
  return (
    <div>
      <Header/>
      <div className="layout">
      <SideBar />
      <AllRoutes />
      <RightSideBar />
      </div>
    </div>
  );
}

export default App;
