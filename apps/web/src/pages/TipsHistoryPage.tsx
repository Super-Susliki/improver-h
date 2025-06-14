import {
  DarkTopPage,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";

const payments = [
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
];

const TipsHistoryPage = () => {
  return (
    <DarkTopPage
      topClassName="relative"
      top={[<DarkTopPageTitle className="col-span-4 text-left">Tips history</DarkTopPageTitle>]}
    >
      <DarkTopPageContent addBottomPadding={false}>
        <div className="flex overflow-y-auto max-h-[calc(100vh-125px)] gap-4 flex-col pb-[20px]">
          {payments.map((dayPayments) => (
            <div className="w-full flex flex-col gap-4" key={dayPayments.date.toISOString()}>
              <div className="text-md text-center">{dayPayments.date.toLocaleDateString()}</div>
              <div className="flex flex-col gap-2">
                {dayPayments.payments.map((payment) => (
                  <div
                    className="flex items-center p-4 gap-4 border  rounded-[20px] border-[#DADADA]"
                    key={payment.name}
                  >
                    <div className="w-11 h-11 rounded-[16px] border border-[#DADADA] flex p-1 items-center justify-center">
                      <img src={payment.image} alt={payment.name} className="w-full h-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-base text-black">${payment.amount}</div>
                      <div className="text-sm text-[#00000066]">{payment.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

TipsHistoryPage.displayName = "TipsHistoryPage";

export default TipsHistoryPage;
