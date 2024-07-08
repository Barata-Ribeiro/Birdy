import { Metadata } from "next"
import Image from "next/image"
import AboutImage from "../../../public/images/about-image.jpg"

export const metadata: Metadata = {
    title: "About Us | Birdy",
    description: "This is the about us page of the website. Find out how Birdy was created and who is behind it."
}

export default async function AboutPage() {
    return (
        <section className="mx-auto my-4 max-w-5xl px-4 sm:px-0">
            <h1 className="mb-8 text-center text-4xl font-medium">About Birdy</h1>
            <article className="space-y-4 whitespace-normal leading-relaxed">
                <div className="mx-auto space-y-4">
                    <p>
                        Welcome to Birdy, an Instagram-like social media platform for bird enthusiasts to share and
                        explore various bird species through their photographs. Inspired by the simplicity and
                        connectivity of platforms like Instagram, Birdy offers a specialized space dedicated to the
                        exploration and appreciation of various bird species from around the globe.
                    </p>
                    <div className="relative h-96">
                        <Image
                            src={AboutImage}
                            alt="Gray and white bird perching on branch foto, by Ray Hennessy on Unsplash"
                            title="Gray and white bird perching on branch foto, by Ray Hennessy on Unsplash"
                            className="mx-auto mb-4 rounded-lg object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={100}
                            priority
                            fill
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold">Our Mission</h2>
                    <p>
                        At Birdy, our mission is to provide a dynamic and engaging platform for bird enthusiasts to
                        share their captures, stories, and knowledge about birds. We aim to foster a supportive
                        community where members can connect, learn, and contribute to a growing database of avian beauty
                        and diversity. (or would it be, as this project was created with educational purposes in
                        mind...)
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold">Technology at Birdy</h2>
                    <p>
                        Birdy stands on the cutting edge of web technology, incorporating a seamless integration of
                        frontend and backend systems to deliver an seamless user experience.
                    </p>
                    <div className="my-2 flex flex-wrap items-center">
                        <div className="px-4 md:w-1/2">
                            <div className="flex h-full flex-col rounded-lg bg-mantis-100 p-8 dark:bg-mantis-900">
                                <div className="mb-3 flex items-center">
                                    <h2 className="title-font text-xl font-medium text-green-spring-900 dark:text-green-spring-100">
                                        Frontend
                                    </h2>
                                </div>
                                <div className="grow">
                                    <p className="text-base leading-relaxed">
                                        The Birdy user interface is crafted with NextJS, offering a responsive and
                                        intuitive environment that resonates with the modern web user&apos;s
                                        expectations. Drawing inspiration from the &lsquo;Dogs&rsquo; social network,
                                        Birdy&apos;s design is tailored to highlight the beauty of birds through
                                        photographs, with a keen focus on usability and aesthetic appeal.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 md:w-1/2">
                            <div className="flex h-full flex-col rounded-lg bg-mantis-100 p-8 dark:bg-mantis-900">
                                <div className="mb-3 flex items-center">
                                    <h2 className="title-font text-xl font-medium text-green-spring-900 dark:text-green-spring-100">
                                        Backend
                                    </h2>
                                </div>
                                <div className="grow">
                                    <p className="text-base leading-relaxed">
                                        Our robust API is the backbone of Birdy, ensuring smooth and secure interactions
                                        within our community. Developed with Express, a top-tier Node.js framework, our
                                        API supports essential features such as user authentication, photo uploads,
                                        comments, likes, and comprehensive security measures to protect our
                                        members&apos; data.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold">How it came to be</h2>
                    <div className="space-y-2">
                        <p>
                            Birdy is an afterthought from my time learning front-end development. During my studies of
                            React, I was taught how to develop the front end of &lsquo;Dogs,&rsquo; a social network
                            with a purpose similar to Birdy&apos;s. Intending to expand my knowledge beyond course
                            projects, I created a project similar to what I was taught. I also went beyond the front end
                            to develop even the API, the backbone of this application.
                        </p>
                        <p>
                            To keep things simple, I chose to keep the social network&apos;s central theme, animals. I
                            went with birds first because I love to bird-watch sometimes despite needing to learn more
                            about birds, and second because I didn&apos;t find it to be most people&apos;s first choice
                            when building projects like this.
                        </p>
                        <p>
                            As a personal project designed for portfolio purposes, Birdy represents my commitment to
                            leveraging web technologies to create meaningful and engaging digital experiences. Birdy
                            serves as a showcase of my skills in web development, and I welcome contributions, feedback,
                            and ideas to enhance Birdy.
                        </p>
                    </div>
                </div>
            </article>
        </section>
    )
}
