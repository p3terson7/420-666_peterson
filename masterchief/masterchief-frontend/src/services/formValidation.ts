export const validateEmail = (email: string): boolean => {
    return (
        email !== "" &&
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)
    );
};

export const validatePassword = (password: string): boolean => {
    try {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasDigit &&
            hasSpecialChar
        );
    } catch (error) {
        console.error("An error occurred during password validation", error);
        return false;
    }
};


export const validatePasswordConfirmation = (
    password: string,
    passwordConfirmation: string
): boolean => {
    return password === passwordConfirmation;
};

export const validateExisting = (input: string): boolean => {
    return input !== "" && input !== undefined;
};

export const validatePhone = (phone: string): boolean => {
    return !(phone === "" || !/^[0-9]{10}$/i.test(phone));
};

export const validatePostalCode = (errorsToDisplay: string[], postalCode: string): boolean => {
    if (
        postalCode === "" ||
        !/^[a-z][0-9][a-z] ?[0-9][a-z][0-9]$/i.test(postalCode)
    ) {
        errorsToDisplay.push("signup.errors.postalCode");
        return false;
    }

    return true;
};