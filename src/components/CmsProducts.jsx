import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormAdmin } from '../Pages/FormAdmin';

const CmsProducts = () => {
  const navigate = useNavigate();
  const [mangaId, setMangaId] = useState();
  const [canEdit, setCanEdit] = useState(false);

  const handleIdChange = (e) => {
    setMangaId(e.target.value);
    if (e.target.value.trim().length !== 36) {
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }
  };
  const editManga = () => {
    navigate(`/form/${mangaId}`);
  };

  return (
    <div>
      <div className="flex align-middle rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500">
        <div className="text-gray-600 my-auto">
          <h1 className="text-gray-600 text-xl font-bold ml-4">
            Edit Products
          </h1>
        </div>
      </div>
      <form action="submit" className="my-4">
        <label className="ml-8 mr-4" htmlFor="mangaId">
          Product Id
        </label>
        <input
          className="text-slate-900 w-80"
          type="text"
          name="mangaId"
          onChange={handleIdChange}
          value={mangaId}
        />
        <button
          className={
            canEdit
              ? 'mx-4 rounded-md bg-slate-400 px-4 py-1 text-violet-800 font-bold'
              : 'mx-4 rounded-md bg-slate-400 px-4 py-1 text-slate-300'
          }
          type="button"
          onClick={editManga}
          disabled={!canEdit}
        >
          Edit
        </button>
      </form>
      <div className="h-1 bg-slate-300 my-6"></div>
      <div className="flex align-middle rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500">
        <div className="text-gray-600 my-auto">
          <h1 className="text-gray-600 text-xl font-bold ml-4">
            Add new product
          </h1>
        </div>
      </div>
      <div>
        <FormAdmin />
      </div>
    </div>
  );
};

export default CmsProducts;
