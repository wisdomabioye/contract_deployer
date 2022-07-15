
export const cutAddress = (addr: string, prefix = 5, suffix = 4) => {
    const start = addr.substring(0, prefix);
    const end = addr.substring(addr.length - suffix);
    return `${start}...${end}`;
}