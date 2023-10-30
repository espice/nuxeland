"use client";

import styles from "./index.module.scss";
import QRCodeIcon from "@/public/qrcode.svg";
import { useState, useRef } from "react";

export default function PayButton() {
  const [scanPopup, setScanPopup] = useState(false);
  const scanPopupRef = useRef();

  return (
    <button className={styles.pay_button}>
      <div>
        <QRCodeIcon />
      </div>
      Scan to Pay
    </button>
  );
}
