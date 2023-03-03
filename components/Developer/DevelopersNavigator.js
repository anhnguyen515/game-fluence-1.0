import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const routes = [
  {
    name: "Ubisoft",
    slug: "ubisoft",
    endIcon: null,
  },
  {
    name: "Valve Software",
    slug: "valve-software",
    endIcon: null,
  },
  {
    name: "Feral Interactive",
    slug: "feral-interactive",
    endIcon: null,
  },
  {
    name: "Square Enix",
    slug: "square-enix",
    endIcon: null,
  },
  {
    name: "Capcom",
    slug: "capcom",
    endIcon: null,
  },
  {
    name: "All Publishers",
    slug: null,
    endIcon: <ArrowRightIcon />,
  },
];

export default function DevelopersNavigator() {
  const router = useRouter();
  const { slug } = router.query;
  const [showSubcategories, setShowSubcategories] = React.useState(
    router.pathname.includes("/developers") ? true : false
  );

  function handleShowSubcategories() {
    setShowSubcategories((prev) => !prev);
  }

  return (
    <>
      <div className="w-full ">
        <Button
          color={router.pathname.includes("/developers") ? "primary" : "text"}
          fullWidth
          onClick={() => handleShowSubcategories()}
          size="large"
          sx={{
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: router.pathname.includes("/developers")
              ? "bold"
              : "normal",
          }}
        >
          Developers{" "}
          {showSubcategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showSubcategories && (
          <Stack alignItems={"flex-start"} gap={1} pl={2} mt={1}>
            {routes.map((i) => (
              <Button
                key={i.slug}
                color={
                  slug === i.slug ||
                  (router.pathname.includes("/developers") && !i.slug && !slug)
                    ? "primary"
                    : "text"
                }
                endIcon={i.endIcon}
                onClick={() =>
                  router.push({
                    pathname: i.slug ? `/developers/${i.slug}` : "/developers",
                  })
                }
                size="large"
                startIcon={i.icon}
                sx={{
                  fontWeight:
                    slug === i.slug ||
                    (router.pathname.includes("/developers") &&
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
