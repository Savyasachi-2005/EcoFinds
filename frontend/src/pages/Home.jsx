import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    <main style={{ minHeight: "60vh" }}>
      <div style={{ height: '70vh', width: '100%' }}>
        <Spline scene="https://prod.spline.design/M7kW3oAgLX303g4z/scene.splinecode" />
      </div>
    </main>
  );
}
