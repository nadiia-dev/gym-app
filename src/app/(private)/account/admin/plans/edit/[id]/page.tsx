import { getPlanById } from "@/app/actions/plans";
import PlanForm from "../../_components/plan-form";
import PageTitle from "@/components/ui/page-title";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res: any = await getPlanById(id);
  if (!res.success) {
    return res.message;
  }
  return (
    <div>
      <PageTitle title="Edit plan" />
      <PlanForm formMode="edit" initialValues={res.data} />
    </div>
  );
};

export default Page;
