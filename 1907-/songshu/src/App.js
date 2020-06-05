import React from 'react';
import './App.scss';
import router from "./router"
import MyRouter from "./components/common/MyRouter";
function App() {
  return (
    <div className="App">
      <MyRouter router={router}></MyRouter>
    </div>
  );
}

export default App;
