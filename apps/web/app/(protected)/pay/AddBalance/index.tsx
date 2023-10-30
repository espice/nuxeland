"use client";

import styles from "./index.module.scss";
import PlusIcon from "@/public/plus.svg";
import { useState, useRef } from "react";
import { Popup, useOnClickOutside } from "@/components/Popup";

export default function AddBalance() {
  const addBalanceRef = useRef();
  const [addBalanceModal, setAddBalanceModal] = useState(false);

  useOnClickOutside(addBalanceRef, () => {
    setAddBalanceModal(false);
  });

  return (
    <>
      <div
        className={styles.add_balance_button}
        onClick={() => setAddBalanceModal(true)}
      >
        <PlusIcon /> ADD BALANCE
      </div>
      <Popup popupState={addBalanceModal} ref={addBalanceRef}>
        Add Balance
      </Popup>
    </>
  );
}
