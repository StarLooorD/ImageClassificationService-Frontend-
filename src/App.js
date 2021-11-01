import {BrowserRouter} from "react-router-dom";

import {AuthProvider} from "./contexts/AuthContext";
import {UserProvider} from "./contexts/UserContext";

import Routes from "./routes/Routes";

const App = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
            <UserProvider>
              <Routes/>
            </UserProvider>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
