import { HoverBorderGradient } from "./HoverBorderGradient.tsx";

export function ActionButton() {
  return (
    <div className="flex justify-start text-center">
      <HoverBorderGradient
        containerClassName="mt-4 "
        as="button"
        style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
        className=" text-inherit flex bg-white/10 backdrop-blur-md items-center space-x-2"
      >
        <span>Let's work</span>
      </HoverBorderGradient>
    </div>
  );
}
