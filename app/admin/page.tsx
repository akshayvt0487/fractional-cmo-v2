import { Dashboard } from "./dashboard/page";

export const metadata = {
  robots: { index: false, follow: false },
};


export default function AdminDashboardPage() {

  return (
    <div>
      
     <Dashboard/>
    </div>
  );
}
