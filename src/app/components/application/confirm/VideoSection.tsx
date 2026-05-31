import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="w-full flex items-center justify-center my-16 lg:my-32 px-6 lg:px-0">
      <Image
        src="/success-page-img.png"
        alt="PeptiPharmaRX welcome email"
        width={1349}
        height={685}
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="w-full max-w-5xl h-auto rounded-xl lg:rounded-2xl"
      />
    </section>
  );
}
