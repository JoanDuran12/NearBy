import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import Events from "@/app/components/main/Events";

export default function EventPage() {
  return (
    <Layout>
      <Header />
      <Events />
      <Footer />
    </Layout>
  );
}
