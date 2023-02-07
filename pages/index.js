import { getGamesListAPI } from "@/utils/apis";
import { Typography } from "@mui/material";

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
      <h2 className="text-5xl">Best Of All Time</h2>
      {games.results.map((item, index) => (
        <div key={index}>
          <Typography className="text-red-500">{item.name}</Typography>
        </div>
      ))}
    </>
  );
}
