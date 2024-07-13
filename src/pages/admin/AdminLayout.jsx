import { Box, Card } from "@radix-ui/themes";
import DashboardHeader from "./DashboardHeader";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

export default function AdminLayout() {
  const user = useSelector(selectUser);

  // if (!user.id) return <Navigate to={"/auth"} />;

  if (!user.id)
    return (
      <Box mt="5">
        <Card className="p-2"> You need to login to access this page</Card>
      </Box>
    );

  if (user.id && !user.is_staff)
    return (
      <Box mt="5">
        <Card className="p-2"> Only Admin users can access this page</Card>
      </Box>
    );

  if (user?.is_staff)
    return (
      <>
        <main className="p-2">
          <DashboardHeader />
          <Outlet className="mt-3" />
        </main>
      </>
    );
}
