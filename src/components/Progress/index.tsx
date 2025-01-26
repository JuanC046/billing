import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
interface ProgressProps {
    open: boolean;
    title: string;
}
export default function Progress({ open, title }: ProgressProps) {
    return (
        <Backdrop
            sx={(theme) => ({
                color: "#fff",
                zIndex: theme.zIndex.drawer + 1,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
            open={open}
        >
            <Typography variant="h5" component="h2">
                {title}
            </Typography>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
