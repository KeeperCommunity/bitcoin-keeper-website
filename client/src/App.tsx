import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Team from "./pages/Team";
import Private from "./pages/Private";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AskKeeper from "./pages/AskKeeper";
import PageMetadata from "./components/PageMetadata";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageMetadata />
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/contributors" component={Team} />
          <Route path="/team">
            <Redirect to="/contributors" />
          </Route>
          <Route path="/private" component={Private} />
          <Route path="/learn">
            <Redirect
              to={`/ask-keeper${typeof window === "undefined" ? "" : window.location.hash}`}
            />
          </Route>
          <Route path="/ask-keeper" component={AskKeeper} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/404" component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
