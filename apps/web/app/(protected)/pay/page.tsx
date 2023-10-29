import PageStyles from "@/styles/shared/page/index.module.scss";
import { gqlClient } from "@/utils/gql";
import AddBalance from "./AddBalance";

import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

async function getData() {
  const res = await gqlClient().query({
    me: {
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
      <div className={PageStyles.main__title} style={{ color: "#5BBB5F" }}>
        Currency
      </div>

      <div className={PageStyles.main__section}>
        <div
          className={cx(PageStyles.main__section__heading, styles.sub_title)}
        >
          YOUR BALANCE <AddBalance />
        </div>
        <div className={styles.balance}>{data.balance}</div>
      </div>
    </div>
  );
}
