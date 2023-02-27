import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
      {routes.map((item, index) => (
        <Button
          key={index}
          color={slug === item.slug ? "primary" : "text"}
          onClick={() => router.push(`/platforms/${item.slug}`)}
          size="large"
          sx={{
            fontSize: "1.1rem",
            fontWeight: slug === item.slug ? "bold" : "normal",
          }}
        >
          {item.name} Games
        </Button>
      ))}
      <Button
        color="text"
        endIcon={<ArrowRightIcon />}
        onClick={() => router.push(`/platforms`)}
        size="large"
        sx={{ fontSize: "1.1rem" }}
      >
        All Platforms
      </Button>
    </Stack>
  );
}
