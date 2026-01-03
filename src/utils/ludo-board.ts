export const generatePathNumberArray = (number: number) => {
    const middleStartNumbers = [3.9, 2.6, 1.3, 5.2]
    // if (middleStartNumbers.includes(number)) number = number * 10
    return [...Array(6).keys()].map(i => i + number)
}