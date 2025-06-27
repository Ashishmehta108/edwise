import { Safari } from "@/components/magicui/safari";
import img from "../public/image.png";
export function HeroSection() {
  return (
    <div className="relative z-10 mt-16 max-w-4xl mx-auto">
      <div className="relative rounded-2xl shadow-2xl">
        <Safari
          url="yourwebsite.com"
          className="w-full h-[70%]"
          imageSrc={img.src as string}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  );
}
