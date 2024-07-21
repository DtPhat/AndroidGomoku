import "./App.css";

import { HomePage, LoginPage, RegisterPage } from "./pages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import Routes from "./routes";
function App() {
  const store = configureStore();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Provider store={store}>
        <ToastContainer />
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
