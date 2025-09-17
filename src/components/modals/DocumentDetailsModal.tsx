import { DocumentWithRelations } from '@/types/document.types';
import React from 'react'
import Modal from '../ui/Modal';
import { getTextDirection } from '@/lib/utils/getTextDirection';
import { motion } from "framer-motion";

type Props={
      document: DocumentWithRelations;
        onClose: () => void;
        userId:string

    
}
const DocumentDetailsModal = ({document,onClose,userId}:Props) => {
  return (
  
<Modal onClose={onClose}>
  <div className="w-full h-full p-6 flex flex-col gap-6">
    {/* Title */}
    <motion.p
      className="text-3xl md:text-4xl font-bold text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {document.title}
    </motion.p>

    {/* Stats */}
    <div className="w-full flex items-center justify-center gap-4 flex-wrap">
      {[
        {
          label: "Created by",
          value: document.user.id === userId ? "You" : document.user.userName,
        },
        { label: "Views", value: document.views.length },
        { label: "Quizzes created", value: document.quaizzes.length },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          className="bg-white shadow-md rounded-xl px-5 py-3 flex flex-col items-center justify-center text-center min-w-[120px]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <p className="text-sm font-medium text-gray-700">{stat.label}</p>
          <p className="text-base font-semibold text-sky-600">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>

    {/* Document text */}
    <motion.div
      className="w-full max-h-[250px] md:max-h-[300px] overflow-y-auto rounded-lg bg-gray-50 p-4 text-center text-gray-700 font-light leading-relaxed"
      dir={getTextDirection(document.text || "ltr")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {document.text}
    </motion.div>

    {/* Last seen list */}
    <div className="w-full">
      <p className="text-lg font-medium mb-2">👀 Last Seen</p>
      <div className="flex flex-col gap-1 pl-2">
        {document.views.slice(-3).reverse().map((v, i) => (
          <motion.p
            key={v.id}
            className="text-gray-600 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            {v.user.id === userId ? "You" : v.user.userName}
          </motion.p>
        ))}
        {document.views.length === 0 && (
          <p className="text-gray-400 italic text-sm">No views yet</p>
        )}
      </div>
    </div>
  </div>
</Modal>
  )
}

export default DocumentDetailsModal