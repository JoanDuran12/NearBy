import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import CreateEvent from "@/app/components/CreateEvent";

export default function CreatePage() {
  return (
    <Layout>
      <Header />
      <CreateEvent />
      <Footer />
    </Layout>
  );
}
