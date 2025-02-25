export const generatePathNumberArray = (number: number) => {
    return [...Array(6).keys()].map(i => i + number)
}