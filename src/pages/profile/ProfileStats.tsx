import { useEffect, useState } from "react";
import {
	VictoryBar,
	VictoryChart,
	VictoryGroup,
	VictoryLabel,
	VictoryPie,
} from "victory";

type GraphData = {
	x: string;
	y: number;
};

const ProfileStats = () => {
	const [hitsData, setHitsData] = useState<GraphData[]>([]);
	const [commentsData, setCommentsData] = useState<GraphData[]>([]);
	const [likesData, setLikesData] = useState<GraphData[]>([]);
	const [pieChartData, setPieChartData] = useState<GraphData[]>([]);

	useEffect(() => {
		const mockData = [];
		const sampleImages = ["Image1", "Image2", "Image3", "Image4"];

		for (let i = 0; i < sampleImages.length; i++) {
			mockData.push({
				title: sampleImages[i],
				hits: Math.floor(Math.random() * 10000),
				comments: Math.floor(Math.random() * 1000),
				likes: Math.floor(Math.random() * 5000),
			});
		}

		const hitsGraphData: GraphData[] = mockData.map((item) => ({
			x: item.title,
			y: item.hits,
			label: "Hits",
		}));
		const commentsGraphData: GraphData[] = mockData.map((item) => ({
			x: item.title,
			y: item.comments,
			label: "Comments",
		}));
		const likesGraphData: GraphData[] = mockData.map((item) => ({
			x: item.title,
			y: item.likes,
			label: "Likes",
		}));

		const pieGraphData: GraphData[] = mockData.map((item) => ({
			x: item.title,
			y: item.hits,
			label: item.title,
		}));

		setHitsData(hitsGraphData);
		setCommentsData(commentsGraphData);
		setLikesData(likesGraphData);
		setPieChartData(pieGraphData);
	}, []);

	return (
		<section className="p-4 sm:px-0">
			<h1 className="text-center text-2xl">Your Stats</h1>
			<article className="my-4 grid grid-cols-2 gap-6">
				<div className="col-span-full flex justify-around rounded-lg p-4 font-heading font-medium shadow-lg">
					<p>
						Total Hits:{" "}
						<span className="font-body font-normal">
							{Math.floor(Math.random() * 100000)}
						</span>
					</p>
					<p>
						Total Comments:{" "}
						<span className="font-body font-normal">
							{Math.floor(Math.random() * 100000)}
						</span>
					</p>
					<p>
						Total Likes:{" "}
						<span className="font-body font-normal">
							{Math.floor(Math.random() * 100000)}
						</span>
					</p>
				</div>
				<div className="col-auto rounded-lg p-4 font-heading font-medium shadow-lg">
					<VictoryPie
						data={pieChartData}
						colorScale={"qualitative"}
						innerRadius={50}
						padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 },
						}}
						style={{
							data: {
								fillOpacity: 0.9,
								stroke: "#fff",
								strokeWidth: 2,
							},
							labels: {
								fontSize: 14,
								fill: "#333",
							},
						}}
					/>
				</div>

				<div className="col-auto rounded-lg p-4 font-heading font-medium shadow-lg">
					<VictoryChart domainPadding={30}>
						<VictoryGroup
							offset={15}
							colorScale={"qualitative"}
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 },
							}}
						>
							<VictoryBar
								data={hitsData}
								labelComponent={
									<VictoryLabel
										style={{ fontSize: "12px" }}
										angle={90}
										dx="-5"
										verticalAnchor="start"
										textAnchor="end"
									/>
								}
							/>
							<VictoryBar
								data={commentsData}
								labelComponent={
									<VictoryLabel
										style={{ fontSize: "12px" }}
										angle={90}
										dx="-5"
										verticalAnchor="start"
										textAnchor="end"
									/>
								}
							/>
							<VictoryBar
								data={likesData}
								labelComponent={
									<VictoryLabel
										style={{ fontSize: "12px" }}
										angle={90}
										dx="-5"
										verticalAnchor="start"
										textAnchor="end"
									/>
								}
							/>
						</VictoryGroup>
					</VictoryChart>
				</div>
			</article>
		</section>
	);
};

export default ProfileStats;
