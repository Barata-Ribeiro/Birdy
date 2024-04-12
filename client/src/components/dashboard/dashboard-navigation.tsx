import logout from "@/actions/auth/logout"
import Button from "@/components/utils/button"
import { useUser } from "@/context/user-context"
import { PrivateProfileResponse } from "@/interfaces/api/users"
import { BiSolidPhotoAlbum } from "react-icons/bi"
import { FaChartPie, FaSignOutAlt, FaUpload } from "react-icons/fa"
import { MdAdminPanelSettings } from "react-icons/md"

export default function DashboardNavigation({
    user
}: {
    user: PrivateProfileResponse
}) {
    const { setUser } = useUser()

    async function handleLogout() {
        await logout()
        setUser(null)
    }

    return (
        <div className="mt-2 flex flex-1 flex-col items-center justify-end px-8 lg:items-end">
            <nav
                className="mt-2 flex shrink-0 flex-wrap items-center justify-center gap-2 whitespace-nowrap"
                role="navigation"
            >
                <Button
                    href={`/dashboard/${user.id}/${user.username}`}
                    className={"flex items-center gap-2 px-4 py-2 text-sm"}
                    aria-label="Photos"
                >
                    <BiSolidPhotoAlbum size={18} />
                    <span className="max-sm:hidden">Photos</span>
                </Button>
                {user.role === "ADMIN" && (
                    <Button
                        href={`/dashboard/${user.id}/${user.username}/admin-panel`}
                        className={"flex items-center gap-2 px-4 py-2 text-sm"}
                        aria-label="Admin"
                    >
                        <MdAdminPanelSettings size={18} />
                        <span className="max-sm:hidden">Admin</span>
                    </Button>
                )}
                <Button
                    href={`/dashboard/${user.id}/${user.username}/stats`}
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                    aria-label="Stats"
                >
                    <FaChartPie size={18} />
                    <span className="max-sm:hidden">Stats</span>
                </Button>
                <Button
                    href={`/dashboard/${user.id}/${user.username}/upload`}
                    className={"flex items-center gap-2 px-4 py-2 text-sm"}
                    aria-label="New Post"
                >
                    <FaUpload size={18} />
                    <span className="max-sm:hidden">New Post</span>
                </Button>
                <Button
                    onClick={handleLogout}
                    href="/sign/in"
                    className={"flex items-center gap-2 px-4 py-2 text-sm"}
                    aria-label="Sign Out"
                    aria-current="page"
                >
                    <FaSignOutAlt size={18} />
                    <span className="max-sm:hidden">Sign Out</span>
                </Button>
            </nav>
        </div>
    )
}
