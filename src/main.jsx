import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  // Evita recargar datos al cambiar el foco de la ventana
      staleTime: 5 * 60 * 1000,     // 5 minutos antes de considerar los datos obsoletos
      cacheTime: 10 * 60 * 1000,    // 10 minutos de caché
    },
  },
});

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
