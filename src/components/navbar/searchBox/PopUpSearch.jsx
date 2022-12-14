import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { List } from 'antd'

function PopUpSearch(props) {
  const history = useHistory()
  const { setSearchTerm } = props
  const { searchResults } = props
  const [renderAmount, setRenderAmount] = useState(5)

  const handleClickSearchTerm = (uri) => {
    return () => {
      setSearchTerm('')
      history.push(uri)
      window.location.reload()
    }
  }

  useEffect(() => {
    const error = document.querySelector('.ant-empty-description')
    if (error) {
      error.innerHTML = '<span class="text-text-color-primary">No movie found!</span>'
    }
  }, [searchResults])

  return (
    <>
      <List
        bordered
        className='absolute z-50 bg-background rounded-2xl min-w-full overflow-hidden text-text-color-title border-black'
        dataSource={searchResults ? searchResults : []}
        renderItem={(item, index) => {
          if (index < renderAmount) {
            return (
              <List.Item
                className='duration-200 hover:bg-black ease-in-out cursor-pointer text-text-color-title'
                onClick={handleClickSearchTerm(`/detail-movie/${item.id}`)}
              >
                {item.title}
              </List.Item>
            )
          } else {
            if (index < renderAmount) {
              return (
                <>
                  <List.Item
                    className='duration-200 hover:bg-amber-200 ease-in-out cursor-pointer'
                    onClick={handleClickSearchTerm(`/detail-movie/${item.id}`)}
                  >
                    {item.title}
                  </List.Item>
                </>
              )
            } else {
              if (index === renderAmount + 1) return (
                <List.Item
                  className='duration-200 hover:bg-amber-200 ease-in-out cursor-pointer text-center'
                  onClick={() => {
                    setRenderAmount(renderAmount + 5)
                  }}
                >
                  Show more
                </List.Item>
              )
            }
          }
        }}
      />
    </>
  )
}

export default PopUpSearch

