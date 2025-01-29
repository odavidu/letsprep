function darkenHexColor(hex: string, factor: number) {
    hex = hex.replace('#', '');
    const darken = (value: string) =>
        Math.max(0, Math.floor(parseInt(value, 16) * (1 - factor)))
            .toString(16)
            .padStart(2, '0');
    return `#${darken(hex.slice(0, 2))}${darken(hex.slice(2, 4))}${darken(hex.slice(4, 6))}`;
}

function lightenHexColor(hex: string, factor: number): string {
    hex = hex.replace('#', '');
    const lighten = (value: string) =>
        Math.min(255, Math.round(parseInt(value, 16) * (1 + factor)))
            .toString(16)
            .padStart(2, '0');
    return `#${lighten(hex.slice(0, 2))}${lighten(hex.slice(2, 4))}${lighten(hex.slice(4, 6))}`;
}

export {darkenHexColor, lightenHexColor};