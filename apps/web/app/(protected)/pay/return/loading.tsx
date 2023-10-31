import Loader from "@/components/Loader";
import PageStyles from "@/styles/shared/page/index.module.scss";

export default function StripeReturnPage() {
  return (
    <div className={PageStyles.main}>
      <div className="h-[90vh] w-full flex items-center justify-center">
        <Loader color="#5BBB5F" />
      </div>
    </div>
  );
}
