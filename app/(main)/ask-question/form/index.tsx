"use client";

import React, { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AskQuestionSchema } from '@/lib/validations';
import TagCard from '@/components/tag-card';

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

const QuestionForm = () => {
    const form = useForm<z.infer<typeof AskQuestionSchema>>({
        defaultValues: {
            title: '',
            content: '',
            tags: [],
        },
        resolver: zodResolver(AskQuestionSchema),
    });

    const onSubmit = (values: z.infer<typeof AskQuestionSchema>) => {
        console.log(values);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: { value: string[] }) => {
        const keyValue = e.key;
        const currentTargetValue = e.currentTarget.value.trim().toLowerCase();
        
        if(keyValue === 'Enter'){
            e.preventDefault(); // prevent form submit behavior of the Enter key

            // check if the current target value (writing) is not empty, less than 15 characters, and not already in the tags array (form-hook)
            if(currentTargetValue && currentTargetValue.length <= 15 && !field.value.includes(currentTargetValue)){
                form.setValue("tags", [...field.value, currentTargetValue])
                e.currentTarget.value = '';
                form.clearErrors("tags");
                // check if the current target value (writing) is too long
            } else if (currentTargetValue.length > 15) {
                form.setError("tags", {
                    type: "maxLength",
                    message: "Tag must be less than 15 characters.",
                })
                // check if the current target value (writing) is already in the tags array (form-hook)
            } else if (field.value.includes(currentTargetValue)) {
                form.setError("tags", {
                    type: "unique",
                    message: "Tag already exists.",
                })
            }

        }
    }

    const handleRemoveTag = (tag: string, field: { value: string[] }) => {
        form.setValue("tags", field.value.filter((t) => t !== tag));
        
        if(field.value.length === 1){
            form.setError("tags", {
                type: "required",
                message: "Tag is required.",
            })
        }
    }

    // astrisk for required fields
    const astriskMark = <span className="text-primary-500">*</span>;

    return (
        <Form {...form}>
            <form className='flex flex-col mt-10 space-y-10' onSubmit={form.handleSubmit(onSubmit)}>
                {/* TITLE */}
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                    <FormLabel className="paragraph-semibold text-dark-400_light800">
                        Question Title {astriskMark}
                    </FormLabel>
                    <FormControl>
                        <Input
                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                        required
                        type="text"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>Be specific and imagine you&apos;re asking a question for another person.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* EDITOR */}
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                    <FormLabel className="paragraph-semibold text-dark-400_light800">
                        Detailed Explanation of your problem {astriskMark}
                    </FormLabel>
                    <FormControl>
                        <Editor editorRef={field.ref} onChange={field.onChange} markdown={field.value} />
                    </FormControl>
                    <FormDescription>Introduce the problem and expand on what you&apos;ve put in the title.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* TAGS */}
                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                    <FormLabel className="paragraph-semibold text-dark-400_light800">
                        Tags {astriskMark}
                    </FormLabel>
                        <>
                        <FormControl>
                            <Input
                            className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                            required
                            type=""
                            onKeyDown={(e) => onKeyDown(e, field)}
                            />
                        </FormControl>
                        {/* Display the tags */}
                        <div className='flex flex-start flex-wrap gap-2.5 mt-2'>
                            {field?.value?.map(tag => (
                                <TagCard 
                                key={tag} 
                                _id={tag} 
                                name={tag} 
                                isButton 
                                remove 
                                handleRemove={() => handleRemoveTag(tag, field)} />
                            ))}
                        </div>
                        </>
                    <FormDescription>
                        Add up to 3 tags to describe what your question about.
                        <br/>You need to press Enter to add tag.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>                
                    )}
                />
                {/* SUBMIT */}
                <Button 
                type='submit' 
                className="min-h-[46px] px-5 py-3 primary-gradient !text-light-900 self-end">
                    Ask a Question
                </Button>
            </form>
        </Form>
    )
}

export default QuestionForm