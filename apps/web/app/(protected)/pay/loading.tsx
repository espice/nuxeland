import Loader from "@/components/Loader";
import PageStyles from "@/styles/shared/page/index.module.scss";

export default function Loading() {
  return (
    <div className={PageStyles.main}>
      <div className="h-[90vh] w-full flex items-center justify-center">
        <Loader color="#5BBB5F" size={0.8} />
      </div>
    </div>
  );
}
