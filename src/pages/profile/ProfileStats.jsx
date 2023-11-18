import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	VictoryBar,
	VictoryChart,
	VictoryGroup,
	VictoryLabel,
	VictoryPie,
} from "victory";
import Error from "../../components/helpers/Error";
import Head from "../../components/helpers/Head";
import Loading from "../../components/helpers/Loading";
import { fetchProfileStats } from "../../store/slices/stats.slice";

const ProfileStats = () => {
	const { data: token } = useSelector((state) => state.token);
	const { data, loading, error } = useSelector((state) => state.profileStats);

	const dispatch = useDispatch();

	const [hitsData, setHitsData] = useState([]);
	const [commentsData, setCommentsData] = useState([]);
	const [likesData, setLikesData] = useState([]);
	const [pieChartData, setPieChartData] = useState([]);

	useEffect(() => {
		if (!data) {
			dispatch(fetchProfileStats(token));
			return;
		}

		const photosArray = data.photos.map((photo) => ({
			title: photo.title,
			hits: photo.meta.total_hits,
			comments: photo.meta.total_comments,
			likes: photo.meta.total_likes,
		}));

		const hitsGraphData = photosArray.map((item) => ({
			x: item.title,
			y: item.hits,
			label: "Hits",
		}));
		const commentsGraphData = photosArray.map((item) => ({
			x: item.title,
			y: item.comments,
			label: "Comments",
		}));
		const likesGraphData = photosArray.map((item) => ({
			x: item.title,
			y: item.likes,
			label: "Likes",
		}));

		const pieGraphData = photosArray.map((item) => ({
			x: item.title,
			y: item.hits,
			label: item.title,
		}));

		setHitsData(hitsGraphData);
		setCommentsData(commentsGraphData);
		setLikesData(likesGraphData);
		setPieChartData(pieGraphData);
	}, [data, dispatch, token]);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	if (!data) return null;

	if (data.photos.length <= 0) {
		return (
			<section className="p-4 sm:px-0">
				<Head title="Stats" description="View your profile stats here." />
				<div className="my-10 text-center">
					<h1 className="text-2xl font-semibold">Your Stats</h1>
					<p className="mt-4 text-lg text-gray-600">
						No photos to generate stats. Start sharing your moments to see
						statistics!
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className="p-4 sm:px-0">
			<Head
				title="Stats"
				description="In this page, you have access to your profile stats such as your total hits, likes, and comments."
			/>

			<h1 className="text-center text-2xl">Your Stats</h1>
			<article className="my-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="col-span-full flex justify-around rounded-lg p-4 font-heading font-medium shadow-lg">
					<p>
						Total Hits:{" "}
						<span className="font-body font-normal">
							{hitsData.reduce((acc, item) => acc + item.y, 0)}
						</span>
					</p>
					<p>
						Total Comments:{" "}
						<span className="font-body font-normal">
							{commentsData.reduce((acc, item) => acc + item.y, 0)}
						</span>
					</p>
					<p>
						Total Likes:{" "}
						<span className="font-body font-normal">
							{likesData.reduce((acc, item) => acc + item.y, 0)}
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
