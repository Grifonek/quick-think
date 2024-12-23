function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="flex mt-auto gap-x-2 text-indigo-500 [word-spacing:3px]">
      &copy; Copyright {year},
      <a
        href="https://grifonekio.site/"
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        Max Demel
      </a>
    </div>
  );
}

export default Footer;
