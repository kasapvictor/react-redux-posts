import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Arrow } from '../../icons';

import { Modal } from '../Modal';

import { Property } from './components';

const DEFAULT_END = 4;
const MAX_PER_PAGE = 4;
const DEFAULT_START = 0;
const DEFAULT_CURRENT = 1;

const getCurrentPageNumber = (direct, current, maxPages) => {
  const directions = {
    prev: () => (current > 1 ? current - 1 : 0),
    next: () => (current < maxPages ? current + 1 : current),
  };

  return directions[direct]();
};

export const Properties = ({ selectors, status, sendTo }) => {
  const objects = useSelector(selectors.selectAll);

  const MAX_PAGES = Math.ceil(Object.keys(objects).length / MAX_PER_PAGE);
  const [pageOptions, setPageOptions] = useState({
    end: DEFAULT_END,
    start: DEFAULT_START,
    current: DEFAULT_CURRENT,
    part: objects.slice(DEFAULT_START, DEFAULT_END),
  });

  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const [currentObject, setCurrentObject] = useState(null);
  const [typeModal, setTypeModal] = useState(null);

  const handlePagination = (direct) => () => {
    if (pageOptions.start === 0 && direct === 'prev') {
      return;
    }

    if (pageOptions.end >= objects.length && direct === 'next') {
      return;
    }

    setPageOptions((prevState) => {
      const current = getCurrentPageNumber(direct, prevState.current, MAX_PAGES);
      const end = current * MAX_PER_PAGE;
      const start = end - MAX_PER_PAGE;
      const part = objects.slice(start, end);

      setIsFirstPage(start === 0);
      setIsLastPage(end >= objects.length);

      return { end, start, current, part };
    });
  };

  const handleOpenDetails = (id) => () => {
    const foundObject = objects.find((object) => object.id === id);
    setCurrentObject(foundObject);
  };

  const handleClose = () => {
    setCurrentObject(null);
    setTypeModal(null);
  };

  return (
    <div className="idx_container">
      <div className="idx_properties">
        {pageOptions.part.map((object) => (
          <Property
            key={object.id}
            property={object}
            status={status}
            openDetails={handleOpenDetails(object.id)}
            objectId={object.id}
            setTypeModal={setTypeModal}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination__item pagination__prev"
          aria-label="Prev"
          disabled={isFirstPage}
          onClick={handlePagination('prev')}
        >
          Prev
          <span className="pagination-icon pagination-icon--prev">
            <Arrow />
          </span>
        </button>
        <button
          className="pagination__item pagination__next"
          aria-label="Next"
          disabled={isLastPage}
          onClick={handlePagination('next')}
        >
          Next
          <span className="pagination-icon pagination-icon--next">
            <Arrow />
          </span>
        </button>
      </div>

      {typeModal && (
        <Modal
          currentObject={currentObject}
          handleClose={handleClose}
          type={typeModal}
          status={status}
          sendTo={sendTo}
        />
      )}
    </div>
  );
};
