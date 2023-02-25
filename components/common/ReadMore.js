import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

export default function ReadMore({ paragraph }) {
  const heightRef = React.useRef(null);

  const [readMore, setReadMore] = React.useState(true);

  React.useLayoutEffect(() => {
    const height = heightRef.current.clientHeight;
    setReadMore(height > 57.6); // 57.6px = 3.6rem
  }, []);

  return (
    <>
      <Box
        className={readMore ? "line-clamp-2" : null}
        ref={heightRef}
        sx={{ lineHeight: "1.8rem", color: "text.dark" }}
      >
        {paragraph}
      </Box>
      {readMore && (
        <Stack alignItems={"center"} mt={1}>
          <Button
            color="text"
            onClick={() => setReadMore((prev) => !prev)}
            size="small"
            startIcon={readMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          >
            {readMore ? "Read more" : "Show less"}
          </Button>
        </Stack>
      )}
    </>
  );
}
