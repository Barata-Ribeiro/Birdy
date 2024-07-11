import { FaFolder, FaGithub, FaLinkedinIn } from "react-icons/fa"
import Link from "next/link"

export default function FormSocialButtons() {
    return (
        <div className="inset-x-0 mt-16 flex justify-center space-x-4 p-4 text-center lg:hidden">
            <Link
                href="https://github.com/Barata-Ribeiro/Birdy"
                className="text-green-spring-50"
                target="_blank"
                rel="noopener noreferrer"
                title="Birdy - Repository"
            >
                <FaGithub size={24} />
            </Link>
            <Link
                href="https://www.linkedin.com/in/jo%C3%A3o-mendes-jorge-barata-ribeiro-645073118/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-spring-50"
                title="Barata Ribeiro - LinkedIn"
            >
                <FaLinkedinIn size={24} />
            </Link>
            <Link
                href="https://barataribeiro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-spring-50"
                title="Barata Ribeiro - Portfolio"
            >
                <FaFolder size={24} />
            </Link>
        </div>
    )
}
