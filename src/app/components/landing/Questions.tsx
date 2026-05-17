export default function Questions() {
  return (
    <section className="w-full flex items-center justify-center my-24">
      <div className="flex items-center justify-center w-full max-w-300 gap-16">
        <div className="shrink">
          <h1 className="font-sans text-8xl text-black font-medium">
            <span className="text-beige-gradient font-awesome-serif italic pr-2">3 Questions</span> Then we get you
            supplied.
          </h1>

          <p className="mt-12 font-sans text-black text-xl">
            This application is for licensed medical practices only. We use it to verify your eligibility and to match
            the right account manager to your practice. Submissions are routed direct — no spam, no D2C.
          </p>
        </div>

        <div className="min-w-125 shrink-0 grow aspect-4/3 bg-gray-400 rounded-md"></div>
      </div>
    </section>
  );
}
