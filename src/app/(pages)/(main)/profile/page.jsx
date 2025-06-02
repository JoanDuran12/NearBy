import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import Dashboard from "@/app/components/main/home";

export default function ProfilePage() {
  return (
    <Layout>
      <Header />
      <Dashboard />
      <Footer />
    </Layout>
  );
}
