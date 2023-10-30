"use client";

import PageStyles from "@/styles/shared/page/index.module.scss";
import { regions } from "@/utils/regions";
import RegionCard from "./modules/RegionCard";
import { useRef, useState } from "react";
import { Popup, useOnClickOutside } from "@/components/Popup";
import { useUser } from "@/utils/hooks/useUser";
import Map from "./modules/Map";

export default function Dashboard() {
  const [regionPopupOpen, setRegionPopupOpen] = useState(true);
  const regionPopupRef = useRef(null);
  const user = useUser();

  return (
    <>
      <div className={PageStyles.main}>
        <div className={PageStyles.main__title}>
          Hey {user?.name.split(" ")[0]}!
        </div>
        <div className={PageStyles.main__section}>
          <div className={PageStyles.main__section__heading}>MAP</div>
          <Map />
        </div>

        <div className={PageStyles.main__section}>
          <div className={PageStyles.main__section__heading}>REGIONS</div>
          <div className={PageStyles.main__section__content}>
            {regions.map((region) => {
              return <RegionCard region={region} key={region.name} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
