import Button from "@/components/utils/button"
import Image from "next/image"
import NotFoundImage from "../../public/images/not-found.jpg"

export default async function NotFound() {
    return (
        <section className="flex items-center justify-center py-12 lg:py-24">
            <div className="lg:flex lg:gap-4">
                <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                    <h1 className="text-9xl font-bold text-mantis-600">404</h1>
                    <p className="mb-2 text-center text-2xl font-bold md:text-3xl">
                        <span className="text-bright-turquoise-600">Oops!</span> Page not found
                    </p>
                    <p className="mb-8 text-center text-gray-500 md:text-lg">
                        The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Button href="/" className="px-6 py-2 font-semibold">
                        Go home
                    </Button>
                </div>

                <div className="mt-4 hidden sm:block lg:mt-0">
                    <Image
                        src={NotFoundImage}
                        alt="404 Not Found"
                        className="aspect-square max-w-[512px] rounded-md object-cover"
                        sizes="100vw"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
