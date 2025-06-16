import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import Profile from "@/app/components/main/profile";

export default function ProfilePage() {
  return (
    <Layout>
      <Header />
      <Profile />
      <Footer />
    </Layout>
  );
}
