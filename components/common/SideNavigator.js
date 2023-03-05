import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import GamesNavigator from "../Game/GamesNavigator";
import GenresNavigator from "../Genre/GenresNavigator";
import PlatformsNavigator from "../Platform/PlatformsNavigator";

const routes = [
  {
    name: "Developers",
    route: "/developers",
  },
  {
    name: "Publishers",
    route: "/publishers",
  },
  {
    name: "Stores",
    route: "/stores",
  },
  {
    name: "Tags",
    route: "/tags",
  },
];

export default function SideNavigator() {
  const router = useRouter();
  return (
    <Stack
      alignItems={"flex-start"}
      gap={1}
      sx={{
        position: "sticky",
        top: 0,
        maxHeight: "100vh",
        overflow: "auto",
        "::-webkit-scrollbar": {
          width: 0,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "text.main",
          opacity: 0.5,
          borderRadius: 1,
        },
      }}
    >
      <GamesNavigator />
      <GenresNavigator />
      <PlatformsNavigator />
      {routes.map((item, index) => (
        <Button
          key={index}
          color="text"
          fullWidth
          onClick={() => router.push(item.route)}
          size="large"
          sx={{ fontSize: "1.1rem", justifyContent: "space-between" }}
        >
          {item.name}
        </Button>
      ))}
    </Stack>
  );
}
