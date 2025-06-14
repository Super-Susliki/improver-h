export const BackgroundBlur = () => {
  return (
    <div
      className="size-[369px] z-[-1] absolute top-[-81px] left-[-109px] rounded-full"
      style={{
        background: "radial-gradient(circle, #E0DBFC 0%, rgba(255, 255, 255, 0.1) 100%)",
        filter: "blur(15px)",
      }}
    />
  );
};

BackgroundBlur.displayName = "BackgroundBlur";
