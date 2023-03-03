import { getGamesListAPI } from "@/apis/game";
import GamesList from "@/components/Game/Homepage/GamesList";
import InnerLayout from "@/layout/InnerLayout";
import { selectUser } from "@/store/slices/userSlice";
import { SITE_NAME } from "@/utils/constants";
import { dateFormat } from "@/utils/utils";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export async function getStaticProps() {
  const [newGames, popularGamesLastYear] = await Promise.all([
    getGamesListAPI({
      dates: `${dateFormat(dayjs().subtract(3, "month"))},${dateFormat(
        dayjs().add(6, "month")
      )}`,
      page_size: 12,
    }).then((res) => res.data),
    getGamesListAPI({
      dates: `${dateFormat(
        dayjs().subtract(1, "year").startOf("year")
      )},${dateFormat(dayjs().subtract(1, "year").endOf("year"))}`,
      page_size: 12,
    }).then((res) => res.data),
  ]);

  return {
    props: {
      newGames,
      popularGamesLastYear,
    },
    revalidate: 60,
  };
}

export default function Home({ newGames, popularGamesLastYear }) {
  const title = `Welcome to ${SITE_NAME}`;
  const heroImage =
    newGames.results[Math.floor(Math.random() * newGames.results.length)]
      .background_image;
  const userStore = useSelector(selectUser);
  const router = useRouter();

  return (
    <>
      <InnerLayout
        title={title}
        subtitle={"Everything you need for video games is here"}
        content={
          <Stack alignItems={"center"} direction={"row"} gap={1} mt={3}>
            {!userStore.isAuthenticated && (
              <Button
                onClick={() => router.push("/auth/login")}
                size="large"
                variant="contained"
              >
                GET STARTED
              </Button>
            )}
            <Button
              onClick={() => router.push("/games")}
              size="large"
              variant="outlined"
            >
              Browse Games
            </Button>
          </Stack>
        }
        img={heroImage}
      >
        <Stack gap={6}>
          <GamesList
            title={"New & Upcoming"}
            games={newGames}
            href={"/games?category=new-and-upcoming"}
          />
          <GamesList
            title={`Popular in ${dayjs().subtract(1, "year").year()}`}
            games={popularGamesLastYear}
            href={"/games?category=popular-last-year"}
          />
        </Stack>
      </InnerLayout>
    </>
  );
}
