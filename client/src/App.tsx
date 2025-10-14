import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Services from "./pages/Services";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Assignments from "./pages/Assignments";
import Announcements from "./pages/Announcements";
import Points from "./pages/Points";
import Lectures from "./pages/Lectures";
import Quiz from "./pages/Quiz";
import Discussion from "./pages/Discussion";
import SupportTickets from "./pages/SupportTickets";
import LearningUnit from "./pages/LearningUnit";
import LearningUnitTopic from "./pages/LearningUnitTopic";
import QuizDetail from "./pages/QuizDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learning" element={<HomePage />} />
          <Route path="/learning/dashboard" element={<Dashboard />} />
          <Route path="/learning/assignments" element={<Assignments />} />
          <Route path="/learning/announcements" element={<Announcements />} />
          <Route path="/learning/points" element={<Points />} />
          <Route path="/learning/lectures" element={<Lectures />} />
          <Route path="/learning/quiz" element={<Quiz />} />
          <Route path="/learning/discussion" element={<Discussion />} />
          <Route path="/learning/support" element={<SupportTickets />} />
          <Route path="/learning/unit" element={<LearningUnit />} />
          <Route path="/learning/unit/topic" element={<LearningUnitTopic />} />
          <Route path="/learning/quiz/:topic" element={<QuizDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
