import CategoryTitle from "@/components/common/CategoryTitle";
import { dateFormat } from "@/utils/utils";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function GameInformation({
  gameDetail,
  gameAdditions,
  gamesSeries,
}) {
  const router = useRouter();
  return (
    <Box
      sx={{
        ".content": { color: "text.dark" },
        ".link": {
          transition: "color 0.2s",
          "&:hover": { color: "primary.light" },
        },
      }}
    >
      <Grid container spacing={3}>
        {/* platforms */}
        <Grid item xs={6}>
          <CategoryTitle title={"Platforms"} />
          {gameDetail.platforms.length > 0 ? (
            gameDetail.platforms.map((platform, index) => (
              <Link key={index} href={`/platforms/${platform.platform.slug}`}>
                <Typography className="content link" component={"span"}>
                  {platform.platform.name}
                </Typography>
                {index !== gameDetail.platforms.length - 1 && ", "}
              </Link>
            ))
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>

        {/* metascore */}
        <Grid item xs={6}>
          <CategoryTitle title={"Metascore"} />
          {gameDetail.metacritic ? (
            <Typography
              className={
                gameDetail.metacritic >= 75
                  ? "text-green-500"
                  : gameDetail.metacritic < 50
                  ? "text-red-500"
                  : "text-yellow-500"
              }
              component={"span"}
              fontSize={"1.6rem"}
              fontWeight={600}
              sx={{
                border: 2,
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              {gameDetail.metacritic}
            </Typography>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>

        {/* genres */}
        <Grid item xs={6}>
          <CategoryTitle title={"Genres"} />
          {gameDetail.genres.length > 0 ? (
            gameDetail.genres.map((genre, index) => (
              <Link key={index} href={`/genres/${genre.slug}`}>
                <Typography className="content link" component={"span"}>
                  {genre.name}
                </Typography>
                {index !== gameDetail.genres.length - 1 && ", "}
              </Link>
            ))
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>

        {/* released date */}
        <Grid item xs={6}>
          <CategoryTitle title={"Released date"} />
          <Typography className="content">
            {gameDetail.released
              ? dateFormat(gameDetail.released, "MMM DD, YYYY")
              : "-"}
          </Typography>
        </Grid>

        {/* developers */}
        <Grid item xs={6}>
          <CategoryTitle title={"Developers"} />
          {gameDetail.developers.length > 0 ? (
            <Stack alignItems={"flex-start"}>
              {gameDetail.developers.map((developer, index) => (
                <Link key={index} href={`/developers/${developer.slug}`}>
                  <Typography className="content link" component={"span"}>
                    {developer.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>

        {/* publishers */}
        <Grid item xs={6}>
          <CategoryTitle title={"Publishers"} />
          {gameDetail.publishers.length > 0 ? (
            <Stack alignItems={"flex-start"}>
              {gameDetail.publishers.map((publisher, index) => (
                <Link key={index} href={`/publishers/${publisher.slug}`}>
                  <Typography className="content link" component={"span"}>
                    {publisher.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>

        {/* ESRB */}
        <Grid item xs={12}>
          <CategoryTitle title={"ESRB rating"} />
          <Typography className="content">
            {gameDetail.esrb_rating ? gameDetail.esrb_rating.name : "-"}
          </Typography>
        </Grid>

        {/* games in series */}
        <Grid item xs={12}>
          <CategoryTitle title={"Other games in the series"} />
          {gamesSeries && gamesSeries.count > 0 ? (
            <Stack alignItems={"flex-start"}>
              {gamesSeries.results.map((item, index) => (
                <Link key={index} href={item.slug}>
                  <Typography className="content link">{item.name}</Typography>
                </Link>
              ))}
            </Stack>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>

        {/* additions */}
        <Grid item xs={12}>
          <CategoryTitle title={"DLC & editions"} />
          {gameAdditions && gameAdditions.count > 0 ? (
            <Stack alignItems={"flex-start"}>
              {gameAdditions.results.map((item, index) => (
                <Link key={index} href={item.slug}>
                  <Typography className="content link">{item.name}</Typography>
                </Link>
              ))}
            </Stack>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <CategoryTitle title={"Tags"} />
          {gameDetail.tags.length > 0 ? (
            <Stack
              alignItems={"center"}
              direction={"row"}
              gap={1}
              flexWrap={"wrap"}
            >
              {gameDetail.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.name}
                  onClick={() => router.push(`/tags/${tag.slug}`)}
                  size="small"
                />
              ))}
            </Stack>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <CategoryTitle title={"Website"} />
          {gameDetail.website ? (
            <a target="_blank" rel="noreferrer" href={gameDetail.website}>
              <Typography className="content link" component={"span"}>
                {gameDetail.website}
              </Typography>
            </a>
          ) : (
            <Typography className="content">-</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
