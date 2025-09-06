import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
