import { Routes, Route } from "react-router-dom";
import { Layout as NewLayout } from "../components/layout/Layout";
import { Home } from "../pages/Home/Home";
import { MathModule } from "../pages/Math/MathModule";
import { ScienceModule } from "../pages/Science/ScienceModule";
import { SocialModule } from "../pages/Social/SocialModule";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NewLayout />}>
        <Route index element={<Home />} />
        <Route path="matematicas" element={<MathModule />} />
        <Route path="ciencias" element={<ScienceModule />} />
        <Route path="sociales" element={<SocialModule />} />
      </Route>
    </Routes>
  );
}