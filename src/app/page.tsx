import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/content/types";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
