"use client";

import PageStyles from "@/styles/shared/page/index.module.scss";
import { regions } from "@/utils/regions";
import RegionCard from "./modules/RegionCard";
import { useEffect, useRef, useState } from "react";
import { Popup, useOnClickOutside } from "@/components/Popup";
import { useUser } from "@/utils/hooks/useUser";
import Map from "./modules/Map";
import { axios } from "@/utils/axios";
import { io } from "socket.io-client";

export default function Dashboard() {
  const [regionPopupOpen, setRegionPopupOpen] = useState(true);
  const regionPopupRef = useRef(null);
  const user = useUser();

  const [total, setTotal] = useState(0);
  const [socket, setSocket] = useState<any>(null);
  async function totall () {
    const total = await axios.get('/total')
    setTotal(total.data)

  }
  useEffect(() => {
    totall()
    // @ts-ignore
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    socket.on("total", (total: {total: number}) => {
      setTotal(total.total)
    })
    setSocket(socket)
    return () => {socket.off('total', ), socket.disconnect()}
  }, [])
  
  return (
    <>
      <div className={PageStyles.main}>
        <div className={PageStyles.main__title}>
          Hey {user?.name.split(" ")[0]}!
        </div>
        <div className={PageStyles.main__section}>
          <div className={PageStyles.main__section__heading}>MAP</div>
          <Map total={total} />
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
