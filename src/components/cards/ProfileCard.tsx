import { Avatar, Box, CircularProgress, TablePagination, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DeleteIconButton } from '../Buttons'

const ProfileCard = ({ id, src, name, caption, onDelete, processing = false }: any) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gridGap: 10,
          alignItems: 'center',
          pt: 1,
          pb: 1,
        }}
      >
        <Avatar src={src} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box>
            <Typography variant="body2">{name}</Typography>
            <Typography variant="caption">{caption}</Typography>
          </Box>
          {processing ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <DeleteIconButton onClick={() => onDelete(id)} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

const ProfileCardContainer = ({ profiles, onDelete }: any) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [data, setData] = useState([])

  const handleChangePage = (e: any, value: any) => {
    setPage(Number(value))
  }

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(Number(e.target.value))
  }

  useEffect(() => {
    setPage(0)
  }, [rowsPerPage])

  useEffect(() => {
    const filteredData = profiles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setData(filteredData)
  }, [page, rowsPerPage])

  return (
    <Box>
      {data.map((el: any, index: number) => {
        return (
          <ProfileCard
            key={index}
            id={el.id}
            src={el.src}
            name={el.name}
            caption={el.caption}
            onDelete={onDelete}
          />
        )
      })}
      <TablePagination
        component="div"
        count={profiles.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 25, 100, 500]}
      />
    </Box>
  )
}
export default ProfileCardContainer
