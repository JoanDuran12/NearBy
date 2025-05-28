

import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import Dashboard from "@/app/components/dashboard/home";

export default function DashboardPage() {
  return (
    <Layout>
      <Header />
      <Dashboard />
      <Footer />
    </Layout>
  );
}
