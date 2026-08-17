import { redirect } from "next/navigation";

/** Public front door = TBTX hub (Digital Fog → diagnostic). */
export default function RootEntry() {
  redirect("/tbtx");
}
