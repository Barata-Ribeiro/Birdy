export interface UserEditProfileBody {
    username?: string
    display_name?: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    password: string
    new_password?: string
}
