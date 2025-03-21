import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  return (
    <div role="status">
      {/* Replace the SVG with DotLottieReact */}
      <DotLottieReact
        src="https://lottie.host/62025e9e-c70d-4402-96eb-b711e5f9cbc8/mgxezYoobx.lottie"
        loop
        autoplay
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}



