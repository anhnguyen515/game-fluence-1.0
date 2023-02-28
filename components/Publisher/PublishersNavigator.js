import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";

const routes = [
  {
    name: "Electronic Arts",
    slug: "electronic-arts",
  },
  {
    name: "Square Enix",
    slug: "square-enix",
  },
  {
    name: "Ubisoft Entertainment",
    slug: "ubisoft-entertainment",
  },
  {
    name: "Microsoft Studios",
    slug: "microsoft-studios",
  },
  {
    name: "SEGA",
    slug: "sega-2",
  },
  {
    name: "2K Games",
    slug: "2k-games",
  },
  {
    name: "Bethesda Softworks",
    slug: "bethesda-softworks",
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
        onClick={() => router.push(`/publishers`)}
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
        Publishers{" "}
        <ArrowRightIcon className="is-hover" sx={{ display: "none" }} />
      </Button>
      <Stack alignItems={"flex-start"} gap={1} pl={2}>
        {routes.map((item, index) => (
          <Button
            key={index}
            color={slug === item.slug ? "primary" : "text"}
            onClick={() => router.push(`/publishers/${item.slug}`)}
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
