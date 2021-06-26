import "./Explore.css";
import Categories from "../../components/Categories/Categories";
import FeaturedCategory from "../../components/FeaturedCategory/FeaturedCategory";

export const Explore: React.FC = () => {
  return (
    <div className="Explore">
      <Categories />
      <FeaturedCategory name="News" />
      <FeaturedCategory name="Technology" />
      <FeaturedCategory name="True Crime" />
      <FeaturedCategory name="Sports" />
    </div>
  );
};
