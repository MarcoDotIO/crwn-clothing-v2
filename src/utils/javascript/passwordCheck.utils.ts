import { passwordStrength } from 'check-password-strength'

const strengthValue: number = 2;

export const checkPassword = (passwordInput: string): boolean => 
    passwordStrength(passwordInput).id >= strengthValue;