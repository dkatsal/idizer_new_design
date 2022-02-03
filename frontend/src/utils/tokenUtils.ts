export const saveToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | undefined => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('token')) {
    const tokenFromSearchParams = `Bearer ${searchParams.get('token')}`;
    localStorage.setItem('token', tokenFromSearchParams);
    searchParams.delete('token');
    window.location.search = '';
    window.location.href = '/';
    return tokenFromSearchParams;
  }
  const tokenFromLocalStorage = localStorage.getItem('token');

  return (!!tokenFromLocalStorage as boolean) ? (tokenFromLocalStorage as string) : undefined;
};

export const removeToken = (): void => localStorage.removeItem('token');
