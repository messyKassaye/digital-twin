import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import IntelligentCampusDashboard from "./components/IntelligentCampusDashboard";

export default function App() {
  return (
    <ErrorBoundary>
      <IntelligentCampusDashboard />
    </ErrorBoundary>
  );
}
