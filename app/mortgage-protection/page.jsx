import CoveragePage from "../components/CoveragePage";
import { coveragePages } from "../coverageData";

export default function Page() {
  return <CoveragePage page={coveragePages["mortgage-protection"]} />;
}
