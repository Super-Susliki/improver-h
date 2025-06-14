interface HistoryRowProps {
  title: string;
  value: React.ReactNode;
}

export const HistoryRow = ({ title, value }: HistoryRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <p>{title}</p>
      {value}
    </div>
  );
};
