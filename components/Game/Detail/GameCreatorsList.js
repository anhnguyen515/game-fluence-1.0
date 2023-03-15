import CategoryTitle from "@/components/common/CategoryTitle";
import GeneralItemCard from "@/components/common/GeneralItemCard";
import GeneralItemSkeleton from "@/components/loader/GeneralItemSkeleton";
import { Box, Grid, Typography } from "@mui/material";

export default function GameCreatorsList({ gameCreators, loading }) {
  return (
    <Box mt={3}>
      <CategoryTitle
        title={`Creators (${gameCreators ? gameCreators.count : "-"})`}
      />

      {!loading ? (
        gameCreators.count > 0 ? (
          <Grid container spacing={2}>
            {gameCreators.results.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} lg={3}>
                <GeneralItemCard
                  item={item}
                  href={`/creators/${item.slug}`}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color={"text.dark"}>-</Typography>
        )
      ) : (
        <Grid container spacing={2}>
          {[...Array(4)].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <GeneralItemSkeleton creator />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
