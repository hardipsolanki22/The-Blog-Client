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
import { Oval } from 'react-loader-spinner'
import TweetSkeleton from '../Skeleton/TweetSkeleton'
import TextArea from '../Atoms/TextArea'


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
            sm:no-scrollbar flex flex-col  sm:overflow-y-auto bg-black text-white border-y'>
            <div className='flex flex-col  items-center'>
                <p className='text-2xl'>Tweet</p>
                <div className='gap-4 flex flex-col justify-center items-center
                 min-w-[70%] h-auto bg-white text-black rounded-md p-10'>
                    <form onSubmit={handleSubmit(createTweetHnadler)} className='w-full'>
                        <TextArea
                            type="text"
                            label="Content: "
                            placeholder="Your thought..."
                            className="border p-2 text-base w-full h-16 focus:outline-none
                                                focus:border-gray-600 transition duration-200"
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
                                {isPending ?
                                    <Oval
                                        height={23}
                                        width={23}
                                        color='black'
                                        secondaryColor='white'
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                    />
                                    : "Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {!isLoading ? (
                tweets?.pages?.map((page) => (
                    page.data?.map((tweet) => (
                        <div key={tweet._id} className='h-auto m-2 flex flex-col p-5
                        border-t border-slate-500 tems-center'>
                            <TweetCart {...tweet} />
                        </div>
                    ))
                ))
            ) : (<>
                <TweetSkeleton cards={10} />
            </>
            )}
            <div ref={ref}
                className='flex justify-center items-center mb-14 sm:my-4'>
                {isFetchingNextPage ?
                    <Oval
                        height={'40'}
                        width={'40'}
                        color='black'
                        secondaryColor='white'
                    /> :
                    "No more tweets"
                }
            </div>
        </div>
    )

}

export default AllTweets
