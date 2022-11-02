import e, { ErrorRequestHandler } from 'express'
import express from 'express' // ESModules
//import { getEntries } from '../services/diaryServices'
//const express = require('express')  -> commondjs
import * as diaryServices from '../services/diaryServices'

const router = express.Router()

router.get('/', (_req, res) => {
  // res.send('Fetching entry diaries');
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)
  return diary != null ? res.send(diary) : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body

    const newDiaryEntry = toNewDiaryEntry

    const addedDiaryEntry = diaryServices.addDiary({
      date,
      weather,
      visibility,
      comment,
    })

    res.json(addedDiaryEntry)
  } catch (e: ErrorRequestHandler | unknown) {
    res.status(400).send(e)
  }
})

export default router
