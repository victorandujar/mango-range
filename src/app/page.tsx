import { SITE_CONFIG } from "@/config/site";

export default function Home() {
  return <h1 className="text-2xl font-semibold tracking-tight">{SITE_CONFIG.name}</h1>;
}
