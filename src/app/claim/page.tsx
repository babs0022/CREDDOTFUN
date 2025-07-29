import Header from "@/components/header";
import { ClaimClient } from "./claim-client";

export default function ClaimPage() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <ClaimClient />
      </main>
    </div>
  );
}
