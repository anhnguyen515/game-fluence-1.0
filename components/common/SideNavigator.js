import CodeIcon from "@mui/icons-material/Code";
import PublishIcon from "@mui/icons-material/Publish";
import StoreIcon from "@mui/icons-material/Store";
import TagIcon from "@mui/icons-material/Tag";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import GamesNavigator from "../Game/GamesNavigator";
import GenresNavigator from "../Genre/GenresNavigator";
import PlatformsNavigator from "../Platform/PlatformsNavigator";

const routes = [
  {
    name: "Developers",
    route: "/developers",
    icon: <CodeIcon />,
  },
  {
    name: "Publishers",
    route: "/publishers",
    icon: <PublishIcon />,
  },
  {
    name: "Stores",
    route: "/stores",
    icon: <StoreIcon />,
  },
  {
    name: "Tags",
    route: "/tags",
    icon: <TagIcon />,
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
          startIcon={item.icon}
          sx={{ fontSize: "1.1rem", justifyContent: "flex-start" }}
        >
          {item.name}
        </Button>
      ))}
    </Stack>
  );
}
