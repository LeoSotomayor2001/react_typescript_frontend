export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function toBoolean(value: string) {
    return value.toLocaleLowerCase() === 'true';
}