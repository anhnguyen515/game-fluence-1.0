import CategoryTitle from "@/components/common/CategoryTitle";
import GeneralItemCard from "@/components/common/GeneralItemCard";
import GeneralItemSkeleton from "@/components/loader/GeneralItemSkeleton";
import CreatorSkeleton from "@/components/loader/GeneralItemSkeleton";
import { PAGINATION_LIMIT } from "@/utils/constants";
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
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={2.4}>
                <GeneralItemCard
                  item={item}
                  href={`/creators/${item.slug}`}
                  loading={loading}
                  maxHeight={gameCreators.results.length > 1}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color={"text.dark"}>-</Typography>
        )
      ) : (
        <Grid container spacing={2}>
          {[...Array(5)].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={2.4}>
              <GeneralItemSkeleton creator />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
