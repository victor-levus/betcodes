import { useSelector } from "react-redux";
import { Grid, Heading } from "@radix-ui/themes";

import { selectAllBets } from "../../store/slices/betsSlice";
import Caution from "./Caution";
import Fixtures from "./Fixtures";
import BlogPage from "../blog/BlogPage";

const Home = () => {
  const bets = useSelector(selectAllBets);

  if (!bets) return <Heading>Server Data not available</Heading>;

  return (
    <>
      <Grid gap={"4"} mt={"4"}>
        <Caution />

        <Fixtures bets={bets} />

        <BlogPage />
      </Grid>
    </>
  );
};

export default Home;

export const metadata = {
  title: "Betcodes - Home",
  description: "We provide betting tips that has high possibility of happening",
};
