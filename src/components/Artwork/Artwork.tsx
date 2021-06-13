
import { Image } from 'antd';
import "./Artwork.css";

interface Properties {
    width?: number | string
    src?: string
    className?: string
}

//TOD placeholder
export function Artwork({ width = 250, src }: Properties) {
    return (
        <div className="Artwork">
            <Image
                height={width}
                width={width}
                src={src}
                preview={false} // TODO think about it
                fallback="https://placeholder.com/"
            />
        </div>
    );
}

export default Artwork;