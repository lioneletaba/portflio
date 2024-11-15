import { HoverBorderGradient } from "./HoverBorderGradient.tsx";

export function ActionButton() {
  return (
    <div className="flex justify-start text-center">
      <HoverBorderGradient
        containerClassName="mt-4 "
        as="button"
        className=" text-inherit flex bg-skin-fill items-center space-x-2"
      >
        <span>Let's work</span>
      </HoverBorderGradient>
    </div>
  );
}
