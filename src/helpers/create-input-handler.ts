export default (fn: (value: string) => void) => {
  return (event: React.FormEvent<HTMLElement>) => {
    const value = (event.target as HTMLInputElement).value;
    fn(value);
  };
};