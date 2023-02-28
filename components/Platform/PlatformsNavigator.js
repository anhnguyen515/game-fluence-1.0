import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
    <>
      <Button
        color="text"
        fullWidth
        onClick={() => router.push(`/platforms`)}
        size="large"
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
        Platforms{" "}
        {<ArrowRightIcon className="is-hover" sx={{ display: "none" }} />}
      </Button>
      <Stack alignItems={"flex-start"} gap={1} ml={2}>
        {routes.map((item, index) => (
          <Button
            key={index}
            color={slug === item.slug ? "primary" : "text"}
            onClick={() => router.push(`/platforms/${item.slug}`)}
            size="large"
            sx={{
              fontWeight: slug === item.slug ? "bold" : "normal",
            }}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </>
  );
}
