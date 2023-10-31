"use client";

import styles from "./index.module.scss";
import QRCodeIcon from "@/public/qrcode.svg";
import { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useOnClickOutside, Popup } from "@/components/Popup";
import Loader from "@/components/Loader";
import { gqlClient } from "@/utils/gqlClientSide";

import TickIcon from "@/public/check.svg";
import ErrorIcon from "@/public/error.svg";
import { useRouter } from "next/navigation";

export default function PayButton() {
  const router = useRouter();

  const [fetching, setFetching] = useState(false);
  const [scanPopup, setScanPopup] = useState(false);
  const [to, setTo] = useState<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null>(null);
  const scanPopupRef = useRef();

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

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
        {result ? (
          <div className="text-[#5BBB5F] flex flex-col items-center justify-center">
            <TickIcon />
            <p className="mt-[14px] text-[20px] font-[500]">
              Payment Successful!
            </p>
            <p className="mt-[8px] text-[#00000080]">Redirecting...</p>
          </div>
        ) : result === false ? (
          <div className="text-[#BD1C1C] flex flex-col items-center justify-center">
            <ErrorIcon />
            <p className="mt-[14px] text-[20px] font-[500]">An error occured</p>
            <p className="mt-[8px] text-[#00000080]">Redirecting...</p>
          </div>
        ) : !to ? (
          <div>
            <p className="text-[#3F3F3F] font-bold text-[22px]">Scan QR Code</p>
            <p className="font-[600] text-[#5B5B5B] text-[17px] leading-[-30px] tracking-[-4.5%] text-[16px]">
              Scan a QR Code to make a Payment
            </p>
            {scanPopup && (
              <QrReader
                constraints={{ facingMode: "environment" }}
                scanDelay={1000}
                onResult={async (result, error) => {
                  if (!!result && !fetching && !to) {
                    setFetching(true);
                    const res = await gqlClient().query({
                      userById: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        __args: {
                          id: result.getText(),
                        },
                      },
                    });

                    if (res.userById) {
                      setTo(res.userById);
                    }
                    setFetching(false);
                  }
                }}
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
          </div>
        ) : (
          <div>
            <p className="text-[#3F3F3F] font-bold text-[22px]">Pay To</p>
            <div className="flex flex-col items-center mt-[20px]">
              <img
                src={to.avatar}
                className="rounded-full h-[80px] w-[80px]"
                referrerPolicy="no-referrer"
              />
              <p className="text-[26px] font-[700] mt-[12px] text-[#3F3F3F]">
                {to.name}
              </p>
              <p className="font-[600] text-[16px] mt-[-4px] text-[#00000080]">
                {to.email}
              </p>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                if (!amount || amount === 0)
                  return setError("Amount is Required");

                const res = await gqlClient().mutation({
                  pay: {
                    __args: {
                      toId: to.id,
                      amount: (amount / 4) * 100,
                    },
                  },
                });

                setResult(res.pay);

                setTimeout(() => {
                  router.refresh();
                  setScanPopup(false);
                  setResult(null);
                  setTo(null);
                  setAmount(0);
                }, 2000);

                setLoading(false);
              }}
            >
              <label className="flex flex-col">
                <span className={styles.form_label}>AMOUNT (IN NUXECOINS)</span>
                <input
                  placeholder=""
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  type="number"
                  className="p-[6px] text-[#313131] font-[16px] font-[500] h-[58px] w-full border-[2px] border-[#B8B8B8] rounded-[8px] mb-[12px] mt-[4px]"
                  required
                  min={1}
                  step="0.01"
                />
              </label>
              <button
                className="mt-[2px] h-[58px] w-full bg-[#5BBB5F] rounded-[8px] text-[#ffff] font-[600] flex items-center justify-center"
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader color="#fff" size={0.3} /> : "Pay"}
              </button>
            </form>
          </div>
        )}
      </Popup>
    </>
  );
}
