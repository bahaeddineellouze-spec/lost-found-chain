import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { config } from './config/web3';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Index from "./pages/Index";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import Matching from "./pages/Matching";
import Dashboard from "./pages/Dashboard";
import ItemDetail from "./pages/ItemDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/lost" element={<Lost />} />
                  <Route path="/found" element={<Found />} />
                  <Route path="/matching" element={<Matching />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/item/:id" element={<ItemDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ConnectKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
