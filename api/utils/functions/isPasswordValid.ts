export function isPasswordValid(password: string) {
    if (password.length < 6) {
        return false;
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasLowercase && hasUppercase && hasNumber;
}

export default isPasswordValid;	