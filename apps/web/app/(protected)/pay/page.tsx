import PageStyles from "@/styles/shared/page/index.module.scss";
import { gqlClient } from "@/utils/gql";
import AddBalance from "./AddBalance";

import CoinIcon from "@/public/coin.svg";

import styles from "./index.module.scss";
import classNames from "classnames/bind";
import ShowQRButton from "./ShowQR";
import PayButton from "./PayButton";
const cx = classNames.bind(styles);

async function getData() {
  const res = await gqlClient().query({
    me: {
      id: true,
      balance: true,
      transactions: {
        initiator: {
          name: true,
          id: true,
        },
        receiver: {
          name: true,
          id: true,
        },
        id: true,
        amount: true,
      },
    },
  });

  return res.me;
}

export default async function PayPage() {
  const data = await getData();

  return (
    <div className={PageStyles.main}>
      <div
        className={cx(PageStyles.main__title, styles.title)}
        style={{ color: "#5BBB5F" }}
      >
        Currency
        <ShowQRButton />
      </div>

      <div className={cx(PageStyles.main__section, styles.balance__section)}>
        <div
          className={cx(PageStyles.main__section__heading, styles.sub_title)}
        >
          YOUR BALANCE <AddBalance />
        </div>
        <div className={styles.balance}>
          <div className="w-1/2 flex items-center justify-center text-[#4E4E4E] font-[700] text-[28px] my-[12px] border-r-[2px]">
            ₹{data.balance / 100}
          </div>
          <div className="w-1/2 flex items-center justify-center text-[#4E4E4E] font-[700] text-[28px]">
            {(data.balance / 100) * 4}
            <CoinIcon />
          </div>
        </div>
      </div>
      <div className={cx(PageStyles.main__section, styles.balance__section)}>
        <div className={cx(PageStyles.main__section__heading)}>
          TRANSACTION HISTORY
        </div>
        {data.transactions.reverse().map((transaction) => {
          return (
            <div
              className="w-full bg-[#fff] px-[16px] h-[54px] my-[3px] rounded-[8px] flex items-center justify-between"
              key={transaction.id}
            >
              <p className="text-[#4A4A4A] font-[600] text-[16px]">
                {transaction.receiver.id === transaction.initiator.id
                  ? "Add Balance"
                  : data.id === transaction.receiver.id
                  ? transaction.initiator.name
                  : transaction.receiver.name}
              </p>
              <p
                className="flex items-center justify-center font-[700] text-[16px]"
                style={{
                  color:
                    data.id === transaction.receiver.id ? "#5BBB5F" : "#BD1C1C",
                }}
              >
                {data.id === transaction.receiver.id ? "+ " : "- "}
                {transaction.receiver.id === transaction.initiator.id ? (
                  `₹${transaction.amount / 100}`
                ) : (
                  <>
                    {(transaction.amount / 100) * 4}{" "}
                    <div className="ml-[2px]">
                      <CoinIcon height="18" width="18" />
                    </div>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>
      <PayButton />
      <div className="h-[160px] w-full"></div>
    </div>
  );
}
