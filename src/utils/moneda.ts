export function formatMonto(valor: number): string {
  const formateado = valor.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `$${formateado}`;
}
