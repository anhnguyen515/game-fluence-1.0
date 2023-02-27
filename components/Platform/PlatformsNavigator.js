import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import GridViewIcon from "@mui/icons-material/GridView";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";

const routes = [
  {
    name: "PC",
    slug: "pc",
  },
  {
    name: "PlayStation 5",
    slug: "playstation5",
  },
  {
    name: "PlayStation 4",
    slug: "playstation4",
  },
  {
    name: "Xbox One",
    slug: "xbox-one",
  },
  {
    name: "Xbox Series S/X",
    slug: "xbox-series-x",
  },
  {
    name: "Nintendo Switch",
    slug: "nintendo-switch",
  },
  {
    name: "iOS",
    slug: "ios",
  },
  {
    name: "Android",
    slug: "android",
  },
];

export default function Navigator() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Stack
      alignItems={"flex-start"}
      gap={1}
      sx={{ position: "sticky", top: 16, overflow: "auto" }}
    >
      <Button
        color="text"
        fullWidth
        onClick={() => router.push(`/platforms`)}
        size="large"
        startIcon={<GridViewIcon />}
        sx={{
          fontSize: "1.1rem",
          justifyContent: "flex-start",
          "&:hover": {
            ".is-hover": {
              display: "block",
              ml: "auto",
            },
          },
        }}
      >
        All Platforms{" "}
        {<ArrowRightIcon className="is-hover" sx={{ display: "none" }} />}
      </Button>
      {routes.map((item, index) => (
        <Button
          key={index}
          color={slug === item.slug ? "primary" : "text"}
          fullWidth
          onClick={() => router.push(`/platforms/${item.slug}`)}
          size="large"
          sx={{
            fontSize: "1.1rem",
            fontWeight: slug === item.slug ? "bold" : "normal",
            justifyContent: "flex-start",
            "&:hover": {
              ".is-hover": {
                display: "block",
                ml: "auto",
              },
            },
          }}
        >
          {item.name}{" "}
          {<ArrowRightIcon className="is-hover" sx={{ display: "none" }} />}
        </Button>
      ))}
    </Stack>
  );
}
