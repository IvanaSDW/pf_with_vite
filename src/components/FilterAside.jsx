import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllGenres,
  getAllCategories,
  getAllMangas,
  getMangaByEmisionDate,
  getMangaByPrice,
  filterByCategories,
  filterMangaByGenres,
  loading,
  filterMangasOnSale,
} from '../Redux/actions';
import { HiOutlineSortDescending } from 'react-icons/hi';

export default function FilterAside({
  currentPage,
  setCurrentPage,
  mangaState,
}) {
  //logica for styles//
  const [bgColor, setBgColor] = useState('bg-indigo-900');
  const [bgColorDos, setBgColorDos] = useState('bg-indigo-900');
  const [bgColorTres, setBgColorTres] = useState('bg-indigo-900');
  const [bgColorCuatro, setBgColorCuatro] = useState('bg-indigo-900');
  const [bgColorCinco, setBgColorCinco] = useState('bg-indigo-900');

  function handleChangeBg() {
    setBgColor('bg-cyan-500');
  }

  function handleResetBg() {
    setBgColor('bg-indigo-900');
  }

  function handleChangeBgDos() {
    setBgColorDos('bg-cyan-500');
  }

  function handleResetBgDos() {
    setBgColorDos('bg-indigo-900');
  }

  function handleChangeBgTres() {
    setBgColorTres('bg-cyan-500');
  }

  function handleResetBgTres() {
    setBgColorTres('bg-indigo-900');
  }

  // function handleChangeBgCuatro() {
  //   setBgColorCuatro("bg-cyan-500");
  // }

  // function handleResetBgCuatro() {
  //   setBgColorCuatro("bg-indigo-900");
  // }

  // function handleChangeBgCinco() {
  //   setBgColorCuatro("bg-cyan-500");
  // }

  // function handleResetBgCinco() {
  //   setBgColorCinco("bg-indigo-900");
  // }

  function handleChangeBgSeis() {
    setBgColorCuatro('bg-cyan-500');
  }

  function handleResetBgSeis() {
    setBgColorCinco('bg-indigo-900');
  }

  //logica for filters and sort buttons//
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.categories);
  const allGenres = useSelector((state) => state.genres);
  const onSale = useSelector((state) => state.mangasOnSale);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGenres());
  }, []);

  const handleGetMangas = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(loading());
    dispatch(getAllMangas(currentPage, mangaState));
  };

  const handleGetMangasOnSale = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterMangasOnSale(1));
  };

  const HandleFilteredByCategories = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(loading());
    e.target.value === 'default'
      ? dispatch(getAllMangas())
      : dispatch(filterByCategories(e.target.value, currentPage));
  };

  const HandleFilteredByGenres = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(loading());
    e.target.value === 'default'
      ? dispatch(getAllMangas())
      : dispatch(filterMangaByGenres(e.target.value, currentPage));
  };

  function handleSortDate(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(loading());
    const index = e.nativeEvent.target.selectedIndex;
    const target = e.nativeEvent.target[index].text;
    if (target === 'New firts')
      dispatch(getMangaByEmisionDate('dateDesc', currentPage));
    if (target === 'Clasic firts')
      dispatch(getMangaByEmisionDate('dateAsc', currentPage));
  }

  function handleSortPrice(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(loading());
    const index = e.nativeEvent.target.selectedIndex;
    const target = e.nativeEvent.target[index].text;
    if (target === 'Price ASC.')
      dispatch(getMangaByPrice('priceAsc', currentPage));
    if (target === 'Price DESC.')
      dispatch(getMangaByPrice('priceDesc', currentPage));
  }

  return (
    <div className="max-w-2xl ">
      <aside className="w-64 sticky top-10" aria-label="Sidebar">
        <div className="px-3 py-4 overflow-y-auto rounded-xl  bg-indigo-900 border-2xl outline-cyan-500 outline outline-4">
          <span className="flex justify-center p-2 text-base font-normal text-white rounded-lg dark:text-white  w-full">
            FILTERS
          </span>
          <ul className="space-y-2">
            <li>
              <button
                onClick={(e) => handleGetMangas(e)}
                className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500 w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <span className="ml-3 text-white rounded-lg dark:text-white hover:bg-cyan-500">
                  All Mangas
                </span>
              </button>
            </li>
            {/* <li>
              <button
                onClick={(e) => handleGetMangasOnSale(e)}
                className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500 w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <span className="ml-3 text-white rounded-lg dark:text-white hover:bg-cyan-500">
                  Mangas ONSALE!
                </span>
              </button>
            </li> */}
            {/* <li>
                <button
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500  w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>


                    <span className="ml-3 text-white rounded-lg dark:text-white hover:bg-cyan-500">Trends</span>
                </button>
            </li> */}
            {/* <li>
                <button
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>

                    <span className="ml-3 text-white rounded-lg dark:text-white hover:bg-cyan-500">My favourites list</span>
                </button>
            </li> */}
            {/*  ****************************************************************  */}
            <li>
              <div
                onMouseEnter={handleChangeBg}
                onMouseLeave={handleResetBg}
                className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500 "
              >
                <HiOutlineSortDescending style={{ fontSize: 27 }} />
                <select
                  className={`flex-1 ml-3 text-left whitespace-nowrap dark:text-white cursor-pointer hover:bg-cyan-500 bg-transparent ${bgColor}`}
                  onChange={(e) => handleSortDate(e)}
                  value="selecyt"
                  name="Sort By Date"
                >
                  <option defaultValue>Sort By Emision Date</option>
                  <option value="dateAsc">Newest first</option>
                  <option value="dateDesc">Classics first</option>
                </select>
              </div>
            </li>
            <li>
              <div
                onMouseEnter={handleChangeBgSeis}
                onMouseLeave={handleResetBgSeis}
                className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500"
              >
                <HiOutlineSortDescending style={{ fontSize: 27 }} />
                <select
                  className={`flex-1 ml-3 text-left whitespace-nowrap w-full cursor-pointer hover:bg-cyan-500 bg-transparent ${bgColor}`}
                  onChange={(p) => handleSortPrice(p)}
                  value="selecy"
                  name="Sort By Price"
                >
                  <option defaultValue>Sort By Price</option>
                  <option value="priceAsc">Higher price</option>
                  <option value="priceDes">Lower price</option>
                </select>
              </div>
            </li>
            {/*  ****************************************************************  */}
            <li>
              <label className="font-normal text-white rounded-lg">
                Filter Manga
              </label>
              <div
                onMouseEnter={handleChangeBgDos}
                onMouseLeave={handleResetBgDos}
                className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500  w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                <select
                  className={`flex-1 ml-3 text-left whitespace-nowrap dark:text-white cursor-pointer  hover:bg-cyan-500 bg-transparent ${bgColorDos}`}
                  style={{ maxWidth: '11.2rem' }}
                  name="Categories"
                  onChange={(e) => HandleFilteredByCategories(e)}
                >
                  <option value="default"> Filter By Categories </option>
                  {allCategories.map((categories) => (
                    <option key={categories.id} value={categories.slug}>
                      {categories.title.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li>
              <div
                onMouseEnter={handleChangeBgTres}
                onMouseLeave={handleResetBgTres}
                className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500 w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                <select
                  className={`flex-1 ml-3 text-left whitespace-nowrap  dark:text-white cursor-pointer bg-transparent hover:bg-cyan-500 ${bgColorTres} `}
                  name="Genres"
                  onChange={(e) => HandleFilteredByGenres(e)}
                >
                  <option value="default"> Filter By Genres </option>
                  {allGenres.map((genres) => (
                    <option key={genres.id} value={genres.slug}>
                      {genres.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            {/* <li>
            <label className="font-normal text-white rounded-lg">Filter Anime</label>
            <div    onMouseEnter={handleChangeBgCuatro}
                    onMouseLeave={handleResetBgCuatro}
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500  w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                 <select className={`flex-1 ml-3 text-left whitespace-nowrap dark:text-white cursor-pointer hover:bg-cyan-500 bg-indigo-900 ${bgColorCuatro}`} style={{maxWidth: '11.2rem'}} name="Categories"  onChange={(e) => HandleFilteredByCategories(e)} >
                     <option value="default"> Filter By Categories </option>
                     {allCategories.map(categories =>
                 <option key={categories.id} value={categories.title.toLowerCase()}>
                 {categories.title.toUpperCase()}
                </option>
                 )}
                 </select>      
                </div>
            </li>
            <li>
            <div
             onMouseEnter={handleChangeBgCinco}
             onMouseLeave={handleResetBgCinco}
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-cyan-500 w-full" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                 <select className={`flex-1 ml-3 text-left whitespace-nowrap  dark:text-white cursor-pointer bg-indigo-900 hover:bg-cyan-500 ${bgColorCinco} `}  name="Genres" onChange={(e) => HandleFilteredByGenres(e)}>
                     <option value="default" > Filter By Genres </option>
                     {allGenres.map(genres =>
                 <option  key={genres.id} value={genres.name.toLowerCase()}>
                 {genres.name.toUpperCase()}
                </option>
                 )}
                 </select>
                </div>
            </li> */}
          </ul>
        </div>
      </aside>
    </div>
  );
}
