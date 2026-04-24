import Form from "@/components/Form";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <section
      className={`w-full h-screen flex flex-col justify-evenly items-center relative container mx-auto `}
    >
      <ThemeToggle />
      <Header />
      <Form />
    </section>
  );
}
