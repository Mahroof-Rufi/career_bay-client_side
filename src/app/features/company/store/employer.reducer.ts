import { createReducer, on } from "@ngrx/store"
import { addJobPost, addPostSuccess, deleteJob, deletePostSuccess, loadApplicantsSuccess, loadEmployerJobsSuccess, loadEmployerPostsSuccess, loadEmployerSuccess, updateEmployer, updateJob } from "./employer.actions"
import { initialState } from "./employer.store"
import { Post } from "./employer.model"

export const employerReducer = createReducer(initialState,
    on(loadEmployerSuccess, (state,action) => {
        return {
            ...state,
            employer: action.employer
        }
    }),
    on(loadEmployerJobsSuccess, (state, action) => {
        return {
            ...state,
            jobs: action.jobs
        }
    }),
    on(updateEmployer, (state, action) => {
        return {
            ...state,
            employer: action.newData
        }
    }),
    on(addJobPost, (state,action) => {
        console.log(action.job);
        
        return {
            ...state,
            jobs: [...state.jobs, action.job]
        }
    }),
    on(updateJob, (state, action) => {
        return {
            ...state,
            jobs: state.jobs.map(job => job._id === action.id ? { ...job, ...action.updatedJob } : job)
        }
    }),
    on(deleteJob, (state, action) => {
        return {
            ...state,
            jobs: state.jobs.filter(job => job._id !== action.id)
        }
    }),
    on(loadApplicantsSuccess, (state, action) => {
        return {
            ...state,
            applicants: action.applicants
        }
    }),
    on(loadEmployerPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(addPostSuccess, (state, action) => {  
        console.log(action);
        
        const newPosts = [...state.posts, action.post]; 

        newPosts.push(action.post) 
        console.log('after :',newPosts);
            
        return {
            ...state,
            posts:newPosts
        }
    }),
    on(deletePostSuccess, (state, action) => {
        console.log('action :',action);
        
        return {
            ...state,
            posts: state.posts.filter(post => post._id != action.post_id)
        }
    })
)