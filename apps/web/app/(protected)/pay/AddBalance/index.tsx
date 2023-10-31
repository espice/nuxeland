"use client";

import styles from "./index.module.scss";
import PageStyles from "@/styles/shared/page/index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(PageStyles);

import PlusIcon from "@/public/plus.svg";
import { useState, useRef, startTransition } from "react";
import { Popup, useOnClickOutside } from "@/components/Popup";
import { gqlClient } from "@/utils/gqlClientSide";
import StripePayment from "./StripePayment";

export default function AddBalance() {
  const addBalanceRef = useRef();
  const [addBalanceModal, setAddBalanceModal] = useState(false);
  const [amount, setAmount] = useState<number>(10.0);
  const [loading, setLoading] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null
  );

  useOnClickOutside(addBalanceRef, () => {
    setAddBalanceModal(false);
    setAmount(10);
    setLoading(false);
    setStripeClientSecret(null);
  });

  return (
    <>
      <div
        className={styles.add_balance_button}
        onClick={() => setAddBalanceModal(true)}
      >
        <PlusIcon /> ADD BALANCE
        <Popup popupState={addBalanceModal} ref={addBalanceRef}>
          {stripeClientSecret ? (
            <StripePayment clientSecret={stripeClientSecret} />
          ) : (
            <>
              <p className="text-[#3F3F3F] font-bold text-[22px]">
                Add Balance
              </p>
              <p className="font-[600] text-[#5B5B5B] text-[17px] leading-[-30%] tracking-[-4.5%]">
                Add Balance to your account to be able to pay in nuxEcoins
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  const { createCheckout: clientSecret } =
                    await gqlClient().mutation({
                      createCheckout: {
                        __args: {
                          amount: amount * 100,
                        },
                      },
                    });

                  setStripeClientSecret(clientSecret);
                  setLoading(false);
                }}
              >
                <label className="flex flex-col">
                  <span className={styles.form_label}>AMOUNT (IN INR)</span>
                  <input
                    placeholder=""
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    type="number"
                    className="p-[6px] text-[#313131] font-[16px] font-[500] h-[58px] w-full border-[2px] border-[#B8B8B8] rounded-[8px] mb-[12px] mt-[4px]"
                  />
                </label>
                <button
                  className="mt-[12px] h-[58px] w-full bg-[#5BBB5F] rounded-[8px] text-[#ffff] font-[600]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </form>
            </>
          )}
        </Popup>
      </div>
    </>
  );
}
