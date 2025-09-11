"use client"

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { ButtonHTMLAttributes, FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  redirect?: string | null
  loading?: boolean
}

export const Button: FC<SimpleButtonProps> = ({
  className = "",
  children,
  redirect,
  loading = false,
  ...props
}) => {
  const router = useRouter()

  const handleClick = () => {
    if (redirect) {
      router.push(redirect)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || props.disabled}
     className={clsx(
  "relative px-6 py-3 w-[160px] h-[48px] flex items-center justify-center rounded-md cursor-pointer transition-all duration-300",
  loading && "opacity-90 cursor-not-allowed",
  className // put this last to override defaults
)}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!loading ? (
          <motion.span
            key="text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            {children}
          </motion.span>
        ) : (
          <motion.span
            key="spinner"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
