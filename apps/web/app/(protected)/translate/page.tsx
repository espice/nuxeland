import PageStyles from "@/styles/shared/page/index.module.scss";
import styles from "./index.module.scss";
import Select from "react-select";
import Selector from "@/components/Select";

export default function TranslatePage() {
  return (
    <div className={PageStyles.main}>
      <div className={PageStyles.main__title} style={{ color: "#348CB4" }}>
        Translate
      </div>

      <div className={PageStyles.main__section}>
        <div className={PageStyles.main__section__content}>
          <div className={styles.yash__container}>
            <Selector
              options={[
                {
                  value: "en",
                  label: "English",
                },
              ]}
            />
            <div>switch</div>
            <Selector
              options={[
                {
                  value: "en",
                  label: "English",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
