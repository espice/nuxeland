"use client";

import useOnClickOutside, { Popup } from "@/components/Popup";
import QRCodeIcon from "@/public/qrcode.svg";
import QRCode from "react-qr-code";
import { useUser } from "@/utils/hooks/useUser";
import { useState, useRef } from "react";

export default function ShowQRButton() {
  const user = useUser();
  const showQRRef = useRef();
  const [showQRModal, setShowQRModal] = useState(false);

  useOnClickOutside(showQRRef, () => {
    setShowQRModal(false);
  });

  return (
    <div
      className="text-[#575757] cursor-pointer"
      onClick={() => {
        setShowQRModal(true);
      }}
    >
      <QRCodeIcon size={30} />
      <Popup className="flex flex-col" popupState={showQRModal} ref={showQRRef}>
        <p className="text-[#3F3F3F] font-bold text-[22px]">Your QR Code</p>
        <p className="font-[600] text-[#5B5B5B] text-[17px] leading-[-30px] tracking-[-4.5%] text-[16px]">
          Show this QR Code to others to receive payments
        </p>
        <div className="mt-[40px] ml-auto mr-auto mb-[40px]">
          <QRCode value={user!.id} fgColor={"#3F3F3F"} />
        </div>
      </Popup>
    </div>
  );
}
