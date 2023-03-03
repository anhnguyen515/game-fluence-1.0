import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const routes = [
  {
    name: "Bethesda Softworks",
    slug: "bethesda-softworks",
    endIcon: null,
  },
  {
    name: "Capcom",
    slug: "capcom",
    endIcon: null,
  },
  {
    name: "Electronic Arts",
    slug: "electronic-arts",
    endIcon: null,
  },
  {
    name: "Square Enix",
    slug: "square-enix",
    endIcon: null,
  },
  {
    name: "Ubisoft Entertainment",
    slug: "ubisoft-entertainment",
    endIcon: null,
  },
  {
    name: "Valve",
    slug: "valve",
    endIcon: null,
  },
  {
    name: "All Publishers",
    slug: null,
    endIcon: <ArrowRightIcon />,
  },
];

export default function PublishersNavigator() {
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
                key={i.slug}
                color={
                  slug === i.slug ||
                  (router.pathname.includes("/publishers") && !i.slug && !slug)
                    ? "primary"
                    : "text"
                }
                endIcon={i.endIcon}
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
