import React, { useContext } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { PostFormValidation } from '@/lib/ValidationSchema';
import { Models } from 'appwrite';
import FileUploader from '../shared/FileUploder';
import { useCreatePost } from '@/lib/React-Query/querysAndMutation';
import { useUserContext } from '@/context/authContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';


type PostFormProps = {
    post?: Models.Document;
    action: 'Create' | 'Update';
};
const PostForm = ({ post }: PostFormProps) => {
    const { user } = useUserContext()
    const navigate = useNavigate()
    const { mutateAsync: createPost, isPending: isPosting } =
        useCreatePost();
    // 1. Define your form.
    const toast = useToast()
    const form = useForm<z.infer<typeof PostFormValidation>>({
        resolver: zodResolver(PostFormValidation),
        defaultValues: {
            caption: post ? post?.caption : '',
            file: [],
            tags: post ? post?.tags.join(',') : '',
            location: post ? post?.location : '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostFormValidation>) {
        console.log(values)
        await createPost(
            {
                ...values,
                userId: user.id,
            }
        )
        navigate('/')
    }

    return (
        <Form {...form}>
            <form className='flex flex-col items-center w-full gap-9 justify-center max-w-4xl' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea className='bg-slate-800 border-gray-700' placeholder="Caption Of Post" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                                {/* <input type="file" /> */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input className='bg-slate-800 border-gray-700' placeholder="USA ,Russia Etc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Add Tags  (Sapreted By Comma " , ")</FormLabel>
                            <FormControl>
                                <Input className='bg-slate-800 border-gray-700' placeholder="Art,Recipe,Creative Etc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="flex justify-end w-full max-w-[50rem] gap-4 ">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger> <Button type="button" className='bg-slate-800 border-gray-700 w-[80px] hover:bg-slate-700 h-10'>draft</Button></TooltipTrigger>
                            <TooltipContent>
                                <p>Save all data to draft</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button type="submit" className='shad-button_primary '>
                        {
                            isPosting ?
                                <TooltipProvider>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger> 
                                            <BarLoader color="black" width={50} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Loading Please Wait !</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                : "Post"
                        }

                    </Button>

                </div>
            </form>
        </Form>
    );
};

export default PostForm;
