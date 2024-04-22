import { createFileRoute } from "@tanstack/react-router";
import NotePage from "../../pages/NotePage";

export const Route = createFileRoute("/note/$noteId")({
  component: () => <NotePage />,
});
