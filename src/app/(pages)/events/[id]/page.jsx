import Footer from "@/app/components/Footer";
import Layout from "@/app/layout";
import Header from "@/app/components/Header";
import EventDetails from "@/app/components/EventDetails";

export default async function EventDetailsPage() {
  return (
    <Layout>
      <Header />
      <EventDetails />
      <Footer />
    </Layout>
  );
}
