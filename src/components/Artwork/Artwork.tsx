import { Image } from "antd";
import "./Artwork.css";

interface Properties {
  width?: number | string;
  src?: string;
  className?: string;
}

//TOD placeholder
export function Artwork({ width = "100%", src }: Properties) {
  const fallback = "/img/podcast_placeholder.jpg";
  return (
    <div className="Artwork">
      <Image
        alt="Podcast Artwork Image"
        height={width}
        width={width}
        src={src ?? fallback}
        preview={false} // TODO think about it
        fallback={fallback}
      />
    </div>
  );
}

export default Artwork;
