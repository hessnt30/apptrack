import { ReactNode } from "react";

type StageProps = {
  color: Color;
  title: string;
  children: ReactNode;
};

type Color = "lightorange" | "dijon" | "lightbrown" | "cloud" | "grape";

const colorClasses: Record<Color, string> = {
  lightorange: "bg-lightorange border-lightorange",
  dijon: "bg-dijon border-dijon",
  lightbrown: "bg-lightbrown border-lightbrown",
  cloud: "bg-cloud border-cloud",
  grape: "bg-grape border-grape",
};

export default function Stage({ color, title, children }: StageProps) {
  const colorClass = colorClasses[color] || "bg-gray border-gray";
  return (
    <>
      <div>
        <div
          className={`border rounded-t-lg flex justify-center items-center text-center py-2 ${colorClass}`}
        >
          {title}
        </div>
        <div className="border h-full rounded-b-lg px-2 py-4 border-gray bg-gray">
          {children}
        </div>
      </div>
    </>
  );
}
