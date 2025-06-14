import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  image: string | null;
  className?: string;
  imageSize?: number;
}

export const EstablishmentCard = ({ id, name, image, className, imageSize = 44 }: Props) => {
  return (
    <NavLink
      to={`/establishment/${id}`}
      className={cn(
        "rounded-[30px] border border-[#DADADA] flex flex-col items-center justify-center gap-2.5 relative",
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
        <div
          style={{ width: imageSize, height: imageSize }}
          className="flex items-center justify-center"
        >
          {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
        </div>
        <p className="text-[14px] font-medium text-center">{name}</p>
      </div>
    </NavLink>
  );
};
