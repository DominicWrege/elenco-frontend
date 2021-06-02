
import { Image } from 'antd';
import "./Artwork.css";

interface Properties {
    height?: number
    src?: string
    className?: string
}

//TOD placeholder
export function Artwork({ height = 250, src }: Properties) {
    return (
        <div className="Artwork">
            <Image
                height={height}
                width={height}
                src={src}
                fallback="https://placeholder.com/"
            />
        </div>
    );
}

export default Artwork;