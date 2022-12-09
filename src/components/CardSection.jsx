import React, { useState, useEffect } from "react";
import FilterAside from "../components/FilterAside";
import Card from "./Card";
import style from "./assets/Cards/loading.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMangas, loading } from "../Redux/actions";
import img from "./assets/Cards/yugi.jpg";
import Pagination from "./Paginated2";
import NoElement from "./NoElement";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const CardSection = ({
  currentPage,
  setCurrentPage,
  mangaState,
  setMangasState,
}) => {
  const dispatch = useDispatch();
  const mangas = useSelector((state) => state.mangas);
  const isLoading = useSelector((state) => state.isLoading);
  useEffect(() => {
    dispatch(loading());
    dispatch(getAllMangas(currentPage, mangaState));
  }, [dispatch, currentPage]);

  console.log(mangas);
  // const [currentPage, setCurrentPage] = useState(1);
  const [mangasPerPage] = useState(6);

  const currentManga = mangas;
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextHandler = () => {
    if (currentPage === 19) {
      setCurrentPage((currentPage = 1));
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevHandler = () => {
    if (currentPage === 1) {
      setCurrentPage((currentPage = 19));
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isLoading) {
    return (
      <>
        <div className="px-20 flex justify-evenly w-full pt-8">
          <FilterAside
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            mangaState={mangaState}
            setMangasState={setMangasState}
          />
          <div className=" bg-red-400 items-start self-start"></div>

          <div className="flex w-4/5 w- justify-between pl-20 flex-wrap">
            {currentManga.length ? (
              currentManga.map((e) => {
                return (
                  <Card
                    key={e.mangaid}
                    mangaid={e.mangaid}
                    canonicalTitle={e.canonicalTitle}
                    posterImage={
                      e.posterImage
                        ? e.posterImage.small.url
                        : e.posterImage
                        ? e.posterImage
                        : img
                    }
                    startDate={e.startDate}
                    price={e.price}
                    status={e.status}
                    averageRating={e.averageRating}
                    stockQty={e.stockQty}
                  />
                );
              })
            ) : (
              <NoElement />
            )}
          </div>
        </div>
        {mangas.length > 0 && (
          <div className="w-full flex justify-center">
            <button
              onClick={prevHandler}
              className="bg-white w-8 h-8 mt-7 rounded-full  flex text-blue-600 text-4xl hover:bg-blue-600 hover:text-white"
            >
              <FiChevronLeft />
            </button>
            <Pagination
              mangasPerPage={mangasPerPage}
              mangas={mangas.length}
              pagination={pagination}
              currentPage={currentPage}
            />

            <button
              onClick={nextHandler}
              className="bg-white w-8 h-8 mt-7  rounded-full  text-blue-600 text-4xl hover:bg-blue-600 hover:text-white"
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </>
    );
  } else {
    return <span className={style.loader}></span>;
  }
};

export default CardSection;
