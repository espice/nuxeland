"use client";

import PageStyles from "@/styles/shared/page/index.module.scss";
import { regions } from "@/utils/regions";
import RegionCard from "./modules/RegionCard";
import { useRef, useState } from "react";
import { Popup, useOnClickOutside } from "@/components/Popup";

export default function Dashboard() {
  const [regionPopupOpen, setRegionPopupOpen] = useState(true);
  const regionPopupRef = useRef(null);

  useOnClickOutside(regionPopupRef, () => setRegionPopupOpen(false));

  return (
    <>
      <div className={PageStyles.main}>
        <div className={PageStyles.main__title}>Hey Arnav!</div>
        <div className={PageStyles.main__section}>
          <div className={PageStyles.main__section__heading}>MAP</div>
        </div>

        <div className={PageStyles.main__section}>
          <div className={PageStyles.main__section__heading}>REGIONS</div>
          <div className={PageStyles.main__section__content}>
            {regions.map((region) => {
              return <RegionCard region={region} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
