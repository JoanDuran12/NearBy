import Header from "@/app/components/Header";
import Layout from "../../../layout";
import Signup from "@/app/components/auth/Signup";
import Footer from "@/app/components/Footer";

export default function SignupPage() {
  return (
    <Layout>
      <Header />
      <Signup />
      <Footer />
    </Layout>
  );
}
