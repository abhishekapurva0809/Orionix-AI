import { motion } from 'framer-motion'
import { Sparkles, Code, FileText, Lightbulb, Image as ImageIcon } from 'lucide-react'

export default function SmartEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full gap-8 h-full min-h-[400px] px-4 md:px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 shadow-[0_0_30px_rgba(108,99,255,0.15)]"
      >
        <Sparkles size={32} className="text-brand-primary" />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-center text-brand-text"
      >
        How can I help you today?
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-4 max-w-2xl"
      >
        <div className="glass-panel p-4 rounded-xl border border-white/5 hover:border-brand-primary/30 hover:bg-white/5 cursor-pointer transition-all group flex flex-col gap-2">
          <Code size={18} className="text-brand-primary mb-1 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-brand-text font-medium">Write a React hook</span>
          <span className="text-xs text-brand-muted">for managing local storage state</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 hover:border-[#10b981]/30 hover:bg-white/5 cursor-pointer transition-all group flex flex-col gap-2">
          <FileText size={18} className="text-[#10b981] mb-1 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-brand-text font-medium">Summarize an article</span>
          <span className="text-xs text-brand-muted">extracting the key bullet points</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 hover:border-[#f59e0b]/30 hover:bg-white/5 cursor-pointer transition-all group flex flex-col gap-2">
          <Lightbulb size={18} className="text-[#f59e0b] mb-1 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-brand-text font-medium">Brainstorm ideas</span>
          <span className="text-xs text-brand-muted">for a sci-fi novel setting</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 hover:border-[#ec4899]/30 hover:bg-white/5 cursor-pointer transition-all group flex flex-col gap-2">
          <ImageIcon size={18} className="text-[#ec4899] mb-1 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-brand-text font-medium">Generate an image prompt</span>
          <span className="text-xs text-brand-muted">for a cyberpunk cityscape</span>
        </div>
      </motion.div>
    </div>
  )
}
