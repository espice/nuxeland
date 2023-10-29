"use client";

import styles from "./index.module.scss";
import PlusIcon from "@/public/plus.svg";
import { useState } from "react";

export default function AddBalance() {
  const [addBalanceModal, setAddBalanceModal] = useState(false);

  return (
    <button
      className={styles.add_balance_button}
      onClick={() => setAddBalanceModal(true)}
    >
      <PlusIcon /> ADD BALANCE
    </button>
  );
}
