'use client';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
  useMorphingDialog,
} from './motion-primitives/morphing-dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { submitContactForm } from '@/actions/contact';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Convert form data to FormData format expected by the action
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('company', data.company || '');
      formData.append('message', data.message);

      const result = await submitContactForm(formData);

      if (result.success) {
        reset();
        onSuccess();
      } else {
        setError('root', { 
          message: result.error || 'Failed to submit form. Please try again.' 
        });
      }
    } catch (error) {
      setError('root', { 
        message: 'An error occurred. Please try again.' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <div className='relative'>
        <label htmlFor="name" className="block text-sm font-medium text-[#3e362d]/70 mb-1.5 absolute top-2 left-3">
          Name
        </label>
        <Input
          id="name"
          type="text"
          className='bg-white/90 pl-20'
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className='relative'>
        <label htmlFor="email" className="block text-sm font-medium text-[#3e362d]/70 mb-1.5 absolute top-2 left-3">
          Email
        </label>
        <Input
          id="email"
          type="email"
          className='bg-white/90 pl-20'
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className='relative'>
        <label htmlFor="company" className="block text-sm font-medium text-[#3e362d]/70 mb-1.5 absolute top-2 left-3">
          Company
        </label>
        <Input
          id="company"
          type="text"
          className='bg-white/90 pl-20'
          {...register('company')}
          aria-invalid={errors.company ? 'true' : 'false'}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.company.message}
          </p>
        )}
      </div>
      <div className='relative'>
        <label htmlFor="message" className="block text-sm font-medium text-[#3e362d]/70 mb-1.5 absolute top-2 left-3">
          Tell us about you
        </label>
        <Textarea
          id="message"
          className='h-48 bg-white/90 pt-8'
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="mt-2 -mb-4">
        {isSubmitting ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}

function DialogContent({ isSubmitted, setIsSubmitted }: { isSubmitted: boolean; setIsSubmitted: (value: boolean) => void }) {
  const { setIsOpen, isOpen } = useMorphingDialog();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSubmitted) {
      setIsOpen(false);
    }
  }, [isSubmitted, setIsOpen]);

  // Handle input focus on mobile to ensure it scrolls into view
  useEffect(() => {
    if (!isOpen) return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Only handle focus for inputs/textareas within this dialog
      if (
        target && 
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        dialogRef.current?.contains(target)
      ) {
        // Small delay to ensure keyboard is open
        setTimeout(() => {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }, 300);
      }
    };

    // Use event delegation on document to catch all focus events
    document.addEventListener('focusin', handleFocus);
    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, [isOpen]);

  return (
    <div ref={dialogRef}>
      <MorphingDialogContent
        style={{
          borderRadius: '24px',
          maxHeight: '90dvh', // Use dynamic viewport height for mobile
        }}
        className='pointer-events-auto relative flex h-auto w-full flex-col overflow-y-auto overflow-x-hidden bg-[#f9f2ec] sm:w-[500px] my-4 sm:my-0'
      >
        <div className='p-6 sm:p-10'>
        <div className='flex justify-center mb-1'><Image src="images/logo-mark-dark.svg" alt="Living Works" width={36} height={36} /></div>
        <MorphingDialogTitle className='text-base text-center mb-4 font-medium text-[#3e362d]'>
        Let's Connect
        </MorphingDialogTitle>
        <MorphingDialogDescription
            disableLayoutAnimation
            variants={{
              initial: { opacity: 0, scale: 0.8, y: 100 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.8, y: 100 },
            }}
          >
            <ContactForm onSuccess={() => setIsSubmitted(true)} />
          </MorphingDialogDescription>
        </div>
        {/* <MorphingDialogClose className='text-zinc-50' /> */}
      </MorphingDialogContent>
    </div>
  );
}

export function LetsConnect() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (isSubmitted) {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isSubmitted]);
  
  if (isSubmitted) {
    return (
      <p className='text-lg font-medium text-white text-center bg-white/5 p-4 px-5 rounded-md'>
          We'll get back to you soon.
        </p>
    );
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >

        <div className='flex grow flex-row items-end justify-between px-3 py-2'>
          <div>
            <MorphingDialogTitle className='text-black text-lg font-semibold'>
              Let's Connect
            </MorphingDialogTitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <DialogContent isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
