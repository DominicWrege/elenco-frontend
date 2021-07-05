import { Typography } from "antd";
import "./Statistic.css";
import CountUp from "react-countup";

interface Props {
	label: string;
	value: number;
}

const Statistic: React.FC<Props> = ({ label, value }) => {
	return (
		<div className="Statistic">
			<Typography.Title level={4}>{label}</Typography.Title>
			<CountUp duration={3} separator="." end={value} />
		</div>
	);
};

Statistic.propTypes = {};

export default Statistic;
