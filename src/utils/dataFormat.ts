export function dataMask(value: string): string {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{4})$/, '$1/$2');
}

export const convertStringToDateUTC = (dateString: string): Date => {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export function parseDateFromString(dateString: string) {
  // Divide a string em partes usando o caractere "-"
  const parts = dateString.split('-');

  // Certifica-se de que a string tem três partes
  if (parts.length === 3) {
    // Reorganiza as partes para formar uma string no formato "mm-dd-yyyy"
    const formattedDateString = `${parts[1]}-${parts[0]}-${parts[2]}`;

    // Cria um objeto Date com a string formatada
    const parsedDate = new Date(formattedDateString);

    // Verifica se o objeto Date resultante é uma data válida
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  // Se algo der errado, retorna null ou lança um erro, dependendo dos requisitos
  return null;
}
