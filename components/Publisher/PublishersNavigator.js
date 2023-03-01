import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

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
    name: "Capcom",
    slug: "capcom",
  },
  {
    name: "2K Games",
    slug: "2k-games",
  },
  {
    name: "Bethesda Softworks",
    slug: "bethesda-softworks",
  },
  {
    name: "All Publishers",
    slug: null,
  },
];

export default function GamesNavigator() {
  const router = useRouter();
  const { slug } = router.query;
  const [showSubcategories, setShowSubcategories] = React.useState(
    router.pathname.includes("/publishers") ? true : false
  );

  function handleShowSubcategories() {
    setShowSubcategories((prev) => !prev);
  }

  return (
    <>
      <div className="w-full ">
        <Button
          color={router.pathname.includes("/publishers") ? "primary" : "text"}
          fullWidth
          onClick={() => handleShowSubcategories()}
          size="large"
          sx={{
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: router.pathname.includes("/publishers")
              ? "bold"
              : "normal",
          }}
        >
          Publishers{" "}
          {showSubcategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showSubcategories && (
          <Stack alignItems={"flex-start"} gap={1} pl={2} mt={1}>
            {routes.map((i) => (
              <Button
                color={
                  slug === i.slug ||
                  (router.pathname.includes("/publishers") && !i.slug && !slug)
                    ? "primary"
                    : "text"
                }
                key={i.slug}
                onClick={() =>
                  router.push({
                    pathname: i.slug ? `/publishers/${i.slug}` : "/publishers",
                  })
                }
                size="large"
                startIcon={i.icon}
                sx={{
                  fontWeight:
                    slug === i.slug ||
                    (router.pathname.includes("/publishers") &&
                      !i.slug &&
                      !slug)
                      ? "bold"
                      : "normal",
                }}
              >
                {i.name}
              </Button>
            ))}
          </Stack>
        )}
      </div>
    </>
  );
}
