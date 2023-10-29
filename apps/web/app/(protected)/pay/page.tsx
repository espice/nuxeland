import PageStyles from "@/styles/shared/page/index.module.scss";

export default function PayPage() {
  return (
    <div className={PageStyles.main}>
      <div className={PageStyles.main__title} style={{ color: "#5BBB5F" }}>
        Currency
      </div>

      <div className={PageStyles.main__section}>
        <div className={PageStyles.main__section__heading}>YOUR BALANCE</div>
      </div>
    </div>
  );
}
