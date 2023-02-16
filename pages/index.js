import { getGamesListAPI } from "@/utils/apis";
import { SITE_NAME } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";

export async function getServerSideProps(context) {
  const games = await getGamesListAPI().then((res) => res.data);

  return {
    props: {
      games,
    },
  };
}

export default function Home({ games }) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "20rem",
          backgroundImage: `linear-gradient(to bottom,rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.8)), url(${
            games.results[Math.floor(Math.random() * games.results.length)]
              .background_image
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -1,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color={"text.light"}
          fontSize={"1.8rem"}
          fontWeight={600}
          variant="h1"
        >
          Welcome to{" "}
          <Typography
            color={"primary.main"}
            component={"span"}
            fontSize={"1.8rem"}
            fontWeight={600}
          >
            {SITE_NAME}
          </Typography>
        </Typography>
        <Typography color={"text.main"}>
          Your nice & cozy video games platform
        </Typography>
      </Box>
      {/* {games.results.map((item, index) => (
        <div key={index}>
          <Typography className="text-red-500">{item.name}</Typography>
        </div>
      ))} */}
    </>
  );
}
