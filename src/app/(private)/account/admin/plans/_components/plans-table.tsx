"use client";
import { IPlan } from "@/types/plan";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { deletePlan } from "@/app/actions/plans";
import toast from "react-hot-toast";

const PlansTable = ({ plans }: { plans: IPlan[] }) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const router = useRouter();
  const columns = [
    "Name",
    "Monthly Price",
    "Quarterly Price",
    "Half Yearly Price",
    "Yearly Price",
    "Created At",
    "Actions",
  ];

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setSelected(id);
      const res = await deletePlan(id);
      if (res.success) {
        toast.success("Plan deleted successfully");
      } else {
        toast.error("Failed to delete plan");
      }
    } catch (e) {
      setSelected("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table>
      <TableCaption>A list of your plans.</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100">
          {columns.map((title, index) => (
            <TableHead className="font-bold" key={`${title}-${index}`}>
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell>{plan.name}</TableCell>
            <TableCell>$ {plan.monthly_price}</TableCell>
            <TableCell>$ {plan.quarterly_price}</TableCell>
            <TableCell>$ {plan.half_yearly_price}</TableCell>
            <TableCell>$ {plan.yearly_price}</TableCell>
            <TableCell>
              {dayjs(plan.created_at).format("MMM DD, YYYY hh:mm A")}
            </TableCell>
            <TableCell>
              <div className="flex gap-5">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() =>
                    router.push(`/account/admin/plans/edit/${plan.id}`)
                  }
                >
                  <Edit2 size={14} />
                </Button>

                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => handleDelete(plan.id)}
                  disabled={loading && selected === plan.id}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlansTable;
