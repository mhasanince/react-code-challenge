import React from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'
import {
  ArrowSort,
  ArrowSortUp,
  ArrowSortDown,
} from 'styled-icons/fluentui-system-filled'

const TableContainer = styled.div`
  width: 100%;
  border: ${(props) => `1px solid ${props.theme.colors.border}`};
  overflow-x: auto;
`

const StyledTable = styled.table`
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`
const THead = styled.thead`
  background-color: #fff;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.border}`};
`

const TBody = styled.tbody`
  & tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const TR = styled.tr`
  cursor: pointer;
`

const TH = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 700;
`

const TD = styled.td`
  padding: 1rem;
`

const SortIconsWrapper = styled.span`
  margin-left: 0.5rem;
`

const Table = ({ initialState, columns, data, onClickRow }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        initialState,
        columns,
        data,
      },
      useSortBy
    )
  return (
    <TableContainer>
      <StyledTable {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TH {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.accessor && (
                    <SortIconsWrapper>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowSortDown size={16} />
                        ) : (
                          <ArrowSortUp size={16} />
                        )
                      ) : (
                        <ArrowSort size={16} />
                      )}
                    </SortIconsWrapper>
                  )}
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <TR
                {...row.getRowProps()}
                onClick={() => onClickRow(row.original)}
              >
                {row.cells.map((cell) => (
                  <TD {...cell.getCellProps()}>
                    {cell.value || cell.column.id === 'actions'
                      ? cell.render('Cell')
                      : '-'}
                  </TD>
                ))}
              </TR>
            )
          })}
        </TBody>
      </StyledTable>
    </TableContainer>
  )
}

Table.propTypes = {
  initialState: PropTypes.shape(),
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClickRow: PropTypes.func,
}

Table.defaultProps = {
  initialState: {},
  onClickRow: () => {},
}

export default Table
