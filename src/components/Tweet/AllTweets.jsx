import React, { useEffect, useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'

import { useToast } from '../../Helpers/toast'
import fetchAllTweets from '../Api/Tweet/fetchAllTweets'
import createTweet from '../Api/Tweet/createTweet'
import Button from '../Atoms/Button'
import Input from '../Atoms/Input'
import TweetCart from './TweetCart'


function AllTweets() {

    const { register, handleSubmit } = useForm()
    const queryClient = useQueryClient()


    // Fetch All Tweets (Infinite Scrolling)
    const MAX_PAGE_TWEETS = 5
    const { data: tweets, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ["tweets"],
            queryFn: fetchAllTweets,
            staleTime: 3000,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data.length === MAX_PAGE_TWEETS ? allPages.length + 1 : undefined;
            },

        })

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    // Create Tweet
    const { mutateAsync, isPending } = useMutation({
        mutationFn: createTweet,
        onSuccess: () => {
            queryClient.invalidateQueries(["tweets"])
            useToast.successToast("Tweet create successfully")
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })

    const createTweetHnadler = async (data) => {
        await mutateAsync(data)
    }


    return (
        <div className='sm:col-span-11 md:col-span-6 sm:max-h-screen 
        flex flex-col  sm:overflow-y-auto bg-black text-white border-y'>
            <div className='flex flex-col  items-center'>
                <p className='text-2xl'>Tweet</p>
                <div className='gap-4 flex flex-col justify-center items-center
                 min-w-[70%] h-auto bg-white text-black rounded-md p-10'>
                    <form onSubmit={handleSubmit(createTweetHnadler)} className='w-full'>
                        <Input
                            type="text"
                            label="Content: "
                            placeholder="Your thouts..."
                            className="border text-base w-full px-2 py-2 focus:outline-none
                     transition duration-200 focus:border-gray-600"
                            {...register("content", {
                                required: true
                            })}
                        />
                        <div className='flex m-2 justify-center items-center'>
                            <Button
                                className=''
                                bgColor='bg-black'
                                textColor='text-white'
                                disabled={isPending}
                            >
                                {isPending ? "Loading" : "Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {!isLoading ? (
                tweets?.pages?.map((page) => (
                    page.data?.map((tweet) => (
                        <div key={tweet._id} className='h-auto mt-4 flex flex-col p-7
                        border-t border-slate-500 tems-center'>
                            <TweetCart {...tweet} />
                        </div>
                    ))
                ))
            ) : (<>
                <p className='text-2xl'>Loading</p>
            </>
            )}
            <div ref={ref} className='p-4 rounded-3xl bg-slate-700 m-4 '>
                {isFetchingNextPage ?
                    "Loading More" :
                    hasNextPage ?
                        "Scroll down to load more" :
                        "No more Tweet"
                }
            </div>
        </div>
    )

}

export default AllTweets
