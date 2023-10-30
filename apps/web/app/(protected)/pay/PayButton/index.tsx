"use client";

import styles from "./index.module.scss";
import QRCodeIcon from "@/public/qrcode.svg";
import { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useOnClickOutside, Popup } from "@/components/Popup";
import Loader from "@/components/Loader";

export default function PayButton() {
  const [scanPopup, setScanPopup] = useState(false);
  const scanPopupRef = useRef();

  useOnClickOutside(scanPopupRef, () => {
    setScanPopup(false);
  });

  return (
    <>
      <button className={styles.pay_button} onClick={() => setScanPopup(true)}>
        <div>
          <QRCodeIcon />
        </div>
        Scan to Pay
      </button>
      <Popup popupState={scanPopup} ref={scanPopupRef}>
        <p className="text-[#3F3F3F] font-bold text-[22px]">Scan QR Code</p>
        <p className="font-[600] text-[#5B5B5B] text-[17px] leading-[-30px] tracking-[-4.5%] text-[16px]">
          Scan a QR Code to make a Payment
        </p>
        {scanPopup && (
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              //   console.log(result, error);
            }}
            containerStyle={
              {
                //   backgroundColor: "#f00",
              }
            }
            videoContainerStyle={{
              height: "50vh",
              borderRadius: "12px",
              border: "2px solid #00000050",
              marginTop: "20px",
              //   backgroundColor: "#f00",
              //   minHeight: "100%",
            }}
            videoStyle={{
              minHeight: "100%",
              objectFit: "cover",
            }}
          />
        )}
        <div className="mt-[8px] flex items-center">
          <Loader color="#898989" size={0.2} />
          <p className="ml-[8px] font-[500] text-[#898989]">
            Looking for a valid QR Code...
          </p>
        </div>
      </Popup>
    </>
  );
}
