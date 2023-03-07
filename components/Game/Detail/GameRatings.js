import { ratingColor, upperCaseFirstLetter } from "@/utils/utils";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function GameRatings({ gameDetail }) {
  return (
    <Stack justifyContent={"center"}>
      <Stack alignItems={"center"}>
        <Box
          sx={{
            maxWidth: "16rem",
            aspectRatio: "1",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: -1,
            }}
          >
            <Typography
              color={
                ratingColor(upperCaseFirstLetter(gameDetail.ratings[0].title))
                  .borderColor
              }
              fontSize={"2.6rem"}
              fontWeight={600}
            >
              {gameDetail.rating}
            </Typography>
          </Box>
          <Doughnut
            data={{
              labels: [...gameDetail.ratings].map((i) =>
                upperCaseFirstLetter(i.title)
              ),
              datasets: [
                {
                  label: "% of ratings",
                  data: [...gameDetail.ratings].map((i) => i.percent),
                  backgroundColor: [...gameDetail.ratings].map(
                    (i) =>
                      ratingColor(upperCaseFirstLetter(i.title)).backgroundColor
                  ),
                  borderColor: [...gameDetail.ratings].map(
                    (i) =>
                      ratingColor(upperCaseFirstLetter(i.title)).borderColor
                  ),
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Box>
        <Typography fontSize={"1.2rem"} sx={{ mt: 2 }}>
          {gameDetail.ratings_count.toLocaleString()}{" "}
          {gameDetail.ratings_count > 1 ? `ratings` : `rating`}
        </Typography>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
          justifyContent={"center"}
          mt={1}
        >
          {[...gameDetail.ratings].map((item) => (
            <Chip
              key={item.id}
              label={
                <Stack alignItems={"center"} direction={"row"} gap={1}>
                  <Typography fontSize={"0.9rem"}>
                    {upperCaseFirstLetter(item.title)}
                  </Typography>
                  <Typography color={"text.dark"} fontSize={"0.9rem"}>
                    {item.count.toLocaleString()}
                  </Typography>
                </Stack>
              }
              sx={{
                backgroundColor: ratingColor(upperCaseFirstLetter(item.title))
                  .backgroundColor,
                color: ratingColor(upperCaseFirstLetter(item.title))
                  .borderColor,
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
