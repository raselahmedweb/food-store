import React, { useEffect } from 'react'

export default function HomeCards() {

    useEffect(()=>{
      fetch(`${import.meta.env.KEY_foods_api}/allfoods`)
      .then(res => res.json())
      .then(data => console.log(data))
    }, [])

  return (
   <>
   
   </>
  )
}
