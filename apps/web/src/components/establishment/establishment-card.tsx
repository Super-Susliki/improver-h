interface Props {
  title: string;
  image: string;
}

export const EstablishmentCard = ({ title, image }: Props) => {
  return (
    <div className="w-[105px] h-[105px] rounded-[30px] border border-[#DADADA] flex flex-col items-center justify-center gap-2.5">
      <div className="flex items-center justify-center w-11 h-11">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="text-[14px] font-medium">{title}</p>
    </div>
  );
};
