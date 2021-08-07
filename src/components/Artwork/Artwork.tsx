import { Image } from "antd";
import { CSSProperties } from "react";
import { Link } from "wouter";
import util from "../../functions/util";
import "./Artwork.css";

interface Properties {
	width?: number | string;
	src?: string | null;
	className?: string;
	style?: CSSProperties;
	href?: string;
	loading?: boolean;
}
const className = "Artwork";

export function Artwork({ width = "100%", src, href }: Properties) {
	const fallback = "/img/podcast_placeholder.jpg";

	const img = (
		<Image
			alt="Podcast Artwork Image"
			height={width}
			width={width}
			loading="lazy"
			src={src ?? fallback}
			preview={false}
			fallback={fallback}
			placeholder={
				<img
					width={"100%"}
					src="/img/placeholder2.svg"
					alt="Artwork placeholder"
				/>
			}
		/>
	);

	if (href) {
		return (
			<div className={className}>
				<Link href={href} onClick={util.scrollTop}>
					{img}
					<div hidden>link</div>
				</Link>
			</div>
		);
	} else {
		return <div className={className}>{img}</div>;
	}
}

export default Artwork;
