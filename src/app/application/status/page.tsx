import SuccessPage from "./page/SuccessPage";
import ClosedPage from "./page/ClosedPage";

type Props = {
  searchParams: Promise<{ status?: string | string[] }>;
};

export default async function StatusPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const value = Array.isArray(status) ? status[0] : status;

  if (value === "closed") return <ClosedPage />;

  return <SuccessPage />;
}
