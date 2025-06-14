import { useState } from "react";

import {
  DarkTopPage,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { DarkTopSearch } from "@/components/common/dark-top-search";
import { EstablishmentCard } from "@/components/establishment/establishment-card";

const establishments = [
  {
    id: 1,
    name: "Aroma Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
  },
  {
    id: 2,
    name: "Aboba Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
  },
  {
    id: 3,
    name: "Establishment 3 ABOBOB",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
  },
  {
    id: 4,
    name: "Establishment 4",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
  },
];

const EstablishmentsPage = () => {
  const [search, setSearch] = useState("");

  return (
    <DarkTopPage
      top={[
        <DarkTopPageTitle className="col-span-4 text-left">Establishments</DarkTopPageTitle>,
        <div className="h-11">
          <DarkTopSearch value={search} onChange={setSearch} />
        </div>,
      ]}
    >
      <DarkTopPageContent>
        <div className="flex flex-wrap gap-2.5">
          {establishments.map((establishment) => (
            <EstablishmentCard
              key={establishment.id}
              className="w-[calc(33.333%-6.6666px)] relative pb-[calc(33.333%-6.6666px)]"
              {...establishment}
            />
          ))}
        </div>
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

EstablishmentsPage.displayName = "EstablishmentsPage";

export default EstablishmentsPage;
