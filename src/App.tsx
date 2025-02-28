
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDetails from "./pages/StudentDetails";
import Confirmation from "./pages/Confirmation";
import DetailsFetching from "./pages/DetailsFetching";
import DepartmentSelection from "./pages/DepartmentSelection";
import ErrorPage from "./pages/ErrorPage";
import NameError from "./pages/NameError";
import ResultsPage from "./pages/Results";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="text-center pt-6">
        <h1 className="text-xl font-bold text-[#1D4ED8]">SAHO</h1>
      </div>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/details-fetching" element={<DetailsFetching />} />
          <Route path="/department-selection" element={<DepartmentSelection />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/name-error" element={<NameError />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
