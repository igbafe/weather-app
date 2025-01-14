import Login from "@/components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen bg-dark-400">
      <section className="container mt-auto mb-auto">
        <div className="max-w-[496px]">
          <Image
            src="/images/weather-logo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-10 h-16 w-fit"
          />
          <Login />

          <p className="justify-items-end text-dark-600 xl:text-left">
            {" "}
            © 2024 WeatherPro
          </p>
        </div>
      </section>
      <Image
        src="/images/weatherapp.jpeg"
        alt="weather app"
        width={1000}
        height={1000}
        className="max-w-[50%] hidden h-full object-cover md:block"
      />
    </div>
  );
}
