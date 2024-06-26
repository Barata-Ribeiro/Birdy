interface Result {
    isValid: boolean
    message: string | null
}

export default function inputValidation(input: string, type: unknown): Result {
    if (input.length < 3) {
        return {
            isValid: false,
            message: "Please enter a valid input."
        }
    }

    if (typeof type !== "string") {
        return {
            isValid: false,
            message: "Please enter a valid type."
        }
    }

    if (type === "email") {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|((\w+\.)+[a-zA-Z]{2,}))$/
        if (!emailRegex.test(input)) {
            return {
                isValid: false,
                message: "Please enter a valid email."
            }
        }
    }

    if (type === "password") {
        const passwordRegex =
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (!passwordRegex.test(input)) {
            return {
                isValid: false,
                message:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
            }
        }
    }

    if (type === "username") {
        const usernameRegex =
            /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9]+(?<![_.])$/
        if (!usernameRegex.test(input)) {
            return {
                isValid: false,
                message:
                    "Username must be between 4 and 20 characters long and can only contain letters and numbers."
            }
        }
    }

    return {
        isValid: true,
        message: null
    }
}
