import Header from "@/components/header";
import { DashboardClient } from "./dashboard-client";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="container mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
            </div>
            <DashboardClient />
          </div>
        </div>
      </main>
    </div>
  );
}
