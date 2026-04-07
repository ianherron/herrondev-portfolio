import { redirect } from "next/navigation";

// Redirect root "/" → "/en" (middleware handles this at runtime,
// this covers the static prerender pass during build)
export default function RootPage() {
  redirect("/en");
}
