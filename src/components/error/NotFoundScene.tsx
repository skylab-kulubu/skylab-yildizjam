import notFound from "@/error-scenes/notFound.json";
import { ScenePage, type SceneData } from "./ScenePage";

// The button is a link home (the site's Button drawn as a Next Link).
export function NotFoundScene() {
  return <ScenePage scene={notFound as SceneData} href="/" />;
}
