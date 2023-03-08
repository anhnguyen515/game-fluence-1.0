import CategoryTitle from "@/components/common/CategoryTitle";
import GeneralItemCard from "@/components/common/GeneralItemCard";
import { Box, Grid, Typography } from "@mui/material";

export default function GameCreatorsList({ gameCreators }) {
  return (
    <Box mt={3}>
      <CategoryTitle
        title={`Creators (${gameCreators ? gameCreators.count : "-"})`}
      />
      {gameCreators && gameCreators.count > 0 ? (
        <Grid container spacing={2}>
          {gameCreators.results.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <GeneralItemCard item={item} href={`/creators/${item.slug}`} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography className="content">-</Typography>
      )}
    </Box>
  );
}
