
import * as React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'lg' | 'icon' | 'default'
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild=false, variant='default', size='default', className='', children, ...props }, ref
) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring disabled:opacity-50 disabled:pointer-events-none'
  const variants: Record<string,string> = {
    default: 'bg-sky-500 text-white hover:bg-sky-600',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
    outline: 'border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
  }
  const sizes: Record<string,string> = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-4',
    lg: 'h-11 px-5 text-base',
    icon: 'h-10 w-10'
  }
  const cls = [base, variants[variant], sizes[size], className].join(' ').trim()

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    const childProps = child.props || {}
    return React.cloneElement(child, {
      ...childProps,
      ...props,
      className: [childProps.className, cls].filter(Boolean).join(' '),
    })
  }

  return (
    <button ref={ref} className={cls} {...props}>
      {children}
    </button>
  )
})
