import { ThemeProvider } from "next-themes";
import { Dashboard } from "../components/dashboard";

export default function DashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Dashboard />
    </ThemeProvider>
  );
}
