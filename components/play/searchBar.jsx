/**
 * @param   {function} handleSubmit(e) - handle form submit
 * @param   {string} placeHolder - placeholder for the search bar
 * @param   {state} searchContent - the content of search bar (default with "")
 * @param   {function} setSearchContent - the setState function for searchContent
 * @param   {} otherProps
 **/

export default function SearchBar(props) {
  const colorPalette = props.colorPalette

  if (!colorPalette) {
    return <></>
  }
  return (
    <form
      className="border-2 flex bg-transparent rounded font-galindo"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(e);
      }}
      style={{
        backgroundColor:
          colorPalette === undefined ? "" : `${colorPalette.white}88`,
        color: colorPalette === undefined ? "" : colorPalette.text1,
      }}
    >
      <input
        type="text"
        value={props.searchContent}
        placeholder={props.placeHolder}
        className="p-1 grow bg-transparent text-m"
        onChange={(e) => props.setSearchContent(e.target.value)}
      ></input>
      <button type="submit" className="h-full flex p-1">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}
