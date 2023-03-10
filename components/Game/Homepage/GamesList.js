import CategoryTitle from "@/components/common/CategoryTitle";
import { Grid, Stack } from "@mui/material";
import GameCard from "../GameCard";

export default function GamesList({ title, href, games }) {
  return (
    <Stack alignItems={"flex-start"} gap={2}>
      <CategoryTitle title={title} fontSize={"1.8rem"} href={href} />
      <Grid container spacing={2}>
        {games.results.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <GameCard game={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
