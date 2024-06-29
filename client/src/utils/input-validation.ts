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
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
        if (!emailRegex.test(input)) {
            return {
                isValid: false,
                message: "Please enter a valid email."
            }
        }
    }

    if (type === "password") {
        const passwordRegex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,100}$/
        if (!passwordRegex.test(input)) {
            return {
                isValid: false,
                message:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
            }
        }
    }

    if (type === "username") {
        const usernameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9]+(?<![_.])$/
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
