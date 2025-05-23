import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "./providers/provider.tsx";
import "@/styles/globals.css";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import { PopupProvider } from "@/components/Courses/RecommendPopup/PopupProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Provider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </Provider>
    </AuthProvider>
  </BrowserRouter>
  //  </React.StrictMode>
);
