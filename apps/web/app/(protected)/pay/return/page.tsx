import Loader from "@/components/Loader";
import PageStyles from "@/styles/shared/page/index.module.scss";
import { gqlClient } from "@/utils/gql";
import TickIcon from "@/public/check.svg";
import ErrorIcon from "@/public/error.svg";
import Redirect from "./Redirect";

async function updateBalance(stripeSessionId: string) {
  try {
    const res = await gqlClient().mutation({
      addBalance: {
        __args: {
          sessionId: stripeSessionId,
        },
      },
    });

    return res.addBalance;
  } catch (e) {
    return false;
  }
}

export default async function StripeReturnPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const success = await updateBalance(searchParams.session_id);

  return (
    <div className={PageStyles.main}>
      <div className="h-[90vh] w-full flex items-center justify-center flex-col">
        {success ? (
          <div className="text-[#5BBB5F] flex flex-col items-center justify-center">
            <TickIcon />
            <p className="mt-[14px] text-[20px] font-[500]">
              Balance Added Successfully!
            </p>
          </div>
        ) : (
          <div className="text-[#BD1C1C] flex flex-col items-center justify-center">
            <ErrorIcon />
            <p className="mt-[14px] text-[20px] font-[500]">An error occured</p>
          </div>
        )}
        <p className="mt-[8px] text-[#00000080]">Redirecting...</p>
        <Redirect />
      </div>
    </div>
  );
}
