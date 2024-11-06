import FolderItem from "./FolderItem";
interface ItemType {
  id: number;
  title: string;
  totalCount: number;
}
const FolderList = () => {
  const list: ItemType[] = [
    { id: 1, title: "코딩팁", totalCount: 7 },
    { id: 2, title: "채용 사이트", totalCount: 7 },
    { id: 3, title: "유용한 글", totalCount: 7 },
    { id: 4, title: "나만의 장소", totalCount: 7 },
  ];

  return (
    <ul className="mb-6 flex flex-col gap-1 min-w-[280px] w-full">
      {list.map((item, index) => (
        <FolderItem key={item.id} item={item} index={index} />
      ))}
    </ul>
  );
};

export default FolderList;
