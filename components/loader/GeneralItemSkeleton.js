import { Skeleton, Stack } from "@mui/material";

export default function GeneralItemSkeleton({ creator }) {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      gap={1}
      sx={{
        width: "100%",
        aspectRatio: "1.25/1",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        p: 2,
      }}
    >
      {creator && <Skeleton variant="circular" width={70} height={70} />}
      <Skeleton variant="rounded" width={210} height={30} />
      <Skeleton variant="rounded" width={120} height={15} />
      <Skeleton variant="rounded" width={80} height={15} />
    </Stack>
  );
}
