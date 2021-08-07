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

export function Artwork({ width = "100%", src, href, loading }: Properties) {
	const fallback = "/img/podcast_placeholder.jpg";
	const placeholderPath = "/img/placeholder2.svg";
	const placeholder = (
		<img width={"100%"} src={placeholderPath} alt="Artwork placeholder" />
	);

	if (loading) {
		return (
			<Image
				alt="Podcast Artwork Image Placeholder"
				height={width}
				width={width}
				loading="lazy"
				src={placeholderPath}
				preview={false}
				fallback={fallback}
			/>
		);
	}

	const img = (
		<Image
			alt="Podcast Artwork Image"
			height={width}
			width={width}
			loading="lazy"
			src={src ?? fallback}
			preview={false}
			fallback={fallback}
			placeholder={placeholder}
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
