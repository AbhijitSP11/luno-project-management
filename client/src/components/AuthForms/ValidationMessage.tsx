import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

interface ValidationMessageProps {
  message: string;
  isValid: boolean;
  show: boolean;
}

export const ValidationMessage = ({ message, isValid, show }: ValidationMessageProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className={`flex items-center gap-2 mt-1 text-sm ${
            isValid ? 'text-green-600' : 'text-red-600'
          }`}>
            {isValid ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 flex-shrink-0" />
            )}
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
