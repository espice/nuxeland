"use client";

import useOnClickOutside, { Popup } from "@/components/Popup";
import QRCodeIcon from "@/public/qrcode.svg";
import { useState, useRef } from "react";

export default function ShowQRButton() {
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
      <Popup className="" popupState={showQRModal} ref={showQRRef}>
        Your QR Code
      </Popup>
    </div>
  );
}
