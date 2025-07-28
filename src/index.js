import ReactDOM from 'react-dom/client';
import 'react-quill-new/dist/quill.snow.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthLogic from './service/authLogic';
import { app } from './service/firebase';
const authLogic = new AuthLogic(app)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <App authLogic={authLogic}/>
    </BrowserRouter>
  </>
);
