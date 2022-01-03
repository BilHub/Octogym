import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import image1 from '../../../images/table/1.jpg'
import image2 from '../../../images/table/2.jpg'
import image3 from '../../../images/table/3.jpg'
import image4 from '../../../images/table/4.jpg'

const Transactions = () => {
  const [data, setData] = useState(
    document.querySelectorAll('#transaciton tbody tr')
  )
  const sort = 5
  const activePag = useRef(0)
  const [test, settest] = useState(0)

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove('d-none')
      } else {
        data[i].classList.add('d-none')
      }
    }
  }
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll('#transaciton tbody tr'))
  }, [test])

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort)
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1)

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i
    chageData(activePag.current * sort, (activePag.current + 1) * sort)
    settest(i)
  }

  return (
    <Fragment>
      <div className='form-head d-flex mb-3 mb-md-5 align-items-center '>
        <div className='input-group search-area d-inline-flex'>
          <div className='input-group-append'>
            <span className='input-group-text'>
              <i className='flaticon-381-search-2' />
            </span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Search here'
          />
        </div>
        <Link
          className='ml-auto rounded-0 btn bgl-primary text-primary'
          to='/transactions'
        >
          <svg
            className='mr-3 scale5'
            width={16}
            height={16}
            viewBox='0 0 18 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.99989 23.6666H15.9999C16.6439 23.6666 17.1666 23.144 17.1666 22.5C17.1666 21.856 16.6439 21.3333 15.9999 21.3333H1.99989C1.35589 21.3333 0.833225 21.856 0.833225 22.5C0.833225 23.144 1.35589 23.6666 1.99989 23.6666ZM5.49989 9.66665V3.24998C5.49989 2.47648 5.80674 1.73447 6.3539 1.18731C6.90107 0.64014 7.64306 0.333313 8.41656 0.333313H9.58323C10.3567 0.333313 11.0987 0.64014 11.6459 1.18731C12.1919 1.73447 12.4999 2.47648 12.4999 3.24998V9.66665H15.9999C16.4712 9.66665 16.8971 9.95013 17.0779 10.3865C17.2576 10.8228 17.1584 11.3245 16.8247 11.6581L9.82473 18.6581C9.36856 19.1131 8.63006 19.1131 8.17506 18.6581L1.17506 11.6581C0.841391 11.3245 0.741063 10.8228 0.921897 10.3865C1.10273 9.95013 1.52739 9.66665 1.99989 9.66665H5.49989ZM13.1836 12H11.3332C10.6892 12 10.1666 11.4773 10.1666 10.8333C10.1666 10.8333 10.1666 5.95198 10.1666 3.24998C10.1666 3.09481 10.1047 2.94664 9.99507 2.83698C9.88657 2.72731 9.73722 2.66665 9.58323 2.66665C9.20173 2.66665 8.79806 2.66665 8.41656 2.66665C8.26139 2.66665 8.11324 2.72731 8.00357 2.83698C7.89507 2.94664 7.83323 3.09481 7.83323 3.24998V10.8333C7.83323 11.4773 7.31056 12 6.66656 12H4.81623L8.99989 16.1836L13.1836 12Z'
              fill='#6418C3'
            />
          </svg>
          Save to CSV
        </Link>
        <Dropdown className='dropdown ml-3 d-block'>
          <Dropdown.Toggle
            variant=''
            className='btn bg-white i-false d-flex align-items-center rounded-0 svg-btn '
            data-toggle='dropdown'
          >
            <svg
              className='scale5'
              width={16}
              height={16}
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M22.4281 2.856H21.8681V1.428C21.8681 0.56 21.2801 0 20.4401 0C19.6001 0 19.0121 0.56 19.0121 1.428V2.856H9.71606V1.428C9.71606 0.56 9.15606 0 8.28806 0C7.42006 0 6.86006 0.56 6.86006 1.428V2.856H5.57206C2.85606 2.856 0.560059 5.152 0.560059 7.868V23.016C0.560059 25.732 2.85606 28.028 5.57206 28.028H22.4281C25.1441 28.028 27.4401 25.732 27.4401 23.016V7.868C27.4401 5.152 25.1441 2.856 22.4281 2.856V2.856ZM5.57206 5.712H22.4281C23.5761 5.712 24.5841 6.72 24.5841 7.868V9.856H3.41606V7.868C3.41606 6.72 4.42406 5.712 5.57206 5.712V5.712ZM22.4281 25.144H5.57206C4.42406 25.144 3.41606 24.136 3.41606 22.988V12.712H24.5561V22.988C24.5841 24.136 23.5761 25.144 22.4281 25.144Z'
                fill='#A5A5A5'
              />
            </svg>
            <div className='text-left ml-3'>
              <span className='d-block fs-16 text-black'>Filter Periode</span>
            </div>
            <i className='fa fa-angle-down scale5 ml-4' />
          </Dropdown.Toggle>
          <Dropdown.Menu
            align='right'
            className='dropdown-menu dropdown-menu-right'
          >
            <Link className='dropdown-item' to='/transactions'>
              4 June 2020 - 4 July 2020
            </Link>
            <Link className='dropdown-item' to='/transactions'>
              5 july 2020 - 4 Aug 2020
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='row'>
        <div className='col-xl-12'>
          <div className='table-responsive table-hover fs-14'>
            <div id='transaciton' className='dataTables_wrapper no-footer'>
              <table
                className='table display mb-4 dataTablesCard card-table dataTable no-footer'
                id='example5'
                role='grid'
                aria-describedby='example5_info'
              >
                <thead>
                  <tr role='row'>
                    <th
                      className='sorting_asc'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                    >
                      <div className='checkbox mr-0 align-self-center'>
                        <div className='custom-control custom-checkbox '>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='checkAll'
                            required
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='checkAll'
                          />
                        </div>
                      </div>
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='Transaction ID: activate to sort column ascending'
                      style={{ width: 147 }}
                    >
                      Transaction ID
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='Date: activate to sort column ascending'
                      style={{ width: 92 }}
                    >
                      Date
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='From: activate to sort column ascending'
                      style={{ width: 57 }}
                    >
                      From
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='To: activate to sort column ascending'
                      style={{ width: 109 }}
                    >
                      To
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='Coin: activate to sort column ascending'
                      style={{ width: 104 }}
                    >
                      Coin
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='Amount: activate to sort column ascending'
                      style={{ width: 63 }}
                    >
                      Amount
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='Note: activate to sort column ascending'
                      style={{ width: 129 }}
                    >
                      Note
                    </th>
                    <th
                      className='sorting'
                      tabIndex={0}
                      aria-controls='example5'
                      rowSpan={1}
                      colSpan={1}
                      aria-label='Status: activate to sort column ascending'
                      style={{ width: 93 }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr role='row' className='odd'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-success p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M23.6186 15.7207L23.6186 15.7207L23.6353 22.6289C23.6354 22.6328 23.6354 22.6363 23.6353 22.6396M23.6186 15.7207L23.1353 22.6341L23.6353 22.635C23.6353 22.6481 23.6347 22.6583 23.6345 22.6627L23.6344 22.6642C23.6346 22.6609 23.6351 22.652 23.6353 22.6407C23.6353 22.6403 23.6353 22.64 23.6353 22.6396M23.6186 15.7207C23.6167 14.9268 22.9717 14.2847 22.1777 14.2866C21.3838 14.2885 20.7417 14.9336 20.7436 15.7275L20.7436 15.7275L20.7519 19.1563M23.6186 15.7207L20.7519 19.1563M23.6353 22.6396C23.6329 23.4282 22.9931 24.0705 22.2017 24.0726C22.2 24.0726 22.1983 24.0727 22.1965 24.0727L22.1944 24.0727L22.1773 24.0726L15.2834 24.056L15.2846 23.556L15.2834 24.056C14.4897 24.054 13.8474 23.4091 13.8494 22.615C13.8513 21.8211 14.4964 21.179 15.2903 21.1809L15.2903 21.1809L18.719 21.1892L5.53639 8.0066C4.975 7.44521 4.975 6.53505 5.53639 5.97367C6.09778 5.41228 7.00793 5.41228 7.56932 5.97367L20.7519 19.1563M23.6353 22.6396C23.6353 22.6376 23.6353 22.6356 23.6353 22.6336L20.7519 19.1563M22.1964 24.0726C22.1957 24.0726 22.1951 24.0726 22.1944 24.0726L22.1964 24.0726Z'
                            fill='#2BC155'
                            stroke='#2BC155'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#12415346563475</td>
                    <td className='wspace-no'>
                      2/5/2020 <br />
                      06:24 AM
                    </td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image1}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Cindy</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M16 9.50011C15.9993 8.67201 15.328 8.00092 14.5001 8H10V11H14.5001C15.328 10.9993 15.9993 10.328 16 9.50011Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M10 16H14.5001C15.3285 16 16 15.3285 16 14.5001C16 13.6715 15.3285 13 14.5001 13H10V16Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z'
                          fill='#FFAB2D'
                        />
                      </svg>
                      Bitcoin
                    </td>
                    <td>
                      <span className='text-success font-w700'>+$5,553</span>
                    </td>
                    <td>
                      <p className='mb-0 wspace-no'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-success float-right'
                      >
                        COMPLETED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='even'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-danger p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z'
                            fill='#FF2E2E'
                            stroke='#FF2E2E'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#124153465125511</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image2}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>David</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12.3801 13.8734C12.136 13.9546 11.864 13.9546 11.6199 13.8734L9 13L12 18L15 13L12.3801 13.8734Z'
                          fill='#DC3CCC'
                        />
                        <path
                          d='M12 12L15 10.8001L12 6L9 10.8001L12 12Z'
                          fill='#DC3CCC'
                        />
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z'
                          fill='#DC3CCC'
                        />
                      </svg>
                      Ethereum
                    </td>
                    <td>
                      <span className='text-danger font-w700'>-$12,768</span>
                    </td>
                    <td>
                      <p className='mb-0 text-dark'>None</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-dark float-right'
                      >
                        PENDING
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='odd'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-danger p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z'
                            fill='#FF2E2E'
                            stroke='#FF2E2E'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#124153465125511</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image3}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Samuels</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 6.10352e-05C5.3726 6.10352e-05 0 5.37266 0 12.0001C0 18.6275 5.3726 24.0001 12 24.0001C18.6274 24.0001 24 18.6275 24 12.0001C23.9924 5.3758 18.6243 0.00764685 12 6.10352e-05ZM17.8879 10.6801C17.4417 11.0743 16.9263 11.3825 16.3679 11.5886C15.9726 11.7165 15.6111 11.9313 15.3098 12.2174C14.9098 13.1698 15.1554 14.2714 15.9227 14.9638C15.9488 14.9899 15.9734 15.0179 15.9962 15.0475C16.9614 16.2842 16.8633 18.0439 15.7668 19.1658C14.5528 20.3777 12.5865 20.3777 11.3722 19.1658C10.6039 18.2437 10.3528 16.9962 10.7044 15.8487C10.7894 15.1856 10.5626 14.5201 10.0899 14.0472C9.62093 13.5952 8.97064 13.383 8.32532 13.4712C7.17777 13.8222 5.93055 13.5703 5.009 12.8018C3.79553 11.5899 3.79448 9.62386 5.00639 8.41066C5.00717 8.40961 5.00822 8.40882 5.009 8.40804C6.1304 7.31071 7.89083 7.21262 9.12732 8.17863C9.99289 9.034 11.2752 9.322 11.9566 8.86345C12.2438 8.56289 12.4588 8.20113 12.5859 7.80536C12.7921 7.24741 13.0997 6.73262 13.4934 6.28688C14.7068 5.07341 16.6739 5.07341 17.8874 6.28662C19.1011 7.50009 19.1011 9.46718 17.8879 10.6806V10.6801Z'
                          fill='#2B98D6'
                        />
                        <path
                          d='M14.6784 7.39822C14.4502 7.69129 14.2697 8.01857 14.1441 8.36806C13.9151 9.05709 13.4924 9.6657 12.9269 10.1211C11.3324 10.9774 9.36089 10.6463 8.13349 9.31621C7.59153 8.95267 6.86908 9.01598 6.39859 9.46836C5.8676 9.99859 5.86709 10.8592 6.39732 11.3902C6.39783 11.3904 6.39808 11.3909 6.39859 11.3912C6.71872 11.7101 7.17465 11.7606 8.1483 11.5824C8.34563 11.5467 8.54577 11.5285 8.74643 11.5285C9.72186 11.5444 10.6549 11.9299 11.3572 12.6069C12.2081 13.4578 12.6027 14.6632 12.4194 15.8526C12.2382 16.824 12.2887 17.2815 12.6091 17.6024C13.1404 18.1326 14.0007 18.1326 14.5319 17.6024C14.9909 17.112 15.0363 16.3647 14.6399 15.8225C13.3436 14.5928 13.0316 12.647 13.8786 11.0736C14.3341 10.5084 14.9426 10.0862 15.6317 9.85793C15.9816 9.73182 16.3092 9.55031 16.602 9.32054C17.1327 8.78954 17.1327 7.92871 16.6017 7.39796C16.0705 6.86721 15.2099 6.86747 14.6792 7.39847L14.6784 7.39822Z'
                          fill='#2B98D6'
                        />
                      </svg>
                      Ripple
                    </td>
                    <td>
                      <span className='text-danger font-w700'>-$455</span>
                    </td>
                    <td>
                      <p className='mb-0'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-danger float-right'
                      >
                        CANCELED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='even'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-success p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M23.6186 15.7207L23.6186 15.7207L23.6353 22.6289C23.6354 22.6328 23.6354 22.6363 23.6353 22.6396M23.6186 15.7207L23.1353 22.6341L23.6353 22.635C23.6353 22.6481 23.6347 22.6583 23.6345 22.6627L23.6344 22.6642C23.6346 22.6609 23.6351 22.652 23.6353 22.6407C23.6353 22.6403 23.6353 22.64 23.6353 22.6396M23.6186 15.7207C23.6167 14.9268 22.9717 14.2847 22.1777 14.2866C21.3838 14.2885 20.7417 14.9336 20.7436 15.7275L20.7436 15.7275L20.7519 19.1563M23.6186 15.7207L20.7519 19.1563M23.6353 22.6396C23.6329 23.4282 22.9931 24.0705 22.2017 24.0726C22.2 24.0726 22.1983 24.0727 22.1965 24.0727L22.1944 24.0727L22.1773 24.0726L15.2834 24.056L15.2846 23.556L15.2834 24.056C14.4897 24.054 13.8474 23.4091 13.8494 22.615C13.8513 21.8211 14.4964 21.179 15.2903 21.1809L15.2903 21.1809L18.719 21.1892L5.53639 8.0066C4.975 7.44521 4.975 6.53505 5.53639 5.97367C6.09778 5.41228 7.00793 5.41228 7.56932 5.97367L20.7519 19.1563M23.6353 22.6396C23.6353 22.6376 23.6353 22.6356 23.6353 22.6336L20.7519 19.1563M22.1964 24.0726C22.1957 24.0726 22.1951 24.0726 22.1944 24.0726L22.1964 24.0726Z'
                            fill='#2BC155'
                            stroke='#2BC155'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#12415346563475</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image4}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Lucyana</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM16.2857 18.0001H9.42866C8.9552 18.0001 8.57147 17.6164 8.57147 17.1429C8.57147 17.1024 8.57434 17.0618 8.5801 17.0216L9.22515 12.5054L7.92222 12.8313C7.85421 12.8486 7.78437 12.8572 7.71427 12.8572C7.24081 12.8567 6.85759 12.4727 6.85785 11.9992C6.85838 11.6063 7.12571 11.2642 7.50683 11.1684L9.48674 10.6735L10.2942 5.0213C10.3612 4.55254 10.7954 4.22714 11.2642 4.2941C11.7329 4.36107 12.0583 4.79529 11.9914 5.26404L11.2825 10.2247L14.3636 9.4543C14.8222 9.33737 15.2886 9.61439 15.4053 10.0729C15.5222 10.5315 15.2452 10.9979 14.7866 11.1148C14.784 11.1153 14.7814 11.1161 14.7788 11.1166L11.0204 12.0562L10.4164 16.2857H16.2857C16.7592 16.2857 17.1429 16.6695 17.1429 17.1429C17.1429 17.6161 16.7592 18.0001 16.2857 18.0001Z'
                          fill='#5F5F5F'
                        />
                      </svg>
                      Litecoin
                    </td>
                    <td>
                      <span className='text-success font-w700'>+$5,553</span>
                    </td>
                    <td>
                      <p className='mb-0'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-success float-right'
                      >
                        COMPLETED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='odd'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-success p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M23.6186 15.7207L23.6186 15.7207L23.6353 22.6289C23.6354 22.6328 23.6354 22.6363 23.6353 22.6396M23.6186 15.7207L23.1353 22.6341L23.6353 22.635C23.6353 22.6481 23.6347 22.6583 23.6345 22.6627L23.6344 22.6642C23.6346 22.6609 23.6351 22.652 23.6353 22.6407C23.6353 22.6403 23.6353 22.64 23.6353 22.6396M23.6186 15.7207C23.6167 14.9268 22.9717 14.2847 22.1777 14.2866C21.3838 14.2885 20.7417 14.9336 20.7436 15.7275L20.7436 15.7275L20.7519 19.1563M23.6186 15.7207L20.7519 19.1563M23.6353 22.6396C23.6329 23.4282 22.9931 24.0705 22.2017 24.0726C22.2 24.0726 22.1983 24.0727 22.1965 24.0727L22.1944 24.0727L22.1773 24.0726L15.2834 24.056L15.2846 23.556L15.2834 24.056C14.4897 24.054 13.8474 23.4091 13.8494 22.615C13.8513 21.8211 14.4964 21.179 15.2903 21.1809L15.2903 21.1809L18.719 21.1892L5.53639 8.0066C4.975 7.44521 4.975 6.53505 5.53639 5.97367C6.09778 5.41228 7.00793 5.41228 7.56932 5.97367L20.7519 19.1563M23.6353 22.6396C23.6353 22.6376 23.6353 22.6356 23.6353 22.6336L20.7519 19.1563M22.1964 24.0726C22.1957 24.0726 22.1951 24.0726 22.1944 24.0726L22.1964 24.0726Z'
                            fill='#2BC155'
                            stroke='#2BC155'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#12415346563475</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image1}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Cindy</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M16 9.50011C15.9993 8.67201 15.328 8.00092 14.5001 8H10V11H14.5001C15.328 10.9993 15.9993 10.328 16 9.50011Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M10 16H14.5001C15.3285 16 16 15.3285 16 14.5001C16 13.6715 15.3285 13 14.5001 13H10V16Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z'
                          fill='#FFAB2D'
                        />
                      </svg>
                      Bitcoin
                    </td>
                    <td>
                      <span className='text-success font-w700'>+$5,553</span>
                    </td>
                    <td>
                      <p className='mb-0'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-success float-right'
                      >
                        COMPLETED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='even'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-danger p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z'
                            fill='#FF2E2E'
                            stroke='#FF2E2E'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#124153465125511</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image2}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>David</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12.3801 13.8734C12.136 13.9546 11.864 13.9546 11.6199 13.8734L9 13L12 18L15 13L12.3801 13.8734Z'
                          fill='#DC3CCC'
                        />
                        <path
                          d='M12 12L15 10.8001L12 6L9 10.8001L12 12Z'
                          fill='#DC3CCC'
                        />
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z'
                          fill='#DC3CCC'
                        />
                      </svg>
                      Ethereum
                    </td>
                    <td>
                      <span className='text-danger font-w700'>-$12,768</span>
                    </td>
                    <td>
                      <p className='mb-0 text-dark'>None</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-dark float-right'
                      >
                        PENDING
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='odd'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-danger p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z'
                            fill='#FF2E2E'
                            stroke='#FF2E2E'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#124153465125511</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image3}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Samuels</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 6.10352e-05C5.3726 6.10352e-05 0 5.37266 0 12.0001C0 18.6275 5.3726 24.0001 12 24.0001C18.6274 24.0001 24 18.6275 24 12.0001C23.9924 5.3758 18.6243 0.00764685 12 6.10352e-05ZM17.8879 10.6801C17.4417 11.0743 16.9263 11.3825 16.3679 11.5886C15.9726 11.7165 15.6111 11.9313 15.3098 12.2174C14.9098 13.1698 15.1554 14.2714 15.9227 14.9638C15.9488 14.9899 15.9734 15.0179 15.9962 15.0475C16.9614 16.2842 16.8633 18.0439 15.7668 19.1658C14.5528 20.3777 12.5865 20.3777 11.3722 19.1658C10.6039 18.2437 10.3528 16.9962 10.7044 15.8487C10.7894 15.1856 10.5626 14.5201 10.0899 14.0472C9.62093 13.5952 8.97064 13.383 8.32532 13.4712C7.17777 13.8222 5.93055 13.5703 5.009 12.8018C3.79553 11.5899 3.79448 9.62386 5.00639 8.41066C5.00717 8.40961 5.00822 8.40882 5.009 8.40804C6.1304 7.31071 7.89083 7.21262 9.12732 8.17863C9.99289 9.034 11.2752 9.322 11.9566 8.86345C12.2438 8.56289 12.4588 8.20113 12.5859 7.80536C12.7921 7.24741 13.0997 6.73262 13.4934 6.28688C14.7068 5.07341 16.6739 5.07341 17.8874 6.28662C19.1011 7.50009 19.1011 9.46718 17.8879 10.6806V10.6801Z'
                          fill='#2B98D6'
                        />
                        <path
                          d='M14.6784 7.39822C14.4502 7.69129 14.2697 8.01857 14.1441 8.36806C13.9151 9.05709 13.4924 9.6657 12.9269 10.1211C11.3324 10.9774 9.36089 10.6463 8.13349 9.31621C7.59153 8.95267 6.86908 9.01598 6.39859 9.46836C5.8676 9.99859 5.86709 10.8592 6.39732 11.3902C6.39783 11.3904 6.39808 11.3909 6.39859 11.3912C6.71872 11.7101 7.17465 11.7606 8.1483 11.5824C8.34563 11.5467 8.54577 11.5285 8.74643 11.5285C9.72186 11.5444 10.6549 11.9299 11.3572 12.6069C12.2081 13.4578 12.6027 14.6632 12.4194 15.8526C12.2382 16.824 12.2887 17.2815 12.6091 17.6024C13.1404 18.1326 14.0007 18.1326 14.5319 17.6024C14.9909 17.112 15.0363 16.3647 14.6399 15.8225C13.3436 14.5928 13.0316 12.647 13.8786 11.0736C14.3341 10.5084 14.9426 10.0862 15.6317 9.85793C15.9816 9.73182 16.3092 9.55031 16.602 9.32054C17.1327 8.78954 17.1327 7.92871 16.6017 7.39796C16.0705 6.86721 15.2099 6.86747 14.6792 7.39847L14.6784 7.39822Z'
                          fill='#2B98D6'
                        />
                      </svg>
                      Ripple
                    </td>
                    <td>
                      <span className='text-danger font-w700'>-$455</span>
                    </td>
                    <td>
                      <p className='mb-0'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-danger float-right'
                      >
                        CANCELED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='even'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-success p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M23.6186 15.7207L23.6186 15.7207L23.6353 22.6289C23.6354 22.6328 23.6354 22.6363 23.6353 22.6396M23.6186 15.7207L23.1353 22.6341L23.6353 22.635C23.6353 22.6481 23.6347 22.6583 23.6345 22.6627L23.6344 22.6642C23.6346 22.6609 23.6351 22.652 23.6353 22.6407C23.6353 22.6403 23.6353 22.64 23.6353 22.6396M23.6186 15.7207C23.6167 14.9268 22.9717 14.2847 22.1777 14.2866C21.3838 14.2885 20.7417 14.9336 20.7436 15.7275L20.7436 15.7275L20.7519 19.1563M23.6186 15.7207L20.7519 19.1563M23.6353 22.6396C23.6329 23.4282 22.9931 24.0705 22.2017 24.0726C22.2 24.0726 22.1983 24.0727 22.1965 24.0727L22.1944 24.0727L22.1773 24.0726L15.2834 24.056L15.2846 23.556L15.2834 24.056C14.4897 24.054 13.8474 23.4091 13.8494 22.615C13.8513 21.8211 14.4964 21.179 15.2903 21.1809L15.2903 21.1809L18.719 21.1892L5.53639 8.0066C4.975 7.44521 4.975 6.53505 5.53639 5.97367C6.09778 5.41228 7.00793 5.41228 7.56932 5.97367L20.7519 19.1563M23.6353 22.6396C23.6353 22.6376 23.6353 22.6356 23.6353 22.6336L20.7519 19.1563M22.1964 24.0726C22.1957 24.0726 22.1951 24.0726 22.1944 24.0726L22.1964 24.0726Z'
                            fill='#2BC155'
                            stroke='#2BC155'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#12415346563475</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image4}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Lucyana</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM16.2857 18.0001H9.42866C8.9552 18.0001 8.57147 17.6164 8.57147 17.1429C8.57147 17.1024 8.57434 17.0618 8.5801 17.0216L9.22515 12.5054L7.92222 12.8313C7.85421 12.8486 7.78437 12.8572 7.71427 12.8572C7.24081 12.8567 6.85759 12.4727 6.85785 11.9992C6.85838 11.6063 7.12571 11.2642 7.50683 11.1684L9.48674 10.6735L10.2942 5.0213C10.3612 4.55254 10.7954 4.22714 11.2642 4.2941C11.7329 4.36107 12.0583 4.79529 11.9914 5.26404L11.2825 10.2247L14.3636 9.4543C14.8222 9.33737 15.2886 9.61439 15.4053 10.0729C15.5222 10.5315 15.2452 10.9979 14.7866 11.1148C14.784 11.1153 14.7814 11.1161 14.7788 11.1166L11.0204 12.0562L10.4164 16.2857H16.2857C16.7592 16.2857 17.1429 16.6695 17.1429 17.1429C17.1429 17.6161 16.7592 18.0001 16.2857 18.0001Z'
                          fill='#5F5F5F'
                        />
                      </svg>
                      Litecoin
                    </td>
                    <td>
                      <span className='text-success font-w700'>+$5,553</span>
                    </td>
                    <td>
                      <p className='mb-0'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-success float-right'
                      >
                        COMPLETED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='odd'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-success p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M23.6186 15.7207L23.6186 15.7207L23.6353 22.6289C23.6354 22.6328 23.6354 22.6363 23.6353 22.6396M23.6186 15.7207L23.1353 22.6341L23.6353 22.635C23.6353 22.6481 23.6347 22.6583 23.6345 22.6627L23.6344 22.6642C23.6346 22.6609 23.6351 22.652 23.6353 22.6407C23.6353 22.6403 23.6353 22.64 23.6353 22.6396M23.6186 15.7207C23.6167 14.9268 22.9717 14.2847 22.1777 14.2866C21.3838 14.2885 20.7417 14.9336 20.7436 15.7275L20.7436 15.7275L20.7519 19.1563M23.6186 15.7207L20.7519 19.1563M23.6353 22.6396C23.6329 23.4282 22.9931 24.0705 22.2017 24.0726C22.2 24.0726 22.1983 24.0727 22.1965 24.0727L22.1944 24.0727L22.1773 24.0726L15.2834 24.056L15.2846 23.556L15.2834 24.056C14.4897 24.054 13.8474 23.4091 13.8494 22.615C13.8513 21.8211 14.4964 21.179 15.2903 21.1809L15.2903 21.1809L18.719 21.1892L5.53639 8.0066C4.975 7.44521 4.975 6.53505 5.53639 5.97367C6.09778 5.41228 7.00793 5.41228 7.56932 5.97367L20.7519 19.1563M23.6353 22.6396C23.6353 22.6376 23.6353 22.6356 23.6353 22.6336L20.7519 19.1563M22.1964 24.0726C22.1957 24.0726 22.1951 24.0726 22.1944 24.0726L22.1964 24.0726Z'
                            fill='#2BC155'
                            stroke='#2BC155'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#12415346563475</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image1}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>Cindy</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M16 9.50011C15.9993 8.67201 15.328 8.00092 14.5001 8H10V11H14.5001C15.328 10.9993 15.9993 10.328 16 9.50011Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M10 16H14.5001C15.3285 16 16 15.3285 16 14.5001C16 13.6715 15.3285 13 14.5001 13H10V16Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z'
                          fill='#FFAB2D'
                        />
                      </svg>
                      Bitcoin
                    </td>
                    <td>
                      <span className='text-success font-w700'>+$5,553</span>
                    </td>
                    <td>
                      <p className='mb-0'>Lorem ipsum dol..</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-success float-right'
                      >
                        COMPLETED
                      </Link>
                    </td>
                  </tr>
                  <tr role='row' className='even'>
                    <td className='pr-0 sorting_1'>
                      <span className='bgl-danger p-3 d-inline-block'>
                        <svg
                          width={29}
                          height={29}
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z'
                            fill='#FF2E2E'
                            stroke='#FF2E2E'
                          />
                        </svg>
                      </span>
                    </td>
                    <td>#124153465125511</td>
                    <td>2/5/2020 06:24 AM</td>
                    <td>Thomas</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={image2}
                          className='rounded-circle mr-2 width40 height40'
                          alt=''
                        />
                        <span>David</span>
                      </div>
                    </td>
                    <td className='wspace-no'>
                      <svg
                        className='mr-1'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12.3801 13.8734C12.136 13.9546 11.864 13.9546 11.6199 13.8734L9 13L12 18L15 13L12.3801 13.8734Z'
                          fill='#DC3CCC'
                        />
                        <path
                          d='M12 12L15 10.8001L12 6L9 10.8001L12 12Z'
                          fill='#DC3CCC'
                        />
                        <path
                          d='M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z'
                          fill='#DC3CCC'
                        />
                      </svg>
                      Ethereum
                    </td>
                    <td>
                      <span className='text-danger font-w700'>-$12,768</span>
                    </td>
                    <td>
                      <p className='mb-0 text-dark'>None</p>
                    </td>
                    <td>
                      <Link
                        to='/transactions'
                        className='btn-link text-dark float-right'
                      >
                        PENDING
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='d-sm-flex text-center justify-content-between'>
                <div className='dataTables_info text-black' id='example5_info '>
                  Showing {activePag.current * sort + 1} to{' '}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{' '}
                  of {data.length} entries{' '}
                </div>
                <div
                  className='dataTables_paginate paging_simple_numbers'
                  id='example5_paginate'
                >
                  <Link
                    to='/transactions'
                    className='paginate_button previous disabled'
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    Previous
                  </Link>
                  <span>
                    {paggination.map((number, i) => (
                      <Link
                        to='/transactions'
                        key={i}
                        className={`paginate_button  ${
                          activePag.current === i ? 'current' : ''
                        }`}
                        onClick={() => onClick(i)}
                        aria-controls='example5'
                      >
                        {number}
                      </Link>
                    ))}
                  </span>
                  <Link
                    to='/transactions'
                    className='paginate_button next'
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Transactions
