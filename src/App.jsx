import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, {jobLoader} from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'



const App = () => {
  
  //Add new job
  const addJob = async (newJob) => {
    const res = await fetch('/api/job/', {
      method : 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(newJob),
    }) 
    return
  } 

  //Delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/job/${id}`, {
      method : 'DELETE',
    }) 
    return
  }

  //Update job
  const updateJob = async (job) => {
    const res = await fetch(`/api/job/${job.id}`, {
      method : 'PUT',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(job),
    }) 
    return
  } 
  
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout />}>
        <Route index element = {<HomePage />} />
        <Route path = '/jobs' element = {<JobsPage />} />
        <Route path = '/add-job' element = {<AddJobPage addJobSubmit={addJob}/>} />
        <Route path = '/jobs/:id' element = {<JobPage deleteJob={deleteJob}/>} loader = {jobLoader}/>
        <Route path = '/edit-job/:id' element = {<EditJobPage updateJobSubmit={updateJob}/>} loader = {jobLoader}/>
        <Route path = '*' element = {<NotFoundPage />} />
      </Route>)
  )
  return <RouterProvider router={route} />  
}

export default App