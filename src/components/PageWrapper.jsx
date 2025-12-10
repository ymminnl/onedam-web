import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(5px)' }} 
    animate={{ opacity: 1, filter: 'blur(0px)' }} 
    exit={{ opacity: 0, filter: 'blur(5px)' }}    
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;