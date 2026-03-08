import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Redux Provider
import store from './redux/store'; // Hamara create kiya hua store
import App from './App';
import './index.css';

// Context Providers (Agar aap Redux ke saath kuch specifically Context mein rakhna chahte hain)
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Store ko sabse upar wrap karte hain */}
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          {/* Note: Ab humein CartProvider aur WishlistProvider ki zaroorat nahi padegi 
              kyunki ye logic hum Redux Slices mein move kar chuke hain. */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);