import { Suspense } from "react";
import Home from "./_components/home-page";
import Spinner from "@/components/ui/spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner height={150} />}>
      <Home />
    </Suspense>
  );
}
