"use client"

import { UserPhotosStatsResponse } from "@/interfaces/api/users"
import { useEffect, useState } from "react"
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryPie } from "victory"

interface GraphData {
    x: string
    y: number
    label: string
}

export default function DashboardStats({
    data
}: {
    data: UserPhotosStatsResponse
}) {
    const [views, setViews] = useState<GraphData[]>([])
    const [likes, setLikes] = useState<GraphData[]>([])
    const [comments, setComments] = useState<GraphData[]>([])
    const [pieChart, setPieChart] = useState<GraphData[]>([])

    const joinPhotosArray = data.latest_photos.photos.concat(
        data.popular_photos.photos
    )

    useEffect(() => {
        if (!data) return

        const views = joinPhotosArray.map((photo) => ({
            x: photo.title,
            y: photo.meta.total_views,
            label: "Views"
        }))
        const likes = joinPhotosArray.map((photo) => ({
            x: photo.title,
            y: photo.meta.total_likes,
            label: "Likes"
        }))
        const comments = joinPhotosArray.map((photo) => ({
            x: photo.title,
            y: photo.meta.total_comments,
            label: "Comments"
        }))
        const pieChart = joinPhotosArray.map((photo) => ({
            x: photo.title,
            y: photo.meta.total_views,
            label: photo.title
        }))

        setViews(views)
        setLikes(likes)
        setComments(comments)
        setPieChart(pieChart)
    }, [data, joinPhotosArray])

    return (
        <section className="my-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="font-heading col-span-full flex justify-around rounded-lg p-4 font-medium shadow-lg dark:bg-green-spring-200 dark:text-green-spring-950">
                <p>
                    Total Hits:{" "}
                    <span className="font-body font-normal">
                        {views.reduce((acc, item) => acc + item.y, 0)}
                    </span>
                </p>
                <p>
                    Total Comments:{" "}
                    <span className="font-body font-normal">
                        {comments.reduce((acc, item) => acc + item.y, 0)}
                    </span>
                </p>
                <p>
                    Total Likes:{" "}
                    <span className="font-body font-normal">
                        {likes.reduce((acc, item) => acc + item.y, 0)}
                    </span>
                </p>
            </div>
            <div className="font-heading col-auto rounded-lg p-4 font-medium shadow-lg dark:bg-green-spring-200">
                <VictoryPie
                    data={pieChart}
                    colorScale={"qualitative"}
                    innerRadius={50}
                    padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: {
                            fillOpacity: 0.9,
                            stroke: "hsl(100, 6%, 10%)",
                            strokeWidth: 2
                        },
                        labels: { fontSize: 14 }
                    }}
                />
            </div>

            <div className="font-heading col-auto rounded-lg p-4 font-medium shadow-lg dark:bg-green-spring-200">
                <VictoryChart domainPadding={30}>
                    <VictoryGroup
                        offset={15}
                        colorScale={"qualitative"}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    >
                        <VictoryBar
                            data={views}
                            barWidth={12}
                            labelComponent={
                                <VictoryLabel
                                    style={{ fontSize: 12 }}
                                    angle={90}
                                    dx="-5"
                                    verticalAnchor="start"
                                    textAnchor="end"
                                />
                            }
                            style={{
                                data: { fillOpacity: 0.9, strokeWidth: 1 }
                            }}
                        />
                        <VictoryBar
                            data={comments}
                            barWidth={12}
                            labelComponent={
                                <VictoryLabel
                                    style={{ fontSize: 12 }}
                                    angle={90}
                                    dx="-5"
                                    verticalAnchor="start"
                                    textAnchor="end"
                                />
                            }
                            style={{
                                data: { fillOpacity: 0.9, strokeWidth: 1 }
                            }}
                        />
                        <VictoryBar
                            data={likes}
                            barWidth={12}
                            labelComponent={
                                <VictoryLabel
                                    style={{ fontSize: 12 }}
                                    angle={90}
                                    dx="-5"
                                    verticalAnchor="start"
                                    textAnchor="end"
                                />
                            }
                            style={{
                                data: { fillOpacity: 0.9, strokeWidth: 1 }
                            }}
                        />
                    </VictoryGroup>
                </VictoryChart>
            </div>
        </section>
    )
}
