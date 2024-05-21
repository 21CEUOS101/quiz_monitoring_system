import {
    Card,
    CardContent,
    CardFooter,
  } from "../components/ui/card"
import React from 'react'

const CustomButton = ({data}) => {
  return (
      <button onClick={() => console.log("Clicked")}>
          <Card className=" flex flex-col align-middle place-content-center justify-center items-center pt-5 rounded-lg shadow-md">
            <CardContent>
                {data?.buttonIcon}
            </CardContent>
            <CardFooter className="text-lg font-medium">
                {data?.buttonText}
            </CardFooter>
        </Card>
    </button>
  )
}

export default CustomButton