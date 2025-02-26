import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
