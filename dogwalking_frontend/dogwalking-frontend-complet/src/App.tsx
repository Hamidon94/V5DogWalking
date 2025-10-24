import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Search from "./pages/Search";
import BecomeSitter from "./pages/BecomeSitter";
import Services from "./pages/services/Services";
import DogWalking from "./pages/services/DogWalking";
import Boarding from "./pages/services/Boarding";
import HouseSitting from "./pages/services/HouseSitting";
import DropInVisits from "./pages/services/DropInVisits";
import DoggyDaycare from "./pages/services/DoggyDaycare";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Safety from "./pages/Safety";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import SitterDashboard from "./pages/SitterDashboard";
import SitterProfile from "./pages/SitterProfile";
import ProfileValidation from "./pages/ProfileValidation";
import Booking from "./pages/Booking";
import SitterOnboarding from "./pages/SitterOnboarding";
import Careers from "./pages/Careers";
import WalkTracking from "./pages/WalkTracking";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import PetProfile from "./pages/PetProfile";
import BookingConfirmation from "./pages/BookingConfirmation";
import ReviewSystem from "./components/ReviewSystem";
import EarningsManagement from "./pages/EarningsManagement";
import Messaging from "./pages/Messaging";
import IdentityVerification from "./pages/IdentityVerification";
import SitterDashboardComplete from "./pages/SitterDashboardComplete";
import ServicePhotos from "./pages/ServicePhotos";
import Notifications from "./pages/Notifications";
import SitterPublicProfile from "./pages/SitterPublicProfile";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/become-sitter" element={<BecomeSitter />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/dog-walking" element={<DogWalking />} />
          <Route path="/services/boarding" element={<Boarding />} />
          <Route path="/services/house-sitting" element={<HouseSitting />} />
          <Route path="/services/drop-in-visits" element={<DropInVisits />} />
          <Route path="/services/doggy-daycare" element={<DoggyDaycare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sitter-dashboard" element={<SitterDashboard />} />
          <Route path="/sitter/:id" element={<SitterProfile />} />
          <Route path="/profile-validation" element={<ProfileValidation />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/sitter-onboarding" element={<SitterOnboarding />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/walk-tracking/:bookingId" element={<WalkTracking />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/priority" element={<Pricing />} />
          <Route path="/pet-profile" element={<PetProfile />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/earnings" element={<EarningsManagement />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/identity-verification" element={<IdentityVerification />} />
          <Route path="/sitter-dashboard-complete" element={<SitterDashboardComplete />} />
          <Route path="/service-photos" element={<ServicePhotos />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/sitter-profile/:id" element={<SitterPublicProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
