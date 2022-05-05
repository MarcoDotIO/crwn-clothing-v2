export const properCapitalization = (input: string): string => {
    return input
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};