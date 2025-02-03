interface SearchResultMessageProps {
  message: string | string[];
}

const SearchResultMessage = ({ message }: SearchResultMessageProps) => {
  return (
    <div className="text-[32px] text-yellow400 mt-[40px]">
      <span className="text-black300">&quot;{message}&quot;</span>으로 검색한
      결과입니다.
    </div>
  );
};

export default SearchResultMessage;
