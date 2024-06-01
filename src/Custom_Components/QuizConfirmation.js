import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
  

const QuizConfirmation = () => {
  return (
    <Dialog>
  <DialogTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Join Quiz</DialogTrigger>
  <DialogContent className="w-full">
    <DialogHeader >
      <DialogTitle className="w-full text-center">Quiz Id</DialogTitle>
      <DialogDescription className="w-full text-center">
        Enter the quiz id to join the quiz
      </DialogDescription>
              </DialogHeader>
              <Input placeholder="Enter Quiz Id" />
              <Button>Join</Button>
  </DialogContent>
</Dialog>

  )
}

export default QuizConfirmation