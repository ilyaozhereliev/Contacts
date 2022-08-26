export const getInitial = (name: string): string => {
    const [firstName, lastName = ''] = name.split(' ').slice(0, 2)
    return lastName ? `${firstName[0] + lastName[0]}` : firstName[0]
};