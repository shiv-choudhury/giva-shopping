import { Skeleton } from "@mui/material";

export function Loader() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ mb: 2 }}
      />
      <Skeleton variant="rectangular" width="100%" height={200} />
    </div>
  );
}