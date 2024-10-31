import Header from "@/app/_components/header";
import Search from "@/app/_components/search";

const HeaderSearch = () => {
  return (
    <div className="hidden lg:block">
      <Header hasSearch={true} />
      <div className=" px-5">
        <Search />
      </div>
    </div>
  );
};

export default HeaderSearch;
