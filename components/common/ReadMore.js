import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import parse from "html-react-parser";
import React from "react";

export default function ReadMore({ paragraph, fontSize = "0.9rem" }) {
  const heightRef = React.useRef(null);

  const [readMore, setReadMore] = React.useState(true);

  React.useEffect(() => {
    const height = heightRef.current.clientHeight;
    setReadMore(height >= 96);
  }, []);

  return (
    <div>
      <Box
        className={readMore ? "line-clamp-3" : null}
        ref={heightRef}
        sx={{
          lineHeight: "32px",
          color: "text.dark",
          fontSize: fontSize,
          "h1, h2, h3, h4, h5, h6": {
            fontSize: "1.3rem",
            fontWeight: 600,
            mt: 1,
          },
        }}
      >
        {parse(paragraph)}
      </Box>
      {readMore && (
        <Button
          color="text"
          fullWidth
          onClick={() => setReadMore((prev) => !prev)}
          size="small"
          startIcon={readMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        >
          {readMore ? "Read more" : "Show less"}
        </Button>
      )}
    </div>
  );
}
