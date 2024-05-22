const Header = () => {
  return (
    <div className="h-full">
      <header className="card  text-center bg-base-200 hover:bg-base-300 hover:shadow-2xl p-4 pb-10 lg:mx-12 mx-4">
        <h1 className=" text-3xl md:text-4xl font-bold tracking-tight mt-0">
          <a href="/">Code Challenge for Big Picture!</a>
        </h1>
        <h2 className="pt-8 lg:pt-8 text-lg font-medium tracking-tight sm:text-xl">
          LOGO
        </h2>
        <label className="flex justify-center cursor-pointer gap-2 pt-10">
        </label>
      </header>
    </div>
  );
};

export default Header;
