import './App.css';
import Header from './components/Header'
import Content from './components/Content'
import { useState } from 'react'

function App() {
  const [state, setState] = useState({
    isFormShowed: false
  })

  const btnFormHandler = () => setState(prevState => ({
    isFormShowed: !prevState.isFormShowed
  }))

  return (
    <div className="App">
      <Header onBtnFormClicked={btnFormHandler} />
      <Content isFormShowed={state.isFormShowed}/>
      {/* {
        state.isFormShowed && 
        <Content
          placeholder='Enter your bucket list item here'
          button='Save'
        />
      } */}
    </div>
  );
}

export default App;
