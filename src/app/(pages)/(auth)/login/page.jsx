import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import Login from "@/app/components/auth/Login";

export default function LoginPage() {
  return (
    <Layout>
      <Header />
      <Login />
      <Footer />
    </Layout>
  );
}
