import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Edit, Trash } from 'styled-icons/boxicons-regular'

const EditIcon = styled(Edit)`
  margin-right: 0.5rem;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.warning};
`

const DeleteIcon = styled(Trash)`
  cursor: pointer;
  fill: ${(props) => props.theme.colors.danger};
`

const TableActions = ({ row, cell }) => (
  <>
    <EditIcon
      size={20}
      onClick={(e) => {
        e.stopPropagation()
        cell.column.onClickEdit({ id: row.original.id })
      }}
    />
    <DeleteIcon
      size={20}
      onClick={(e) => {
        e.stopPropagation()
        cell.column.onClickDelete({ id: row.original.id })
      }}
    />
  </>
)

TableActions.propTypes = {
  row: PropTypes.shape().isRequired,
  cell: PropTypes.shape().isRequired,
}

export default TableActions
