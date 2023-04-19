import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';
// import {setPaginatePage} from '../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { RootState } from '../store/index';

interface Props {
  pagPage: (e: { selected: number; }) => void;
  paginateCounts: number;
}

const Pagination: React.FC<Props> = ({ pagPage, paginateCounts }) => {

  const dispatch = useAppDispatch();
  const {status} = useAppSelector((state: RootState) => state.article);


  return (
    <ReactPaginate
      className={status !== 'loading' ? styles.root : styles.hide}
      breakLabel="..."
      nextLabel=" >"
      previousLabel="< "
      onPageChange={pagPage}
      pageRangeDisplayed={10}
      pageCount={paginateCounts}

    // renderOnZeroPageCount={null}
    />
  )
}

export default Pagination